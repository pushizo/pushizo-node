import type {
  Campaign,
  CreateCampaignDraftInput,
  CreateInAppDraftInput,
  CreateJourneyDraftInput,
  CreateLandingPageInput,
  CreateNotificationResult,
  CreateSegmentInput,
  CreateSurveyInput,
  CreateTemplateDraftInput,
  CreateWebCampaignInput,
  CreateWebPersonalizationInput,
  InAppMessage,
  IntegrationOk,
  JourneyDetail,
  LandingPage,
  McpTestSendInput,
  Segment,
  Survey,
  Template,
  WebCampaign,
  WebPersonalization,
  ZapierHook,
  ZapierMe,
  ZapierSamples,
  ZapierSamplesParams,
  ZapierSubscribeInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Zapier REST Hook entegrasyonu: bağlantı testi, tetikleyici aboneliği ve örnek veri. */
export function createZapier(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/integrations/zapier`;
  return {
    /** API anahtarının bağlı olduğu app (Zapier bağlantı testi). */
    me: (appId?: string) => ctx.http.request<ZapierMe>({ method: 'GET', path: `${base(appId)}/me` }),
    /** `target_url` adresine olay aboneliği açar. */
    subscribe: (body: ZapierSubscribeInput, appId?: string) =>
      ctx.http.request<ZapierHook>({ method: 'POST', path: `${base(appId)}/hooks`, body }),
    unsubscribe: (hookId: string, appId?: string) =>
      ctx.http.request<IntegrationOk>({
        method: 'DELETE',
        path: `${base(appId)}/hooks/${enc(hookId)}`,
      }),
    /** Tetikleyici alan eşlemesi için örnek kayıtlar. */
    samples: (params: ZapierSamplesParams, appId?: string) =>
      ctx.http.request<ZapierSamples>({
        method: 'GET',
        path: `${base(appId)}/samples`,
        query: params,
      }),
  };
}

/**
 * MCP onaylı mod yazma uçları (`mcp:write`): taslaklar gönderilmez, zamanlanmaz ve yayımlanmaz.
 * `sendTest` yalnızca test cihazlarına gider.
 */
export function createMcpDrafts(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/mcp`;
  return {
    /** `send_at` yok sayılır; kampanyaya `mcp` etiketi eklenir. */
    createCampaignDraft: (body: CreateCampaignDraftInput, appId?: string) =>
      ctx.http.request<Campaign>({ method: 'POST', path: `${base(appId)}/campaign-drafts`, body }),
    createSegmentDraft: (body: CreateSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({ method: 'POST', path: `${base(appId)}/segment-drafts`, body }),
    /** Şablona `mcp` etiketi eklenir; şablon tek başına gönderilmez. */
    createTemplateDraft: (body: CreateTemplateDraftInput, appId?: string) =>
      ctx.http.request<Template>({ method: 'POST', path: `${base(appId)}/template-drafts`, body }),
    /** Journey `draft` oluşur; yayımlanmaz. */
    createJourneyDraft: (body: CreateJourneyDraftInput, appId?: string) =>
      ctx.http.request<JourneyDetail>({ method: 'POST', path: `${base(appId)}/journey-drafts`, body }),
    /** In-app mesaj `draft` oluşur; etkinleştirilmez. */
    createInAppDraft: (body: CreateInAppDraftInput, appId?: string) =>
      ctx.http.request<InAppMessage>({ method: 'POST', path: `${base(appId)}/in-app-drafts`, body }),
    /** Web kampanyası `draft` oluşur; yayımlanmaz. */
    createWebCampaignDraft: (body: CreateWebCampaignInput, appId?: string) =>
      ctx.http.request<WebCampaign>({ method: 'POST', path: `${base(appId)}/web-campaign-drafts`, body }),
    /** Web kişiselleştirme deneyimi `draft` oluşur; yayımlanmaz (Growth+). */
    createWebPersonalizationDraft: (body: CreateWebPersonalizationInput, appId?: string) =>
      ctx.http.request<WebPersonalization>({ method: 'POST', path: `${base(appId)}/web-personalization-drafts`, body }),
    /** Anket `draft` oluşur; etkinleştirilmez. */
    createSurveyDraft: (body: CreateSurveyInput, appId?: string) =>
      ctx.http.request<Survey>({ method: 'POST', path: `${base(appId)}/survey-drafts`, body }),
    /** Landing sayfası `draft` oluşur; yayımlanmaz. */
    createLandingPageDraft: (body: CreateLandingPageInput, appId?: string) =>
      ctx.http.request<LandingPage>({ method: 'POST', path: `${base(appId)}/landing-page-drafts`, body }),
    /** Yalnızca test cihazları. Seçilen abonelikler test cihazı değilse API 403 döner. */
    sendTest: (body: McpTestSendInput, appId?: string) =>
      ctx.http.request<CreateNotificationResult>({ method: 'POST', path: `${base(appId)}/test-sends`, body }),
  };
}
