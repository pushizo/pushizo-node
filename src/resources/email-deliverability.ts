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
  JsonResponse,
  QueryParams,
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
    /** Liste temizliği durumu: e-posta aboneliklerinin denetim dağılımı ve son doğrulama çalıştırması. */
    hygiene: (appId?: string) =>
      ctx.http.request<JsonResponse<'/v1/apps/{appId}/email-deliverability/hygiene', 'get'>>({ method: 'GET', path: `${base(appId)}/hygiene` }),
    /** Tüm e-posta aboneliklerini toplu doğrular; etkin çalıştırma varsa o döner. */
    startHygieneRun: (appId?: string) =>
      ctx.http.request<JsonResponse<'/v1/apps/{appId}/email-deliverability/hygiene-runs', 'post'>>({
        method: 'POST',
        path: `${base(appId)}/hygiene-runs`,
        body: {},
      }),
    getHygieneRun: (runId: string, appId?: string) =>
      ctx.http.request<JsonResponse<'/v1/apps/{appId}/email-deliverability/hygiene-runs/{runId}', 'get'>>({
        method: 'GET',
        path: `${base(appId)}/hygiene-runs/${enc(runId)}`,
      }),
    /** Tamamlanmış doğrulamada geçersiz bulunan adresleri bastırır (abonelik `invalid` + suppression list). */
    suppressHygieneInvalid: (runId: string, appId?: string) =>
      ctx.http.request<JsonResponse<'/v1/apps/{appId}/email-deliverability/hygiene-runs/{runId}/suppress', 'post'>>({
        method: 'POST',
        path: `${base(appId)}/hygiene-runs/${enc(runId)}/suppress`,
        body: {},
      }),
    /** Posta sağlayıcısı bazında teslim, açılma, tıklama, bounce ve şikâyet sayıları (son `days` gün, 7–90). */
    insights: (params: QueryParams<'/v1/apps/{appId}/email-deliverability/insights', 'get'> = {}, appId?: string) =>
      ctx.http.request<JsonResponse<'/v1/apps/{appId}/email-deliverability/insights', 'get'>>({ method: 'GET', path: `${base(appId)}/insights`, query: params }),
    /** Bounce eğilimi, tür/neden dağılımı ve en çok bounce alan alıcı alan adları. */
    bounces: (params: QueryParams<'/v1/apps/{appId}/email-deliverability/bounces', 'get'> = {}, appId?: string) =>
      ctx.http.request<JsonResponse<'/v1/apps/{appId}/email-deliverability/bounces', 'get'>>({ method: 'GET', path: `${base(appId)}/bounces`, query: params }),
    postmaster: (appId?: string) =>
      ctx.http.request<{ domain: string | null; data: { day: string; domain_reputation: string | null; spam_rate: string | null }[] }>({
        method: 'GET',
        path: `${base(appId)}/postmaster`,
      }),
    syncPostmaster: (appId?: string) =>
      ctx.http.request<{ domain: string | null; data: { day: string; domain_reputation: string | null; spam_rate: string | null }[] }>({
        method: 'POST',
        path: `${base(appId)}/postmaster/sync`,
      }),
  };
}
