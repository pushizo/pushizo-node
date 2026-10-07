import type {
  ApiKey,
  ApiKeyList,
  CreateApiKeyInput,
  CreatedApiKey,
  Ok,
  UpdateApiKeyInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * App API anahtarları (`admin` kapsamı). Düz anahtar (`key`) yalnızca oluşturma ve rotasyon
 * yanıtında bir kez döner; güvenli bir yerde saklayın, loglamayın.
 */
export function createApiKeys(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/api-keys`;
  return {
    list: (appId?: string) => ctx.http.request<ApiKeyList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateApiKeyInput, appId?: string) =>
      ctx.http.request<CreatedApiKey>({ method: 'POST', path: base(appId), body }),
    update: (keyId: string, body: UpdateApiKeyInput, appId?: string) =>
      ctx.http.request<ApiKey>({ method: 'PATCH', path: `${base(appId)}/${enc(keyId)}`, body }),
    /** Anahtarı iptal eder (geri alınamaz). */
    revoke: (keyId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/${enc(keyId)}` }),
    /** Yeni anahtar üretir; eskisi geçersiz olur. */
    rotate: (keyId: string, appId?: string) =>
      ctx.http.request<CreatedApiKey>({
        method: 'POST',
        path: `${base(appId)}/${enc(keyId)}/rotate`,
      }),
  };
}
