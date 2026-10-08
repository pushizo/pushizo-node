import type {
  CopyTemplateInput,
  CreateTemplateInput,
  Ok,
  QueryParams,
  RenderPreview,
  RenderTemplateInput,
  Template,
  TemplatePage,
  TemplateStats,
  TemplateVersionList,
  UpdateTemplateInput,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Şablonlar: sürümlü içerik, render önizlemesi ve başka app'e kopyalama. */
export function createTemplates(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/templates`;
  const one = (templateId: string, appId?: string) => `${base(appId)}/${enc(templateId)}`;
  return {
    list: (params: QueryParams<'/v1/apps/{appId}/templates', 'get'> = {}, appId?: string) =>
      ctx.http.request<TemplatePage>({ method: 'GET', path: base(appId), query: params }),
    create: (body: CreateTemplateInput, appId?: string) =>
      ctx.http.request<Template>({ method: 'POST', path: base(appId), body }),
    get: (templateId: string, appId?: string) =>
      ctx.http.request<Template>({ method: 'GET', path: one(templateId, appId) }),
    /** İçerik değişikliği yeni sürüm oluşturur. */
    update: (templateId: string, body: UpdateTemplateInput, appId?: string) =>
      ctx.http.request<Template>({ method: 'PATCH', path: one(templateId, appId), body }),
    delete: (templateId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(templateId, appId) }),
    /** Şablonu aynı organizasyondaki başka bir app'e kopyalar (`target_app_id`). */
    copyToApp: (templateId: string, body: CopyTemplateInput, appId?: string) =>
      ctx.http.request<Template>({
        method: 'POST',
        path: `${one(templateId, appId)}/copy_to_app`,
        body,
      }),
    /** Şablonu kullanan mesajların toplu istatistiği (gönderim, açılma, tıklama, son kullanım). */
    stats: (templateId: string, appId?: string) =>
      ctx.http.request<TemplateStats>({ method: 'GET', path: `${one(templateId, appId)}/stats` }),
    versions: (templateId: string, appId?: string) =>
      ctx.http.request<TemplateVersionList>({
        method: 'GET',
        path: `${one(templateId, appId)}/versions`,
      }),
    /** Örnek kullanıcı verisiyle kanal bazlı render önizlemesi (gönderim yapmaz). */
    render: (templateId: string, body: RenderTemplateInput = {}, appId?: string) =>
      ctx.http.request<RenderPreview>({
        method: 'POST',
        path: `${one(templateId, appId)}/render`,
        body,
      }),
  };
}
