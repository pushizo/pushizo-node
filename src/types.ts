import type { PublicComponents, PublicPaths } from '@herosignal/api-client';

/**
 * Üretilmiş OpenAPI tiplerinden (`packages/api-client/src/generated/public.d.ts`) türetilen
 * istek/yanıt tipleri. Tipler sözleşmeden okunur; elle şema kopyası tutulmaz.
 */
export type Schemas = PublicComponents['schemas'];

type Operation<P extends keyof PublicPaths, M extends keyof PublicPaths[P]> = PublicPaths[P][M];

/**
 * Üretici `Record<string, never>` ile işaretlediği serbest nesneleri (filtre AST koşulları,
 * kampanya içeriği) kullanılabilir `Record<string, unknown>` tipine gevşetir; diğer alanlar aynen kalır.
 */
export type Relax<T> = T extends readonly (infer U)[]
  ? Relax<U>[]
  : T extends object
    ? string extends keyof T
      ? [T[string & keyof T]] extends [never]
        ? Record<string, unknown>
        : { [K in keyof T]: Relax<T[K]> }
      : { [K in keyof T]: Relax<T[K]> }
    : T;

/** Sunucu varsayılanı olan alanları (OpenAPI `default`) isteğe bağlı yapar. */
export type WithDefaults<T, K extends PropertyKey> = Omit<T, K> & Partial<Pick<T, K & keyof T>>;

/** İşlemin `application/json` istek gövdesi. */
export type JsonBody<P extends keyof PublicPaths, M extends keyof PublicPaths[P]> =
  Operation<P, M> extends { requestBody?: { content: { 'application/json': infer B } } }
    ? B
    : never;

type SuccessContent<R> = R extends { 200: { content: { 'application/json': infer T } } }
  ? T
  : R extends { 201: { content: { 'application/json': infer T } } }
    ? T
    : R extends { 202: { content: { 'application/json': infer T } } }
      ? T
      : unknown;

/** İşlemin başarılı (2xx) JSON yanıt tipi. */
export type JsonResponse<P extends keyof PublicPaths, M extends keyof PublicPaths[P]> =
  Operation<P, M> extends { responses: infer R } ? SuccessContent<R> : never;

type BoolString<V> = [NonNullable<V>] extends ['true' | 'false'] ? V | boolean : V;

/**
 * İşlemin sorgu parametreleri. `"true" | "false"` alanları boolean da kabul eder; `app_id` SDK
 * tarafından (varsayılan app) yazıldığı için dışarıda bırakılır.
 */
export type QueryParams<P extends keyof PublicPaths, M extends keyof PublicPaths[P]> =
  Operation<P, M> extends { parameters: { query?: infer Q } }
    ? [NonNullable<Q>] extends [never]
      ? Record<string, never>
      : { [K in Exclude<keyof NonNullable<Q>, 'app_id'>]?: BoolString<NonNullable<Q>[K]> }
    : Record<string, never>;

/** Cursor sayfalama zarfı (`data`, `next_cursor`, `has_more`). */
export interface CursorPage<T> {
  data: T[];
  next_cursor?: string | null;
  has_more?: boolean;
}

// --- Yanıt modelleri --------------------------------------------------------------------------

