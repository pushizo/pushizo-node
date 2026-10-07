import type {
  CreateSegmentInput,
  Ok,
  PreviewSegmentInput,
  QueryParams,
  Segment,
  SegmentCampaigns,
  SegmentEstimate,
  SegmentPage,
  SegmentPreview,
  UpdateSegmentInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Segmentler (`segments:read`; yazma `admin`): filtre AST'si ile kaydedilmiş kitleler. */
export function createSegments(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/segments`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/segments', 'get'> = {}, appId?: string) =>
      ctx.http.request<SegmentPage>({ method: 'GET', path: base(appId), query: params }),
    create: (body: CreateSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({ method: 'POST', path: base(appId), body }),
    /** Kaydedilmemiş tanım için örnek kullanıcılar ve tahmini sayı. */
    preview: (body: PreviewSegmentInput, appId?: string) =>
      ctx.http.request<SegmentPreview>({ method: 'POST', path: `${base(appId)}/preview`, body }),
    get: (segmentId: string, appId?: string) =>
      ctx.http.request<Segment>({ method: 'GET', path: `${base(appId)}/${enc(segmentId)}` }),
    update: (segmentId: string, body: UpdateSegmentInput, appId?: string) =>
      ctx.http.request<Segment>({
        method: 'PATCH',
        path: `${base(appId)}/${enc(segmentId)}`,
        body,
      }),
    delete: (segmentId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/${enc(segmentId)}` }),
    /** Segmenti kullanan kampanyalar. */
    usedBy: (segmentId: string, appId?: string) =>
      ctx.http.request<SegmentCampaigns>({
        method: 'GET',
        path: `${base(appId)}/${enc(segmentId)}/campaigns`,
      }),
    /** Tahmini sayım (10 dk önbellek); `force: true` önbelleği atlayıp tam sayım yapar. */
    estimate: (segmentId: string, options: { force?: boolean } = {}, appId?: string) =>
      ctx.http.request<SegmentEstimate>({
        method: 'POST',
        path: `${base(appId)}/${enc(segmentId)}/estimate`,
        query: { force: options.force ? 'true' : 'false' },
      }),
  };
}
