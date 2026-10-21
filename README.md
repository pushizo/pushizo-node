<!-- pushizo:header -->
<p align="center">
  <a href="https://pushizo.com"><img src="https://raw.githubusercontent.com/pushizo/.github/main/profile/assets/mark.svg" alt="Pushizo" width="56" height="56"></a>
</p>
<p align="center">
  <a href="https://docs.pushizo.com/docs/sdk/node"><img src="https://img.shields.io/badge/docs-docs.pushizo.com-5b4bdb" alt="Docs"></a>
  <a href="https://docs.pushizo.com/docs/api"><img src="https://img.shields.io/badge/API-reference-b44fc4" alt="API reference"></a>
  <a href="https://github.com/pushizo/pushizo-node/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-16130f" alt="License: MIT"></a>
</p>
<p align="center"><a href="#english">English</a> · <a href="#türkçe">Türkçe</a></p>

## English

**Pushizo Node.js SDK** — Server-side SDK for Node.js 20+ (TypeScript, ESM, built-in fetch): notifications, users, segments, journeys, campaigns, analytics and webhook signature verification. Types are generated from the Pushizo OpenAPI schema. Use it on the server only.

> **Status:** Publishing to npm is in progress.<br>
> **Durum:** npm yayını hazırlanıyor.

**Install from GitHub until then · O zamana kadar GitHub'dan kurulum:**

```bash
npm install --allow-remote=root https://github.com/pushizo/pushizo-node/releases/download/v0.1.0/pushizo-node-0.1.0.tgz
```

**After publication · Yayından sonra:**

```bash
npm install @pushizo/node
```