export type Message = Schemas['Message'];
export type MessageList = Schemas['MessageList'];
export type CreateNotificationResult = Schemas['CreateNotificationResult'];
export type Delivery = Schemas['Delivery'];
export type DeliveryList = Schemas['DeliveryList'];
export type User = Schemas['User'];
export type UserDetail = Schemas['UserDetail'];
export type UserList = Schemas['UserList'];
export type UserIdentity = Schemas['UserIdentity'];
export type UserExport = Schemas['UserExport'];
export type Subscription = Schemas['Subscription'];
export type Org = Schemas['Org'];
export type MemberList = Schemas['MemberList'];
export type AuditPage = Schemas['AuditPage'];
export type App = Schemas['App'];
export type AppList = Schemas['AppList'];
export type ApiKey = Schemas['ApiKey'];
export type ApiKeyList = Schemas['ApiKeyList'];
export type CreatedApiKey = Schemas['CreatedApiKey'];
export type ChannelConfig = Schemas['ChannelConfig'];
export type ChannelList = Schemas['ChannelList'];
export type ChannelValidation = Schemas['ChannelValidation'];
export type EventsAccepted = Schemas['EventsAccepted'];
export type EventDefinition = Schemas['EventDefinition'];
export type EventDefinitionList = Schemas['EventDefinitionList'];
export type EventDefinitionDetail = Schemas['EventDefinitionDetail'];
export type ExportJob = Schemas['Export'];
export type ExportList = Schemas['ExportList'];
export type ImportJob = Schemas['Import'];
export type ImportList = Schemas['ImportList'];
export type EstimateAudienceResult = Schemas['EstimateAudienceResult'];
export type Segment = Schemas['Segment'];
export type SegmentPage = Schemas['SegmentPage'];
export type SegmentPreview = Schemas['SegmentPreview'];
export type SegmentCampaigns = Schemas['SegmentCampaigns'];
export type SegmentEstimate = Schemas['SegmentEstimate'];
export type Template = Schemas['Template'];
export type TemplatePage = Schemas['TemplatePage'];
export type TemplateVersionList = Schemas['TemplateVersionList'];
export type TemplateStats = Schemas['TemplateStats'];
export type RenderPreview = Schemas['RenderPreview'];
export type Campaign = Schemas['Campaign'];
export type CampaignPage = Schemas['CampaignPage'];
export type CampaignStats = Schemas['CampaignStats'];
export type CampaignVariantStats = Schemas['CampaignVariantStats'];
export type Journey = Schemas['Journey'];
export type JourneyPage = Schemas['JourneyPage'];
export type JourneyDetail = Schemas['JourneyDetail'];
export type JourneyVersionList = Schemas['JourneyVersionList'];
export type JourneyPublishResult = Schemas['JourneyPublishResult'];
export type JourneyRun = Schemas['JourneyRun'];
export type JourneyRunPage = Schemas['JourneyRunPage'];
export type JourneyRunDetail = Schemas['JourneyRunDetail'];
export type JourneyTriggerResult = Schemas['JourneyTriggerResult'];
export type JourneyStats = Schemas['JourneyStats'];
export type UserJourneyRuns = Schemas['UserJourneyRuns'];
export type InAppMessage = Schemas['InAppMessage'];
export type InAppMessagePage = Schemas['InAppMessagePage'];
export type InboxItem = Schemas['InboxItem'];
export type InboxPage = Schemas['InboxPage'];
export type InboxReadAllResult = Schemas['InboxReadAllResult'];
export type OverviewStats = Schemas['OverviewStats'];
export type MessagesReport = Schemas['MessagesReport'];
export type SubscriptionsReport = Schemas['SubscriptionsReport'];
export type EventsReport = Schemas['EventsReport'];
export type ConversionsReport = Schemas['ConversionsReport'];
export type FunnelReport = Schemas['FunnelReport'];
export type ProvidersReport = Schemas['ProvidersReport'];
export type EngagementReport = Schemas['EngagementReport'];
export type RetentionReport = Schemas['RetentionReport'];
export type UsageReport = Schemas['UsageReport'];
export type MessageCategory = Schemas['MessageCategory'];
export type MessageCategoryList = Schemas['MessageCategoryList'];
export type UserPreferences = Schemas['UserPreferences'];
export type Webhook = Schemas['Webhook'];
export type WebhookList = Schemas['WebhookList'];
export type WebhookWithSecret = Schemas['WebhookWithSecret'];
export type WebhookDeliveryPage = Schemas['WebhookDeliveryPage'];
export type WebhookDeliveryDetail = Schemas['WebhookDeliveryDetail'];
export type Suppression = Schemas['Suppression'];
export type SuppressionPage = Schemas['SuppressionPage'];
export type Ok = Schemas['Ok'];
export type SuppressionChannel = Suppression['channel'];
export type SuppressionReason = Suppression['reason'];
export type Channel = 'ios_push' | 'android_push' | 'web_push' | 'email' | 'sms';

