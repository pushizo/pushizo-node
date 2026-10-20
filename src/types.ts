import type { PublicComponents, PublicPaths } from '@pushizo/api-client';

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
export type Channel = 'ios_push' | 'android_push' | 'hms_push' | 'web_push' | 'email' | 'sms';

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

// --- v2 Faz 18–21: dinamik içerik, veri ambarı, konuşmalar, teslim edilebilirlik, entegrasyonlar ---

export type DataFeed = Schemas['DataFeed'];
export type DataFeedList = Schemas['DataFeedList'];
export type DataFeedTestResult = Schemas['DataFeedTestResult'];
export type CreateDataFeedInput = JsonBody<'/v1/apps/{appId}/data-feeds', 'post'>;
export type UpdateDataFeedInput = JsonBody<'/v1/apps/{appId}/data-feeds/{feedId}', 'patch'>;
/** Feed testi için örnek kullanıcı (`external_id` veya `user_id`); boşsa örneksiz render edilir. */
export type TestDataFeedInput = JsonBody<'/v1/apps/{appId}/data-feeds/{feedId}/test', 'post'>;
export type ContentTable = Schemas['ContentTable'];
export type ContentTableList = Schemas['ContentTableList'];
export type ContentTableRows = Schemas['ContentTableRows'];
export type UpdateContentTableInput = JsonBody<'/v1/apps/{appId}/content-tables/{tableId}', 'patch'>;
export type WebhookPreviewInput = JsonBody<'/v1/apps/{appId}/webhooks/preview', 'post'>;
export type WebhookPreviewResult = Schemas['WebhookPreviewResult'];
export type WarehouseTables = Schemas['WarehouseTables'];
export type WarehouseConnectionResult = Schemas['WarehouseConnectionResult'];
export type WarehouseExport = Schemas['WarehouseExport'];
export type WarehouseExportList = Schemas['WarehouseExportList'];
export type WarehouseExportRun = Schemas['WarehouseExportRun'];
export type WarehouseExportRunPage = Schemas['WarehouseExportRunPage'];
export type TestWarehouseConnectionInput = JsonBody<
  '/v1/apps/{appId}/warehouse-exports/test-connection',
  'post'
>;
export type CreateWarehouseExportInput = JsonBody<'/v1/apps/{appId}/warehouse-exports', 'post'>;
export type UpdateWarehouseExportInput = JsonBody<
  '/v1/apps/{appId}/warehouse-exports/{exportId}',
  'patch'
>;
export type Conversation = Schemas['Conversation'];
export type ConversationPage = Schemas['ConversationPage'];
export type ConversationMessagePage = Schemas['ConversationMessagePage'];
export type ConversationReplyResult = Schemas['ConversationReplyResult'];
export type ConversationReplyInput = JsonBody<
  '/v1/apps/{appId}/conversations/{conversationId}/messages',
  'post'
>;
export type SmsKeyword = Schemas['SmsKeyword'];
export type SmsKeywordList = Schemas['SmsKeywordList'];
export type CreateSmsKeywordInput = JsonBody<'/v1/apps/{appId}/sms-keywords', 'post'>;
export type UpdateSmsKeywordInput = JsonBody<'/v1/apps/{appId}/sms-keywords/{keywordId}', 'patch'>;
export type WhatsAppTemplateList = Schemas['WhatsAppTemplateList'];
export type WhatsAppTemplateSync = Schemas['WhatsAppTemplateSync'];
export type EmailDeliverabilitySettings = Schemas['EmailDeliverabilitySettings'];
export type EmailAddressCheck = Schemas['EmailAddressCheck'];
export type EmailWarmupPlan = Schemas['EmailWarmupPlan'];
export type EmailWarmupPlanList = Schemas['EmailWarmupPlanList'];
export type EmailWarmupUsage = Schemas['EmailWarmupUsage'];
export type UpdateEmailDeliverabilityInput = JsonBody<'/v1/apps/{appId}/email-deliverability', 'put'>;
export type VerifyEmailAddressInput = JsonBody<
  '/v1/apps/{appId}/email-deliverability/verify-address',
  'post'
>;
export type CreateWarmupPlanInput = JsonBody<
  '/v1/apps/{appId}/email-deliverability/warmup-plans',
  'post'
>;
export type UpdateWarmupPlanInput = JsonBody<
  '/v1/apps/{appId}/email-deliverability/warmup-plans/{planId}',
  'patch'
>;
// Reklam hesapları ve kitleleri (ADR-0037)
export type AdAccount = Schemas['AdAccount'];
export type AdAccountList = Schemas['AdAccountList'];
export type AdAudience = Schemas['AdAudience'];
export type AdAudienceList = Schemas['AdAudienceList'];
export type AdAudienceSyncList = Schemas['AdAudienceSyncList'];
export type AdAudienceSyncQueued = Schemas['AdAudienceSyncQueued'];
export type AdOk = Schemas['AdOk'];
export type CreateAdAudienceInput = JsonBody<'/v1/apps/{appId}/ads/audiences', 'post'>;
export type UpdateAdAudienceInput = JsonBody<'/v1/apps/{appId}/ads/audiences/{audienceId}', 'patch'>;
export type SyncAdAudienceInput = JsonBody<'/v1/apps/{appId}/ads/audiences/{audienceId}/sync', 'post'>;
export type CreateLookalikeInput = JsonBody<'/v1/apps/{appId}/ads/audiences/{audienceId}/lookalikes', 'post'>;
export type AdAudienceListParams = NonNullable<Operation<'/v1/apps/{appId}/ads/audiences', 'get'>['parameters']['query']>;
export type ZapierMe = Schemas['ZapierMe'];
export type ZapierHook = Schemas['ZapierHook'];
export type ZapierSamples = Schemas['ZapierSamples'];
export type IntegrationOk = Schemas['IntegrationOk'];
export type ZapierSubscribeInput = JsonBody<'/v1/apps/{appId}/integrations/zapier/hooks', 'post'>;
/** Örnek veri sorgusu: `event` zorunlu, `event.received` için isteğe bağlı `event_name`. */
export type ZapierSamplesParams = NonNullable<
  Operation<'/v1/apps/{appId}/integrations/zapier/samples', 'get'>['parameters']['query']
