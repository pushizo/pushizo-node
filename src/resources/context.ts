import type { HttpClient } from '../http.js';

/** Kaynak gruplarının paylaştığı istemci bağlamı: HTTP katmanı ve varsayılan app çözümlemesi. */
export interface ResourceContext {
  readonly http: HttpClient;
  /** Verilen veya varsayılan `appId`'yi döndürür; ikisi de yoksa açık hata fırlatır. */
  app(appId?: string): string;
  /** Yol parçası: `/v1/apps/{appId}` (kodlanmış). */
  appPath(appId?: string): string;
  readonly autoIdempotencyKey: boolean;
}

export const enc = encodeURIComponent;

/** Cursor sayfalama parametreleri. */
export interface Page {
  limit?: number;
  cursor?: string;
}
