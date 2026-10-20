import { createHmac, randomUUID } from 'node:crypto';
import { HttpClient, type HttpOptions } from './http.js';
import { createAds } from './resources/ads.js';
import { createAnalytics } from './resources/analytics.js';
import { createApiKeys } from './resources/api-keys.js';
import { createIdentityKeys, createIdentityToken, type IdentityTokenOptions } from './resources/identity-keys.js';
import { createLiveActivities } from './resources/live-activities.js';
import { createCampaigns } from './resources/campaigns.js';
import type { ResourceContext } from './resources/context.js';
import { createConversations, createSmsKeywords, createWhatsAppTemplates } from './resources/conversations.js';
import { createExports, createImports } from './resources/data-transfer.js';
import { createContentTables, createDataFeeds } from './resources/dynamic-content.js';
import { createEmailDeliverability } from './resources/email-deliverability.js';
import { createInAppMessages } from './resources/in-app-messages.js';
import { createInbox } from './resources/inbox.js';
import { createMcpDrafts, createZapier } from './resources/integrations.js';
import { createJourneys } from './resources/journeys.js';
import { createPreferences } from './resources/preferences.js';
import { createSegments } from './resources/segments.js';
import { createTemplates } from './resources/templates.js';
import { createWarehouseExports } from './resources/warehouse-exports.js';
import { createForms, createLandingPages, createSurveys, createWebCampaigns } from './resources/web-growth.js';
import type {
  AddSubscriptionInput,
  App,
  AppList,
  AuditPage,
  Channel,
  ChannelConfig,
  ChannelValidation,
  CreateAppInput,
  CreateNotificationInput,
  CreateNotificationResult,
  CreateSuppressionInput,
  CreateWebhookInput,
  CursorPage,
  Delivery,
  DeliveryList,
  EstimateAudienceInput,
  EstimateAudienceResult,
  EventDefinition,
  EventDefinitionDetail,
  EventDefinitionList,
  EventsAccepted,
  ExportJob,
  MemberList,
  Message,
  MessageList,
  Org,
  PatchEventDefinitionInput,
  PatchSubscriptionInput,
  PatchUserInput,
  QueryParams,
  SearchUsersInput,
  SendEventsInput,
  Subscription,
  Suppression,
  SuppressionChannel,
  SuppressionPage,
  SuppressionReason,
  UpdateAppInput,
  UpdateWebhookInput,
  UpsertChannelInput,
  UpsertUserInput,
  UserDetail,
  UserExport,
  UserIdentity,
  UserList,
  Webhook,
  WebhookDeliveryDetail,
  WebhookDeliveryPage,
  WebhookPreviewInput,
  WebhookPreviewResult,
  WebhookWithSecret,
  UsageReport,
} from './types.js';

export { PushizoError } from './errors.js';
export * from './webhooks.js';
export * from './types.js';
export type { CreateImportInput, ImportFile } from './resources/data-transfer.js';
export type {
  CreateContentTableInput,
  ReplaceContentTableRowsInput,
} from './resources/dynamic-content.js';
export { createIdentityToken, type IdentityTokenOptions } from './resources/identity-keys.js';

/** `subscriptions.updateByToken` için token türü: Pushizo kanal adı veya OneSignal karşılığı. */
export type SubscriptionTokenType =
  | Channel
  | 'iOSPush'
  | 'AndroidPush'
  | 'ChromePush'
  | 'FirefoxPush'
  | 'SafariPush'
  | 'Email'
  | 'SMS';

export interface PushizoOptions extends Omit<HttpOptions, 'baseUrl'> {
  /** Varsayılan: https://api.pushizo.com; yerel geliştirmede http://localhost:4000 */
  baseUrl?: string;
  /** Çağrılarda `appId` verilmezse kullanılacak varsayılan app. */
  appId?: string;
  /**
   * `notifications.create` ve `users.upsert` için idempotency anahtarı verilmemişse otomatik UUID
   * üret (varsayılan true).
   */
  autoIdempotencyKey?: boolean;
}

interface Page {
  limit?: number;
  cursor?: string;
}

