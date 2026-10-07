import type { InboxItem, InboxPage, InboxReadAllResult, Ok, QueryParams } from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Kullanıcının bildirim kutusu (inbox), alias (`label`/`value`) ile adreslenir. */
export function createInbox(ctx: ResourceContext) {
  const base = (label: string, value: string, appId?: string) =>
    `${ctx.appPath(appId)}/users/by/${enc(label)}/${enc(value)}/inbox`;
  return {
    list: (
      label: string,
      value: string,
      params: QueryParams<'/v1/apps/{appId}/users/by/{label}/{value}/inbox', 'get'> = {},
      appId?: string,
    ) =>
      ctx.http.request<InboxPage>({
        method: 'GET',
        path: base(label, value, appId),
        query: params,
      }),
    readAll: (label: string, value: string, appId?: string) =>
      ctx.http.request<InboxReadAllResult>({
        method: 'POST',
        path: `${base(label, value, appId)}/read-all`,
      }),
    read: (label: string, value: string, itemId: string, appId?: string) =>
      ctx.http.request<InboxItem>({
        method: 'POST',
        path: `${base(label, value, appId)}/${enc(itemId)}/read`,
      }),
    /** Öğeyi arşivler (kullanıcının kutusundan kaldırır). */
    archive: (label: string, value: string, itemId: string, appId?: string) =>
      ctx.http.request<Ok>({
        method: 'DELETE',
        path: `${base(label, value, appId)}/${enc(itemId)}`,
      }),
  };
}
