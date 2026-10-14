import { createHmac } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import type { AddressInfo } from 'node:net';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  HeroSignal,
  HeroSignalError,
  WebhookSignatureError,
  constructWebhookEvents,
  verifyWebhookSignature,
} from '../index.js';

interface Call {
  url: string;
  method?: string;
  headers: Record<string, string>;
  body?: string;
}

function client(
  handler: (call: Call) => Response | Promise<Response>,
  extra: Partial<ConstructorParameters<typeof HeroSignal>[0]> = {},
) {
  const calls: Call[] = [];
  const hs = new HeroSignal({
    apiKey: 'hs_live_test',
    baseUrl: 'https://api.test/',
    appId: 'app_1',
    sleep: async () => undefined,
    fetch: async (input, init) => {
      const call: Call = {
        url:
          typeof input === 'string'
            ? input
            : input instanceof Request
              ? input.url
              : input.toString(),
        method: init?.method,
        headers: (init?.headers as Record<string, string>) ?? {},
        body: init?.body as string | undefined,
      };
      calls.push(call);
      return handler(call);
    },
    ...extra,
  });
  return { hs, calls };
}

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });

describe('HeroSignal Node SDK', () => {
  it('bildirim oluşturur: app_id ve otomatik idempotency anahtarı eklenir, Bearer başlığı gider', async () => {
    const { hs, calls } = client(() =>
      json(202, { id: 'msg_1', status: 'queued', recipients_estimate: 1, external_id_missing: [] }),
    );
    const result = await hs.notifications.create({
      target: { include_aliases: { external_id: ['u1'] } },
      contents: { en: 'Hi' },
    });
    expect(result.id).toBe('msg_1');
    expect(calls[0]!.url).toBe('https://api.test/v1/notifications');
    expect(calls[0]!.headers.authorization).toBe('Bearer hs_live_test');
    const body = JSON.parse(calls[0]!.body!) as { app_id: string; idempotency_key: string };
    expect(body.app_id).toBe('app_1');
    expect(body.idempotency_key).toMatch(/^[0-9a-f-]{36}$/);

    await hs.notifications.create({
      idempotencyKey: 'order-1',
      target: { include_subscription_ids: ['sub_1'] },
      contents: { en: 'x' },
      appId: 'app_2',
    });
    const body2 = JSON.parse(calls[1]!.body!) as { app_id: string; idempotency_key: string };
    expect(body2).toMatchObject({ app_id: 'app_2', idempotency_key: 'order-1' });
  });

  it('sorgu parametreleri ve yol kodlaması', async () => {
    const { hs, calls } = client(() => json(200, { data: [], next_cursor: null, has_more: false }));
    await hs.notifications.list({ limit: 10, status: 'completed' });
    expect(calls[0]!.url).toBe(
      'https://api.test/v1/notifications?app_id=app_1&limit=10&status=completed',
    );
    await hs.users.getByAlias('crm id', 'a/b');
    expect(calls[1]!.url).toBe('https://api.test/v1/apps/app_1/users/by/crm%20id/a%2Fb');
    await hs.subscriptions.setOwner('sub_1', 'u-9');
    expect(calls[2]!.method).toBe('POST');
    expect(JSON.parse(calls[2]!.body!)).toEqual({ external_id: 'u-9' });
  });

  it('429 → Retry-After kadar bekleyip yeniden dener; 404 → HeroSignalError (retryable değil)', async () => {
    let n = 0;
    const { hs } = client(() => {
      n++;
      return n === 1
        ? json(
            429,
            { error: { code: 'HS_RATE_LIMITED', message: 'yavaş' } },
            { 'retry-after': '1' },
          )
        : json(200, { id: 'msg_1' });
    });
    expect(await hs.notifications.get('msg_1')).toEqual({ id: 'msg_1' });
    expect(n).toBe(2);

    const { hs: hs404 } = client(() =>
      json(404, {
        error: { code: 'HS_NOT_FOUND', message: 'Mesaj bulunamadı', request_id: 'req_1' },
      }),
    );
    const err = await hs404.notifications.get('msg_x').catch((e: unknown) => e);
    expect(err).toBeInstanceOf(HeroSignalError);
    expect(err).toMatchObject({
      status: 404,
      code: 'HS_NOT_FOUND',
      requestId: 'req_1',
      retryable: false,
    });
  });

  it('ağ hatasında maxRetries sonrası NETWORK hatası; appId yoksa açık hata', async () => {
    const { hs } = client(
      () => {
        throw new TypeError('fetch failed');
      },
      { maxRetries: 1 },
    );
    await expect(hs.apps.list()).rejects.toMatchObject({ status: 0, code: 'NETWORK' });
    const bare = new HeroSignal({
      apiKey: 'k',
      baseUrl: 'https://api.test',
      fetch: async () => json(200, {}),
    });
    expect(() => bare.users.list()).toThrow(/appId/);
  });

  describe('yeniden deneme politikası', () => {
    const unavailable = () =>
      json(503, { error: { code: 'HS_SERVICE_UNAVAILABLE', message: 'x' } });
    /** İlk çağrıda `first`, sonrakilerde 200 döner. */
    const flaky = (first: () => Response) => {
      let n = 0;
      return () => (n++ === 0 ? first() : json(200, { id: 'ok' }));
    };

    it('anahtarsız POST 503 sonrası yeniden denenmez', async () => {
      const { hs, calls } = client(flaky(unavailable));
      await expect(hs.events.send([{ external_id: 'u1', name: 'purchase' }])).rejects.toMatchObject(
        {
          status: 503,
        },
      );
      expect(calls).toHaveLength(1);

      const { hs: noAuto, calls: noAutoCalls } = client(flaky(unavailable), {
        autoIdempotencyKey: false,
      });
      await expect(
        noAuto.notifications.create({ target: { all: true }, contents: { en: 'x' } }),
      ).rejects.toMatchObject({
        status: 503,
      });
      expect(noAutoCalls).toHaveLength(1);
    });

    it('zaman aşımı/okuma hatasında anahtarsız POST tekrarlanmaz (istek gitmiş olabilir)', async () => {
      const { hs, calls } = client(() => {
        throw new DOMException('This operation was aborted', 'AbortError');
      });
      await expect(hs.events.send([])).rejects.toMatchObject({ status: 0, code: 'NETWORK' });
      expect(calls).toHaveLength(1);
    });

    it('Idempotency-Key taşıyan POST 503 sonrası aynı anahtarla yeniden denenir', async () => {
      const { hs, calls } = client(flaky(unavailable));
      await hs.users.upsert({ external_id: 'u1' }, undefined, {
        idempotencyKey: 'usr-1',
      });
      expect(calls).toHaveLength(2);
      expect(calls.map((c) => c.headers['idempotency-key'])).toEqual(['usr-1', 'usr-1']);

      // Otomatik anahtar (gövdedeki idempotency_key) da sayılır.
      const { hs: auto, calls: autoCalls } = client(flaky(unavailable));
      await auto.notifications.create({ target: { all: true }, contents: { en: 'x' } });
      expect(autoCalls).toHaveLength(2);
      const keys = autoCalls.map(
        (c) => (JSON.parse(c.body!) as { idempotency_key: string }).idempotency_key,
      );
      expect(new Set(keys).size).toBe(1);
    });

    it('GET ve DELETE 503 sonrası yeniden denenir', async () => {
      const { hs, calls } = client(flaky(unavailable));
      await hs.notifications.get('msg_1');
      expect(calls.map((c) => c.method)).toEqual(['GET', 'GET']);

      const { hs: del, calls: delCalls } = client(flaky(unavailable));
      await del.webhooks.delete('whk_1');
      expect(delCalls.map((c) => c.method)).toEqual(['DELETE', 'DELETE']);
    });

    it('429 alan anahtarsız POST Retry-After sonrası yeniden denenir', async () => {
      const waits: number[] = [];
      const { hs, calls } = client(
        flaky(() =>
          json(429, { error: { code: 'HS_RATE_LIMITED', message: 'x' } }, { 'retry-after': '2' }),
        ),
        { sleep: async (ms) => void waits.push(ms) },
      );
      await hs.events.send([]);
      expect(calls).toHaveLength(2);
      expect(waits).toEqual([2000]);
    });

    it('bağlantı kurulamayan (ECONNREFUSED) POST yeniden denenir', async () => {
      const refused = Object.assign(new TypeError('fetch failed'), {
        cause: Object.assign(new Error('connect ECONNREFUSED 127.0.0.1:1'), {
          code: 'ECONNREFUSED',
        }),
      });
      let n = 0;
      const { hs, calls } = client(() => {
        if (n++ === 0) throw refused;
        return json(200, { accepted: 1 });
      });
      await expect(hs.events.send([])).resolves.toEqual({ accepted: 1 });
      expect(calls).toHaveLength(2);
    });

    it('gerçek bağlantı reddinde (kapalı port) POST yeniden denenir', async () => {
      const server = createServer();
      await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
      const { port } = server.address() as AddressInfo;
      await new Promise<void>((resolve) => server.close(() => resolve()));
      const waits: number[] = [];
      const hs = new HeroSignal({
        apiKey: 'k',
        appId: 'app_1',
        baseUrl: `http://127.0.0.1:${port}`,
        maxRetries: 1,
        sleep: async (ms) => void waits.push(ms),
      });
      await expect(hs.events.send([])).rejects.toMatchObject({ status: 0, code: 'NETWORK' });
      expect(waits).toEqual([300]);
    }, 20_000);
  });

  it('inAppMessages.selectWinner A/B kazananını POST eder', async () => {
    const { hs, calls } = client(() => json(200, { id: 'iam_1' }));
    await hs.inAppMessages.selectWinner('iam_1', 'b');
    expect(calls[0]!.method).toBe('POST');
    expect(calls[0]!.url).toBe('https://api.test/v1/apps/app_1/in-app-messages/iam_1/winner');
    expect(JSON.parse(calls[0]!.body!)).toEqual({ variant_id: 'b' });
  });

  it('notifications.list kind filtresi ve history dışa aktarma işi', async () => {
    const job = {
      id: 'exp_1',
      app_id: 'app_1',
      type: 'deliveries',
      filters: { message_id: 'msg_1' },
      status: 'pending',
      row_count: null,
      error: null,
      download_url: null,
      expires_at: null,
      requested_by: null,
      created_at: '2026-10-07T00:00:00.000Z',
      completed_at: null,
    };
    const { hs, calls } = client((call) =>
      call.url.includes('/history')
        ? json(200, job)
        : json(200, { data: [], next_cursor: null, has_more: false }),
    );
    await hs.notifications.list({ kind: 'campaign', limit: 5 });
    expect(calls[0]!.url).toBe(
      'https://api.test/v1/notifications?app_id=app_1&kind=campaign&limit=5',
    );
    const result = await hs.notifications.history('msg/1', 'app_2');
    expect(calls[1]!.method).toBe('GET');
    expect(calls[1]!.url).toBe('https://api.test/v1/notifications/msg%2F1/history?app_id=app_2');
    expect(result).toMatchObject({ id: 'exp_1', type: 'deliveries', status: 'pending' });
  });

  it('identityHash sunucu ile aynı HMAC-SHA256 değerini üretir', () => {
    expect(HeroSignal.identityHash('secret', 'u-1')).toBe(
      createHmac('sha256', 'secret').update('u-1').digest('hex'),
    );
  });

  it('webhooks kaynağı doğru yolları çağırır', async () => {
    const { hs, calls } = client(() => json(200, { data: [] }));
    await hs.webhooks.list();
    await hs.webhooks.create({ url: 'https://x.example.com/h', events: ['user.created'] });
    await hs.webhooks.rotateSecret('whk_1');
    await hs.webhooks.deliveries('whk_1', { status: 'dead', limit: 10 });
    await hs.webhooks.replay('whd_1');
    expect(calls.map((c) => `${c.method} ${c.url}`)).toEqual([
      'GET https://api.test/v1/apps/app_1/webhooks',
      'POST https://api.test/v1/apps/app_1/webhooks',
      'POST https://api.test/v1/apps/app_1/webhooks/whk_1/rotate-secret',
      'GET https://api.test/v1/apps/app_1/webhooks/whk_1/deliveries?status=dead&limit=10',
      'POST https://api.test/v1/apps/app_1/webhooks/deliveries/whd_1/replay',
    ]);
  });
});

