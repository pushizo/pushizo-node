import type {
  CreateFormInput,
  CreateLandingPageInput,
  CreateSurveyInput,
  CreateWebCampaignInput,
  Form,
  FormPage,
  FormSubmissionPage,
  FormSubmitResult,
  LandingPage,
  LandingPageList,
  LandingPageVersions,
  Ok,
  JsonBody,
  QueryParams,
  SubmitFormInput,
  SubmitSurveyResponseInput,
  Survey,
  SurveyPage,
  SurveyReport,
  SurveyResponsePage,
  SurveyResponseResult,
  SurveyStatus,
  UpdateFormInput,
  UpdateLandingPageInput,
  UpdateSurveyInput,
  UpdateWebCampaignInput,
  WebCampaign,
  WebCampaignPage,
  WebCampaignReport,
  WebCampaignStatus,
  CreateWebPersonalizationInput,
  UpdateWebPersonalizationInput,
  WebPersonalization,
  WebPersonalizationPage,
  WebPersonalizationReport,
  WebPersonalizationStatus,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Web kampanyaları (pop-up, banner, slide-in; ADR-0039): taslak oluşturma, düzenleme, durum geçişi ve günlük rapor.
 * Liste cursor sayfalıdır (`paginate` ile dolaşılabilir).
 */
export function createWebCampaigns(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/web-campaigns`;
  const one = (campaignId: string, appId?: string) => `${base(appId)}/${enc(campaignId)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/web-campaigns', 'get'> = {}, appId?: string) =>
      ctx.http.request<WebCampaignPage>({ method: 'GET', path: base(appId), query: params }),
    /** Kampanya taslak olarak oluşur; yayın için `setStatus(id, 'active')`. */
    create: (body: CreateWebCampaignInput, appId?: string) =>
      ctx.http.request<WebCampaign>({ method: 'POST', path: base(appId), body }),
    /** Detay ve toplam istatistikler. */
    get: (campaignId: string, appId?: string) =>
      ctx.http.request<WebCampaign>({ method: 'GET', path: one(campaignId, appId) }),
    update: (campaignId: string, body: UpdateWebCampaignInput, appId?: string) =>
      ctx.http.request<WebCampaign>({ method: 'PATCH', path: one(campaignId, appId), body }),
    /** Son `days` günün günlük gösterim, tıklama, kapatma ve dönüşüm serisi. */
    report: (
      campaignId: string,
      params: QueryParams<'/v1/apps/{appId}/web-campaigns/{campaignId}/report', 'get'> = {},
      appId?: string,
    ) => ctx.http.request<WebCampaignReport>({ method: 'GET', path: `${one(campaignId, appId)}/report`, query: params }),
    /** Yayınla (`active`), duraklat (`paused`), arşivle (`archived`) veya taslağa al (`draft`). */
    setStatus: (campaignId: string, status: WebCampaignStatus, appId?: string) =>
      ctx.http.request<WebCampaign>({ method: 'POST', path: `${one(campaignId, appId)}/status`, body: { status } }),
    /** A/B kazananını seçer; SDK bundan sonra yalnız kazanan görünümü sunar. */
    selectWinner: (campaignId: string, variantId: string, appId?: string) =>
      ctx.http.request<WebCampaign>({ method: 'POST', path: `${one(campaignId, appId)}/winner`, body: { variant_id: variantId } }),
    /** Kampanyayı olaylarıyla birlikte siler. */
    delete: (campaignId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: one(campaignId, appId) }),
  };
}

/**
 * Web sayfası kişiselleştirme (ADR-0083): sayfa öğelerini (CSS seçici) kişiye göre değiştiren deneyimler; taslak
 * oluşturma, düzenleme, durum geçişi ve günlük maruz kalma/dönüşüm raporu. Growth+ planı gerekir.
 */