// --- İstek gövdeleri --------------------------------------------------------------------------

export type CreateNotificationInput = JsonBody<'/v1/notifications', 'post'>;
export type EstimateAudienceInput = Relax<JsonBody<'/v1/notifications/estimate', 'post'>>;
export type CreateAppInput = WithDefaults<
  JsonBody<'/v1/apps', 'post'>,
  'platform_flags' | 'default_language' | 'timezone'
>;
export type UpdateAppInput = JsonBody<'/v1/apps/{appId}', 'patch'>;
export type CreateApiKeyInput = WithDefaults<
  JsonBody<'/v1/apps/{appId}/api-keys', 'post'>,
  'environment'
>;
export type UpdateApiKeyInput = JsonBody<'/v1/apps/{appId}/api-keys/{keyId}', 'patch'>;
export type IdentityKey = Schemas['IdentityKey'];
export type IdentityKeyList = Schemas['IdentityKeyList'];
export type CreateIdentityKeyInput = Relax<JsonBody<'/v1/apps/{appId}/identity-keys', 'post'>>;
export type LiveActivityType = Schemas['LiveActivityType'];
export type LiveActivityTypeList = Schemas['LiveActivityTypeList'];
export type LiveActivitySendResult = Schemas['LiveActivitySendResult'];
export type CreateLiveActivityTypeInput = Relax<JsonBody<'/v1/apps/{appId}/live-activities/types', 'post'>>;
export type UpdateLiveActivityTypeInput = Relax<JsonBody<'/v1/apps/{appId}/live-activities/types/{activityType}', 'patch'>>;
export type StartLiveActivityInput = Relax<JsonBody<'/v1/apps/{appId}/live-activities/{activityType}/start', 'post'>>;
export type UpdateLiveActivityInput = Relax<JsonBody<'/v1/apps/{appId}/live-activities/{activityType}/update', 'post'>>;
export type EndLiveActivityInput = Relax<JsonBody<'/v1/apps/{appId}/live-activities/{activityType}/end', 'post'>>;
export type UpsertUserInput = JsonBody<'/v1/apps/{appId}/users', 'post'>;
export type SearchUsersInput = WithDefaults<
  Relax<JsonBody<'/v1/apps/{appId}/users/search', 'post'>>,
  'limit'
>;
export type PatchUserInput = JsonBody<'/v1/apps/{appId}/users/by/{label}/{value}', 'patch'>;
/** `device` sunucu varsayılanına sahiptir (e-posta/SMS aboneliklerinde gerekmez). */
export type AddSubscriptionInput = WithDefaults<
  JsonBody<'/v1/apps/{appId}/users/by/{label}/{value}/subscriptions', 'post'>,
  'device'
>;
export type PatchSubscriptionInput = JsonBody<
  '/v1/apps/{appId}/subscriptions/{subscriptionId}',
  'patch'
>;
type RawSendEventsInput = JsonBody<'/v1/apps/{appId}/events', 'post'>;
/** Olay girdisi; `properties` sunucuda varsayılan `{}` alır. */
export type EventInput = WithDefaults<RawSendEventsInput['events'][number], 'properties'>;
export type SendEventsInput = Omit<RawSendEventsInput, 'events'> & { events: EventInput[] };
export type PatchEventDefinitionInput = JsonBody<
  '/v1/apps/{appId}/events/definitions/{name}',
  'patch'