/** Tek istek için seçenekler. */
export interface RequestOptions {
  /** `Idempotency-Key` başlığı (24 saat içinde aynı anahtarla tekrarlanan istek aynı yanıtı döner). */
  idempotencyKey?: string;
}

const enc = encodeURIComponent;

/**
 * Pushizo sunucu SDK'sı (Node.js ≥ 20, yerleşik fetch).
 *
 * ```ts
 * const hs = new Pushizo({ apiKey: process.env.HS_API_KEY!, appId: 'app_…' });
 * await hs.notifications.create({ idempotencyKey: `order-${id}`, target: { include_aliases: { external_id: [userId] } }, contents: { en: 'Shipped' } });
 * ```
 */
export class Pushizo {
  private readonly http: HttpClient;
  private readonly defaultAppId: string | undefined;
  private readonly autoIdempotencyKey: boolean;

  constructor(options: PushizoOptions) {
    const { baseUrl, appId, autoIdempotencyKey, ...http } = options;
    this.http = new HttpClient({ ...http, baseUrl: baseUrl ?? 'https://api.pushizo.com' });
    this.defaultAppId = appId;
    this.autoIdempotencyKey = autoIdempotencyKey ?? true;
  }

  /** SDK identity verification için `identity_hash` = HMAC-SHA256(sdk_secret, external_id). */
  static identityHash(sdkSecret: string, externalId: string): string {
    return createHmac('sha256', sdkSecret).update(externalId, 'utf8').digest('hex');
  }

  /** SDK JWT identity verification belirteci (ES256; `sub` = external_id, `aud` = app_id). */
  static identityToken(options: IdentityTokenOptions): string {
    return createIdentityToken(options);
  }

  private app(appId?: string): string {
    const id = appId ?? this.defaultAppId;
    if (!id) throw new Error('Pushizo: appId verilmedi (seçenek veya çağrı parametresi).');
    return id;
  }

  /** Ayrı modüllerdeki kaynak gruplarına verilen bağlam; alanlar çağrı anında okunur. */
  private resourceContext(): ResourceContext {
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- getter'lar istemciye geç bağlanır
    const client = this;
    return {
      get http() {
        return client.http;
      },
      get autoIdempotencyKey() {
        return client.autoIdempotencyKey;
      },
      app: (appId) => client.app(appId),
      appPath: (appId) => `/v1/apps/${enc(client.app(appId))}`,
    };
  }

  /**
   * Cursor sayfalı herhangi bir liste çağrısını öğe öğe dolaşır.
   *
   * ```ts
   * for await (const t of hs.paginate((cursor) => hs.templates.list({ cursor, limit: 100 }))) { … }
   * ```
   */
  async *paginate<T>(
    fetchPage: (cursor: string | undefined) => Promise<CursorPage<T>>,
    cursor?: string,
  ): AsyncGenerator<T, void, undefined> {
    let next = cursor;
    for (;;) {
      const page = await fetchPage(next);
      for (const item of page.data ?? []) yield item;
      if (!page.has_more || !page.next_cursor) return;
      next = page.next_cursor;
    }
  }

  /** Org geneli admin anahtarı gerektirir. */
  readonly organization = {
    get: () => this.http.request<Org>({ method: 'GET', path: '/v1/organization' }),
    members: () =>
      this.http.request<MemberList>({ method: 'GET', path: '/v1/organization/members' }),
    /** Audit log; `action`, `actor_id`, `app_id`, `from`/`to` filtreleri ve cursor. */
    auditLogs: (
      params: QueryParams<'/v1/organization/audit-logs', 'get'> & { app_id?: string } = {},
    ) =>
      this.http.request<AuditPage>({
        method: 'GET',
        path: '/v1/organization/audit-logs',
        query: params,
      }),
    /** Organizasyon kullanımı ve plan kotaları (org geneli `analytics:read`/`admin` anahtarı). */
    usage: (params: QueryParams<'/v1/organization/usage', 'get'> = {}) =>
      this.http.request<UsageReport>({
        method: 'GET',
        path: '/v1/organization/usage',
        query: params,
      }),
  };

