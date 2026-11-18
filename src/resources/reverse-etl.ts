import { enc, type ResourceContext } from './context.js';

export interface ReverseEtlCreate {
  name: string;
  target: 'event' | 'user';
  schedule: 'hourly' | 'daily';
  enabled?: boolean;
  source: 'snowflake' | 'bigquery' | 'postgres' | 'mysql' | 's3' | 'google_sheets';
  config: Record<string, unknown>;
  credentials?: Record<string, unknown>;
}

/** Depodan içeri aktarım (ADR-0049). Kimlik bilgileri yalnızca yazılır. */
export function createReverseEtl(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/reverse-etl`;
  const one = (syncId: string, appId?: string) => `${base(appId)}/${enc(syncId)}`;
  return {
    list: (appId?: string) => ctx.http.request<{ data: unknown[] }>({ method: 'GET', path: base(appId) }),
    testConnection: (body: Omit<ReverseEtlCreate, 'name' | 'target' | 'schedule' | 'enabled'>, appId?: string) =>
      ctx.http.request<unknown>({ method: 'POST', path: `${base(appId)}/test-connection`, body }),
    create: (body: ReverseEtlCreate, appId?: string) => ctx.http.request<unknown>({ method: 'POST', path: base(appId), body }),
    get: (syncId: string, appId?: string) => ctx.http.request<unknown>({ method: 'GET', path: one(syncId, appId) }),
    update: (syncId: string, body: { name?: string; schedule?: string; enabled?: boolean }, appId?: string) =>
      ctx.http.request<unknown>({ method: 'PATCH', path: one(syncId, appId), body }),
    delete: (syncId: string, appId?: string) => ctx.http.request<{ ok: true }>({ method: 'DELETE', path: one(syncId, appId) }),
    test: (syncId: string, appId?: string) => ctx.http.request<unknown>({ method: 'POST', path: `${one(syncId, appId)}/test` }),
    run: (syncId: string, appId?: string) => ctx.http.request<unknown>({ method: 'POST', path: `${one(syncId, appId)}/run` }),
    runs: (syncId: string, params: { limit?: number } = {}, appId?: string) =>
      ctx.http.request<unknown>({ method: 'GET', path: `${one(syncId, appId)}/runs`, query: params }),
  };
}