describe('webhook imza doğrulama (alıcı tarafı, ortak vektörler)', () => {
  interface VectorCase {
    name: string;
    toleranceSeconds: number;
    payload: string;
    header: string | null;
    secrets: string[];
    now: number;
    expected: { ok: true; timestamp: number } | { ok: false; reason: string };
    events?: number;
  }
  const vectors = JSON.parse(
    readFileSync(
      fileURLToPath(new URL('../../../testdata/webhook-signature-vectors.json', import.meta.url)),
      'utf8',
    ),
  ) as { cases: VectorCase[] };

  it('vektör dosyası yüklendi', () => {
    expect(vectors.cases.length).toBeGreaterThan(10);
  });

  it.each(vectors.cases.map((c) => [c.name, c] as const))('%s', (_name, c) => {
    const secret = c.secrets.length === 1 ? c.secrets[0]! : c.secrets;
    const options = {
      payload: c.payload,
      header: c.header,
      secret,
      toleranceSeconds: c.toleranceSeconds,
      now: c.now * 1000,
    };
    expect(verifyWebhookSignature(options)).toEqual(c.expected);
    // Aynı vektör Buffer girdisiyle ve dizi başlıkla da aynı sonucu vermeli.
    expect(
      verifyWebhookSignature({
        ...options,
        payload: Buffer.from(c.payload, 'utf8'),
        secret: c.secrets,
      }),
    ).toEqual(c.expected);
    if (c.header !== null)
      expect(verifyWebhookSignature({ ...options, header: [c.header] })).toEqual(c.expected);
    if (c.events !== undefined) {
      expect(constructWebhookEvents(options)).toHaveLength(c.events);
    } else if (!c.expected.ok) {
      const reason = c.expected.reason;
      expect(() => constructWebhookEvents(options)).toThrow(WebhookSignatureError);
      expect(() => constructWebhookEvents(options)).toThrow(expect.objectContaining({ reason }));
    }
  });
});

