import type {
  Catalog,
  CatalogItem,
  CatalogItemsPage,
  CatalogList,
  CatalogUpsertResult,
  ContentTable,
  ContentTableList,
  ContentTableRows,
  CreateCatalogInput,
  CreateDataFeedInput,
  CreatePromoCodeListInput,
  DataFeed,
  DataFeedList,
  DataFeedTestResult,
  Ok,
  PromoCodeList,
  PromoCodeListList,
  PromoCodesPage,
  PromoCodeUploadResult,
  QueryParams,
  TestDataFeedInput,
  UpdateCatalogInput,
  UpdateContentTableInput,
  UpdateDataFeedInput,
  UpdatePromoCodeListInput,
  UpsertCatalogItemsInput,
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

export interface UploadPromoCodesInput {
  /** Kodlar ilk sütunda, başlık isteğe bağlı. */
  file: ImportFile;
  /** Varsayılan: `File` ise kendi adı, değilse `table.csv`. */
  filename?: string;
}

/**
 * Promosyon kodu listeleri (ADR-0059): şablonda `{% promo_code '<ad>' %}` teslimat başına tek kullanımlık kod verir.
 * Kod kalmazsa teslimat `PromoCodeUnavailable` hatasıyla düşer.
 */
export function createPromoCodeLists(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/promo-code-lists`;
  const one = (listId: string, appId?: string) => `${base(appId)}/${enc(listId)}`;
  return {
    list: (appId?: string) => ctx.http.request<PromoCodeListList>({ method: 'GET', path: base(appId) }),
    create: (body: CreatePromoCodeListInput, appId?: string) =>
      ctx.http.request<PromoCodeList>({ method: 'POST', path: base(appId), body }),
    get: (listId: string, appId?: string) =>
      ctx.http.request<PromoCodeList>({ method: 'GET', path: one(listId, appId) }),
    /** Açıklamayı veya son kullanma tarihini günceller (`null` siler). */
    update: (listId: string, body: UpdatePromoCodeListInput, appId?: string) =>
      ctx.http.request<PromoCodeList>({ method: 'PATCH', path: one(listId, appId), body }),
    delete: (listId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(listId, appId) }),
    /** CSV'den kod ekler (multipart); listede zaten olanlar atlanır. */
    uploadCodes: (listId: string, input: UploadPromoCodesInput, appId?: string) =>
      ctx.http.request<PromoCodeUploadResult>({
        method: 'POST',
        path: `${one(listId, appId)}/codes`,
        body: csvForm(input.file, input.filename, {}),
      }),
    /** Kodları ve atamalarını sayfalı listeler (`limit`, `offset`, `q`, `status`). */
    codes: (
      listId: string,
      params: QueryParams<'/v1/apps/{appId}/promo-code-lists/{listId}/codes', 'get'> = {},
      appId?: string,
    ) => ctx.http.request<PromoCodesPage>({ method: 'GET', path: `${one(listId, appId)}/codes`, query: params }),
  };
}

export interface UploadCatalogItemsInput {
  /** CSV: `id` ve `title` zorunlu. */
  file: ImportFile;
  /** Varsayılan: `File` ise kendi adı, değilse `table.csv`. */
  filename?: string;
}

/**
 * Ürün katalogları (ADR-0061): şablonda `{% catalog_item '<ad>' id: … as urun %}` ve `{% catalog_items '<ad>' ids: … as urunler %}`.
 * Yazma işlemleri `upsert` yapar; listede olmayan ürünlere dokunmaz.
 */
export function createCatalogs(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/catalogs`;
  const one = (catalogId: string, appId?: string) => `${base(appId)}/${enc(catalogId)}`;
  return {
    list: (appId?: string) => ctx.http.request<CatalogList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateCatalogInput, appId?: string) => ctx.http.request<Catalog>({ method: 'POST', path: base(appId), body }),
    get: (catalogId: string, appId?: string) => ctx.http.request<Catalog>({ method: 'GET', path: one(catalogId, appId) }),
    update: (catalogId: string, body: UpdateCatalogInput, appId?: string) =>
      ctx.http.request<Catalog>({ method: 'PATCH', path: one(catalogId, appId), body }),
    delete: (catalogId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: one(catalogId, appId) }),
    /** Ürünleri sayfalı listeler (`limit`, `offset`, `q`, `category`). */
    items: (catalogId: string, params: QueryParams<'/v1/apps/{appId}/catalogs/{catalogId}/items', 'get'> = {}, appId?: string) =>
      ctx.http.request<CatalogItemsPage>({ method: 'GET', path: `${one(catalogId, appId)}/items`, query: params }),
    /** En fazla 1000 ürünü ekler veya günceller. */
    upsertItems: (catalogId: string, body: UpsertCatalogItemsInput, appId?: string) =>
      ctx.http.request<CatalogUpsertResult>({ method: 'PUT', path: `${one(catalogId, appId)}/items`, body }),
    /** CSV'den ürün ekler veya günceller (multipart). */
    uploadItems: (catalogId: string, input: UploadCatalogItemsInput, appId?: string) =>
      ctx.http.request<CatalogUpsertResult>({
        method: 'POST',
        path: `${one(catalogId, appId)}/items/upload`,
        body: csvForm(input.file, input.filename, {}),
      }),
    getItem: (catalogId: string, itemId: string, appId?: string) =>
      ctx.http.request<CatalogItem>({ method: 'GET', path: `${one(catalogId, appId)}/items/${enc(itemId)}` }),
    deleteItem: (catalogId: string, itemId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: `${one(catalogId, appId)}/items/${enc(itemId)}` }),
  };
}
