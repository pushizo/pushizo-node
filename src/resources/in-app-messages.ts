import type {
  CreateInAppMessageInput,
  InAppMessage,
  InAppMessagePage,
  InAppMessageStatus,
  Ok,
  QueryParams,
  UpdateInAppMessageInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Uygulama içi mesajlar (in-app): CRUD ve durum geçişi (draft/active/paused/archived). */
export function createInAppMessages(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/in-app-messages`;
  const one = (messageId: string, appId?: string) => `${base(appId)}/${enc(messageId)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/in-app-messages', 'get'> = {}, appId?: string) =>
      ctx.http.request<InAppMessagePage>({ method: 'GET', path: base(appId), query: params }),
    create: (body: CreateInAppMessageInput, appId?: string) =>
      ctx.http.request<InAppMessage>({ method: 'POST', path: base(appId), body }),
    get: (messageId: string, appId?: string) =>
      ctx.http.request<InAppMessage>({ method: 'GET', path: one(messageId, appId) }),
    update: (messageId: string, body: UpdateInAppMessageInput, appId?: string) =>
      ctx.http.request<InAppMessage>({ method: 'PATCH', path: one(messageId, appId), body }),
    delete: (messageId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(messageId, appId) }),
    setStatus: (messageId: string, status: InAppMessageStatus, appId?: string) =>
      ctx.http.request<InAppMessage>({
        method: 'POST',
        path: `${one(messageId, appId)}/status`,
        body: { status },
      }),
    /** A/B kazananını elle seçer; SDK'lar bundan sonra herkese kazanan görünümü sunar. */
    selectWinner: (messageId: string, variantId: string, appId?: string) =>
      ctx.http.request<InAppMessage>({
        method: 'POST',
        path: `${one(messageId, appId)}/winner`,
        body: { variant_id: variantId },
      }),
  };
}
