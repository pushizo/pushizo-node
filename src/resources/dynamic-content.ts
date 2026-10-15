import type {
  ContentTable,
  ContentTableList,
  ContentTableRows,
  CreateDataFeedInput,
  DataFeed,
  DataFeedList,
  DataFeedTestResult,
  Ok,
  QueryParams,
  TestDataFeedInput,
  UpdateContentTableInput,
  UpdateDataFeedInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';
import { toBlob, type ImportFile } from './data-transfer.js';

/**
 * Veri feed'leri (ADR-0028): gönderim anında kullanıcı bağlamıyla çağrılan harici HTTP kaynakları (şablonda `feed.*`). `secret_headers`
 * yalnızca yazılır, yanıtta maskeli döner.
 */
export function createDataFeeds(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/data-feeds`;
  const one = (feedId: string, appId?: string) => `${base(appId)}/${enc(feedId)}`;
  return {
    list: (appId?: string) => ctx.http.request<DataFeedList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateDataFeedInput, appId?: string) =>
      ctx.http.request<DataFeed>({ method: 'POST', path: base(appId), body }),
    get: (feedId: string, appId?: string) =>
      ctx.http.request<DataFeed>({ method: 'GET', path: one(feedId, appId) }),
    update: (feedId: string, body: UpdateDataFeedInput, appId?: string) =>
      ctx.http.request<DataFeed>({ method: 'PATCH', path: one(feedId, appId), body }),
    delete: (feedId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(feedId, appId) }),
    /** Feed'i örnek kullanıcı bağlamıyla çağırır ve yanıtı döndürür (önbelleği atlar). */
    test: (feedId: string, body: TestDataFeedInput = {}, appId?: string) =>
      ctx.http.request<DataFeedTestResult>({ method: 'POST', path: `${one(feedId, appId)}/test`, body }),
  };
}

export interface CreateContentTableInput {
  name: string;
  /** Satırların aranacağı anahtar sütun (CSV başlığında bulunmalı). */
  key_column: string;
  description?: string;
  file: ImportFile;
  /** Varsayılan: `File` ise kendi adı, değilse `table.csv`. */
  filename?: string;
}

export interface ReplaceContentTableRowsInput {
  file: ImportFile;
  /** İsteğe bağlı yeni anahtar sütunu. */
  key_column?: string;
  /** Varsayılan: `File` ise kendi adı, değilse `table.csv`. */
  filename?: string;
}

function csvForm(file: ImportFile, filename: string | undefined, fields: Record<string, string | undefined>): FormData {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) form.set(key, value);
  }
  const name = filename ?? (typeof File !== 'undefined' && file instanceof File ? file.name : 'table.csv');
  form.set('file', toBlob(file), name);
  return form;
}

/**
 * İçerik tabloları (ADR-0028): CSV ile yüklenen anahtar-değer tabloları; şablonda
 * `{% lookup '<ad>' key: … as satir %}` ile okunur. Yükleme multipart CSV'dir.
 */
export function createContentTables(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/content-tables`;
  const one = (tableId: string, appId?: string) => `${base(appId)}/${enc(tableId)}`;
  return {
    list: (appId?: string) => ctx.http.request<ContentTableList>({ method: 'GET', path: base(appId) }),
    /** CSV'den yeni tablo oluşturur (multipart). */
    create: (input: CreateContentTableInput, appId?: string) =>
      ctx.http.request<ContentTable>({
        method: 'POST',
        path: base(appId),
        body: csvForm(input.file, input.filename, {
          name: input.name,
          key_column: input.key_column,
          description: input.description,
        }),
      }),
    get: (tableId: string, appId?: string) =>
      ctx.http.request<ContentTable>({ method: 'GET', path: one(tableId, appId) }),
    /** Tablo açıklamasını günceller (`description`; `null` siler). */
    update: (tableId: string, body: UpdateContentTableInput, appId?: string) =>
      ctx.http.request<ContentTable>({ method: 'PATCH', path: one(tableId, appId), body }),
    delete: (tableId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(tableId, appId) }),
    /** Satırları sayfalı listeler (`limit`, `offset`, `q` arama). */
    rows: (
      tableId: string,
      params: QueryParams<'/v1/apps/{appId}/content-tables/{tableId}/rows', 'get'> = {},
      appId?: string,
    ) => ctx.http.request<ContentTableRows>({ method: 'GET', path: `${one(tableId, appId)}/rows`, query: params }),
    /** Tablonun tüm satırlarını yeni CSV ile değiştirir; sürüm artar. */
    replaceRows: (tableId: string, input: ReplaceContentTableRowsInput, appId?: string) =>
      ctx.http.request<ContentTable>({
        method: 'PUT',
        path: `${one(tableId, appId)}/rows`,
        body: csvForm(input.file, input.filename, { key_column: input.key_column }),
      }),
  };
}