>;
export type CreateCampaignDraftInput = Relax<
  JsonBody<'/v1/apps/{appId}/mcp/campaign-drafts', 'post'>
>;
// Canlı sohbet ve ekip gelen kutusu (Faz 25, ADR-0040)
export type ConversationTagsResult = Schemas['ConversationTagsResult'];
export type ConversationActivity = Schemas['ConversationActivity'];
export type UpdateConversationInput = JsonBody<'/v1/apps/{appId}/conversations/{conversationId}', 'patch'>;
export type AssignConversationInput = JsonBody<'/v1/apps/{appId}/conversations/{conversationId}/assign', 'post'>;
export type ConversationTagsInput = JsonBody<'/v1/apps/{appId}/conversations/{conversationId}/tags', 'post'>;
export type CannedResponse = Schemas['CannedResponse'];
export type CannedResponseList = Schemas['CannedResponseList'];
export type CreateCannedResponseInput = JsonBody<'/v1/apps/{appId}/canned-responses', 'post'>;
export type UpdateCannedResponseInput = JsonBody<'/v1/apps/{appId}/canned-responses/{cannedId}', 'patch'>;
export type InboxTeamList = Schemas['InboxTeamList'];
export type InboxAgentList = Schemas['InboxAgentList'];
export type InboxSettings = Schemas['InboxSettings'];
export type UpdateInboxSettingsInput = JsonBody<'/v1/apps/{appId}/inbox/settings', 'put'>;
export type InboxMetrics = Schemas['InboxMetrics'];
// Reklam raporlama, Conversions API ve bütçe uyarıları (Faz 23, ADR-0038)
export type AdEntity = Schemas['AdEntity'];
export type AdEntityList = Schemas['AdEntityList'];
export type AdRefreshQueued = Schemas['AdRefreshQueued'];
export type AdSpendReport = Schemas['AdSpendReport'];
export type AdAttributionReport = Schemas['AdAttributionReport'];
export type AdLtvReport = Schemas['AdLtvReport'];
export type AdCapiConfigList = Schemas['AdCapiConfigList'];
export type AdCapiDeliveryList = Schemas['AdCapiDeliveryList'];
export type AdBudgetAlertRule = Schemas['AdBudgetAlertRule'];
export type AdBudgetAlertRuleList = Schemas['AdBudgetAlertRuleList'];
export type AdBudgetAlertList = Schemas['AdBudgetAlertList'];
export type UpdateAdCampaignInput = JsonBody<'/v1/apps/{appId}/ads/campaigns/{entityId}', 'patch'>;
export type CreateAdAlertRuleInput = JsonBody<'/v1/apps/{appId}/ads/alert-rules', 'post'>;
export type UpdateAdAlertRuleInput = JsonBody<'/v1/apps/{appId}/ads/alert-rules/{ruleId}', 'patch'>;
/** Harcama raporu sorgusu: `from` ve `to` zorunlu. */
export type AdSpendReportParams = NonNullable<
  Operation<'/v1/apps/{appId}/ads/reports/spend', 'get'>['parameters']['query']
>;
/** Atribüsyon raporu sorgusu: `from` ve `to` zorunlu; `conversion_events` virgülle ayrılmış olay adları. */
export type AdAttributionReportParams = NonNullable<
  Operation<'/v1/apps/{appId}/ads/reports/attribution', 'get'>['parameters']['query']
>;
// Web büyüme: web kampanyaları, formlar, anketler ve landing sayfaları (Faz 24, ADR-0039)
export type WebCampaign = Schemas['WebCampaign'];
export type WebCampaignPage = Schemas['WebCampaignPage'];
export type WebCampaignReport = Schemas['WebCampaignReport'];
export type CreateWebCampaignInput = JsonBody<'/v1/apps/{appId}/web-campaigns', 'post'>;
export type UpdateWebCampaignInput = JsonBody<'/v1/apps/{appId}/web-campaigns/{campaignId}', 'patch'>;
export type WebCampaignStatus = JsonBody<'/v1/apps/{appId}/web-campaigns/{campaignId}/status', 'post'>['status'];
export type Form = Schemas['Form'];
export type FormPage = Schemas['FormPage'];
export type FormSubmissionPage = Schemas['FormSubmissionPage'];
export type FormSubmitResult = Schemas['FormSubmitResult'];
export type CreateFormInput = JsonBody<'/v1/apps/{appId}/forms', 'post'>;
export type SubmitFormInput = JsonBody<'/v1/apps/{appId}/forms/{formId}/submissions', 'post'>;
export type Survey = Schemas['Survey'];
export type SurveyPage = Schemas['SurveyPage'];
export type SurveyReport = Schemas['SurveyReport'];
export type SurveyResponsePage = Schemas['SurveyResponsePage'];
export type SurveyResponseResult = Schemas['SurveyResponseResult'];
export type CreateSurveyInput = JsonBody<'/v1/apps/{appId}/surveys', 'post'>;
export type SurveyStatus = JsonBody<'/v1/apps/{appId}/surveys/{surveyId}/status', 'post'>['status'];
export type SubmitSurveyResponseInput = JsonBody<'/v1/apps/{appId}/surveys/{surveyId}/responses', 'post'>;
export type LandingPage = Schemas['LandingPage'];
export type LandingPageList = Schemas['LandingPageList'];
