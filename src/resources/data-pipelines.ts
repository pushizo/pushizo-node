import type {
  CreateDataSourceInput,
  CreateDataTransformInput,
  DataQuarantineDiscardResult,
  DataQuarantineList,
  DataQuarantineReprocessResult,
  DataSource,
  DataSourceList,
  DataSourceRunResult,
  DataSourceWithSecret,
  DataTransform,
  DataTransformList,
  DataTransformPreview,
  PreviewDataTransformInput,
  QueryParams,
  UpdateDataSourceInput,
  UpdateDataTransformInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Veri dönüştürme ve kaynak boru hattı (ADR-0088): olay/kişi dönüştürmeleri (kural veya sandbox'lı JavaScript),
 * önizleme, webhook ve HTTP pull kaynakları, karantina. Webhook kaynağının `secret` değeri yalnız oluşturma ve
 * yenileme yanıtında döner.
 */
export function createDataPipelines(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/data-pipelines`;
  const transform = (id: string, appId?: string) => `${base(appId)}/transforms/${enc(id)}`;
  const source = (id: string, appId?: string) => `${base(appId)}/sources/${enc(id)}`;
  return {
    transforms: {
      list: (params: QueryParams<'/v1/apps/{appId}/data-pipelines/transforms', 'get'> = {}, appId?: string) =>
        ctx.http.request<DataTransformList>({ method: 'GET', path: `${base(appId)}/transforms`, query: params }),
      create: (body: CreateDataTransformInput, appId?: string) => ctx.http.request<DataTransform>({ method: 'POST', path: `${base(appId)}/transforms`, body }),
      get: (transformId: string, appId?: string) => ctx.http.request<DataTransform>({ method: 'GET', path: transform(transformId, appId) }),
      update: (transformId: string, body: UpdateDataTransformInput, appId?: string) =>
        ctx.http.request<DataTransform>({ method: 'PATCH', path: transform(transformId, appId), body }),
      delete: (transformId: string, appId?: string) => ctx.http.request<void>({ method: 'DELETE', path: transform(transformId, appId) }),
      /** Örnek kayıtlarla kuru çalıştırma; hiçbir şey yazılmaz. */
      preview: (body: PreviewDataTransformInput, appId?: string) =>
        ctx.http.request<DataTransformPreview>({ method: 'POST', path: `${base(appId)}/transforms/preview`, body }),
    },
    sources: {
      list: (appId?: string) => ctx.http.request<DataSourceList>({ method: 'GET', path: `${base(appId)}/sources` }),
      create: (body: CreateDataSourceInput, appId?: string) => ctx.http.request<DataSourceWithSecret>({ method: 'POST', path: `${base(appId)}/sources`, body }),
      get: (sourceId: string, appId?: string) => ctx.http.request<DataSource>({ method: 'GET', path: source(sourceId, appId) }),
      update: (sourceId: string, body: UpdateDataSourceInput, appId?: string) => ctx.http.request<DataSource>({ method: 'PATCH', path: source(sourceId, appId), body }),
      delete: (sourceId: string, appId?: string) => ctx.http.request<void>({ method: 'DELETE', path: source(sourceId, appId) }),
      rotateSecret: (sourceId: string, appId?: string) => ctx.http.request<DataSourceWithSecret>({ method: 'POST', path: `${source(sourceId, appId)}/rotate-secret` }),
      /** HTTP pull kaynağını şimdi çalıştırır. */
      run: (sourceId: string, appId?: string) => ctx.http.request<DataSourceRunResult>({ method: 'POST', path: `${source(sourceId, appId)}/run` }),
    },
    quarantine: {
      /** Karantinadaki kayıtlar (`status`, `target`, `source_id`, `transform_id`, `limit`, `cursor`). */
      list: (params: QueryParams<'/v1/apps/{appId}/data-pipelines/quarantine', 'get'> = {}, appId?: string) =>
        ctx.http.request<DataQuarantineList>({ method: 'GET', path: `${base(appId)}/quarantine`, query: params }),
      /** Kimlik verilmezse bekleyen en eski 500 kayıt güncel dönüştürmelerle yeniden işlenir. */
      reprocess: (ids?: string[], appId?: string) =>
        ctx.http.request<DataQuarantineReprocessResult>({ method: 'POST', path: `${base(appId)}/quarantine/reprocess`, body: ids ? { ids } : {} }),
      discard: (ids: string[], appId?: string) => ctx.http.request<DataQuarantineDiscardResult>({ method: 'POST', path: `${base(appId)}/quarantine/discard`, body: { ids } }),
    },
  };
}
