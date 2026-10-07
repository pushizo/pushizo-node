import { createHmac, randomUUID } from 'node:crypto';
import type { PublicComponents, PublicPaths } from '@herosignal/api-client';
import { HttpClient, type HttpOptions } from './http.js';

export { HeroSignalError } from './errors.js';
export * from './webhooks.js';

type Schemas = PublicComponents['schemas'];
type JsonBody<
  P extends keyof PublicPaths,
  M extends keyof PublicPaths[P],
> = PublicPaths[P][M] extends { requestBody?: { content: { 'application/json': infer B } } }
  ? B
  : never;

export type Message = Schemas['Message'];
export type MessageList = Schemas['MessageList'];
export type CreateNotificationResult = Schemas['CreateNotificationResult'];
export type Delivery = Schemas['Delivery'];
export type DeliveryList = Schemas['DeliveryList'];
export type User = Schemas['User'];
export type UserDetail = Schemas['UserDetail'];
export type UserList = Schemas['UserList'];
export type Subscription = Schemas['Subscription'];
export type App = Schemas['App'];
export type AppList = Schemas['AppList'];
export type ChannelConfig = Schemas['ChannelConfig'];
export type ChannelValidation = Schemas['ChannelValidation'];
export type EventsAccepted = Schemas['EventsAccepted'];
export type ExportJob = Schemas['Export'];
export type Webhook = Schemas['Webhook'];
export type WebhookWithSecret = Schemas['WebhookWithSecret'];
export type WebhookDeliveryPage = Schemas['WebhookDeliveryPage'];
export type WebhookDeliveryDetail = Schemas['WebhookDeliveryDetail'];
export type Suppression = Schemas['Suppression'];
export type SuppressionPage = Schemas['SuppressionPage'];
export type CreateSuppressionInput = JsonBody<'/v1/apps/{appId}/suppressions', 'post'>;
export type SuppressionChannel = Suppression['channel'];
export type SuppressionReason = Suppression['reason'];
export type CreateWebhookInput = JsonBody<'/v1/apps/{appId}/webhooks', 'post'>;
export type UpdateWebhookInput = JsonBody<'/v1/apps/{appId}/webhooks/{webhookId}', 'patch'>;

export type CreateNotificationInput = JsonBody<'/v1/notifications', 'post'>;
export type UpsertUserInput = JsonBody<'/v1/apps/{appId}/users', 'post'>;
export type PatchUserInput = JsonBody<'/v1/apps/{appId}/users/by/{label}/{value}', 'patch'>;
export type AddSubscriptionInput = JsonBody<
  '/v1/apps/{appId}/users/by/{label}/{value}/subscriptions',
  'post'
>;
export type PatchSubscriptionInput = JsonBody<
  '/v1/apps/{appId}/subscriptions/{subscriptionId}',
  'patch'
>;
export type SendEventsInput = JsonBody<'/v1/apps/{appId}/events', 'post'>;
export type UpsertChannelInput = JsonBody<'/v1/apps/{appId}/channels/{channel}', 'put'>;
export type UpdateAppInput = JsonBody<'/v1/apps/{appId}', 'patch'>;
export type Channel = 'ios_push' | 'android_push' | 'web_push' | 'email' | 'sms';

export interface HeroSignalOptions extends Omit<HttpOptions, 'baseUrl'> {
  /** Varsayılan: https://api.herosignal.dev; yerel geliştirmede http://localhost:4000 */
  baseUrl?: string;
  /** Çağrılarda `appId` verilmezse kullanılacak varsayılan app. */
  appId?: string;
  /** `notifications.create` için idempotency anahtarı verilmemişse otomatik UUID üret (varsayılan true). */
  autoIdempotencyKey?: boolean;
}

interface Page {
  limit?: number;
  cursor?: string;
}

const enc = encodeURIComponent;

/**
 * HeroSignal sunucu SDK'sı (Node.js ≥ 20, yerleşik fetch).
 *
 * ```ts
 * const hs = new HeroSignal({ apiKey: process.env.HS_API_KEY!, appId: 'app_…' });
 * await hs.notifications.create({ idempotencyKey: `order-${id}`, target: { include_aliases: { external_id: [userId] } }, contents: { en: 'Shipped' } });
 * ```
 */
export class HeroSignal {
  private readonly http: HttpClient;
  private readonly defaultAppId: string | undefined;
  private readonly autoIdempotencyKey: boolean;

  constructor(options: HeroSignalOptions) {
    const { baseUrl, appId, autoIdempotencyKey, ...http } = options;
    this.http = new HttpClient({ ...http, baseUrl: baseUrl ?? 'https://api.herosignal.dev' });
    this.defaultAppId = appId;
    this.autoIdempotencyKey = autoIdempotencyKey ?? true;
  }

