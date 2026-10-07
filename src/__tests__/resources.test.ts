import { describe, expect, expectTypeOf, it } from 'vitest';
import { HeroSignalError, type MessagesReport } from '../index.js';
import { fakeClient, json } from './helpers.js';

const bodyOf = (body: unknown) => JSON.parse(body as string) as Record<string, unknown>;

describe('Node SDK: OpenAPI eşitliği için eklenen kaynaklar', () => {
  it('segmentler: liste sorgusu, önizleme gövdesi, estimate force parametresi', async () => {
    const { hs, calls } = fakeClient();
    await hs.segments.list({ q: 'vip', limit: 5 });
    expect(calls[0]!.url).toBe('https://api.test/v1/apps/app_1/segments?q=vip&limit=5');
    const definition = { all: [{ field: 'tag:plan', op: 'eq', value: 'pro' }] };
    await hs.segments.preview({ definition }, 'app_9');
    expect(calls[1]!.url).toBe('https://api.test/v1/apps/app_9/segments/preview');
    expect(bodyOf(calls[1]!.body)).toEqual({ definition });
    await hs.segments.estimate('seg/1', { force: true });
    expect(calls[2]!.method).toBe('POST');
    expect(calls[2]!.url).toBe(
      'https://api.test/v1/apps/app_1/segments/seg%2F1/estimate?force=true',
    );
    await hs.segments.estimate('seg_1');
    expect(new URL(calls[3]!.url).searchParams.get('force')).toBe('false');
  });

  it('şablonlar: copy_to_app ve render gövdeleri', async () => {
    const { hs, calls } = fakeClient();
    await hs.templates.copyToApp('tpl_1', { target_app_id: 'app_2', name: 'Kopya' });
    expect(calls[0]!.url).toBe('https://api.test/v1/apps/app_1/templates/tpl_1/copy_to_app');
    expect(bodyOf(calls[0]!.body)).toEqual({ target_app_id: 'app_2', name: 'Kopya' });
    await hs.templates.render('tpl_1', {
      channel: 'email',
      language: 'tr',
      user: { external_id: 'u1', tags: { ad: 'Ayşe' } },
    });
    expect(bodyOf(calls[1]!.body)).toMatchObject({ channel: 'email', language: 'tr' });
    await hs.templates.list({ channel: 'sms', cursor: 'c1' });
    expect(calls[2]!.url).toBe('https://api.test/v1/apps/app_1/templates?channel=sms&cursor=c1');
  });

  it('kampanyalar: yaşam döngüsü uçları gövdesiz POST, zamanlama gövdeli', async () => {
    const { hs, calls } = fakeClient(() => json(200, { id: 'cmp_1', status: 'paused' }));
    await hs.campaigns.schedule('cmp_1', {
      recurrence: { cron: '0 9 * * 1', timezone: 'Europe/Istanbul' },
    });
    expect(bodyOf(calls[0]!.body)).toEqual({
      recurrence: { cron: '0 9 * * 1', timezone: 'Europe/Istanbul' },
    });
    for (const action of ['send', 'pause', 'resume', 'cancel', 'duplicate', 'approve'] as const) {
      await hs.campaigns[action]('cmp_1');
    }
    await hs.campaigns.resendFailed('cmp_1');
    const lifecycle = calls.slice(1);
    expect(lifecycle.map((c) => new URL(c.url).pathname.split('/').pop())).toEqual([
      'send',
      'pause',
      'resume',
      'cancel',
      'duplicate',
      'approve',
      'resend-failed',
    ]);
    expect(lifecycle.every((c) => c.method === 'POST' && c.body === undefined)).toBe(true);
    await hs.campaigns.deliveries('cmp_1', { status: 'failed', limit: 50 });
    expect(calls.at(-1)!.url).toBe(
      'https://api.test/v1/apps/app_1/campaigns/cmp_1/deliveries?status=failed&limit=50',
    );
    await hs.campaigns.create({
      name: 'Bahar',
      audience: { filters: { any: [{ field: 'country', op: 'eq', value: 'TR' }] } },
      content: { contents: { tr: 'Merhaba' } },
    });
    expect(bodyOf(calls.at(-1)!.body)).toMatchObject({ content: { contents: { tr: 'Merhaba' } } });
  });

  it('analitik: boolean karşılaştırma sorgusu, CSV metin yanıtı ve funnel gövdesi', async () => {
    const { hs, calls } = fakeClient((call) =>
      call.url.includes('format=csv')
        ? new Response('date,sent\n2026-10-01,5\n', {
            status: 200,
            headers: { 'content-type': 'text/csv; charset=utf-8' },
          })
        : json(200, { series: [] }),
    );
    await hs.analytics.messages({
      from: '2026-10-01T00:00:00Z',
      compare: true,
      group_by: 'channel',
    });
    expect(calls[0]!.url).toBe(
      'https://api.test/v1/apps/app_1/analytics/messages?from=2026-10-01T00%3A00%3A00Z&compare=true&group_by=channel',
    );
    const csv = await hs.analytics.messages({ format: 'csv' });
    expectTypeOf(csv).toEqualTypeOf<string>();
    expect(csv).toBe('date,sent\n2026-10-01,5\n');
    const report = await hs.analytics.messages();
    expectTypeOf(report).toEqualTypeOf<MessagesReport>();
    await hs.analytics.funnel({
      steps: [{ name: 'signup' }, { name: 'purchase', where: { key: 'plan', value: 'pro' } }],
      window_hours: 24,
    });
    expect(calls.at(-1)!.url).toBe('https://api.test/v1/apps/app_1/analytics/funnels');
    expect(bodyOf(calls.at(-1)!.body)).toMatchObject({ window_hours: 24 });
  });

  it('bildirimler: estimate app_id gövdeye yazılır, export_events app_id sorgusu ile POST', async () => {
    const { hs, calls } = fakeClient(() => json(200, { recipients: 3 }));
    await hs.notifications.estimate({ target: { included_segments: ['seg_1'] }, appId: 'app_7' });
    expect(calls[0]!.url).toBe('https://api.test/v1/notifications/estimate');
    expect(bodyOf(calls[0]!.body)).toEqual({
      target: { included_segments: ['seg_1'] },
      app_id: 'app_7',
    });
    await hs.notifications.exportEvents('msg_1');
    expect(calls[1]!.method).toBe('POST');
    expect(calls[1]!.url).toBe(
      'https://api.test/v1/notifications/msg_1/export_events?app_id=app_1',
    );
  });

  it('kullanıcılar: upsert Idempotency-Key başlığı (otomatik veya verilen), search, identity, export', async () => {
    const { hs, calls } = fakeClient(() => json(201, { id: 'usr_1' }));
    await hs.users.upsert({ external_id: 'u1' });
    expect(calls[0]!.headers['idempotency-key']).toMatch(/^[0-9a-f-]{36}$/);
    await hs.users.upsert({ external_id: 'u1' }, undefined, { idempotencyKey: 'signup-u1' });
    expect(calls[1]!.headers['idempotency-key']).toBe('signup-u1');
    await hs.users.search({ definition: { all: [{ field: 'tag:vip', op: 'exists' }] }, limit: 10 });
    expect(calls[2]!.url).toBe('https://api.test/v1/apps/app_1/users/search');
    await hs.users.getIdentity('crm id', 'a/b');
    expect(calls[3]!.url).toBe('https://api.test/v1/apps/app_1/users/by/crm%20id/a%2Fb/identity');
    await hs.users.export('external_id', 'u1');
    expect(calls[4]!.url).toBe('https://api.test/v1/apps/app_1/users/by/external_id/u1/export');

    const { hs: noAuto, calls: noAutoCalls } = fakeClient(() => json(201, {}), {
      autoIdempotencyKey: false,
    });
    await noAuto.users.upsert({ external_id: 'u1' });
    expect(noAutoCalls[0]!.headers['idempotency-key']).toBeUndefined();
  });

  it('abonelikler: token ile güncelleme ve sahibin kimliği', async () => {
    const { hs, calls } = fakeClient();
    await hs.subscriptions.updateByToken('ChromePush', 'https://push.example/a?b=c', {
      status: 'unsubscribed',
    });
    expect(calls[0]!.method).toBe('PATCH');
    expect(calls[0]!.url).toBe(
      'https://api.test/v1/apps/app_1/subscriptions_by_token/ChromePush/https%3A%2F%2Fpush.example%2Fa%3Fb%3Dc',
    );
    expect(bodyOf(calls[0]!.body)).toEqual({ status: 'unsubscribed' });
    await hs.subscriptions.getUserIdentity('sub_1');
    expect(calls[1]!.url).toBe('https://api.test/v1/apps/app_1/subscriptions/sub_1/user/identity');
  });

  it('inbox, in-app, olay tanımları ve API anahtarları yolları', async () => {
    const { hs, calls } = fakeClient();
    await hs.inbox.list('external_id', 'u1', { include_archived: true, limit: 20 });
    expect(calls[0]!.url).toBe(
      'https://api.test/v1/apps/app_1/users/by/external_id/u1/inbox?include_archived=true&limit=20',
    );
    await hs.inbox.read('external_id', 'u1', 'inb_1');
    expect(calls[1]!.url).toBe(
      'https://api.test/v1/apps/app_1/users/by/external_id/u1/inbox/inb_1/read',
    );
    await hs.inAppMessages.setStatus('iam_1', 'paused');
    expect(bodyOf(calls[2]!.body)).toEqual({ status: 'paused' });
    await hs.events.updateDefinition('sepete ekle', {
      display_name: 'Sepete ekle',
      is_conversion: true,
    });
    expect(calls[3]!.method).toBe('PATCH');
    expect(calls[3]!.url).toBe('https://api.test/v1/apps/app_1/events/definitions/sepete%20ekle');
    await hs.apiKeys.create({
      name: 'ci',
      scopes: ['notifications:write'],
      ip_allowlist: ['10.0.0.0/8'],
    });
    expect(bodyOf(calls[4]!.body)).toEqual({
      name: 'ci',
      scopes: ['notifications:write'],
      ip_allowlist: ['10.0.0.0/8'],
    });
    await hs.apiKeys.rotate('key_1');
    expect(calls[5]!.method).toBe('POST');
    expect(calls[5]!.url).toBe('https://api.test/v1/apps/app_1/api-keys/key_1/rotate');
    await hs.organization.auditLogs({ app_id: 'app_1', action: 'api_key.rotate' });
    expect(calls[6]!.url).toBe(
      'https://api.test/v1/organization/audit-logs?app_id=app_1&action=api_key.rotate',
    );
  });

  it('import: multipart gövde (type + file), JSON content-type gönderilmez; 5xx sonrası aynı form yeniden gider', async () => {
    let n = 0;
    const { hs, calls } = fakeClient(() =>
      ++n === 1
        ? json(503, { error: { code: 'HS_UNAVAILABLE', message: 'meşgul' } })
        : json(200, { id: 'imp_1', status: 'pending' }),
    );
    const result = await hs.imports.create({
      type: 'csv_users',
      file: new TextEncoder().encode('external_id,email\nu1,a@example.com\n'),
      filename: 'kullanicilar.csv',
    });
    expect(result).toMatchObject({ id: 'imp_1' });
    expect(calls).toHaveLength(2);
    const form = calls[1]!.body;
    expect(form).toBeInstanceOf(FormData);
    expect(calls[1]!.headers['content-type']).toBeUndefined();
    const file = (form as FormData).get('file') as File;
    expect((form as FormData).get('type')).toBe('csv_users');
    expect(file.name).toBe('kullanicilar.csv');
    expect(await file.text()).toBe('external_id,email\nu1,a@example.com\n');
  });

  it('export işi gövdesi ve hata zarfı HeroSignalError olur', async () => {
    const { hs, calls } = fakeClient(() =>
      json(403, { error: { code: 'HS_FORBIDDEN', message: 'Kapsam yetersiz', request_id: 'r1' } }),
    );
    const err = await hs.exports
      .create({ type: 'events', filters: { name: 'purchase' } })
      .catch((e: unknown) => e);
    expect(bodyOf(calls[0]!.body)).toEqual({ type: 'events', filters: { name: 'purchase' } });
    expect(err).toBeInstanceOf(HeroSignalError);
    expect(err).toMatchObject({ status: 403, code: 'HS_FORBIDDEN', requestId: 'r1' });
  });

  it('paginate: next_cursor ile tüm sayfaları dolaşır', async () => {
    const { hs, calls } = fakeClient((call) =>
      new URL(call.url).searchParams.get('cursor') === 'c2'
        ? json(200, { data: [{ id: 'tpl_3' }], next_cursor: null, has_more: false })
        : json(200, {
            data: [{ id: 'tpl_1' }, { id: 'tpl_2' }],
            next_cursor: 'c2',
            has_more: true,
          }),
    );
    const ids: string[] = [];
    for await (const t of hs.paginate((cursor) => hs.templates.list({ cursor, limit: 2 }))) {
      ids.push(t.id);
    }
    expect(ids).toEqual(['tpl_1', 'tpl_2', 'tpl_3']);
    expect(calls).toHaveLength(2);
  });
});