describe('Faz 10: suppression list ve e-posta/SMS/inbox içerik alanları', () => {
  const suppression = {
    id: 'sup_1',
    app_id: 'app_1',
    channel: 'email',
    value_masked: 'a***e@example.com',
    reason: 'manual',
    source: 'api',
    detail: {},
    expires_at: null,
    created_at: '2026-10-07T00:00:00.000Z',
    updated_at: '2026-10-07T00:00:00.000Z',
  };

  it('suppressions.list filtreleri sorguya, appId yola yazılır', async () => {
    const { hs, calls } = client(() =>
      json(200, { data: [suppression], next_cursor: 'c2', has_more: true }),
    );
    const page = await hs.suppressions.list({
      channel: 'email',
      reason: 'bounce',
      value: 'Ayse@Example.com',
      limit: 20,
      cursor: 'c1',
    });
    expect(page.data[0]!.value_masked).toBe('a***e@example.com');
    expect(page.has_more).toBe(true);
    const url = new URL(calls[0]!.url);
    expect(url.pathname).toBe('/v1/apps/app_1/suppressions');
    expect(Object.fromEntries(url.searchParams)).toEqual({
      channel: 'email',
      reason: 'bounce',
      value: 'Ayse@Example.com',
      limit: '20',
      cursor: 'c1',
    });
    expect(calls[0]!.method).toBe('GET');

    await hs.suppressions.list({ appId: 'app/2' });
    expect(calls[1]!.url).toBe('https://api.test/v1/apps/app%2F2/suppressions');
  });

  it('suppressions.create gövdeyi gönderir (appId gövdeye girmez), remove DELETE yapar', async () => {
    const { hs, calls } = client((call) =>
      call.method === 'DELETE' ? json(200, { ok: true }) : json(201, suppression),
    );
    const created = await hs.suppressions.create({
      appId: 'app_9',
      channel: 'sms',
      value: '+905320000111',
      reason: 'manual',
      expires_at: '2026-12-31T00:00:00Z',
      note: 'müşteri talebi',
    });
    expect(created.id).toBe('sup_1');
    expect(calls[0]!.url).toBe('https://api.test/v1/apps/app_9/suppressions');
    expect(calls[0]!.method).toBe('POST');
    expect(JSON.parse(calls[0]!.body!)).toEqual({
      channel: 'sms',
      value: '+905320000111',
      reason: 'manual',
      expires_at: '2026-12-31T00:00:00Z',
      note: 'müşteri talebi',
    });
    expect(await hs.suppressions.remove('sup_1')).toEqual({ ok: true });
    expect(calls[1]).toMatchObject({
      method: 'DELETE',
      url: 'https://api.test/v1/apps/app_1/suppressions/sup_1',
    });
  });

  it('suppression hatası HeroSignalError olarak döner', async () => {
    const { hs } = client(() =>
      json(400, { error: { code: 'HS_VALIDATION_ERROR', message: 'Geçersiz adres' } }),
    );
    await expect(hs.suppressions.create({ channel: 'email', value: 'x' })).rejects.toMatchObject({
      status: 400,
      code: 'HS_VALIDATION_ERROR',
    });
  });

  it('bildirim oluşturmada e-posta, SMS ve inbox alanları gönderilir', async () => {
    const { hs, calls } = client(() =>
      json(202, { id: 'msg_1', status: 'queued', recipients_estimate: 1, external_id_missing: [] }),
    );
    await hs.notifications.create({
      idempotencyKey: 'mail-1',
      target: { include_aliases: { external_id: ['u1'] }, channels: ['email', 'sms'] },
      contents: { tr: 'Siparişin kargoda', en: 'Your order shipped' },
      email_subject: 'Siparişin yolda',
      email_body: '<p>Merhaba {{ user.tags.name }}</p>',
      email_mjml: '<mjml><mj-body></mj-body></mjml>',
      email_preheader: 'Kargo takip',
      email_from_name: 'Mağaza',
      email_from_address: 'no-reply@example.com',
      email_reply_to_address: 'destek@example.com',
      disable_email_click_tracking: true,
      sms_from: 'MAGAZA',
      disable_sms_link_shortening: true,
      add_to_inbox: true,
      inbox_ttl: 86_400,
    });
    expect(JSON.parse(calls[0]!.body!)).toMatchObject({
      app_id: 'app_1',
      idempotency_key: 'mail-1',
      email_subject: 'Siparişin yolda',
      email_from_address: 'no-reply@example.com',
      disable_email_click_tracking: true,
      sms_from: 'MAGAZA',
      disable_sms_link_shortening: true,
      add_to_inbox: true,
      inbox_ttl: 86_400,
    });
  });
});
