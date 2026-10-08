import type {
  CreateCategoryInput,
  MessageCategory,
  MessageCategoryList,
  Ok,
  SetPreferencesInput,
  UpdateCategoryInput,
  UserPreferences,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * Mesaj kategorileri ve kullanıcı tercihleri: kategori CRUD'u, kullanıcının kategori/kanal bazlı
 * opt-in durumu. Kategoriye kapalı kullanıcıya o kategorideki kampanya gönderilmez.
 */
export function createPreferences(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/categories`;
  const user = (label: string, value: string, appId?: string) =>
    `${ctx.appPath(appId)}/users/by/${enc(label)}/${enc(value)}/preferences`;
  return {
    listCategories: (appId?: string) =>
      ctx.http.request<MessageCategoryList>({ method: 'GET', path: base(appId) }),
    createCategory: (body: CreateCategoryInput, appId?: string) =>
      ctx.http.request<MessageCategory>({ method: 'POST', path: base(appId), body }),
    updateCategory: (categoryId: string, body: UpdateCategoryInput, appId?: string) =>
      ctx.http.request<MessageCategory>({
        method: 'PATCH',
        path: `${base(appId)}/${enc(categoryId)}`,
        body,
      }),
    /** Kategori silinince kullanıcı tercihleri de silinir (varsayılana dönerler). */
    deleteCategory: (categoryId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/${enc(categoryId)}` }),
    /** Kullanıcının her kategori için etkin tercihi (kanal `null` = tüm kanallar). */
    getUser: (label: string, value: string, appId?: string) =>
      ctx.http.request<UserPreferences>({ method: 'GET', path: user(label, value, appId) }),
    /** Tercihleri yazar; tanımsız kategori 404 döner. */
    setUser: (label: string, value: string, body: SetPreferencesInput, appId?: string) =>
      ctx.http.request<UserPreferences>({ method: 'PUT', path: user(label, value, appId), body }),
  };
}
