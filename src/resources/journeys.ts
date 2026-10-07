import type {
  CreateJourneyInput,
  JourneyDetail,
  JourneyPage,
  JourneyPublishResult,
  JourneyRunDetail,
  JourneyRunPage,
  JourneyStats,
  JourneyTriggerResult,
  JourneyVersionList,
  Ok,
  QueryParams,
  SaveJourneyDraftInput,
  TriggerJourneyRunInput,
  UpdateJourneyInput,
  UpdateJourneyNodeInput,
  UserJourneyRuns,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Journey'ler (çok adımlı otomasyonlar): taslak graf → yayın (sürüm) → duraklat/sürdür/arşivle
 * yaşam döngüsü, istatistikler ve kullanıcı bazında çalıştırmalar (run).
 */
export function createJourneys(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/journeys`;
  const one = (journeyId: string, appId?: string) => `${base(appId)}/${enc(journeyId)}`;
  const action =
    <T>(name: string) =>
    (journeyId: string, appId?: string) =>
      ctx.http.request<T>({ method: 'POST', path: `${one(journeyId, appId)}/${name}` });
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/journeys', 'get'> = {}, appId?: string) =>
      ctx.http.request<JourneyPage>({ method: 'GET', path: base(appId), query: params }),
    /** Taslak journey oluşturur; `graph` verilmezse varsayılan graf ile başlar. */
    create: (body: CreateJourneyInput, appId?: string) =>
      ctx.http.request<JourneyDetail>({ method: 'POST', path: base(appId), body }),
    get: (journeyId: string, appId?: string) =>
      ctx.http.request<JourneyDetail>({ method: 'GET', path: one(journeyId, appId) }),
    /** Ad ve açıklamayı günceller (graf için `saveDraft`). */
    update: (journeyId: string, body: UpdateJourneyInput, appId?: string) =>
      ctx.http.request<JourneyDetail>({ method: 'PATCH', path: one(journeyId, appId), body }),
    delete: (journeyId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(journeyId, appId) }),
    /** Taslak grafı ve ayarları tümüyle değiştirir; yayındaki sürüm etkilenmez. */
    saveDraft: (journeyId: string, body: SaveJourneyDraftInput, appId?: string) =>
      ctx.http.request<JourneyDetail>({
        method: 'PUT',
        path: `${one(journeyId, appId)}/draft`,
        body,
      }),
    /** Taslaktaki tek bir düğümün `data`/`position` alanlarını günceller. */
    updateNode: (journeyId: string, nodeId: string, body: UpdateJourneyNodeInput, appId?: string) =>
      ctx.http.request<JourneyDetail>({
        method: 'PATCH',
        path: `${one(journeyId, appId)}/nodes/${enc(nodeId)}`,
        body,
      }),
    versions: (journeyId: string, appId?: string) =>
      ctx.http.request<JourneyVersionList>({
        method: 'GET',
        path: `${one(journeyId, appId)}/versions`,
      }),
    /** Taslağı doğrulayıp yeni sürüm olarak yayınlar. */
    publish: action<JourneyPublishResult>('publish'),
    pause: action<JourneyDetail>('pause'),
    resume: action<JourneyDetail>('resume'),
    archive: action<JourneyDetail>('archive'),
    /** Kopyasını taslak olarak oluşturur. */
    duplicate: action<JourneyDetail>('duplicate'),
    /** Düğüm bazında istatistikler; `version` verilmezse yayındaki sürüm. */
    stats: (
      journeyId: string,
      params: QueryParams<'/v1/apps/{appId}/journeys/{journeyId}/stats', 'get'> = {},
      appId?: string,
    ) =>
      ctx.http.request<JourneyStats>({
        method: 'GET',
        path: `${one(journeyId, appId)}/stats`,
        query: params,
      }),
    listRuns: (
      journeyId: string,
      params: QueryParams<'/v1/apps/{appId}/journeys/{journeyId}/runs', 'get'> = {},
      appId?: string,
    ) =>
      ctx.http.request<JourneyRunPage>({
        method: 'GET',
        path: `${one(journeyId, appId)}/runs`,
        query: params,
      }),
    /** Kullanıcıyı journey'e elle sokar (API tetikleyicisi). */
    triggerRun: (journeyId: string, body: TriggerJourneyRunInput, appId?: string) =>
      ctx.http.request<JourneyTriggerResult>({
        method: 'POST',
        path: `${one(journeyId, appId)}/runs`,
        body,
      }),
    getRun: (journeyId: string, runId: string, appId?: string) =>
      ctx.http.request<JourneyRunDetail>({
        method: 'GET',
        path: `${one(journeyId, appId)}/runs/${enc(runId)}`,
      }),
    /** Çalıştırmayı sonlandırır (kullanıcı journey'den çıkarılır). */
    exitRun: (journeyId: string, runId: string, appId?: string) =>
      ctx.http.request<JourneyRunDetail>({
        method: 'DELETE',
        path: `${one(journeyId, appId)}/runs/${enc(runId)}`,
      }),
    /** Kullanıcının (alias `label`/`value`) tüm journey çalıştırmaları. */
    listForUser: (label: string, value: string, appId?: string) =>
      ctx.http.request<UserJourneyRuns>({
        method: 'GET',
        path: `${ctx.appPath(appId)}/users/by/${enc(label)}/${enc(value)}/journeys`,
      }),
  };
}
