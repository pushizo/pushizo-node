import type {
  CreateWarehouseExportInput,
  Ok,
  QueryParams,
  TestWarehouseConnectionInput,
  UpdateWarehouseExportInput,
  WarehouseConnectionResult,
  WarehouseExport,
  WarehouseExportList,
  WarehouseExportRun,
  WarehouseExportRunPage,
  WarehouseTables,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Veri ambarı dışa aktarımları (ADR-0030): BigQuery, Snowflake ve S3 Parquet hedeflerine zamanlanmış
 * artımlı aktarım. Kimlik bilgileri yalnızca yazılır; yanıtlarda dönmez.
 */
export function createWarehouseExports(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/warehouse-exports`;
  const one = (exportId: string, appId?: string) => `${base(appId)}/${enc(exportId)}`;
  return {
    /** Aktarılabilir tablolar ve sütun şemaları. */
    tables: (appId?: string) =>
      ctx.http.request<WarehouseTables>({ method: 'GET', path: `${base(appId)}/tables` }),
    /** Kaydetmeden hedef bağlantısını dener. */
    testConnection: (body: TestWarehouseConnectionInput, appId?: string) =>
      ctx.http.request<WarehouseConnectionResult>({
        method: 'POST',
        path: `${base(appId)}/test-connection`,
        body,
      }),
    list: (appId?: string) =>
      ctx.http.request<WarehouseExportList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateWarehouseExportInput, appId?: string) =>
      ctx.http.request<WarehouseExport>({ method: 'POST', path: base(appId), body }),
    get: (exportId: string, appId?: string) =>
      ctx.http.request<WarehouseExport>({ method: 'GET', path: one(exportId, appId) }),
    /** `credentials` verilmezse kayıtlı kimlik bilgileri korunur. */
    update: (exportId: string, body: UpdateWarehouseExportInput, appId?: string) =>
      ctx.http.request<WarehouseExport>({ method: 'PATCH', path: one(exportId, appId), body }),
    delete: (exportId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(exportId, appId) }),
    /** Kayıtlı aktarımın hedef bağlantısını dener. */
    test: (exportId: string, appId?: string) =>
      ctx.http.request<WarehouseConnectionResult>({
        method: 'POST',
        path: `${one(exportId, appId)}/test`,
      }),
    /** Zamanlamayı beklemeden bir çalıştırmayı kuyruğa alır (202). */
    run: (exportId: string, appId?: string) =>
      ctx.http.request<WarehouseExportRun>({ method: 'POST', path: `${one(exportId, appId)}/run` }),
    runs: (
      exportId: string,
      params: QueryParams<'/v1/apps/{appId}/warehouse-exports/{exportId}/runs', 'get'> = {},
      appId?: string,
    ) =>
      ctx.http.request<WarehouseExportRunPage>({
        method: 'GET',
        path: `${one(exportId, appId)}/runs`,
        query: params,
      }),
  };
}