>;
export type UpsertChannelInput = JsonBody<'/v1/apps/{appId}/channels/{channel}', 'put'>;
export type CreateSuppressionInput = JsonBody<'/v1/apps/{appId}/suppressions', 'post'>;
export type CreateWebhookInput = JsonBody<'/v1/apps/{appId}/webhooks', 'post'>;
export type UpdateWebhookInput = JsonBody<'/v1/apps/{appId}/webhooks/{webhookId}', 'patch'>;
export type CreateSegmentInput = Relax<JsonBody<'/v1/apps/{appId}/segments', 'post'>>;
export type PreviewSegmentInput = Relax<JsonBody<'/v1/apps/{appId}/segments/preview', 'post'>>;
export type UpdateSegmentInput = Relax<JsonBody<'/v1/apps/{appId}/segments/{segmentId}', 'patch'>>;
export type CreateTemplateInput = Relax<JsonBody<'/v1/apps/{appId}/templates', 'post'>>;
export type UpdateTemplateInput = Relax<
  JsonBody<'/v1/apps/{appId}/templates/{templateId}', 'patch'>
>;
export type CopyTemplateInput = JsonBody<
  '/v1/apps/{appId}/templates/{templateId}/copy_to_app',
  'post'
>;
export type RenderTemplateInput = WithDefaults<
  Relax<JsonBody<'/v1/apps/{appId}/templates/{templateId}/render', 'post'>>,
  'channel'
>;
export type CreateCampaignInput = Relax<JsonBody<'/v1/apps/{appId}/campaigns', 'post'>>;
export type UpdateCampaignInput = Relax<
  JsonBody<'/v1/apps/{appId}/campaigns/{campaignId}', 'patch'>
>;
export type SelectWinnerInput = JsonBody<'/v1/apps/{appId}/campaigns/{campaignId}/winner', 'post'>;
export type CreateCategoryInput = Relax<JsonBody<'/v1/apps/{appId}/categories', 'post'>>;
export type UpdateCategoryInput = Relax<
  JsonBody<'/v1/apps/{appId}/categories/{categoryId}', 'patch'>
>;
export type SetPreferencesInput = JsonBody<
  '/v1/apps/{appId}/users/by/{label}/{value}/preferences',
  'put'
>;
export type ScheduleCampaignInput = JsonBody<
  '/v1/apps/{appId}/campaigns/{campaignId}/schedule',
  'post'
>;
export type CreateJourneyInput = Relax<JsonBody<'/v1/apps/{appId}/journeys', 'post'>>;
export type UpdateJourneyInput = JsonBody<'/v1/apps/{appId}/journeys/{journeyId}', 'patch'>;
export type SaveJourneyDraftInput = Relax<
  JsonBody<'/v1/apps/{appId}/journeys/{journeyId}/draft', 'put'>
>;
export type UpdateJourneyNodeInput = Relax<
  JsonBody<'/v1/apps/{appId}/journeys/{journeyId}/nodes/{nodeId}', 'patch'>
>;
/** Kullanıcı `external_id`, `user_id` veya `alias` ile seçilir; `context` journey değişkenleridir. */
export type TriggerJourneyRunInput = Relax<
  JsonBody<'/v1/apps/{appId}/journeys/{journeyId}/runs', 'post'>
>;
export type CreateInAppMessageInput = Relax<JsonBody<'/v1/apps/{appId}/in-app-messages', 'post'>>;
export type UpdateInAppMessageInput = Relax<
  JsonBody<'/v1/apps/{appId}/in-app-messages/{messageId}', 'patch'>
>;
export type InAppMessageStatus = JsonBody<
  '/v1/apps/{appId}/in-app-messages/{messageId}/status',
  'post'
>['status'];
export type FunnelInput = WithDefaults<
  JsonBody<'/v1/apps/{appId}/analytics/funnels', 'post'>,
  'window_hours' | 'compare' | 'format'
>;
export type CreateExportInput = WithDefaults<
  JsonBody<'/v1/apps/{appId}/exports', 'post'>,
  'filters'
>;
export type ImportType = 'onesignal_players' | 'csv_users';