The detailed guide below is in Turkish; code samples are language-neutral. Full documentation:
[docs.pushizo.com/docs/sdk/node](https://docs.pushizo.com/docs/sdk/node) · API reference: [docs.pushizo.com/docs/api](https://docs.pushizo.com/docs/api).

## Türkçe
<!-- /pushizo:header -->

# @pushizo/node

Pushizo Node.js sunucu SDK'sı. Node.js ≥ 20 (yerleşik `fetch`), ESM; istek ve yanıt tipleri
[Pushizo OpenAPI şemasından](https://github.com/pushizo/pushizo-openapi) üretilen ve pakete gömülü tiplerden türetilir. Yalnızca sunucuda
kullanın; API anahtarını istemci koduna gömmeyin. Ayrıntılı rehber: [docs.pushizo.com/docs/sdk/node](https://docs.pushizo.com/docs/sdk/node).

## Başlatma

```ts
import { Pushizo } from '@pushizo/node';

const hs = new Pushizo({
  apiKey: process.env.HS_API_KEY!, // hs_live_…
  appId: process.env.HS_APP_ID, // çağrıda appId verilmezse kullanılır
  baseUrl: 'https://api.pushizo.com', // yerel: http://localhost:4000
  maxRetries: 3, // 429 her metotta; 5xx/ağ hatası GET/PUT/DELETE'te, POST/PATCH'te yalnızca Idempotency-Key varsa veya istek gönderilemediyse
  timeoutMs: 30_000,
  autoIdempotencyKey: true, // notifications.create ve users.upsert için otomatik UUID
});
```

Ortak davranışlar:

- Kimlik doğrulama `Authorization: Bearer <apiKey>` başlığıyla yapılır.
- App kapsamlı her metodun son parametresi isteğe bağlı `appId`'dir; verilmezse varsayılan app kullanılır.
- Hata yanıtları `PushizoError` (`status`, `code`, `requestId`, `details`, `retryable`) olarak fırlatılır.
- `hs.paginate((cursor) => hs.templates.list({ cursor }))` cursor sayfalı listeleri `for await` ile öğe öğe dolaşır.
- Analitik raporlarında `format: 'csv'` verilirse yanıt CSV metni (`string`) olarak döner.

## Kaynaklar

Her public API işlemi (`/sdk/v1` hariç) bir SDK metoduna karşılık gelir; eşleme tablosu
`src/__tests__/coverage.test.ts` içinde sözleşmeye karşı test edilir.

| Kaynak | Metotlar |
| --- | --- |
| `organization` | `get`, `members`, `auditLogs`, `usage` |
| `apps` | `list`, `create`, `get`, `update` |
| `apiKeys` | `list`, `create`, `update`, `revoke`, `rotate` |
| `notifications` | `create`, `list`, `get`, `cancel`, `estimate`, `deliveries`, `history`, `exportEvents` |
| `users` | `list`, `upsert`, `search`, `getByAlias`, `getByExternalId`, `update`, `delete`, `getIdentity`, `export`, `addAliases`, `removeAlias`, `addSubscription` |
| `subscriptions` | `get`, `update`, `delete`, `getUserIdentity`, `updateByToken`, `setOwner` |
| `inbox` | `list`, `readAll`, `read`, `archive`; ekip gelen kutusu: `listCannedResponses`, `createCannedResponse`, `updateCannedResponse`, `deleteCannedResponse`, `listTeams`, `listAgents`, `getSettings`, `updateSettings`, `metrics` |
| `events` | `send`, `listDefinitions`, `getDefinition`, `updateDefinition` |
| `segments` | `list`, `create`, `preview`, `get`, `update`, `delete`, `usedBy`, `estimate` |
| `templates` | `list`, `create`, `get`, `update`, `delete`, `copyToApp`, `versions`, `render`, `stats` |
| `campaigns` | `list`, `create`, `get`, `update`, `delete`, `schedule`, `send`, `pause`, `resume`, `cancel`, `duplicate`, `approve`, `stats`, `deliveries`, `resendFailed`, `messages`, `variantStats`, `selectWinner` |
| `journeys` | `list`, `create`, `get`, `update`, `delete`, `saveDraft`, `updateNode`, `versions`, `publish`, `pause`, `resume`, `archive`, `duplicate`, `stats`, `listRuns`, `triggerRun`, `getRun`, `exitRun`, `listForUser` |
| `inAppMessages` | `list`, `create`, `get`, `update`, `delete`, `setStatus`, `selectWinner` |
| `preferences` | `listCategories`, `createCategory`, `updateCategory`, `deleteCategory`, `getUser`, `setUser` |
| `analytics` | `overview`, `messages`, `subscriptions`, `events`, `conversions`, `funnel`, `providers`, `engagement`, `retention` |
| `exports` | `create`, `list`, `get` |
| `imports` | `create` (multipart CSV), `list`, `get` |
| `channels` | `list`, `upsert`, `validate` |
| `suppressions` | `list`, `create`, `remove` |
| `webhooks` | `list`, `create`, `get`, `update`, `delete`, `rotateSecret`, `test`, `deliveries`, `replay`, `preview` |
| `dataFeeds` | `list`, `create`, `get`, `update`, `delete`, `test` |
| `contentTables` | `list`, `create` (multipart CSV), `get`, `update`, `delete`, `rows`, `replaceRows` (multipart CSV) |
| `warehouseExports` | `tables`, `testConnection`, `list`, `create`, `get`, `update`, `delete`, `test`, `run`, `runs` |
| `conversations` | `list`, `get`, `messages`, `reply`, `markRead`, `update`, `assign`, `updateTags`, `activity` |
| `smsKeywords` | `list`, `create`, `update`, `delete` |
| `whatsappTemplates` | `list`, `sync` |
| `emailDeliverability` | `get`, `update`, `verifyAddress`, `listWarmupPlans`, `createWarmupPlan`, `updateWarmupPlan`, `deleteWarmupPlan` |
| `zapier` | `me`, `subscribe`, `unsubscribe`, `samples` |
| `mcp` | `createCampaignDraft`, `createSegmentDraft` |
| `ads` | `listAccounts`, `listAudiences`, `createAudience`, `getAudience`, `updateAudience`, `deleteAudience`, `syncAudience`, `listSyncs`, `createLookalike`, `listCampaigns`, `getCampaign`, `updateCampaign`, `refreshAccount`, `spendReport`, `attributionReport`, `ltvReport`, `listCapiConfigs`, `listCapiDeliveries`, `listAlertRules`, `createAlertRule`, `updateAlertRule`, `deleteAlertRule`, `listAlerts` |
| `webCampaigns` | `list`, `create`, `get`, `update`, `report`, `setStatus` |
| `forms` | `list`, `create`, `get`, `listSubmissions`, `submit` |
| `surveys` | `list`, `create`, `get`, `setStatus`, `report`, `listResponses`, `respond` |
| `landingPages` | `list`, `get`, `publish`, `unpublish` |

Webhook alıcıları için `verifyWebhookSignature` ve `constructWebhookEvents` dışa aktarılır.

## Örnekler

```ts
// Bildirim ve kitle tahmini
await hs.notifications.estimate({ target: { included_segments: ['seg_vip'] } });
const { id } = await hs.notifications.create({
  idempotencyKey: `order-${orderId}`,
  target: { include_aliases: { external_id: [userId] } },
  contents: { tr: 'Siparişin yolda', en: 'Your order has shipped' },
});
await hs.notifications.exportEvents(id); // CSV işi; tamamlanınca download_url

// Segment ve kampanya yaşam döngüsü
const segment = await hs.segments.create({
  name: 'VIP',
  definition: { all: [{ field: 'tag:plan', op: 'eq', value: 'pro' }] },
});
await hs.segments.estimate(segment.id, { force: true });
const campaign = await hs.campaigns.create({
  name: 'Bahar indirimi',
  audience: { segments: [segment.id] },
  template_id: 'tpl_…',
});
await hs.campaigns.schedule(campaign.id, { send_at: '2026-11-01T09:00:00Z' });
await hs.campaigns.stats(campaign.id);

// Şablon render önizlemesi ve başka app'e kopyalama
await hs.templates.render('tpl_…', { channel: 'email', user: { external_id: 'u-1' } });
await hs.templates.copyToApp('tpl_…', { target_app_id: 'app_…' });

// Analitik (JSON veya CSV)
const report = await hs.analytics.messages({ from: '2026-10-01T00:00:00Z', compare: true });
const csv: string = await hs.analytics.messages({ format: 'csv' });

// İçe aktarma (multipart; Blob, Uint8Array veya metin)
await hs.imports.create({ type: 'csv_users', file: csvText, filename: 'kullanicilar.csv' });

// Kullanıcı kutusu ve token ile abonelik güncelleme
await hs.inbox.readAll('external_id', 'u-1');
await hs.subscriptions.updateByToken('email', 'ayse@example.com', { status: 'unsubscribed' });

// API anahtarı: düz anahtar yalnızca bu yanıtta döner, loglamayın
const created = await hs.apiKeys.create({ name: 'ci', scopes: ['notifications:write'] });
```

## A/B testi ve tercihler

```ts
// Kampanya varyantları `variants` ile tanımlanır; `ab_test.winner` otomatik kazanan seçimini açar.
const cmp = await hs.campaigns.create({
  name: 'Bahar',
  variants: [
    { name: 'A', weight_percent: 45, content: { contents: { tr: 'Bahar indirimi' } } },
    { name: 'B', weight_percent: 45, content: { contents: { tr: '%20 indirim' } } },
    { name: 'Kontrol', weight_percent: 10, is_control: true },
  ],
  ab_test: { enabled: true, test_percentage: 30, winner: { mode: 'auto', metric: 'click_rate', evaluate_after_minutes: 120 } },
});
const stats = await hs.campaigns.variantStats(cmp.id); // varyant bazlı oranlar + anlamlılık
await hs.campaigns.selectWinner(cmp.id, { variant_id: stats.variants[0]!.variant_id }); // elle seçim

// Kategoriler ve kullanıcı tercihleri (kategoriye kapalı kullanıcıya o kategori gönderilmez)
await hs.preferences.createCategory({ key: 'marketing', name: { tr: 'Pazarlama', en: 'Marketing' } });
await hs.preferences.setUser('external_id', 'u-1', {
  preferences: [{ category: 'marketing', channel: 'email', opted_in: false }],
});
await hs.templates.stats('tpl_1');
await hs.analytics.retention({ weeks: 8 });
```

## Journey'ler

Journey'ler taslak graf üzerinde düzenlenir, `publish` ile yeni sürüm olarak yayınlanır; çalışan
kullanıcılar girdikleri sürümde kalır. Graf React Flow biçimindedir (`nodes`, `edges`; düğüm
türleri ve ayarlar için `docs/journeys.md`).

```ts
const journey = await hs.journeys.create({ name: 'Sipariş sonrası' });
await hs.journeys.saveDraft(journey.id, {
  graph: {
    nodes: [
      { id: 'trg', type: 'trigger', position: { x: 0, y: 0 }, data: { trigger: { kind: 'api' } } },
      {
        id: 'push',
        type: 'send_push',
        position: { x: 0, y: 120 },
        data: { content: { contents: { tr: 'Siparişin yolda', en: 'Your order has shipped' } } },
      },
      { id: 'end', type: 'exit', position: { x: 0, y: 240 }, data: {} },
    ],
    edges: [
      { id: 'e1', source: 'trg', target: 'push', sourceHandle: 'next' },
      { id: 'e2', source: 'push', target: 'end', sourceHandle: 'next' },
    ],
  },
  settings: { re_entry: { mode: 'after_exit' } },
});
const { version, issues } = await hs.journeys.publish(journey.id); // issues: doğrulama uyarıları

// API tetikleyicisi: kullanıcı external_id, user_id veya alias ile seçilir
const { entered, run, reason } = await hs.journeys.triggerRun(journey.id, {
  external_id: 'u-1',
  context: { order_id: 'o-42' },
});
if (entered && run) await hs.journeys.getRun(journey.id, run.id);
await hs.journeys.stats(journey.id, { version }); // düğüm bazında sayaçlar ve hedef dönüşümü
for await (const r of hs.paginate((cursor) =>
  hs.journeys.listRuns(journey.id, { status: 'waiting', cursor }),
)) {
  console.log(r.id, r.current_node_id);
}
```

## Gelen kutusu, reklam raporlama ve web büyüme

```ts
// Ekip gelen kutusu: durum, atama, etiket ve metrikler
await hs.conversations.assign('cnv_1', { team_id: 'team_1', assignee_id: null });
await hs.conversations.updateTags('cnv_1', { add: { plan: 'pro' }, remove: ['lead'] });
await hs.conversations.update('cnv_1', { status: 'resolved' });
const metrics = await hs.inbox.metrics({ from: '2026-10-01T00:00:00Z', channel: 'chat' });
await hs.inbox.createCannedResponse({ shortcut: 'iade', title: 'İade', body: 'Merhaba {{ contact.name }}, iadeniz alındı.' });

// Reklam raporlama ve bütçe uyarıları; from/to zorunlu
const spend = await hs.ads.spendReport({ from: '2026-10-01', to: '2026-10-31', group_by: 'campaign' });
const attribution = await hs.ads.attributionReport({ from: '2026-10-01', to: '2026-10-31', model: 'time_decay' });
await hs.ads.updateCampaign('ade_1', { status: 'paused' }); // platforma da yazılır
await hs.ads.createAlertRule({ name: 'Günlük tavan', kind: 'daily_spend', threshold: 500, recipients: ['pazarlama@example.com'] });

// Web büyüme: kampanya taslak oluşur, setStatus ile yayınlanır
const popup = await hs.webCampaigns.create({
  name: 'Bülten pop-up',
  display: { layout: 'popup', blocks: [{ type: 'title', text: { tr: 'Bültenimize katılın' } }], form_id: 'frm_1' },
  trigger: { kind: 'exit_intent' },
});
await hs.webCampaigns.setStatus(popup.id, 'active');
await hs.forms.submit('frm_1', { values: { email: 'ayse@example.com' }, external_id: 'u-1' }); // sunucu tarafı gönderim
for await (const s of hs.paginate((cursor) => hs.forms.listSubmissions('frm_1', { status: 'confirmed', cursor }))) {
  console.log(s.id);
}
const nps = await hs.surveys.report('srv_1', { days: 30 });
await hs.landingPages.publish('lp_1');
```

## Geliştirme

```bash
npx vitest run --project unit sdk/node   # birim + sözleşme kapsamı testleri
npx tsc --noEmit -p sdk/node
npx eslint sdk/node
npm run build -w @pushizo/node        # dist/
```

<!-- pushizo:footer -->
---

## Support · Destek

- **Guide · Rehber:** [docs.pushizo.com/docs/sdk/node](https://docs.pushizo.com/docs/sdk/node)
- **API reference & OpenAPI · API referansı ve OpenAPI:** [docs.pushizo.com/docs/api](https://docs.pushizo.com/docs/api) ·
  [pushizo-openapi](https://github.com/pushizo/pushizo-openapi)
- **Bugs & ideas · Hata ve öneri:** [Issues](https://github.com/pushizo/pushizo-node/issues)
- **Security · Güvenlik:** please do not open public issues; email [security@pushizo.com](mailto:security@pushizo.com) ·
  herkese açık issue açmayın, bu adrese yazın.
- **Help · Destek:** [support@pushizo.com](mailto:support@pushizo.com)

This repository is mirrored automatically from the Pushizo main repository on every release. Please open an issue
instead of a pull request; fixes land in the main repository and ship with the next release.
Bu depo her sürümde Pushizo ana deposundan otomatik yansıtılır. Pull request yerine issue açın; düzeltmeler ana depoda
yapılır ve bir sonraki sürümle buraya gelir.

Released under the MIT License · MIT lisanslıdır — [LICENSE](https://github.com/pushizo/pushizo-node/blob/main/LICENSE).
<!-- /pushizo:footer -->
