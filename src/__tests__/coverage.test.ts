import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';
import type { HeroSignal } from '../index.js';
import { fakeClient } from './helpers.js';

/**
 * Sözleşme kapsamı: api/openapi.yaml'daki her public (`/sdk/v1` ve sistem uçları hariç) işlem
 * için SDK'da bir metot bulunmalı ve metot tam olarak o yöntem + yol şablonuna istek atmalıdır.
 */
const SPEC_PATH = fileURLToPath(new URL('../../../../api/openapi.yaml', import.meta.url));
const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

function publicOperations(): string[] {
  const spec = parse(readFileSync(SPEC_PATH, 'utf8')) as {
    paths: Record<string, Record<string, unknown>>;
  };
  const ops: string[] = [];
  for (const [path, item] of Object.entries(spec.paths)) {
    if (!path.startsWith('/v1/')) continue;
    for (const method of HTTP_METHODS) {
      if (item[method]) ops.push(`${method.toUpperCase()} ${path}`);
    }
  }
  return ops.sort();
}

const emptyDefinition = { all: [{ field: 'tag:vip', op: 'eq', value: 'true' }] };

/** İşlem anahtarı → SDK çağrısı. */
const TABLE: Record<string, (hs: HeroSignal) => Promise<unknown>> = {
  // organizasyon ve app'ler
  'GET /v1/organization': (hs) => hs.organization.get(),
  'GET /v1/organization/members': (hs) => hs.organization.members(),
  'GET /v1/organization/audit-logs': (hs) => hs.organization.auditLogs({ action: 'app.update' }),
  'GET /v1/organization/usage': (hs) => hs.organization.usage({ days: 30 }),
  'GET /v1/apps': (hs) => hs.apps.list(),
  'POST /v1/apps': (hs) => hs.apps.create({ name: 'Yeni app' }),
  'GET /v1/apps/{appId}': (hs) => hs.apps.get(),
  'PATCH /v1/apps/{appId}': (hs) => hs.apps.update({ name: 'Ad' }),
  // API anahtarları
  'GET /v1/apps/{appId}/api-keys': (hs) => hs.apiKeys.list(),
  'POST /v1/apps/{appId}/api-keys': (hs) =>
    hs.apiKeys.create({ name: 'ci', scopes: ['notifications:write'] }),
  'PATCH /v1/apps/{appId}/api-keys/{keyId}': (hs) => hs.apiKeys.update('key_1', { name: 'x' }),
  'DELETE /v1/apps/{appId}/api-keys/{keyId}': (hs) => hs.apiKeys.revoke('key_1'),
  'POST /v1/apps/{appId}/api-keys/{keyId}/rotate': (hs) => hs.apiKeys.rotate('key_1'),
  // webhook'lar
  'GET /v1/apps/{appId}/webhooks': (hs) => hs.webhooks.list(),
  'POST /v1/apps/{appId}/webhooks': (hs) =>
    hs.webhooks.create({ url: 'https://example.com/h', events: ['user.created'] }),
  'GET /v1/apps/{appId}/webhooks/{webhookId}': (hs) => hs.webhooks.get('wh_1'),
  'PATCH /v1/apps/{appId}/webhooks/{webhookId}': (hs) => hs.webhooks.update('wh_1', {}),
  'DELETE /v1/apps/{appId}/webhooks/{webhookId}': (hs) => hs.webhooks.delete('wh_1'),
  'POST /v1/apps/{appId}/webhooks/{webhookId}/rotate-secret': (hs) =>
    hs.webhooks.rotateSecret('wh_1'),
  'POST /v1/apps/{appId}/webhooks/{webhookId}/test': (hs) => hs.webhooks.test('wh_1'),
  'GET /v1/apps/{appId}/webhooks/{webhookId}/deliveries': (hs) => hs.webhooks.deliveries('wh_1'),
  'POST /v1/apps/{appId}/webhooks/deliveries/{deliveryId}/replay': (hs) =>
    hs.webhooks.replay('whd_1'),
  // kullanıcılar
  'GET /v1/apps/{appId}/users': (hs) => hs.users.list(),
  'POST /v1/apps/{appId}/users': (hs) => hs.users.upsert({ external_id: 'u1' }),
  'POST /v1/apps/{appId}/users/search': (hs) => hs.users.search({ definition: emptyDefinition }),
  'GET /v1/apps/{appId}/users/by/{label}/{value}': (hs) => hs.users.getByExternalId('u1'),
  'PATCH /v1/apps/{appId}/users/by/{label}/{value}': (hs) =>
    hs.users.update('external_id', 'u1', { tags: { vip: '1' } }),
  'DELETE /v1/apps/{appId}/users/by/{label}/{value}': (hs) => hs.users.delete('external_id', 'u1'),
  'GET /v1/apps/{appId}/users/by/{label}/{value}/identity': (hs) =>
    hs.users.getIdentity('external_id', 'u1'),
  'PATCH /v1/apps/{appId}/users/by/{label}/{value}/identity': (hs) =>
    hs.users.addAliases('external_id', 'u1', { crm: 'c1' }),
  'GET /v1/apps/{appId}/users/by/{label}/{value}/export': (hs) =>
    hs.users.export('external_id', 'u1'),
  'DELETE /v1/apps/{appId}/users/by/{label}/{value}/identity/{aliasLabel}': (hs) =>
    hs.users.removeAlias('external_id', 'u1', 'crm'),
  'POST /v1/apps/{appId}/users/by/{label}/{value}/subscriptions': (hs) =>
    hs.users.addSubscription('external_id', 'u1', { channel: 'email', token: 'a@example.com' }),
  // bildirim kutusu
  'GET /v1/apps/{appId}/users/by/{label}/{value}/inbox': (hs) => hs.inbox.list('external_id', 'u1'),
  'POST /v1/apps/{appId}/users/by/{label}/{value}/inbox/read-all': (hs) =>
    hs.inbox.readAll('external_id', 'u1'),
  'POST /v1/apps/{appId}/users/by/{label}/{value}/inbox/{itemId}/read': (hs) =>
    hs.inbox.read('external_id', 'u1', 'inb_1'),
  'DELETE /v1/apps/{appId}/users/by/{label}/{value}/inbox/{itemId}': (hs) =>
    hs.inbox.archive('external_id', 'u1', 'inb_1'),
  // abonelikler
  'GET /v1/apps/{appId}/subscriptions/{subscriptionId}': (hs) => hs.subscriptions.get('sub_1'),
  'PATCH /v1/apps/{appId}/subscriptions/{subscriptionId}': (hs) =>
    hs.subscriptions.update('sub_1', { status: 'unsubscribed' }),
  'DELETE /v1/apps/{appId}/subscriptions/{subscriptionId}': (hs) =>
    hs.subscriptions.delete('sub_1'),
  'GET /v1/apps/{appId}/subscriptions/{subscriptionId}/user/identity': (hs) =>
    hs.subscriptions.getUserIdentity('sub_1'),
  'PATCH /v1/apps/{appId}/subscriptions_by_token/{tokenType}/{token}': (hs) =>
    hs.subscriptions.updateByToken('email', 'a@example.com', { status: 'unsubscribed' }),
  'POST /v1/apps/{appId}/subscriptions/{subscriptionId}/owner': (hs) =>
    hs.subscriptions.setOwner('sub_1', 'u1'),
  // olaylar
  'POST /v1/apps/{appId}/events': (hs) => hs.events.send([{ name: 'purchase', external_id: 'u1' }]),
  'GET /v1/apps/{appId}/events/definitions': (hs) => hs.events.listDefinitions(),
  'GET /v1/apps/{appId}/events/definitions/{name}': (hs) => hs.events.getDefinition('purchase'),
  'PATCH /v1/apps/{appId}/events/definitions/{name}': (hs) =>
    hs.events.updateDefinition('purchase', { is_conversion: true }),
  // kanallar
  'GET /v1/apps/{appId}/channels': (hs) => hs.channels.list(),
  'PUT /v1/apps/{appId}/channels/{channel}': (hs) =>
    hs.channels.upsert('ios_push', { provider: 'mock' }),
  'POST /v1/apps/{appId}/channels/{channel}/validate': (hs) => hs.channels.validate('ios_push'),
  // bildirimler
  'POST /v1/notifications': (hs) =>
    hs.notifications.create({ target: { all: true }, contents: { en: 'x' } }),
  'GET /v1/notifications': (hs) => hs.notifications.list(),
  'POST /v1/notifications/estimate': (hs) => hs.notifications.estimate({ target: { all: true } }),
  'GET /v1/notifications/{messageId}': (hs) => hs.notifications.get('msg_1'),
  'DELETE /v1/notifications/{messageId}': (hs) => hs.notifications.cancel('msg_1'),
  'GET /v1/notifications/{messageId}/deliveries': (hs) => hs.notifications.deliveries('msg_1'),
  'GET /v1/notifications/{messageId}/history': (hs) => hs.notifications.history('msg_1'),
  'POST /v1/notifications/{messageId}/export_events': (hs) =>
    hs.notifications.exportEvents('msg_1'),
  // analitik
  'GET /v1/apps/{appId}/analytics/overview': (hs) => hs.analytics.overview({ range: '30d' }),
  'GET /v1/apps/{appId}/analytics/messages': (hs) => hs.analytics.messages(),
  'GET /v1/apps/{appId}/analytics/subscriptions': (hs) => hs.analytics.subscriptions(),
  'GET /v1/apps/{appId}/analytics/events': (hs) => hs.analytics.events({ name: 'purchase' }),
  'GET /v1/apps/{appId}/analytics/conversions': (hs) => hs.analytics.conversions(),
  'POST /v1/apps/{appId}/analytics/funnels': (hs) =>
    hs.analytics.funnel({ steps: [{ name: 'a' }, { name: 'b' }] }),
  'GET /v1/apps/{appId}/analytics/providers': (hs) => hs.analytics.providers(),
  'GET /v1/apps/{appId}/analytics/engagement': (hs) => hs.analytics.engagement(),
  'GET /v1/apps/{appId}/analytics/retention': (hs) => hs.analytics.retention({ weeks: 8 }),
  // dışa/içe aktarma
  'POST /v1/apps/{appId}/exports': (hs) => hs.exports.create({ type: 'users' }),
  'GET /v1/apps/{appId}/exports': (hs) => hs.exports.list(),
  'GET /v1/apps/{appId}/exports/{exportId}': (hs) => hs.exports.get('exp_1'),
  'POST /v1/apps/{appId}/imports': (hs) =>
    hs.imports.create({ type: 'csv_users', file: 'external_id\nu1\n' }),
  'GET /v1/apps/{appId}/imports': (hs) => hs.imports.list(),
  'GET /v1/apps/{appId}/imports/{importId}': (hs) => hs.imports.get('imp_1'),
  // segmentler
  'GET /v1/apps/{appId}/segments': (hs) => hs.segments.list(),
  'POST /v1/apps/{appId}/segments': (hs) =>
    hs.segments.create({ name: 'VIP', definition: emptyDefinition }),
  'POST /v1/apps/{appId}/segments/preview': (hs) =>
    hs.segments.preview({ definition: emptyDefinition }),
  'GET /v1/apps/{appId}/segments/{segmentId}': (hs) => hs.segments.get('seg_1'),
  'PATCH /v1/apps/{appId}/segments/{segmentId}': (hs) => hs.segments.update('seg_1', { name: 'X' }),
  'DELETE /v1/apps/{appId}/segments/{segmentId}': (hs) => hs.segments.delete('seg_1'),
  'GET /v1/apps/{appId}/segments/{segmentId}/campaigns': (hs) => hs.segments.usedBy('seg_1'),
  'POST /v1/apps/{appId}/segments/{segmentId}/estimate': (hs) => hs.segments.estimate('seg_1'),
  // şablonlar
  'GET /v1/apps/{appId}/templates': (hs) => hs.templates.list(),
  'POST /v1/apps/{appId}/templates': (hs) =>
    hs.templates.create({ name: 'Hoş geldin', content: { contents: { en: 'Hi' } } }),
  'GET /v1/apps/{appId}/templates/{templateId}': (hs) => hs.templates.get('tpl_1'),
  'PATCH /v1/apps/{appId}/templates/{templateId}': (hs) =>
    hs.templates.update('tpl_1', { name: 'Y' }),
  'DELETE /v1/apps/{appId}/templates/{templateId}': (hs) => hs.templates.delete('tpl_1'),
  'POST /v1/apps/{appId}/templates/{templateId}/copy_to_app': (hs) =>
    hs.templates.copyToApp('tpl_1', { target_app_id: 'app_2' }),
  'GET /v1/apps/{appId}/templates/{templateId}/versions': (hs) => hs.templates.versions('tpl_1'),
  'GET /v1/apps/{appId}/templates/{templateId}/stats': (hs) => hs.templates.stats('tpl_1'),
  'POST /v1/apps/{appId}/templates/{templateId}/render': (hs) => hs.templates.render('tpl_1'),
  // kampanyalar
  'GET /v1/apps/{appId}/campaigns': (hs) => hs.campaigns.list(),
  'POST /v1/apps/{appId}/campaigns': (hs) => hs.campaigns.create({ name: 'Bahar' }),
  'GET /v1/apps/{appId}/campaigns/{campaignId}': (hs) => hs.campaigns.get('cmp_1'),
  'PATCH /v1/apps/{appId}/campaigns/{campaignId}': (hs) =>
    hs.campaigns.update('cmp_1', { name: 'Yaz' }),
  'DELETE /v1/apps/{appId}/campaigns/{campaignId}': (hs) => hs.campaigns.delete('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/schedule': (hs) =>
    hs.campaigns.schedule('cmp_1', { send_at: '2026-11-01T09:00:00Z' }),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/send': (hs) => hs.campaigns.send('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/pause': (hs) => hs.campaigns.pause('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/resume': (hs) => hs.campaigns.resume('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/cancel': (hs) => hs.campaigns.cancel('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/duplicate': (hs) => hs.campaigns.duplicate('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/approve': (hs) => hs.campaigns.approve('cmp_1'),
  'GET /v1/apps/{appId}/campaigns/{campaignId}/stats': (hs) => hs.campaigns.stats('cmp_1'),
  'GET /v1/apps/{appId}/campaigns/{campaignId}/deliveries': (hs) =>
    hs.campaigns.deliveries('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/resend-failed': (hs) =>
    hs.campaigns.resendFailed('cmp_1'),
  'GET /v1/apps/{appId}/campaigns/{campaignId}/messages': (hs) => hs.campaigns.messages('cmp_1'),
  'GET /v1/apps/{appId}/campaigns/{campaignId}/variants/stats': (hs) =>
    hs.campaigns.variantStats('cmp_1'),
  'POST /v1/apps/{appId}/campaigns/{campaignId}/winner': (hs) =>
    hs.campaigns.selectWinner('cmp_1', { variant_id: 'cvr_1' }),
  // kategoriler ve tercihler
  'GET /v1/apps/{appId}/categories': (hs) => hs.preferences.listCategories(),
  'POST /v1/apps/{appId}/categories': (hs) =>
    hs.preferences.createCategory({ key: 'marketing', name: { tr: 'Pazarlama' } }),
  'PATCH /v1/apps/{appId}/categories/{categoryId}': (hs) =>
    hs.preferences.updateCategory('cat_1', { position: 1 }),
  'DELETE /v1/apps/{appId}/categories/{categoryId}': (hs) => hs.preferences.deleteCategory('cat_1'),
  'GET /v1/apps/{appId}/users/by/{label}/{value}/preferences': (hs) =>
    hs.preferences.getUser('external_id', 'u1'),
  'PUT /v1/apps/{appId}/users/by/{label}/{value}/preferences': (hs) =>
    hs.preferences.setUser('external_id', 'u1', {
      preferences: [{ category: 'marketing', opted_in: false }],
    }),
  // suppression list
  'GET /v1/apps/{appId}/suppressions': (hs) => hs.suppressions.list(),
  'POST /v1/apps/{appId}/suppressions': (hs) =>
    hs.suppressions.create({ channel: 'email', value: 'a@example.com' }),
  'DELETE /v1/apps/{appId}/suppressions/{suppressionId}': (hs) => hs.suppressions.remove('sup_1'),
  // in-app mesajlar
  'GET /v1/apps/{appId}/in-app-messages': (hs) => hs.inAppMessages.list(),
  'POST /v1/apps/{appId}/in-app-messages': (hs) =>
    hs.inAppMessages.create({
      name: 'Banner',
      triggers: [{ kind: 'session_start' }],
      display: { layout: 'modal', blocks: [{ type: 'title', text: { tr: 'Merhaba' } }] },
    }),
  'GET /v1/apps/{appId}/in-app-messages/{messageId}': (hs) => hs.inAppMessages.get('iam_1'),
  'PATCH /v1/apps/{appId}/in-app-messages/{messageId}': (hs) =>
    hs.inAppMessages.update('iam_1', { name: 'Yeni' }),
  'DELETE /v1/apps/{appId}/in-app-messages/{messageId}': (hs) => hs.inAppMessages.delete('iam_1'),
  'POST /v1/apps/{appId}/in-app-messages/{messageId}/status': (hs) =>
    hs.inAppMessages.setStatus('iam_1', 'active'),
  // journey'ler
  'GET /v1/apps/{appId}/journeys': (hs) => hs.journeys.list(),
  'POST /v1/apps/{appId}/journeys': (hs) => hs.journeys.create({ name: 'Karşılama' }),
  'GET /v1/apps/{appId}/journeys/{journeyId}': (hs) => hs.journeys.get('jrn_1'),
  'PATCH /v1/apps/{appId}/journeys/{journeyId}': (hs) =>
    hs.journeys.update('jrn_1', { name: 'Yeni ad' }),
  'DELETE /v1/apps/{appId}/journeys/{journeyId}': (hs) => hs.journeys.delete('jrn_1'),
  'PUT /v1/apps/{appId}/journeys/{journeyId}/draft': (hs) =>
    hs.journeys.saveDraft('jrn_1', { graph: { nodes: [], edges: [] } }),
  'PATCH /v1/apps/{appId}/journeys/{journeyId}/nodes/{nodeId}': (hs) =>
    hs.journeys.updateNode('jrn_1', 'n1', { position: { x: 0, y: 0 } }),
  'GET /v1/apps/{appId}/journeys/{journeyId}/versions': (hs) => hs.journeys.versions('jrn_1'),
  'POST /v1/apps/{appId}/journeys/{journeyId}/publish': (hs) => hs.journeys.publish('jrn_1'),
  'POST /v1/apps/{appId}/journeys/{journeyId}/pause': (hs) => hs.journeys.pause('jrn_1'),
  'POST /v1/apps/{appId}/journeys/{journeyId}/resume': (hs) => hs.journeys.resume('jrn_1'),
  'POST /v1/apps/{appId}/journeys/{journeyId}/archive': (hs) => hs.journeys.archive('jrn_1'),
  'POST /v1/apps/{appId}/journeys/{journeyId}/duplicate': (hs) => hs.journeys.duplicate('jrn_1'),
  'GET /v1/apps/{appId}/journeys/{journeyId}/stats': (hs) => hs.journeys.stats('jrn_1'),
  'GET /v1/apps/{appId}/journeys/{journeyId}/runs': (hs) => hs.journeys.listRuns('jrn_1'),
  'POST /v1/apps/{appId}/journeys/{journeyId}/runs': (hs) =>
    hs.journeys.triggerRun('jrn_1', { external_id: 'u1' }),
  'GET /v1/apps/{appId}/journeys/{journeyId}/runs/{runId}': (hs) =>
    hs.journeys.getRun('jrn_1', 'run_1'),
  'DELETE /v1/apps/{appId}/journeys/{journeyId}/runs/{runId}': (hs) =>
    hs.journeys.exitRun('jrn_1', 'run_1'),
  'GET /v1/apps/{appId}/users/by/{label}/{value}/journeys': (hs) =>
    hs.journeys.listForUser('external_id', 'u1'),
};

/** `/v1/apps/{appId}/x/{id}` → ^/v1/apps/[^/]+/x/[^/]+$ */
function templateRegex(template: string): RegExp {
  const escaped = template
    .split(/\{[^}]+\}/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('[^/]+');
  return new RegExp(`^${escaped}$`);
}

describe('OpenAPI kapsamı (Node SDK)', () => {
  const operations = publicOperations();

  it('spec en az 142 public işlem içerir ve her işlem tabloda bir SDK metoduna eşlenir', () => {
    expect(operations.length).toBeGreaterThanOrEqual(142);
    const missing = operations.filter((op) => !(op in TABLE));
    expect(missing).toEqual([]);
    const stale = Object.keys(TABLE).filter((op) => !operations.includes(op));
    expect(stale).toEqual([]);
  });

  it.each(Object.entries(TABLE))('%s → doğru yöntem ve yol', async (op, call) => {
    const [method, template] = op.split(' ') as [string, string];
    const { hs, calls } = fakeClient();
    await call(hs);
    expect(calls).toHaveLength(1);
    const url = new URL(calls[0]!.url);
    expect(calls[0]!.method).toBe(method);
    expect(url.pathname).toMatch(templateRegex(template));
    expect(calls[0]!.headers.authorization).toBe('Bearer hs_live_test');
  });
});
