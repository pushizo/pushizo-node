import type {
  Campaign,
  CampaignEmailRisk,
  CampaignPreflightReport,
  CampaignPage,
  CampaignStats,
  CampaignVariantStats,
  CreateCampaignInput,
  CreateCustomAgentInput,
  CustomAgent,
  CustomAgentDraftList,
  CustomAgentList,
  CustomAgentRun,
  CustomAgentRunList,
  DeliveryList,
  MessageList,
  Ok,
  QueryParams,
  ScheduleCampaignInput,
  SelectWinnerInput,
  UpdateCampaignInput,
  UpdateCustomAgentInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Gönder/zamanla/onayla seçenekleri: `force` e-posta liste koruması, `preflightAck` kritik denetim bulgusuna açık onay. */
export interface LaunchOptions {
  force?: boolean;
  preflightAck?: boolean;
}

function launchQuery(options: LaunchOptions): { query?: Record<string, string> } {
  const query: Record<string, string> = {};
  if (options.force) query.force = 'true';
  if (options.preflightAck) query.preflight_ack = 'true';
  return Object.keys(query).length ? { query } : {};
}

/** Kampanyalar: taslak → zamanla/gönder → duraklat/sürdür/iptal yaşam döngüsü ve istatistikler. */
export function createCampaigns(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/campaigns`;
  const one = (campaignId: string, appId?: string) => `${base(appId)}/${enc(campaignId)}`;
  const action = (name: string) => (campaignId: string, appId?: string) =>
    ctx.http.request<Campaign>({ method: 'POST', path: `${one(campaignId, appId)}/${name}` });
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/campaigns', 'get'> = {}, appId?: string) =>
      ctx.http.request<CampaignPage>({ method: 'GET', path: base(appId), query: params }),
    create: (body: CreateCampaignInput, appId?: string) =>
      ctx.http.request<Campaign>({ method: 'POST', path: base(appId), body }),
    get: (campaignId: string, appId?: string) =>
      ctx.http.request<Campaign>({ method: 'GET', path: one(campaignId, appId) }),
    update: (campaignId: string, body: UpdateCampaignInput, appId?: string) =>
      ctx.http.request<Campaign>({ method: 'PATCH', path: one(campaignId, appId), body }),
    delete: (campaignId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(campaignId, appId) }),
    /**
     * `send_at` veya `recurrence` (cron) ile zamanlar. E-posta liste koruması (409 `email_invalid_ratio`) yalnızca
     * `admin` kapsamlı anahtarla `{ force: true }` ile aşılır.
     */
    schedule: (campaignId: string, body: ScheduleCampaignInput, appId?: string, options: LaunchOptions = {}) =>
      ctx.http.request<Campaign>({ method: 'POST', path: `${one(campaignId, appId)}/schedule`, body, ...launchQuery(options) }),
    /**
     * Hemen gönder. E-posta liste koruması (409) `admin` kapsamıyla `{ force: true }` ile aşılır; yayın öncesi
     * denetimde kritik bulgu (409 `preflight_blocked`) `{ preflightAck: true }` açık onayıyla aşılır.
     */
    send: (campaignId: string, appId?: string, options: LaunchOptions = {}) =>
      ctx.http.request<Campaign>({ method: 'POST', path: `${one(campaignId, appId)}/send`, ...launchQuery(options) }),
    /**
     * Yayın öncesi denetim raporu (ADR-0089): marka kılavuzu, yasaklı ifade/phishing, bağlantı, kişiselleştirme ve
     * KVKK/İYS bulguları. `{ checkLinks: true }` bağlantılara HEAD isteği atar.
     */
    preflight: (campaignId: string, appId?: string, options: { checkLinks?: boolean } = {}) =>
      ctx.http.request<CampaignPreflightReport>({ method: 'POST', path: `${one(campaignId, appId)}/preflight`, ...(options.checkLinks ? { query: { check_links: 'true' } } : {}) }),
    /** E-posta liste riski: kitlenin denetim dağılımı, tahmini geçersiz oranı ve 7/30 gün bounce oranı. */
    emailRisk: (campaignId: string, appId?: string) =>
      ctx.http.request<CampaignEmailRisk>({ method: 'GET', path: `${one(campaignId, appId)}/email-risk` }),
    pause: action('pause'),
    resume: action('resume'),
    cancel: action('cancel'),
    /** Kopyasını taslak olarak oluşturur. */
    duplicate: action('duplicate'),
    /** Onay akışı açıksa kampanyayı onaylar (bekleyen gönderim kritik denetim bulgusu taşıyorsa `{ preflightAck: true }`). */
    approve: (campaignId: string, appId?: string, options: LaunchOptions = {}) =>
      ctx.http.request<Campaign>({ method: 'POST', path: `${one(campaignId, appId)}/approve`, ...launchQuery(options) }),
    /** Başarısız teslimatları yeniden kuyruğa alır. */
    resendFailed: action('resend-failed'),
    stats: (campaignId: string, appId?: string) =>
      ctx.http.request<CampaignStats>({ method: 'GET', path: `${one(campaignId, appId)}/stats` }),
    deliveries: (
      campaignId: string,
      params: QueryParams<'/v1/apps/{appId}/campaigns/{campaignId}/deliveries', 'get'> = {},
      appId?: string,
    ) =>
      ctx.http.request<DeliveryList>({
        method: 'GET',
        path: `${one(campaignId, appId)}/deliveries`,
        query: params,
      }),
    /** Kampanyanın ürettiği mesajlar (tekrarlayan kampanyalarda her çalıştırma bir mesaj). */
    messages: (campaignId: string, appId?: string) =>
      ctx.http.request<MessageList>({ method: 'GET', path: `${one(campaignId, appId)}/messages` }),
    /** A/B testi: varyant bazlı gönderim/açılma/tıklama/dönüşüm, kontrol grubu ve anlamlılık. */
    variantStats: (campaignId: string, appId?: string) =>
      ctx.http.request<CampaignVariantStats>({
        method: 'GET',
        path: `${one(campaignId, appId)}/variants/stats`,
      }),
    /** A/B testinde kazananı elle seçer; kalan kitleye kazanan varyant gönderilir. */
    selectWinner: (campaignId: string, body: SelectWinnerInput, appId?: string) =>
      ctx.http.request<Campaign>({
        method: 'POST',
        path: `${one(campaignId, appId)}/winner`,
        body,
      }),
  };
}

/**
 * Müşterinin kendi AI ajanı (ADR-0089): talimat, izinli araçlar, zamanlama, elle çalıştırma, çalışma kayıtları ve
 * taslaklar. Ajan gönderim yapamaz; yazma araçları yalnız taslak üretir ve taslaklar panelde onaylanarak uygulanır.
 */
export function createCustomAgents(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/custom-agents`;
  const one = (agentId: string, appId?: string) => `${base(appId)}/${enc(agentId)}`;
  return {
    list: (appId?: string) => ctx.http.request<CustomAgentList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateCustomAgentInput, appId?: string) => ctx.http.request<CustomAgent>({ method: 'POST', path: base(appId), body }),
    get: (agentId: string, appId?: string) => ctx.http.request<CustomAgent>({ method: 'GET', path: one(agentId, appId) }),
    update: (agentId: string, body: UpdateCustomAgentInput, appId?: string) => ctx.http.request<CustomAgent>({ method: 'PATCH', path: one(agentId, appId), body }),
    delete: (agentId: string, appId?: string) => ctx.http.request<void>({ method: 'DELETE', path: one(agentId, appId) }),
    /** Şimdi çalıştırır (202; çalıştırma `pending` döner, sonuç `runs` ile izlenir). */
    run: (agentId: string, appId?: string) => ctx.http.request<CustomAgentRun>({ method: 'POST', path: `${one(agentId, appId)}/run` }),
    /** Çalışma kayıtları (`agent_id`, `status`, `limit`, `cursor`). */
    runs: (params: QueryParams<'/v1/apps/{appId}/custom-agents/runs', 'get'> = {}, appId?: string) =>
      ctx.http.request<CustomAgentRunList>({ method: 'GET', path: `${base(appId)}/runs`, query: params }),
    /** Taslaklar (`agent_id`, `run_id`, `status`, `limit`, `cursor`). */
    drafts: (params: QueryParams<'/v1/apps/{appId}/custom-agents/drafts', 'get'> = {}, appId?: string) =>
      ctx.http.request<CustomAgentDraftList>({ method: 'GET', path: `${base(appId)}/drafts`, query: params }),
  };
}
