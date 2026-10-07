import type {
  CreateExportInput,
  ExportJob,
  ExportList,
  ImportJob,
  ImportList,
  ImportType,
  QueryParams,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Dışa aktarma işleri (CSV); `status === 'completed'` olunca `download_url` dolar. */
export function createExports(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/exports`;
  return {
    create: (body: CreateExportInput, appId?: string) =>
      ctx.http.request<ExportJob>({ method: 'POST', path: base(appId), body }),
    list: (params: QueryParams<'/v1/apps/{appId}/exports', 'get'> = {}, appId?: string) =>
      ctx.http.request<ExportList>({ method: 'GET', path: base(appId), query: params }),
    get: (exportId: string, appId?: string) =>
      ctx.http.request<ExportJob>({ method: 'GET', path: `${base(appId)}/${enc(exportId)}` }),
  };
}

/** İçe aktarılacak dosya: `Blob`/`File`, bayt dizisi veya metin (UTF-8 CSV). */
export type ImportFile = Blob | ArrayBuffer | Uint8Array | string;

export interface CreateImportInput {
  type: ImportType;
  file: ImportFile;
  /** Varsayılan: `File` ise kendi adı, değilse `import.csv`. */
  filename?: string;
}

function toBlob(file: ImportFile): Blob {
  if (file instanceof Blob) return file;
  if (typeof file === 'string') return new Blob([file], { type: 'text/csv' });
  const bytes = file instanceof Uint8Array ? file : new Uint8Array(file);
  // Kopya: çağıranın tamponu sonradan değişse de yeniden denemeler aynı içeriği gönderir.
  return new Blob([bytes.slice()], { type: 'text/csv' });
}

/** İçe aktarma işleri (multipart CSV, en fazla 50 MB): OneSignal player dökümü veya kullanıcı CSV'si. */
export function createImports(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/imports`;
  return {
    create: (input: CreateImportInput, appId?: string) => {
      const form = new FormData();
      form.set('type', input.type);
      const name =
        input.filename ??
        (typeof File !== 'undefined' && input.file instanceof File
          ? input.file.name
          : 'import.csv');
      form.set('file', toBlob(input.file), name);
      return ctx.http.request<ImportJob>({ method: 'POST', path: base(appId), body: form });
    },
    list: (params: QueryParams<'/v1/apps/{appId}/imports', 'get'> = {}, appId?: string) =>
      ctx.http.request<ImportList>({ method: 'GET', path: base(appId), query: params }),
    get: (importId: string, appId?: string) =>
      ctx.http.request<ImportJob>({ method: 'GET', path: `${base(appId)}/${enc(importId)}` }),
  };
}
