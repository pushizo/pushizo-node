import type { paths as PublicPaths } from '../generated/openapi.js';
import type {
  ConversionsReport,
  EngagementReport,
  EventsReport,
  FunnelInput,
  FunnelReport,
  GlobalControl,
  GlobalControlReport,
  AppFlag,
  AppFlagEvaluation,
  AppFlagList,
  CreateAppFlagInput,
  EvaluateAppFlagsInput,
  UpdateAppFlagInput,
  CreateGeofenceInput,
  Geofence,
  GeofenceList,
  Ok,
  UpdateGeofenceInput,
  MessagesReport,
  OverviewStats,
  ProvidersReport,
  QueryParams,
  RetentionReport,
  ChannelScoreConfig,
  ChannelScoreOverview,
  ChannelScoreUser,
  ChannelScoreUsersPage,
  RfmConfig,
  RfmOverview,
  RfmTransitions,
  RfmUsersPage,
  UpdateChannelScoreConfigInput,
  UpdateRfmConfigInput,
  SubscriptionsReport,
  UpdateGlobalControlInput,
} from '../types.js';
import type { ResourceContext } from './context.js';

type ReportFormat = 'json' | 'csv';
/** `format: 'csv'` verilirse rapor CSV metni (string) olarak döner. */
type ReportResult<F extends ReportFormat, R> = F extends 'csv' ? string : R;
type ReportQuery<P extends keyof PublicPaths, F extends ReportFormat> = Omit<
  QueryParams<P, 'get' & keyof PublicPaths[P]>,
  'format'
> & { format?: F };

/** Analitik raporları (`analytics:read`). Tarih aralığı `from`/`to` ISO-8601 (UTC). */
export function createAnalytics(ctx: ResourceContext) {
  const path = (appId: string | undefined, report: string) =>
    `${ctx.appPath(appId)}/analytics/${report}`;
  const report =
    <P extends keyof PublicPaths, R>(name: string) =>
    <F extends ReportFormat = 'json'>(params?: ReportQuery<P, F>, appId?: string) =>
      ctx.http.request<ReportResult<F, R>>({
        method: 'GET',
        path: path(appId, name),
        query: params ?? {},
      });
  return {
    overview: (
      params: QueryParams<'/v1/apps/{appId}/analytics/overview', 'get'> = {},
      appId?: string,
    ) =>
      ctx.http.request<OverviewStats>({
        method: 'GET',
        path: path(appId, 'overview'),
        query: params,
      }),
    messages: report<'/v1/apps/{appId}/analytics/messages', MessagesReport>('messages'),
    subscriptions: report<'/v1/apps/{appId}/analytics/subscriptions', SubscriptionsReport>(
      'subscriptions',
    ),
    events: report<'/v1/apps/{appId}/analytics/events', EventsReport>('events'),
    conversions: report<'/v1/apps/{appId}/analytics/conversions', ConversionsReport>('conversions'),
    providers: report<'/v1/apps/{appId}/analytics/providers', ProvidersReport>('providers'),
    engagement: report<'/v1/apps/{appId}/analytics/engagement', EngagementReport>('engagement'),
    /** Retention kohortu: ilk görülme haftası × sonraki haftalarda aktiflik oranı (`weeks`). */
    retention: report<'/v1/apps/{appId}/analytics/retention', RetentionReport>('retention'),
    /** Sıralı adımlı huni raporu (`window_hours` içinde tamamlanan adımlar). */
    funnel: <F extends ReportFormat = 'json'>(
      body: Omit<FunnelInput, 'format'> & { format?: F },
      appId?: string,
    ) =>
      ctx.http.request<ReportResult<F, FunnelReport>>({
        method: 'POST',
        path: path(appId, 'funnels'),
        body,
      }),
  };
}

/**
 * Genel kontrol grubu (ADR-0060): kullanıcıların sabit bir yüzdesi pazarlama mesajı almaz, dönüşümleri diğerleriyle
 * karşılaştırılır. API ve işlemsel gönderimler etkilenmez.
 */
export function createGlobalControl(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/global-control`;
  return {
    get: (appId?: string) => ctx.http.request<GlobalControl>({ method: 'GET', path: base(appId) }),
    /** Etkinleştirme ve yüzde değişikliği ölçümü yeniden başlatır. */
    update: (body: UpdateGlobalControlInput, appId?: string) =>
      ctx.http.request<GlobalControl>({ method: 'PUT', path: base(appId), body }),
    /** Üyelik yeniden seçilir, ölçüm baştan başlar. */
    reset: (appId?: string) => ctx.http.request<GlobalControl>({ method: 'POST', path: `${base(appId)}/reset` }),
    /** Dönüşüm karşılaştırması (`days`, `event`). */
    report: (params: QueryParams<'/v1/apps/{appId}/global-control/report', 'get'> = {}, appId?: string) =>
      ctx.http.request<GlobalControlReport>({ method: 'GET', path: `${base(appId)}/report`, query: params }),
  };
}

/** Özellik bayrakları ve kademeli yayın. */
export function createFeatureFlags(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/feature-flags`;
  const one = (flagId: string, appId?: string) => `${base(appId)}/${encodeURIComponent(flagId)}`;
  return {
    list: (appId?: string) => ctx.http.request<AppFlagList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateAppFlagInput, appId?: string) => ctx.http.request<AppFlag>({ method: 'POST', path: base(appId), body }),
    get: (flagId: string, appId?: string) => ctx.http.request<AppFlag>({ method: 'GET', path: one(flagId, appId) }),
    update: (flagId: string, body: UpdateAppFlagInput, appId?: string) => ctx.http.request<AppFlag>({ method: 'PATCH', path: one(flagId, appId), body }),
    delete: (flagId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: one(flagId, appId) }),
    /** `external_id`, `user_id` veya `subject` için tüm bayrakların sonucu. */
    evaluate: (body: EvaluateAppFlagsInput, appId?: string) => ctx.http.request<AppFlagEvaluation>({ method: 'POST', path: `${base(appId)}/evaluate`, body }),
  };
}