export function createWebPersonalizations(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/web-personalizations`;
  const one = (id: string, appId?: string) => `${base(appId)}/${enc(id)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/web-personalizations', 'get'> = {}, appId?: string) =>
      ctx.http.request<WebPersonalizationPage>({ method: 'GET', path: base(appId), query: params }),
    /** Deneyim taslak olarak oluşur; yayın için `setStatus(id, 'active')`. */
    create: (body: CreateWebPersonalizationInput, appId?: string) =>
      ctx.http.request<WebPersonalization>({ method: 'POST', path: base(appId), body }),
    get: (id: string, appId?: string) => ctx.http.request<WebPersonalization>({ method: 'GET', path: one(id, appId) }),
    update: (id: string, body: UpdateWebPersonalizationInput, appId?: string) =>
      ctx.http.request<WebPersonalization>({ method: 'PATCH', path: one(id, appId), body }),
    /** Son `days` günün maruz kalan ve dönüşen tekil ziyaretçi serisi. */
    report: (id: string, params: QueryParams<'/v1/apps/{appId}/web-personalizations/{personalizationId}/report', 'get'> = {}, appId?: string) =>
      ctx.http.request<WebPersonalizationReport>({ method: 'GET', path: `${one(id, appId)}/report`, query: params }),
    setStatus: (id: string, status: WebPersonalizationStatus, appId?: string) =>
      ctx.http.request<WebPersonalization>({ method: 'POST', path: `${one(id, appId)}/status`, body: { status } }),
    /** A/B kazananını seçer; SDK bundan sonra yalnız kazananın değişikliklerini uygular. */
    selectWinner: (id: string, variantId: string, appId?: string) =>
      ctx.http.request<WebPersonalization>({ method: 'POST', path: `${one(id, appId)}/winner`, body: { variant_id: variantId } }),
    /** Deneyimi olaylarıyla birlikte siler. */
    delete: (id: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: one(id, appId) }),
  };
}

/** Formlar (ADR-0039): tanım, gönderim listesi ve sunucu tarafı gönderim. */
export function createForms(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/forms`;
  const one = (formId: string, appId?: string) => `${base(appId)}/${enc(formId)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/forms', 'get'> = {}, appId?: string) =>
      ctx.http.request<FormPage>({ method: 'GET', path: base(appId), query: params }),
    create: (body: CreateFormInput, appId?: string) =>
      ctx.http.request<Form>({ method: 'POST', path: base(appId), body }),
    get: (formId: string, appId?: string) => ctx.http.request<Form>({ method: 'GET', path: one(formId, appId) }),
    update: (formId: string, body: UpdateFormInput, appId?: string) =>
      ctx.http.request<Form>({ method: 'PATCH', path: one(formId, appId), body }),
    /** Formu gönderimleriyle birlikte siler. */
    delete: (formId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: one(formId, appId) }),
    /** Gönderimler (`status`, `since` filtreleri; cursor sayfalı). */
    listSubmissions: (
      formId: string,
      params: QueryParams<'/v1/apps/{appId}/forms/{formId}/submissions', 'get'> = {},
      appId?: string,
    ) => ctx.http.request<FormSubmissionPage>({ method: 'GET', path: `${one(formId, appId)}/submissions`, query: params }),
    /** Sunucu tarafı gönderim; `external_id` verilirse o kullanıcının profili güncellenir. */
    submit: (formId: string, body: SubmitFormInput, appId?: string) =>
      ctx.http.request<FormSubmitResult>({ method: 'POST', path: `${one(formId, appId)}/submissions`, body }),
  };
}

