# @herosignal/node

HeroSignal Node.js sunucu SDK'sı. Node.js ≥ 20 (yerleşik `fetch`), ESM; istek ve yanıt tipleri
`api/openapi.yaml`'dan üretilen `@herosignal/api-client` tiplerinden türetilir. Yalnızca sunucuda
kullanın; API anahtarını istemci koduna gömmeyin. Ayrıntılı rehber: [`docs/sdk/node.md`](../../docs/sdk/node.md).

## Başlatma

```ts
import { HeroSignal } from '@herosignal/node';

const hs = new HeroSignal({
  apiKey: process.env.HS_API_KEY!, // hs_live_…
  appId: process.env.HS_APP_ID, // çağrıda appId verilmezse kullanılır
  baseUrl: 'https://api.herosignal.dev', // yerel: http://localhost:4000
  maxRetries: 3, // 429/5xx ve ağ hatalarında üstel geri çekilme (Retry-After'a uyar)
  timeoutMs: 30_000,
  autoIdempotencyKey: true, // notifications.create ve users.upsert için otomatik UUID
});
```

Ortak davranışlar:

- Kimlik doğrulama `Authorization: Bearer <apiKey>` başlığıyla yapılır.
- App kapsamlı her metodun son parametresi isteğe bağlı `appId`'dir; verilmezse varsayılan app kullanılır.
- Hata yanıtları `HeroSignalError` (`status`, `code`, `requestId`, `details`, `retryable`) olarak fırlatılır.
- `hs.paginate((cursor) => hs.templates.list({ cursor }))` cursor sayfalı listeleri `for await` ile öğe öğe dolaşır.
- Analitik raporlarında `format: 'csv'` verilirse yanıt CSV metni (`string`) olarak döner.

## Kaynaklar

Her public API işlemi (`/sdk/v1` hariç) bir SDK metoduna karşılık gelir; eşleme tablosu
`src/__tests__/coverage.test.ts` içinde sözleşmeye karşı test edilir.

| Kaynak | Metotlar |
| --- | --- |
| `organization` | `get`, `members`, `auditLogs` |
| `apps` | `list`, `create`, `get`, `update` |
| `apiKeys` | `list`, `create`, `update`, `revoke`, `rotate` |
| `notifications` | `create`, `list`, `get`, `cancel`, `estimate`, `deliveries`, `history`, `exportEvents` |
| `users` | `list`, `upsert`, `search`, `getByAlias`, `getByExternalId`, `update`, `delete`, `getIdentity`, `export`, `addAliases`, `removeAlias`, `addSubscription` |
| `subscriptions` | `get`, `update`, `delete`, `getUserIdentity`, `updateByToken`, `setOwner` |
| `inbox` | `list`, `readAll`, `read`, `archive` |
| `events` | `send`, `listDefinitions`, `getDefinition`, `updateDefinition` |
| `segments` | `list`, `create`, `preview`, `get`, `update`, `delete`, `usedBy`, `estimate` |
| `templates` | `list`, `create`, `get`, `update`, `delete`, `copyToApp`, `versions`, `render` |
| `campaigns` | `list`, `create`, `get`, `update`, `delete`, `schedule`, `send`, `pause`, `resume`, `cancel`, `duplicate`, `approve`, `stats`, `deliveries`, `resendFailed`, `messages` |
| `inAppMessages` | `list`, `create`, `get`, `update`, `delete`, `setStatus` |
| `analytics` | `overview`, `messages`, `subscriptions`, `events`, `conversions`, `funnel`, `providers`, `engagement` |
| `exports` | `create`, `list`, `get` |
| `imports` | `create` (multipart CSV), `list`, `get` |
| `channels` | `list`, `upsert`, `validate` |
| `suppressions` | `list`, `create`, `remove` |
| `webhooks` | `list`, `create`, `get`, `update`, `delete`, `rotateSecret`, `test`, `deliveries`, `replay` |

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

## Geliştirme

```bash
npx vitest run --project unit sdk/node   # birim + sözleşme kapsamı testleri
npx tsc --noEmit -p sdk/node
npx eslint sdk/node
npm run build -w @herosignal/node        # dist/
```
