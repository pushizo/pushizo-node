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
  CreateWarehouseConnectionInput,
  CreateWarehouseSegmentInput,
  PreviewWarehouseQueryInput,
  UpdateWarehouseConnectionInput,
  UpdateWarehouseSegmentInput,
  WarehouseSegmentConnection,
  WarehouseSegmentConnectionList,
  WarehouseSegmentConnectionTest,
  WarehouseSegmentList,
  WarehouseSegmentOptions,
  WarehouseSegmentPreview,
  WarehouseSegmentRunList,
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
    /** Statik segmentin üyeliklerini yeniden hesaplar (dinamik segmentte 400). */
    refresh: (segmentId: string, appId?: string) =>
      ctx.http.request<Segment>({ method: 'POST', path: `${base(appId)}/${enc(segmentId)}/refresh` }),
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

/**
 * Zero-copy ambar segmenti (ADR-0091): BigQuery, Snowflake veya Databricks üzerinde çalışan sorgudan yalnız kişi
 * kimlikleriyle statik segment. Bağlantı, önizleme ve yazma `admin`; okuma `segments:read`. Growth+ plan özelliği
 * `warehouse_segments`. Yenileme worker'da çalışır: oluşturma ve `refreshSegment` yenilemeyi kuyruğa alır.
 */
export function createWarehouseSegments(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/warehouse-segments`;
  return {
    /** Motorlar, kimlik türleri, Snowflake ambar boyutları, yenileme aralıkları ve sınırlar. */
    options: (appId?: string) => ctx.http.request<WarehouseSegmentOptions>({ method: 'GET', path: `${base(appId)}/options` }),
    listConnections: (appId?: string) => ctx.http.request<WarehouseSegmentConnectionList>({ method: 'GET', path: `${base(appId)}/connections` }),
    /** Bağlantı oluşturur; kimlik bilgisi şifreli saklanır ve yanıtta yalnız ipucu döner. */
    createConnection: (body: CreateWarehouseConnectionInput, appId?: string) =>
      ctx.http.request<WarehouseSegmentConnection>({ method: 'POST', path: `${base(appId)}/connections`, body }),
    getConnection: (connectionId: string, appId?: string) =>
      ctx.http.request<WarehouseSegmentConnection>({ method: 'GET', path: `${base(appId)}/connections/${enc(connectionId)}` }),
    updateConnection: (connectionId: string, body: UpdateWarehouseConnectionInput, appId?: string) =>
      ctx.http.request<WarehouseSegmentConnection>({ method: 'PATCH', path: `${base(appId)}/connections/${enc(connectionId)}`, body }),
    deleteConnection: (connectionId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/connections/${enc(connectionId)}` }),
    testConnection: (connectionId: string, appId?: string) =>
      ctx.http.request<WarehouseSegmentConnectionTest>({ method: 'POST', path: `${base(appId)}/connections/${enc(connectionId)}/test` }),
    /** `dry_run`: maliyet tahmini; `sample`: en çok 20 örnek kimlik ve eşleşme sayısı. */
    preview: (body: PreviewWarehouseQueryInput, appId?: string) => ctx.http.request<WarehouseSegmentPreview>({ method: 'POST', path: `${base(appId)}/preview`, body }),
    listSegments: (appId?: string) => ctx.http.request<WarehouseSegmentList>({ method: 'GET', path: `${base(appId)}/segments` }),
    createSegment: (body: CreateWarehouseSegmentInput, appId?: string) => ctx.http.request<Segment>({ method: 'POST', path: `${base(appId)}/segments`, body }),
    updateSegment: (segmentId: string, body: UpdateWarehouseSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({ method: 'PATCH', path: `${base(appId)}/segments/${enc(segmentId)}`, body }),
    refreshSegment: (segmentId: string, appId?: string) =>
      ctx.http.request<Segment>({ method: 'POST', path: `${base(appId)}/segments/${enc(segmentId)}/refresh` }),
    /** Ambar sorgu kaydı (`segment_id`, `connection_id`, `status`, `limit`, `cursor`). */
    runs: (params: QueryParams<'/v1/apps/{appId}/warehouse-segments/runs', 'get'> = {}, appId?: string) =>
      ctx.http.request<WarehouseSegmentRunList>({ method: 'GET', path: `${base(appId)}/runs`, query: params }),
  };
}