/** Anketler (NPS, CSAT, seçmeli ve metin soruları; ADR-0039): tanım, durum, rapor ve yanıtlar. */
export function createSurveys(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/surveys`;
  const one = (surveyId: string, appId?: string) => `${base(appId)}/${enc(surveyId)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/surveys', 'get'> = {}, appId?: string) =>
      ctx.http.request<SurveyPage>({ method: 'GET', path: base(appId), query: params }),
    /** Anket taslak olarak oluşur; yanıt toplamak için `setStatus(id, 'active')`. */
    create: (body: CreateSurveyInput, appId?: string) =>
      ctx.http.request<Survey>({ method: 'POST', path: base(appId), body }),
    get: (surveyId: string, appId?: string) => ctx.http.request<Survey>({ method: 'GET', path: one(surveyId, appId) }),
    /** Anketi düzenler; bağlı in-app mesajı yenilenir. */
    update: (surveyId: string, body: UpdateSurveyInput, appId?: string) =>
      ctx.http.request<Survey>({ method: 'PATCH', path: one(surveyId, appId), body }),
    /** Anketi yanıtları ve bağlı in-app mesajıyla birlikte siler. */
    delete: (surveyId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: one(surveyId, appId) }),
    /** Etkinleştir (`active`), kapat (`closed`) veya taslağa al (`draft`). */
    setStatus: (surveyId: string, status: SurveyStatus, appId?: string) =>
      ctx.http.request<Survey>({ method: 'POST', path: `${one(surveyId, appId)}/status`, body: { status } }),
    /** NPS / CSAT raporu (son `days` gün). */
    report: (
      surveyId: string,
      params: QueryParams<'/v1/apps/{appId}/surveys/{surveyId}/report', 'get'> = {},
      appId?: string,
    ) => ctx.http.request<SurveyReport>({ method: 'GET', path: `${one(surveyId, appId)}/report`, query: params }),
    /** Yanıtlar (`nps_category`, `text_question` filtreleri; cursor sayfalı). */
    listResponses: (
      surveyId: string,
      params: QueryParams<'/v1/apps/{appId}/surveys/{surveyId}/responses', 'get'> = {},
      appId?: string,
    ) => ctx.http.request<SurveyResponsePage>({ method: 'GET', path: `${one(surveyId, appId)}/responses`, query: params }),
    /** Anketi HTML in-app mesajına dönüştürür (oluştur/güncelle); `publish: true` ile hemen yayınlar (anket aktif olmalı). */
    distributeInApp: (surveyId: string, body: JsonBody<'/v1/apps/{appId}/surveys/{surveyId}/distribute/in-app', 'post'> = {}, appId?: string) =>
      ctx.http.request<Survey>({ method: 'POST', path: `${one(surveyId, appId)}/distribute/in-app`, body }),
    /** Sunucu tarafı yanıt; `external_id` ile kullanıcıya bağlanır. */
    respond: (surveyId: string, body: SubmitSurveyResponseInput, appId?: string) =>
      ctx.http.request<SurveyResponseResult>({ method: 'POST', path: `${one(surveyId, appId)}/responses`, body }),
  };
}

/** Landing sayfaları (ADR-0039): taslak oluşturma/düzenleme, yayın durumu, yayın sürümleri, arşiv ve silme. */
export function createLandingPages(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/landing-pages`;
  const one = (pageId: string, appId?: string) => `${base(appId)}/${enc(pageId)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/landing-pages', 'get'> = {}, appId?: string) =>
      ctx.http.request<LandingPageList>({ method: 'GET', path: base(appId), query: params }),
    /** Sayfa taslak olarak oluşur; yayın için `publish(id)`. */
    create: (body: CreateLandingPageInput, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: base(appId), body }),
    get: (pageId: string, appId?: string) => ctx.http.request<LandingPage>({ method: 'GET', path: one(pageId, appId) }),
    /** Taslağı düzenler; yayındaki sürüm değişmez. */
    update: (pageId: string, body: UpdateLandingPageInput, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'PATCH', path: one(pageId, appId), body }),
    /** Taslağı yayınlar. */
    publish: (pageId: string, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: `${one(pageId, appId)}/publish` }),
    /** Yayından kaldırır. */
    unpublish: (pageId: string, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: `${one(pageId, appId)}/unpublish` }),
    /** Arşivler: yayından kalkar ve kotadan düşer. */
    archive: (pageId: string, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: `${one(pageId, appId)}/archive` }),
    /** Yayın sürümleri (en yeni önce). */
    versions: (pageId: string, appId?: string) =>
      ctx.http.request<LandingPageVersions>({ method: 'GET', path: `${one(pageId, appId)}/versions` }),
    /** Yayın sürümünü taslağa geri yükler. */
    restoreVersion: (pageId: string, version: number, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: `${one(pageId, appId)}/versions/${version}/restore` }),
    delete: (pageId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: one(pageId, appId) }),
  };
}
