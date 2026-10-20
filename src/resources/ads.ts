import type {
  AdAccountList,
  AdAudience,
  AdAudienceList,
  AdAudienceListParams,
  AdAudienceSyncList,
  AdAudienceSyncQueued,
  AdOk,
  CreateAdAudienceInput,
  CreateLookalikeInput,
  SyncAdAudienceInput,
  UpdateAdAudienceInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Reklam hesapları ve reklam kitleleri (ADR-0037). Hesap bağlama OAuth ile dashboard'dan yapılır; API yalnızca
 * listeler. Kitleye yalnızca `ads_personalization` rızası olan kullanıcıların SHA-256 özetleri gönderilir.
 */
export function createAds(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/ads`;
  const audience = (id: string, appId?: string) => `${base(appId)}/audiences/${enc(id)}`;
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
  };
}
