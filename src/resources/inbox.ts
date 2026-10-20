import type {
  CannedResponse,
  CannedResponseList,
  CreateCannedResponseInput,
  InboxAgentList,
  InboxItem,
  InboxMetrics,
  InboxPage,
  InboxReadAllResult,
  InboxSettings,
  InboxTeamList,
  Ok,
  QueryParams,
  UpdateCannedResponseInput,
  UpdateInboxSettingsInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Kullanıcının bildirim kutusu (inbox; alias `label`/`value` ile adreslenir) ve ekip gelen kutusu yönetimi:
 * hazır yanıtlar, takımlar, temsilciler, ayarlar ve metrikler (ADR-0040).
 */
export function createInbox(ctx: ResourceContext) {
  const base = (label: string, value: string, appId?: string) =>
    `${ctx.appPath(appId)}/users/by/${enc(label)}/${enc(value)}/inbox`;
  const team = (appId?: string) => `${ctx.appPath(appId)}/inbox`;
  const canned = (appId?: string) => `${ctx.appPath(appId)}/canned-responses`;
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
    /** Hazır yanıtlar; `q` kısayol, başlık veya gövdede arar. */
    listCannedResponses: (params: QueryParams<'/v1/apps/{appId}/canned-responses', 'get'> = {}, appId?: string) =>
      ctx.http.request<CannedResponseList>({ method: 'GET', path: canned(appId), query: params }),
    /** Hazır yanıt oluşturur; gövde Liquid şablonudur (ör. `{{ contact.name }}`) ve kayıtta doğrulanır. */
    createCannedResponse: (body: CreateCannedResponseInput, appId?: string) =>
      ctx.http.request<CannedResponse>({ method: 'POST', path: canned(appId), body }),
    updateCannedResponse: (cannedId: string, body: UpdateCannedResponseInput, appId?: string) =>
      ctx.http.request<CannedResponse>({ method: 'PATCH', path: `${canned(appId)}/${enc(cannedId)}`, body }),
    deleteCannedResponse: (cannedId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: `${canned(appId)}/${enc(cannedId)}` }),
    /** Gelen kutusu takımları. */
    listTeams: (appId?: string) => ctx.http.request<InboxTeamList>({ method: 'GET', path: `${team(appId)}/teams` }),
    /** Temsilciler ve varlık (presence) durumu. */
    listAgents: (appId?: string) => ctx.http.request<InboxAgentList>({ method: 'GET', path: `${team(appId)}/agents` }),
    /** Sohbet widget'ı, mesai saatleri, yönlendirme ve e-posta yanıtı ayarları. */
    getSettings: (appId?: string) => ctx.http.request<InboxSettings>({ method: 'GET', path: `${team(appId)}/settings` }),
    /** Yalnızca verilen bölümler güncellenir. */
    updateSettings: (body: UpdateInboxSettingsInput, appId?: string) =>
      ctx.http.request<InboxSettings>({ method: 'PUT', path: `${team(appId)}/settings`, body }),
    /** İlk yanıt/çözüm süresi ortalaması ve p90, SLA oranı ve temsilci tablosu (`from`/`to`, `channel`). */
    metrics: (params: QueryParams<'/v1/apps/{appId}/inbox/metrics', 'get'> = {}, appId?: string) =>
      ctx.http.request<InboxMetrics>({ method: 'GET', path: `${team(appId)}/metrics`, query: params }),
  };
}
