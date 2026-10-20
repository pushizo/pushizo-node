import type {
  AdAccountList,
  AdAttributionReport,
  AdAttributionReportParams,
  AdAudience,
  AdAudienceList,
  AdAudienceListParams,
  AdAudienceSyncList,
  AdAudienceSyncQueued,
  AdBudgetAlertList,
  AdBudgetAlertRule,
  AdBudgetAlertRuleList,
  AdCapiConfigList,
  AdCapiDeliveryList,
  AdEntity,
  AdEntityList,
  AdLtvReport,
  AdOk,
  AdRefreshQueued,
  AdSpendReport,
  AdSpendReportParams,
  CreateAdAlertRuleInput,
  CreateAdAudienceInput,
  CreateLookalikeInput,
  QueryParams,
  SyncAdAudienceInput,
  UpdateAdAlertRuleInput,
  UpdateAdAudienceInput,
  UpdateAdCampaignInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Reklam hesapları ve reklam kitleleri (ADR-0037); kampanya raporlama, atribüsyon/LTV raporları, Conversions API
 * teslim geçmişi ve bütçe uyarıları (ADR-0038). Hesap bağlama OAuth ile dashboard'dan yapılır; API yalnızca
 * listeler. Kitleye yalnızca `ads_personalization` rızası olan kullanıcıların SHA-256 özetleri gönderilir.
 */
export function createAds(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/ads`;
  const audience = (id: string, appId?: string) => `${base(appId)}/audiences/${enc(id)}`;
  const entity = (id: string, appId?: string) => `${base(appId)}/campaigns/${enc(id)}`;
  const rule = (id: string, appId?: string) => `${base(appId)}/alert-rules/${enc(id)}`;
  return {
    /** Bağlı reklam hesapları (belirteçler dönmez). */
    listAccounts: (appId?: string) => ctx.http.request<AdAccountList>({ method: 'GET', path: `${base(appId)}/accounts` }),
    listAudiences: (params: AdAudienceListParams = {}, appId?: string) =>
      ctx.http.request<AdAudienceList>({ method: 'GET', path: `${base(appId)}/audiences`, query: params }),
    /** Segment veya journey kaynaklı kitle; ilk senkron hemen kuyruğa alınır. */
    createAudience: (body: CreateAdAudienceInput, appId?: string) =>
      ctx.http.request<AdAudience>({ method: 'POST', path: `${base(appId)}/audiences`, body }),
    getAudience: (audienceId: string, appId?: string) => ctx.http.request<AdAudience>({ method: 'GET', path: audience(audienceId, appId) }),
    updateAudience: (audienceId: string, body: UpdateAdAudienceInput, appId?: string) =>
      ctx.http.request<AdAudience>({ method: 'PATCH', path: audience(audienceId, appId), body }),
    /** `deleteOnPlatform` true ise kitle reklam platformunda da silinir. */
    deleteAudience: (audienceId: string, options: { deleteOnPlatform?: boolean } = {}, appId?: string) =>
      ctx.http.request<AdOk>({
        method: 'DELETE',
        path: audience(audienceId, appId),
        query: options.deleteOnPlatform === undefined ? undefined : { delete_on_platform: options.deleteOnPlatform ? 'true' : 'false' },
      }),
    /** Senkronu şimdi çalıştırır (`full: true` tam yeniden yükleme). */
    syncAudience: (audienceId: string, body: SyncAdAudienceInput = {}, appId?: string) =>
      ctx.http.request<AdAudienceSyncQueued>({ method: 'POST', path: `${audience(audienceId, appId)}/sync`, body }),
    listSyncs: (audienceId: string, params: { limit?: number } = {}, appId?: string) =>
      ctx.http.request<AdAudienceSyncList>({ method: 'GET', path: `${audience(audienceId, appId)}/syncs`, query: params }),
    /** Benzer kitle: ISO ülke kodu ve oran (0,01–0,20). */
    createLookalike: (audienceId: string, body: CreateLookalikeInput, appId?: string) =>
      ctx.http.request<AdAudience>({ method: 'POST', path: `${audience(audienceId, appId)}/lookalikes`, body }),
    /**
     * Kampanya, reklam seti veya reklam listesi (`level`) ve `from`–`to` aralığındaki metrikler; `parent_id`
     * ile bir kampanyanın reklam setleri ya da bir reklam setinin reklamları süzülür.
     */
    listCampaigns: (params: QueryParams<'/v1/apps/{appId}/ads/campaigns', 'get'> = {}, appId?: string) =>
      ctx.http.request<AdEntityList>({ method: 'GET', path: `${base(appId)}/campaigns`, query: params }),
    getCampaign: (entityId: string, appId?: string) => ctx.http.request<AdEntity>({ method: 'GET', path: entity(entityId, appId) }),
    /** Durum (`active`/`paused`) ve günlük bütçe değişikliği reklam platformuna da yazılır. */
    updateCampaign: (entityId: string, body: UpdateAdCampaignInput, appId?: string) =>
      ctx.http.request<AdEntity>({ method: 'PATCH', path: entity(entityId, appId), body }),
    /** Hesabın kampanyalarını ve metriklerini şimdi yeniler (202, kuyruğa alınır). */
    refreshAccount: (accountId: string, appId?: string) =>
      ctx.http.request<AdRefreshQueued>({ method: 'POST', path: `${base(appId)}/accounts/${enc(accountId)}/refresh` }),
    /** Harcama ve performans raporu (`group_by`: gün, platform, hesap, kampanya veya reklam seti). */
    spendReport: (params: AdSpendReportParams, appId?: string) =>
      ctx.http.request<AdSpendReport>({ method: 'GET', path: `${base(appId)}/reports/spend`, query: params }),
    /** Birleşik atribüsyon raporu (ROAS, CAC); `model` son/ilk tıklama, doğrusal veya zaman azalmalı. */
    attributionReport: (params: AdAttributionReportParams, appId?: string) =>
      ctx.http.request<AdAttributionReport>({ method: 'GET', path: `${base(appId)}/reports/attribution`, query: params }),
    /** Kohort LTV: ilk dönüşüm ayına göre kümülatif kullanıcı başı gelir. */
    ltvReport: (params: QueryParams<'/v1/apps/{appId}/ads/reports/ltv', 'get'> = {}, appId?: string) =>
      ctx.http.request<AdLtvReport>({ method: 'GET', path: `${base(appId)}/reports/ltv`, query: params }),
    /** Conversions API yapılandırmaları (erişim belirteçleri dönmez). */
    listCapiConfigs: (appId?: string) =>
      ctx.http.request<AdCapiConfigList>({ method: 'GET', path: `${base(appId)}/conversions-api/configs` }),
    /** Conversions API teslim geçmişi (`config_id`, `status` filtreleri). */
    listCapiDeliveries: (
      params: QueryParams<'/v1/apps/{appId}/ads/conversions-api/deliveries', 'get'> = {},
      appId?: string,
    ) => ctx.http.request<AdCapiDeliveryList>({ method: 'GET', path: `${base(appId)}/conversions-api/deliveries`, query: params }),
    listAlertRules: (appId?: string) =>
      ctx.http.request<AdBudgetAlertRuleList>({ method: 'GET', path: `${base(appId)}/alert-rules` }),
    /** Bütçe uyarı kuralı: günlük harcama, ROAS düşüşü veya bütçe tükenmesi eşiği. */
    createAlertRule: (body: CreateAdAlertRuleInput, appId?: string) =>
      ctx.http.request<AdBudgetAlertRule>({ method: 'POST', path: `${base(appId)}/alert-rules`, body }),
    updateAlertRule: (ruleId: string, body: UpdateAdAlertRuleInput, appId?: string) =>
      ctx.http.request<AdBudgetAlertRule>({ method: 'PATCH', path: rule(ruleId, appId), body }),
    deleteAlertRule: (ruleId: string, appId?: string) => ctx.http.request<AdOk>({ method: 'DELETE', path: rule(ruleId, appId) }),
    /** Tetiklenen bütçe uyarıları (`rule_id` ile süzülebilir). */
    listAlerts: (params: QueryParams<'/v1/apps/{appId}/ads/alerts', 'get'> = {}, appId?: string) =>
      ctx.http.request<AdBudgetAlertList>({ method: 'GET', path: `${base(appId)}/alerts`, query: params }),
  };
}
