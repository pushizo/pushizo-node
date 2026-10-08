import type {
  Campaign,
  CampaignPage,
  CampaignStats,
  CampaignVariantStats,
  CreateCampaignInput,
  DeliveryList,
  MessageList,
  Ok,
  QueryParams,
  ScheduleCampaignInput,
  SelectWinnerInput,
  UpdateCampaignInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

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
    /** `send_at` veya `recurrence` (cron) ile zamanlar. */
    schedule: (campaignId: string, body: ScheduleCampaignInput, appId?: string) =>
      ctx.http.request<Campaign>({
        method: 'POST',
        path: `${one(campaignId, appId)}/schedule`,
        body,
      }),
    /** Hemen gönder. */
    send: action('send'),
    pause: action('pause'),
    resume: action('resume'),
    cancel: action('cancel'),
    /** Kopyasını taslak olarak oluşturur. */
    duplicate: action('duplicate'),
    /** Onay akışı açıksa kampanyayı onaylar. */
    approve: action('approve'),
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
