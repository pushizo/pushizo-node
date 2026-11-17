import type {
  BatchCompanyMembersInput,
  BatchUpsertCompaniesInput,
  Company,
  CompanyBatchResult,
  CompanyList,
  CompanyMember,
  CompanyMemberBatchResult,
  CompanyMemberList,
  Ok,
  QueryParams,
  SetCompanyMemberInput,
  UpdateCompanyInput,
  UpsertCompanyInput,
  UserCompanyList,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** Şirket/hesap nesneleri (ADR-0090): şirket CRUD, toplu upsert ve kişi ↔ şirket üyeliği. */
export function createCompanies(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/companies`;
  return {
    /** Liste (`q`, `external_id`, `domain`, `limit`, `cursor`); en yeni önce. */
    list: (params: QueryParams<'/v1/apps/{appId}/companies', 'get'> = {}, appId?: string) =>
      ctx.http.request<CompanyList>({ method: 'GET', path: base(appId), query: params }),
    /** `external_id` ile oluşturur veya günceller; özellikler merge-patch (null siler). */
    upsert: (body: UpsertCompanyInput, appId?: string) => ctx.http.request<Company>({ method: 'POST', path: base(appId), body }),
    /** İstek başına en çok 1000 şirket. */
    batchUpsert: (body: BatchUpsertCompaniesInput, appId?: string) => ctx.http.request<CompanyBatchResult>({ method: 'POST', path: `${base(appId)}/batch`, body }),
    get: (companyId: string, appId?: string) => ctx.http.request<Company>({ method: 'GET', path: `${base(appId)}/${enc(companyId)}` }),
    update: (companyId: string, body: UpdateCompanyInput, appId?: string) => ctx.http.request<Company>({ method: 'PATCH', path: `${base(appId)}/${enc(companyId)}`, body }),
    /** Şirketi siler; üyelikler silinir, kişiler kalır. */
    delete: (companyId: string, appId?: string) => ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/${enc(companyId)}` }),
    members: (companyId: string, params: QueryParams<'/v1/apps/{appId}/companies/{companyId}/members', 'get'> = {}, appId?: string) =>
      ctx.http.request<CompanyMemberList>({ method: 'GET', path: `${base(appId)}/${enc(companyId)}/members`, query: params }),
    /** Kişiyi şirkete bağlar veya rolünü değiştirir (rol verilmezse mevcut rol korunur, yeni üyelik `member`). */
    setMember: (companyId: string, userId: string, body: SetCompanyMemberInput = {}, appId?: string) =>
      ctx.http.request<CompanyMember>({ method: 'PUT', path: `${base(appId)}/${enc(companyId)}/members/${enc(userId)}`, body }),
    /** Kişiler `user_id` veya kişinin `external_id` değeriyle; bulunamayanlar `not_found` listesinde döner. */
    batchMembers: (companyId: string, body: BatchCompanyMembersInput, appId?: string) =>
      ctx.http.request<CompanyMemberBatchResult>({ method: 'POST', path: `${base(appId)}/${enc(companyId)}/members/batch`, body }),
    removeMember: (companyId: string, userId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: `${base(appId)}/${enc(companyId)}/members/${enc(userId)}` }),
    /** Kişinin şirketleri (en son bağlanan önce). */
    forUser: (userId: string, appId?: string) => ctx.http.request<UserCompanyList>({ method: 'GET', path: `${ctx.appPath(appId)}/users/${enc(userId)}/companies` }),
    /** Kişinin şirketleri; kişi `external_id` veya alias etiketiyle. */
    forUserBy: (label: string, value: string, appId?: string) =>
      ctx.http.request<UserCompanyList>({ method: 'GET', path: `${ctx.appPath(appId)}/users/by/${enc(label)}/${enc(value)}/companies` }),
  };
}
