import type {
  CreateWarmupPlanInput,
  EmailAddressCheck,
  EmailDeliverabilitySettings,
  EmailWarmupPlan,
  EmailWarmupPlanList,
  EmailWarmupUsage,
  Ok,
  UpdateEmailDeliverabilityInput,
  UpdateWarmupPlanInput,
  VerifyEmailAddressInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * E-posta teslim edilebilirliği: BCC, adres doğrulama ayarları, tekil adres kontrolü ve IP/alan adı
 * ısınma planları. Doğrulayıcı `api_key` yalnızca yazılır.
 */
export function createEmailDeliverability(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/email-deliverability`;
  const plan = (planId: string, appId?: string) => `${base(appId)}/warmup-plans/${enc(planId)}`;
  return {
    get: (appId?: string) =>
      ctx.http.request<EmailDeliverabilitySettings>({ method: 'GET', path: base(appId) }),
    update: (body: UpdateEmailDeliverabilityInput, appId?: string) =>
      ctx.http.request<EmailDeliverabilitySettings>({ method: 'PUT', path: base(appId), body }),
    /** Tek bir adresi app'in doğrulama ayarlarıyla denetler. */
    verifyAddress: (body: VerifyEmailAddressInput, appId?: string) =>
      ctx.http.request<EmailAddressCheck>({
        method: 'POST',
        path: `${base(appId)}/verify-address`,
        body,
      }),
    listWarmupPlans: (appId?: string) =>
      ctx.http.request<EmailWarmupPlanList>({ method: 'GET', path: `${base(appId)}/warmup-plans` }),
    /** Günlük sınırlar `daily_limits` ile açıkça veya `curve` ile büyüme eğrisinden verilir. */
    createWarmupPlan: (body: CreateWarmupPlanInput, appId?: string) =>
      ctx.http.request<EmailWarmupPlan>({
        method: 'POST',
        path: `${base(appId)}/warmup-plans`,
        body,
      }),
    getWarmupPlan: (planId: string, appId?: string) =>
      ctx.http.request<EmailWarmupPlan>({ method: 'GET', path: plan(planId, appId) }),
    /** Gün × sağlayıcı kullanımı (son `days` gün, 1–120; varsayılan sunucu tarafında). */
    warmupPlanUsage: (planId: string, params?: { days?: number }, appId?: string) =>
      ctx.http.request<EmailWarmupUsage>({ method: 'GET', path: `${plan(planId, appId)}/usage`, query: params ?? {} }),
    updateWarmupPlan: (planId: string, body: UpdateWarmupPlanInput, appId?: string) =>
      ctx.http.request<EmailWarmupPlan>({ method: 'PATCH', path: plan(planId, appId), body }),
    deleteWarmupPlan: (planId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: plan(planId, appId) }),
  };
}
