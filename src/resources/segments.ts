import type {
  CreateSegmentInput,
  Ok,
  PreviewSegmentInput,
  QueryParams,
  RunSqlQueryInput,
  Segment,
  SegmentCampaigns,
  SegmentEstimate,
  SegmentPage,
  SegmentPreview,
  CreateSqlSegmentInput,
  SqlQueryResult,
  SqlRunList,
  SqlSchema,
  SqlSegmentList,
  UpdateSegmentInput,
  UpdateSqlSegmentInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Segmentler (`segments:read`; yazma `admin`): filtre AST'si ile kaydedilmiş kitleler. */
export function createSegments(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/segments`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/segments', 'get'> = {}, appId?: string) =>
      ctx.http.request<SegmentPage>({ method: 'GET', path: base(appId), query: params }),
    create: (body: CreateSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({ method: 'POST', path: base(appId), body }),
    /** Kaydedilmemiş tanım için örnek kullanıcılar ve tahmini sayı. */
    preview: (body: PreviewSegmentInput, appId?: string) =>
      ctx.http.request<SegmentPreview>({ method: 'POST', path: `${base(appId)}/preview`, body }),
    get: (segmentId: string, appId?: string) =>
      ctx.http.request<Segment>({ method: 'GET', path: `${base(appId)}/${enc(segmentId)}` }),
    update: (segmentId: string, body: UpdateSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({
        method: 'PATCH',
        path: `${base(appId)}/${enc(segmentId)}`,
        body,
      }),
    delete: (segmentId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/${enc(segmentId)}` }),
    /** Segmenti kullanan kampanyalar. */
    usedBy: (segmentId: string, appId?: string) =>
      ctx.http.request<SegmentCampaigns>({
        method: 'GET',
        path: `${base(appId)}/${enc(segmentId)}/campaigns`,
      }),
    /** Tahmini sayım (10 dk önbellek); `force: true` önbelleği atlayıp tam sayım yapar. */
    estimate: (segmentId: string, options: { force?: boolean } = {}, appId?: string) =>
      ctx.http.request<SegmentEstimate>({
        method: 'POST',
        path: `${base(appId)}/${enc(segmentId)}/estimate`,
        query: { force: options.force ? 'true' : 'false' },
      }),
  };
}

/**
 * SQL sorgu ve SQL segment (ADR-0087): izinli görünümler üzerinde salt okunur SELECT (`users:read`), sorgu kaydı ve
 * sorgu sonucundaki `user_id` kolonundan statik segment (`admin`). Growth+ plan özelliği `sql_segments`.
 */
export function createSqlSegments(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/sql`;
  return {
    /** İzinli görünümler, kolonlar ve sınırlar. */
    schema: (appId?: string) => ctx.http.request<SqlSchema>({ method: 'GET', path: `${base(appId)}/schema` }),
    /** Sorgu çalıştırır; satırlar kolon sırasıyla dizi olarak döner. */
    query: (body: RunSqlQueryInput, appId?: string) => ctx.http.request<SqlQueryResult>({ method: 'POST', path: `${base(appId)}/query`, body }),
    /** Sorgu kaydı (`segment_id`, `status`, `limit`, `cursor`). */
    runs: (params: QueryParams<'/v1/apps/{appId}/sql/runs', 'get'> = {}, appId?: string) =>
      ctx.http.request<SqlRunList>({ method: 'GET', path: `${base(appId)}/runs`, query: params }),
    listSegments: (appId?: string) => ctx.http.request<SqlSegmentList>({ method: 'GET', path: `${base(appId)}/segments` }),
    createSegment: (body: CreateSqlSegmentInput, appId?: string) => ctx.http.request<Segment>({ method: 'POST', path: `${base(appId)}/segments`, body }),
    updateSegment: (segmentId: string, body: UpdateSqlSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({ method: 'PATCH', path: `${base(appId)}/segments/${enc(segmentId)}`, body }),
    refreshSegment: (segmentId: string, appId?: string) =>
      ctx.http.request<Segment>({ method: 'POST', path: `${base(appId)}/segments/${enc(segmentId)}/refresh` }),
  };
}
