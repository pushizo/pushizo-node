import type { PublicPaths } from '@herosignal/api-client';
import type {
  ConversionsReport,
  EngagementReport,
  EventsReport,
  FunnelInput,
  FunnelReport,
  MessagesReport,
  OverviewStats,
  ProvidersReport,
  QueryParams,
  SubscriptionsReport,
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
