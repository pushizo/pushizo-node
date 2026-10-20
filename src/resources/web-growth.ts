import type {
  CreateFormInput,
  CreateSurveyInput,
  CreateWebCampaignInput,
  Form,
  FormPage,
  FormSubmissionPage,
  FormSubmitResult,
  LandingPage,
  LandingPageList,
  QueryParams,
  SubmitFormInput,
  SubmitSurveyResponseInput,
  Survey,
  SurveyPage,
  SurveyReport,
  SurveyResponsePage,
  SurveyResponseResult,
  SurveyStatus,
  UpdateWebCampaignInput,
  WebCampaign,
  WebCampaignPage,
  WebCampaignReport,
  WebCampaignStatus,
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
    /** Sunucu tarafı yanıt; `external_id` ile kullanıcıya bağlanır. */
    respond: (surveyId: string, body: SubmitSurveyResponseInput, appId?: string) =>
      ctx.http.request<SurveyResponseResult>({ method: 'POST', path: `${one(surveyId, appId)}/responses`, body }),
  };
}

/** Landing sayfaları (ADR-0039): liste, detay ve yayın durumu. Sayfa düzenleme dashboard'dan yapılır. */
export function createLandingPages(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/landing-pages`;
  const one = (pageId: string, appId?: string) => `${base(appId)}/${enc(pageId)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/landing-pages', 'get'> = {}, appId?: string) =>
      ctx.http.request<LandingPageList>({ method: 'GET', path: base(appId), query: params }),
    get: (pageId: string, appId?: string) => ctx.http.request<LandingPage>({ method: 'GET', path: one(pageId, appId) }),
    /** Taslağı yayınlar. */
    publish: (pageId: string, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: `${one(pageId, appId)}/publish` }),
    /** Yayından kaldırır. */
    unpublish: (pageId: string, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: `${one(pageId, appId)}/unpublish` }),
  };
}