/** Bölgeler: konum paylaşan abonelik girip çıktığında `geofence_enter` ve `geofence_exit` olayları oluşur. */
export function createGeofences(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/geofences`;
  return {
    list: (appId?: string) => ctx.http.request<GeofenceList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateGeofenceInput, appId?: string) => ctx.http.request<Geofence>({ method: 'POST', path: base(appId), body }),
    get: (geofenceId: string, appId?: string) => ctx.http.request<Geofence>({ method: 'GET', path: `${base(appId)}/${encodeURIComponent(geofenceId)}` }),
    update: (geofenceId: string, body: UpdateGeofenceInput, appId?: string) =>
      ctx.http.request<Geofence>({ method: 'PATCH', path: `${base(appId)}/${encodeURIComponent(geofenceId)}`, body }),
    delete: (geofenceId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/${encodeURIComponent(geofenceId)}` }),
  };
}

/** Kişi başına en iyi kanal: ayar, dağılım ve kullanıcı skorları. */
export function createChannelScores(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/channel-scores`;
  return {
    getConfig: (appId?: string) => ctx.http.request<ChannelScoreConfig>({ method: 'GET', path: `${base(appId)}/config` }),
    /** Açıkken skorlar kayıttan sonra yeniden hesaplanır; kapatınca silinir. */
    updateConfig: (body: UpdateChannelScoreConfigInput, appId?: string) => ctx.http.request<ChannelScoreConfig>({ method: 'PUT', path: `${base(appId)}/config`, body }),
    /** Hesabı kuyruğa alır; ilerleme `status` alanından izlenir. */
    compute: (appId?: string) => ctx.http.request<ChannelScoreConfig>({ method: 'POST', path: `${base(appId)}/compute` }),
    overview: (appId?: string) => ctx.http.request<ChannelScoreOverview>({ method: 'GET', path: `${base(appId)}/overview` }),
    /** En iyi kanalı belli kullanıcılar; `channel` ile süzülür, `next_cursor` ile sayfalanır. */
    users: (params: QueryParams<'/v1/apps/{appId}/channel-scores/users', 'get'> = {}, appId?: string) =>
      ctx.http.request<ChannelScoreUsersPage>({ method: 'GET', path: `${base(appId)}/users`, query: params }),
    /** Tek kullanıcının kanal skorları. */
    user: (userId: string, appId?: string) => ctx.http.request<ChannelScoreUser>({ method: 'GET', path: `${base(appId)}/users/${encodeURIComponent(userId)}` }),
  };
}

/** RFM segmentasyonu: model ayarı, segment dağılımı, geçişler ve kullanıcı listesi. */
export function createRfm(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/rfm`;
  return {
    getConfig: (appId?: string) => ctx.http.request<RfmConfig>({ method: 'GET', path: `${base(appId)}/config` }),
    /** Model açıksa skorlar kayıttan sonra yeniden hesaplanır. */
    updateConfig: (body: UpdateRfmConfigInput, appId?: string) => ctx.http.request<RfmConfig>({ method: 'PUT', path: `${base(appId)}/config`, body }),
    /** Hesabı kuyruğa alır; ilerleme `status` alanından izlenir. */
    compute: (appId?: string) => ctx.http.request<RfmConfig>({ method: 'POST', path: `${base(appId)}/compute` }),
    overview: (appId?: string) => ctx.http.request<RfmOverview>({ method: 'GET', path: `${base(appId)}/overview` }),
    /** İki tarih arası geçişler (`from`, `to`: YYYY-AA-GG). */
    transitions: (params: QueryParams<'/v1/apps/{appId}/rfm/transitions', 'get'> = {}, appId?: string) =>
      ctx.http.request<RfmTransitions>({ method: 'GET', path: `${base(appId)}/transitions`, query: params }),
    /** Skoru olan kullanıcılar (`segment`, `limit`, `cursor`). */
    users: (params: QueryParams<'/v1/apps/{appId}/rfm/users', 'get'> = {}, appId?: string) =>
      ctx.http.request<RfmUsersPage>({ method: 'GET', path: `${base(appId)}/users`, query: params }),
  };
}