  readonly apps = {
    list: () => this.http.request<AppList>({ method: 'GET', path: '/v1/apps' }),
    /** Org geneli admin anahtarı gerektirir. */
    create: (body: CreateAppInput) =>
      this.http.request<App>({ method: 'POST', path: '/v1/apps', body }),
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
        sort?: 'created_at' | '-created_at';
      } = {},
      appId?: string,
    ) =>
      this.http.request<MessageList>({
        method: 'GET',
        path: '/v1/notifications',
        query: { app_id: this.app(appId), ...params },
      }),
    /** Kaydedilmemiş hedef için alıcı sayısı (gönderim yapmaz). */
    estimate: (input: Omit<EstimateAudienceInput, 'app_id'> & { appId?: string }) => {
      const { appId, ...rest } = input;
      return this.http.request<EstimateAudienceResult>({
        method: 'POST',
        path: '/v1/notifications/estimate',
        body: { ...rest, app_id: this.app(appId) },
      });
    },
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
    /** Mesaj olayları (gönderildi/teslim/açıldı/tıklandı/bounce…) CSV dışa aktarma işi (202). */
    exportEvents: (messageId: string, appId?: string) =>
      this.http.request<ExportJob>({
        method: 'POST',
        path: `/v1/notifications/${enc(messageId)}/export_events`,
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
    list: (params: QueryParams<'/v1/apps/{appId}/users', 'get'> = {}, appId?: string) =>
      this.http.request<UserList>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/users`,
        query: params,
      }),
    /** Oluştur/güncelle; `Idempotency-Key` verilmezse (ve `autoIdempotencyKey` açıksa) UUID üretilir. */
    upsert: (body: UpsertUserInput, appId?: string, options: RequestOptions = {}) =>
      this.http.request<UserDetail>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/users`,
        body,
        idempotencyKey:
          options.idempotencyKey ?? (this.autoIdempotencyKey ? randomUUID() : undefined),
      }),
    /** Segment tanımı (filtre AST'si) ile kullanıcı arama. */
    search: (body: SearchUsersInput, appId?: string) =>
      this.http.request<UserList>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/users/search`,
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
    /** Kullanıcının tüm kimlikleri (hs_id, external_id, özel alias'lar). */
    getIdentity: (label: string, value: string, appId?: string) =>
      this.http.request<UserIdentity>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/identity`,
      }),
    /** KVKK/GDPR veri taşınabilirliği: profil, alias, abonelik ve son olaylar. */
    export: (label: string, value: string, appId?: string) =>
      this.http.request<UserExport>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/users/by/${enc(label)}/${enc(value)}/export`,
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
    /** Aboneliğin sahibi kullanıcının kimlikleri. */
    getUserIdentity: (subscriptionId: string, appId?: string) =>
      this.http.request<UserIdentity>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions/${enc(subscriptionId)}/user/identity`,
      }),
    /** Abonelik kimliği yerine token ile güncelle (OneSignal token türü adları da kabul edilir). */
    updateByToken: (
      tokenType: SubscriptionTokenType,
      token: string,
      body: PatchSubscriptionInput,
      appId?: string,
    ) =>
      this.http.request<Subscription>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/subscriptions_by_token/${enc(tokenType)}/${enc(token)}`,
        body,
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
    listDefinitions: (appId?: string) =>
      this.http.request<EventDefinitionList>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/events/definitions`,
      }),
    getDefinition: (name: string, appId?: string) =>
      this.http.request<EventDefinitionDetail>({
        method: 'GET',
        path: `/v1/apps/${enc(this.app(appId))}/events/definitions/${enc(name)}`,
      }),
    /** Görünen ad ve dönüşüm işareti (`is_conversion`). */
    updateDefinition: (name: string, body: PatchEventDefinitionInput, appId?: string) =>
      this.http.request<EventDefinition>({
        method: 'PATCH',
        path: `/v1/apps/${enc(this.app(appId))}/events/definitions/${enc(name)}`,
        body,
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
    /** Gövde şablonu ve filtreleri örnek olay verisiyle dener (gönderim yapmaz). */
    preview: (body: WebhookPreviewInput, appId?: string) =>
      this.http.request<WebhookPreviewResult>({
        method: 'POST',
        path: `/v1/apps/${enc(this.app(appId))}/webhooks/preview`,
        body,
      }),
  };

  /** Segmentler: liste, CRUD, önizleme, tahmini sayım ve kullanan kampanyalar. */
  readonly segments = createSegments(this.resourceContext());
  /** Şablonlar: CRUD, sürümler, render önizlemesi ve app'ler arası kopyalama. */
  readonly templates = createTemplates(this.resourceContext());
  /** Kampanyalar: CRUD, yaşam döngüsü, istatistik, teslimat ve mesajlar. */
  readonly campaigns = createCampaigns(this.resourceContext());
  /** Journey'ler: taslak graf, yayın/sürümler, yaşam döngüsü, istatistik ve çalıştırmalar. */
  readonly journeys = createJourneys(this.resourceContext());
  /** Uygulama içi mesajlar. */
  readonly inAppMessages = createInAppMessages(this.resourceContext());
  /** Mesaj kategorileri ve kullanıcı tercihleri (tercih merkezi). */
  readonly preferences = createPreferences(this.resourceContext());
  /** Kullanıcı bildirim kutusu (alias ile) ve ekip gelen kutusu yönetimi (hazır yanıtlar, takımlar, ayarlar). */
  readonly inbox = createInbox(this.resourceContext());
  /** Analitik raporları (JSON veya `format: 'csv'`). */
  readonly analytics = createAnalytics(this.resourceContext());
  /** Dışa aktarma işleri. */
  readonly exports = createExports(this.resourceContext());
  /** İçe aktarma işleri (multipart CSV). */
  readonly imports = createImports(this.resourceContext());
  /** App API anahtarları. */
  readonly apiKeys = createApiKeys(this.resourceContext());
  /** SDK JWT identity verification genel anahtarları. */
  readonly identityKeys = createIdentityKeys(this.resourceContext());
  /** iOS Live Activities: türler ve start/update/end. */
  readonly liveActivities = createLiveActivities(this.resourceContext());
  /** Veri feed'leri: gönderim anında çağrılan harici HTTP kaynakları. */
  readonly dataFeeds = createDataFeeds(this.resourceContext());
  /** İçerik tabloları: CSV ile yüklenen, şablonda `lookup` ile okunan tablolar. */
  readonly contentTables = createContentTables(this.resourceContext());
  /** Veri ambarı dışa aktarımları (BigQuery, Snowflake, S3 Parquet). */
  readonly warehouseExports = createWarehouseExports(this.resourceContext());
  /** İki yönlü konuşmalar (SMS, WhatsApp, RCS). */
  readonly conversations = createConversations(this.resourceContext());
  /** Gelen mesaj anahtar kelimeleri. */
  readonly smsKeywords = createSmsKeywords(this.resourceContext());
  /** WhatsApp Business şablonları. */
  readonly whatsappTemplates = createWhatsAppTemplates(this.resourceContext());
  /** E-posta teslim edilebilirliği ve ısınma planları. */
  readonly emailDeliverability = createEmailDeliverability(this.resourceContext());
  /** Zapier REST Hook entegrasyonu. */
  readonly zapier = createZapier(this.resourceContext());
  /** MCP onaylı mod: kampanya ve segment taslakları. */
  readonly mcp = createMcpDrafts(this.resourceContext());
  /** Reklam hesapları, kitleler (ADR-0037), kampanya raporlama, atribüsyon ve bütçe uyarıları (ADR-0038). */
  readonly ads = createAds(this.resourceContext());
  /** Web kampanyaları: pop-up/banner/slide-in, durum geçişi ve günlük rapor (ADR-0039). */
  readonly webCampaigns = createWebCampaigns(this.resourceContext());
  /** Formlar: tanım, gönderimler ve sunucu tarafı gönderim. */
  readonly forms = createForms(this.resourceContext());
  /** Anketler: NPS/CSAT raporu, yanıtlar ve sunucu tarafı yanıt. */
  readonly surveys = createSurveys(this.resourceContext());
  /** Landing sayfaları: liste, detay, yayınla/yayından kaldır. */
  readonly landingPages = createLandingPages(this.resourceContext());
}

export default Pushizo;