  /** SDK identity verification için `identity_hash` = HMAC-SHA256(sdk_secret, external_id). */
  static identityHash(sdkSecret: string, externalId: string): string {
    return createHmac('sha256', sdkSecret).update(externalId, 'utf8').digest('hex');
  }

  private app(appId?: string): string {
    const id = appId ?? this.defaultAppId;
    if (!id) throw new Error('HeroSignal: appId verilmedi (seçenek veya çağrı parametresi).');
    return id;
  }

  readonly organization = {
    get: () => this.http.request<Schemas['Org']>({ method: 'GET', path: '/v1/organization' }),
  };

  readonly apps = {
    list: () => this.http.request<AppList>({ method: 'GET', path: '/v1/apps' }),
    get: (appId?: string) =>
      this.http.request<App>({ method: 'GET', path: `/v1/apps/${enc(this.app(appId))}` }),
    update: (body: UpdateAppInput, appId?: string) =>
      this.http.request<App>({ method: 'PATCH', path: `/v1/apps/${enc(this.app(appId))}`, body }),
  };

  readonly notifications = {
    /** Bildirim oluştur (202). `idempotencyKey` camelCase kısayolu `idempotency_key` alanına yazılır. */
    create: (
      input: Omit<CreateNotificationInput, 'app_id'> & { appId?: string; idempotencyKey?: string },
    ) => {
      const { appId, idempotencyKey, ...rest } = input;
      const key =
        idempotencyKey ??
        rest.idempotency_key ??
        (this.autoIdempotencyKey ? randomUUID() : undefined);
      return this.http.request<CreateNotificationResult>({
        method: 'POST',
        path: '/v1/notifications',
        body: { ...rest, app_id: this.app(appId), ...(key ? { idempotency_key: key } : {}) },
      });
    },
    get: (messageId: string, appId?: string) =>
      this.http.request<Message>({
        method: 'GET',
        path: `/v1/notifications/${enc(messageId)}`,
        query: { app_id: this.app(appId) },
      }),
    /** `kind`, `source` filtresinin takma adıdır (api | campaign | journey | test). */
    list: (
      params: Page & {
        source?: Message['source'];
        kind?: Message['source'];
        status?: Message['status'];
      } = {},
      appId?: string,
    ) =>
      this.http.request<MessageList>({
        method: 'GET',
        path: '/v1/notifications',
        query: { app_id: this.app(appId), ...params },
      }),
    cancel: (messageId: string, appId?: string) =>
      this.http.request<Message>({
        method: 'DELETE',
        path: `/v1/notifications/${enc(messageId)}`,
        query: { app_id: this.app(appId) },
      }),
    /**
     * Bildirim geçmişi (teslimatlar) CSV dışa aktarma işi. İş bekliyor/çalışıyor veya geçerliyken
     * tekrarlanan çağrılar aynı işi döndürür; `status === 'completed'` olunca `download_url` dolar.
     */
    history: (messageId: string, appId?: string) =>
      this.http.request<ExportJob>({
        method: 'GET',
        path: `/v1/notifications/${enc(messageId)}/history`,
        query: { app_id: this.app(appId) },
      }),
    deliveries: (
      messageId: string,
      params: Page & { status?: Delivery['status'] } = {},
      appId?: string,
    ) =>
      this.http.request<DeliveryList>({
        method: 'GET',
        path: `/v1/notifications/${enc(messageId)}/deliveries`,
        query: { app_id: this.app(appId), ...params },
      }),
  };

