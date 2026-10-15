import type {
  Campaign,
  CreateCampaignDraftInput,
  CreateSegmentInput,
  IntegrationOk,
  Segment,
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
 * MCP onaylı mod yazma uçları (`mcp:write`): kayıtlar her zaman taslak oluşur; kampanya gönderilmez veya
 * zamanlanmaz, segment dinamik olarak kaydedilir.
 */
export function createMcpDrafts(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/mcp`;
  return {
    /** `send_at` yok sayılır; kampanyaya `mcp` etiketi eklenir. */
    createCampaignDraft: (body: CreateCampaignDraftInput, appId?: string) =>
      ctx.http.request<Campaign>({ method: 'POST', path: `${base(appId)}/campaign-drafts`, body }),
    createSegmentDraft: (body: CreateSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({ method: 'POST', path: `${base(appId)}/segment-drafts`, body }),
  };
}
