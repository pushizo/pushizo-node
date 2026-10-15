import type {
  CreateLiveActivityTypeInput,
  EndLiveActivityInput,
  LiveActivitySendResult,
  LiveActivityType,
  LiveActivityTypeList,
  StartLiveActivityInput,
  UpdateLiveActivityInput,
  UpdateLiveActivityTypeInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * iOS Live Activities (ADR-0024): türler (`admin` kapsamı) ve start/update/end gönderimi (`notifications:write`).
 * Tür adı uygulamadaki `ActivityAttributes` Swift tip adıdır.
 */
export function createLiveActivities(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/live-activities`;
  const send = (event: 'start' | 'update' | 'end', activityType: string, body: unknown, appId?: string) =>
    ctx.http.request<LiveActivitySendResult>({ method: 'POST', path: `${base(appId)}/${enc(activityType)}/${event}`, body });
  return {
    listTypes: (appId?: string) => ctx.http.request<LiveActivityTypeList>({ method: 'GET', path: `${base(appId)}/types` }),
    createType: (body: CreateLiveActivityTypeInput, appId?: string) => ctx.http.request<LiveActivityType>({ method: 'POST', path: `${base(appId)}/types`, body }),
    updateType: (activityType: string, body: UpdateLiveActivityTypeInput, appId?: string) =>
      ctx.http.request<LiveActivityType>({ method: 'PATCH', path: `${base(appId)}/types/${enc(activityType)}`, body }),
    /** Türü ve bu türe ait cihaz belirteçlerini siler. */
    deleteType: (activityType: string, appId?: string) => ctx.http.request<{ ok: true }>({ method: 'DELETE', path: `${base(appId)}/types/${enc(activityType)}` }),
    /** Push-to-start ile başlatır (iOS 17.2+); `activity_id` verilmezse üretilip döner. */
    start: (activityType: string, body: StartLiveActivityInput, appId?: string) => send('start', activityType, body, appId),
    update: (activityType: string, body: UpdateLiveActivityInput, appId?: string) => send('update', activityType, body, appId),
    end: (activityType: string, body: EndLiveActivityInput, appId?: string) => send('end', activityType, body, appId),
  };
}
