import { type ResourceContext } from './context.js';

/** SMS doğrulama. Yanıtta kod yoktur. */
export function createVerify(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/verify/sms`;
  return {
    start: (body: { phone: string; locale?: string }, appId?: string) =>
      ctx.http.request<{ id: string; expires_at: string }>({ method: 'POST', path: base(appId), body }),
    check: (body: { id: string; code: string }, appId?: string) =>
      ctx.http.request<{ verified: true }>({ method: 'POST', path: `${base(appId)}/check`, body }),
  };
}
