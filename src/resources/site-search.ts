import type {
  CreateSiteSearchSourceInput,
  PutSiteSearchDocumentInput,
  QueryParams,
  SiteSearchCrawlRequest,
  SiteSearchDocumentPage,
  SiteSearchDocumentResult,
  SiteSearchOverview,
  SiteSearchReport,
  SiteSearchSource,
  SiteSearchSourceList,
  UpdateSiteSearchSettingsInput,
  UpdateSiteSearchSourceInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Site içi AI arama (ADR-0093): ayarlar, arama kaynakları (site haritası / adres listesi), belge dizini ve sorgu raporu.
 * Ziyaretçi araması Web SDK ile yapılır (`Pushizo.Search`); bu kaynak dizini ve ayarları sunucudan yönetir.
 */
export function createSiteSearch(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/site-search`;
  const source = (id: string, appId?: string) => `${base(appId)}/sources/${enc(id)}`;
  return {
    /** Ayarlar, dizin durumu ve bu ayki AI token kullanımı. */
    get: (appId?: string) => ctx.http.request<SiteSearchOverview>({ method: 'GET', path: base(appId) }),
    updateSettings: (body: UpdateSiteSearchSettingsInput, appId?: string) => ctx.http.request<SiteSearchOverview>({ method: 'PATCH', path: `${base(appId)}/settings`, body }),
    sources: {
      list: (appId?: string) => ctx.http.request<SiteSearchSourceList>({ method: 'GET', path: `${base(appId)}/sources` }),
      create: (body: CreateSiteSearchSourceInput, appId?: string) => ctx.http.request<SiteSearchSource>({ method: 'POST', path: `${base(appId)}/sources`, body }),
      update: (sourceId: string, body: UpdateSiteSearchSourceInput, appId?: string) => ctx.http.request<SiteSearchSource>({ method: 'PATCH', path: source(sourceId, appId), body }),
      /** Kaynağı ve dizindeki sayfalarını siler. */
      delete: (sourceId: string, appId?: string) => ctx.http.request<void>({ method: 'DELETE', path: source(sourceId, appId) }),
      /** Kaynağı şimdi yeniden tarar; bekleyen tarama varsa `queued: false` döner. */
      crawl: (sourceId: string, appId?: string) => ctx.http.request<SiteSearchCrawlRequest>({ method: 'POST', path: `${source(sourceId, appId)}/crawl` }),
    },
    documents: {
      /** Dizindeki belgeler (`source_id` — yalnız API belgeleri için `api`, `q`, `limit`, `cursor`). */
      list: (params: QueryParams<'/v1/apps/{appId}/site-search/documents', 'get'> = {}, appId?: string) =>
        ctx.http.request<SiteSearchDocumentPage>({ method: 'GET', path: `${base(appId)}/documents`, query: params }),
      /** Belgeyi yükler veya değiştirir; `key` app içinde tekildir (harf, rakam, `. _ : -`). */
      put: (key: string, body: PutSiteSearchDocumentInput, appId?: string) =>
        ctx.http.request<SiteSearchDocumentResult>({ method: 'PUT', path: `${base(appId)}/documents/${enc(key)}`, body }),
      /** Belgeyi kimliği veya anahtarıyla siler. */
      delete: (idOrKey: string, appId?: string) => ctx.http.request<void>({ method: 'DELETE', path: `${base(appId)}/documents/${enc(idOrKey)}` }),
    },
    /** Arama raporu (`days`, varsayılan 30). */
    report: (params: QueryParams<'/v1/apps/{appId}/site-search/report', 'get'> = {}, appId?: string) =>
      ctx.http.request<SiteSearchReport>({ method: 'GET', path: `${base(appId)}/report`, query: params }),
  };
}