  readonly users = {
    list: (params: Page & { q?: string; tag?: string } = {}, appId?: string) =>
      this.http.request<UserList>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/users`,
        query: params,
      }),
    upsert: (body: UpsertUserInput, appId?: string) =>
      this.http.request<UserDetail>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/users`,
        body,
      }),
    getByAlias: (label: string, value: string, appId?: string) =>
      this.http.request<UserDetail>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}`,
      }),
    getByExternalId: (externalId: string, appId?: string) =>
      this.users.getByAlias('external_id', externalId, appId),
    update: (label: string, value: string, body: PatchUserInput, appId?: string) =>
      this.http.request<UserDetail>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}`,
        body,
      }),
    delete: (label: string, value: string, appId?: string) =>
      this.http.request<{ ok: true }>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}`,
      }),
    addAliases: (label: string, value: string, identity: Record<string, string>, appId?: string) =>
      this.http.request<UserDetail>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/identity`,
        body: { identity },
      }),
    removeAlias: (label: string, value: string, aliasLabel: string, appId?: string) =>
      this.http.request<UserDetail>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/identity/${enc(aliasLabel)}`,
      }),
    addSubscription: (label: string, value: string, body: AddSubscriptionInput, appId?: string) =>
      this.http.request<Subscription>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/subscriptions`,
        body,
      }),
  };

  readonly subscriptions = {
    get: (subscriptionId: string, appId?: string) =>
      this.http.request<Subscription>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions/${enc(subscriptionId)}`,
      }),
    update: (subscriptionId: string, body: PatchSubscriptionInput, appId?: string) =>
      this.http.request<Subscription>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions/${enc(subscriptionId)}`,
        body,
      }),
    delete: (subscriptionId: string, appId?: string) =>
      this.http.request<{ ok: true }>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions/${enc(subscriptionId)}`,
      }),
    setOwner: (subscriptionId: string, externalId: string, appId?: string) =>
      this.http.request<Subscription>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions/${enc(subscriptionId)}/owner`,
        body: { external_id: externalId },
      }),
  };

  readonly events = {
    /** Toplu olay (en fazla 500). */
    send: (events: SendEventsInput['events'], appId?: string) =>
      this.http.request<EventsAccepted>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/events`,
        body: { events },
      }),
  };

  readonly channels = {
    list: (appId?: string) =>
      this.http.request<{ data: ChannelConfig[] }>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/channels`,
      }),
    upsert: (channel: Channel, body: UpsertChannelInput, appId?: string) =>
      this.http.request<ChannelConfig>({
        method: 'PUT',
        path: `/v1/apps/${enc(this.app(appId))}/channels/${channel}`,
        body,
      }),
    validate: (channel: Channel, appId?: string) =>
      this.http.request<ChannelValidation>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/channels/${channel}/validate`,
      }),
  };

  /**
   * Suppression list: e-posta/SMS gönderilmeyecek adresler (docs/messaging.md §6). Ham adres saklanmaz;
   * yanıtlarda maskeli değer (`value_masked`) döner. Okuma `users:read`, yazma `users:write`.
   */
  readonly suppressions = {
    /** `value` verilirse normalize edilmiş adresin özeti ile tam eşleşme aranır. */
    list: (
      params: Page & {
        appId?: string;
        channel?: SuppressionChannel;
        reason?: SuppressionReason;
        value?: string;
      } = {},
    ) => {
      const { appId, ...query } = params;
      return this.http.request<SuppressionPage>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/suppressions`,
        query,
      });
    },
    /** Adresi listeye ekler (varsayılan neden `manual`); `expires_at` verilirse o ana kadar geçerlidir. */
    create: (input: CreateSuppressionInput & { appId?: string }) => {
      const { appId, ...body } = input;
      return this.http.request<Suppression>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/suppressions`,
        body,
      });
    },
    /** Kaydı kaldırır; adres yeniden gönderim alabilir. */
    remove: (suppressionId: string, appId?: string) =>
      this.http.request<{ ok: true }>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/suppressions/${enc(suppressionId)}`,
      }),
  };

  /** Giden webhook endpoint'leri (`admin` kapsamı). İmza doğrulaması için `verifyWebhookSignature`. */
  readonly webhooks = {
    list: (appId?: string) =>
      this.http.request<{ data: Webhook[] }>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks`,
      }),
    /** Dönen `secret` yalnızca bu yanıtta görünür; güvenli bir yerde saklayın. */
    create: (body: CreateWebhookInput, appId?: string) =>
      this.http.request<WebhookWithSecret>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks`,
        body,
      }),
    get: (webhookId: string, appId?: string) =>
      this.http.request<Webhook>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/${enc(webhookId)}`,
      }),
    update: (webhookId: string, body: UpdateWebhookInput, appId?: string) =>
      this.http.request<Webhook>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/${enc(webhookId)}`,
        body,
      }),
    delete: (webhookId: string, appId?: string) =>
      this.http.request<{ ok: true }>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/${enc(webhookId)}`,
      }),
    /** Yeni secret döner; eski secret 24 saat boyunca ikinci imza olarak gönderilir. */
    rotateSecret: (webhookId: string, appId?: string) =>
      this.http.request<WebhookWithSecret>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/${enc(webhookId)}/rotate-secret`,
      }),
    test: (webhookId: string, appId?: string) =>
      this.http.request<WebhookDeliveryDetail>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/${enc(webhookId)}/test`,
      }),
    deliveries: (
      webhookId: string,
      query: Page & {
        status?: 'pending' | 'success' | 'failed' | 'dead';
        event_type?: string;
      } = {},
      appId?: string,
    ) =>
      this.http.request<WebhookDeliveryPage>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/${enc(webhookId)}/deliveries`,
        query,
      }),
    replay: (deliveryId: string, appId?: string) =>
      this.http.request<WebhookDeliveryDetail>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/deliveries/${enc(deliveryId)}/replay`,
      }),
  };
}

export default HeroSignal;
