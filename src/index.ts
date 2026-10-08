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
export type RecipientEstimate = Schemas['RecipientEstimate'];
export type EstimateRecipientsInput = JsonBody<'/v1/notifications/estimate', 'post'>;
export type UserIdentity = Schemas['UserIdentity'];
export type UserExport = Schemas['UserExport'];
export type InboxItem = Schemas['InboxItem'];
export type InboxPage = Schemas['InboxPage'];
export type Template = Schemas['Template'];
export type TemplatePage = Schemas['TemplatePage'];
export type TemplateVersionList = Schemas['TemplateVersionList'];
export type RenderPreview = Schemas['RenderPreview'];
export type CreateTemplateInput = JsonBody<'/v1/apps/{appId}/templates', 'post'>;
export type UpdateTemplateInput = JsonBody<'/v1/apps/{appId}/templates/{templateId}', 'patch'>;
export type RenderTemplateInput = JsonBody<'/v1/apps/{appId}/templates/{templateId}/render', 'post'>;
export type CopyTemplateInput = JsonBody<'/v1/apps/{appId}/templates/{templateId}/copy', 'post'>;
export type InAppMessage = Schemas['InAppMessage'];
export type InAppMessagePage = Schemas['InAppMessagePage'];
export type CreateInAppInput = JsonBody<'/v1/apps/{appId}/in-app-messages', 'post'>;
export type UpdateInAppInput = JsonBody<'/v1/apps/{appId}/in-app-messages/{messageId}', 'patch'>;
export type InAppStatus = JsonBody<'/v1/apps/{appId}/in-app-messages/{messageId}/status', 'post'>['status'];
export type ApiKey = Schemas['ApiKey'];
export type ApiKeyList = Schemas['ApiKeyList'];
export type CreatedApiKey = Schemas['CreatedApiKey'];
export type CreateApiKeyInput = JsonBody<'/v1/apps/{appId}/api-keys', 'post'>;
export type UpdateApiKeyInput = JsonBody<'/v1/apps/{appId}/api-keys/{keyId}', 'patch'>;
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
    /**
     * Kaydedilmemiş hedef için alıcı sayımı (gönderim yapmaz, abonelik oluşturmaz). `channels` verilmezse tüm
     * kanallar sayılır; `unknown_contacts` henüz aboneliği olmayan `email_to`/`include_phone_numbers` adresleridir.
     */
    estimate: (target: EstimateRecipientsInput['target'], appId?: string) =>
      this.http.request<RecipientEstimate>({
        method: 'POST',
        path: '/v1/notifications/estimate',
        body: { app_id: this.app(appId), target },
      }),
    /** Mesaj olayları (teslim, açılma, tıklama, bounce…) CSV işi; tamamlanınca `download_url` dolar. */
    exportEvents: (messageId: string, appId?: string) =>
      this.http.request<ExportJob>({
        method: 'POST',
        path: `/v1/notifications/${enc(messageId)}/export-events`,
        query: { app_id: this.app(appId) },
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
    /** Kullanıcının tüm kimlikleri: `hs_id`, varsa `external_id` ve özel alias'lar. */
    identity: (label: string, value: string, appId?: string) =>
      this.http.request<UserIdentity>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/identity`,
      }),
    /** KVKK/GDPR veri taşınabilirliği: profil, alias, abonelikler ve son olaylar (audit kaydı oluşturur). */
    export: (label: string, value: string, appId?: string) =>
      this.http.request<UserExport>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/export`,
      }),
    /** Bildirim kutusu (inbox) öğeleri. */
    inbox: {
      list: (
        label: string,
        value: string,
        params: Page & { include_archived?: boolean } = {},
        appId?: string,
      ) => {
        const { include_archived, ...page } = params;
        return this.http.request<InboxPage>({
          method: 'GET',
          path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/inbox`,
          query: { ...page, ...(include_archived !== undefined ? { include_archived: String(include_archived) } : {}) },
        });
      },
      markRead: (label: string, value: string, itemId: string, appId?: string) =>
        this.http.request<InboxItem>({
          method: 'POST',
          path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/inbox/${enc(itemId)}/read`,
        }),
      archive: (label: string, value: string, itemId: string, appId?: string) =>
        this.http.request<{ ok: true }>({
          method: 'DELETE',
          path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/inbox/${enc(itemId)}`,
        }),
    },
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
    /** Aboneliğin sahibi kullanıcının kimlikleri (kullanıcısız abonelikte 404). */
    identity: (subscriptionId: string, appId?: string) =>
      this.http.request<UserIdentity>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions/${enc(subscriptionId)}/user/identity`,
      }),
    /** Aboneliği kanal + token ile güncelle (APNs/FCM token, e-posta, E.164 telefon; token kanonik biçime getirilir). */
    updateByToken: (
      channel: Exclude<Channel, 'web_push'>,
      token: string,
      body: PatchSubscriptionInput,
      appId?: string,
    ) =>
      this.http.request<Subscription>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions/by-token/${channel}/${enc(token)}`,
        body,
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

  /** Mesaj şablonları (okuma `analytics:read`, yazma `admin`); içerik `POST /v1/notifications` ile aynı şemadır. */
  readonly templates = {
    list: (params: Page & { q?: string; channel?: Channel } = {}, appId?: string) =>
      this.http.request<TemplatePage>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/templates`,
        query: params,
      }),
    get: (templateId: string, appId?: string) =>
      this.http.request<Template>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/templates/${enc(templateId)}`,
      }),
    create: (body: CreateTemplateInput, appId?: string) =>
      this.http.request<Template>({ method: 'POST', path: `/v1/apps/${enc(this.app(appId))}/templates`, body }),
    /** `content` verilirse yeni sürüm açılır. */
    update: (templateId: string, body: UpdateTemplateInput, appId?: string) =>
      this.http.request<Template>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/templates/${enc(templateId)}`,
        body,
      }),
    delete: (templateId: string, appId?: string) =>
      this.http.request<{ ok: true }>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/templates/${enc(templateId)}`,
      }),
    versions: (templateId: string, appId?: string) =>
      this.http.request<TemplateVersionList>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/templates/${enc(templateId)}/versions`,
      }),
    render: (templateId: string, body: RenderTemplateInput, appId?: string) =>
      this.http.request<RenderPreview>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/templates/${enc(templateId)}/render`,
        body,
      }),
    /** Aynı organizasyondaki başka bir app'e kopyalar (org anahtarı gerekir); hedefte sürüm 1 olur. */
    copy: (templateId: string, body: CopyTemplateInput, appId?: string) =>
      this.http.request<Template>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/templates/${enc(templateId)}/copy`,
        body,
      }),
  };

  /** In-app mesajlar (okuma `analytics:read`, yazma/yayınlama `admin`). */
  readonly inAppMessages = {
    list: (params: Page & { status?: InAppMessage['status'] } = {}, appId?: string) =>
      this.http.request<InAppMessagePage>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/in-app-messages`,
        query: params,
      }),
    get: (messageId: string, appId?: string) =>
      this.http.request<InAppMessage>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/in-app-messages/${enc(messageId)}`,
      }),
    /** Taslak olarak oluşturulur; `setStatus(id, 'active')` ile yayınlanır. */
    create: (body: CreateInAppInput, appId?: string) =>
      this.http.request<InAppMessage>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/in-app-messages`,
        body,
      }),
    update: (messageId: string, body: UpdateInAppInput, appId?: string) =>
      this.http.request<InAppMessage>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/in-app-messages/${enc(messageId)}`,
        body,
      }),
    setStatus: (messageId: string, status: InAppStatus, appId?: string) =>
      this.http.request<InAppMessage>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/in-app-messages/${enc(messageId)}/status`,
        body: { status },
      }),
    delete: (messageId: string, appId?: string) =>
      this.http.request<{ ok: true }>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/in-app-messages/${enc(messageId)}`,
      }),
  };

  /**
   * App API anahtarları (`admin` kapsamı). Oluşturma ve rotasyonda dönen `key` yalnızca bu yanıtta görünür;
   * çağıran anahtarın kapsamından geniş anahtar oluşturulamaz.
   */
  readonly apiKeys = {
    list: (appId?: string) =>
      this.http.request<ApiKeyList>({ method: 'GET', path: `/v1/apps/${enc(this.app(appId))}/api-keys` }),
    create: (body: CreateApiKeyInput, appId?: string) =>
      this.http.request<CreatedApiKey>({ method: 'POST', path: `/v1/apps/${enc(this.app(appId))}/api-keys`, body }),
    /** Ad, kapsam veya IP/CIDR izin listesi (`ip_allowlist`, boş dizi kısıtı kaldırır). */
    update: (keyId: string, body: UpdateApiKeyInput, appId?: string) =>
      this.http.request<ApiKey>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/api-keys/${enc(keyId)}`,
        body,
      }),
    /** Aynı kimlikle yeni değer üretir; eski değer hemen geçersiz olur (401). */
    rotate: (keyId: string, appId?: string) =>
      this.http.request<CreatedApiKey>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/api-keys/${enc(keyId)}/rotate`,
      }),
    delete: (keyId: string, appId?: string) =>
      this.http.request<{ ok: true }>({
        method: 'DELETE',
        path: `/v1/apps/${enc(this.app(appId))}/api-keys/${enc(keyId)}`,
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
