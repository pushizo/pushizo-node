import type {
  Conversation,
  ConversationMessagePage,
  ConversationPage,
  ConversationReplyInput,
  ConversationReplyResult,
  CreateSmsKeywordInput,
  Ok,
  QueryParams,
  SmsKeyword,
  SmsKeywordList,
  UpdateSmsKeywordInput,
  WhatsAppTemplateList,
  WhatsAppTemplateSync,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/** İki yönlü konuşmalar (SMS, WhatsApp, RCS): gelen kutusu, mesaj geçmişi ve yanıt. */
export function createConversations(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/conversations`;
  const one = (conversationId: string, appId?: string) => `${base(appId)}/${enc(conversationId)}`;
  return {
    /** `channel`, `status`, `unread` ve `q` filtreleri; cursor sayfalı. */
    list: (params: QueryParams<'/v1/apps/{appId}/conversations', 'get'> = {}, appId?: string) =>
      ctx.http.request<ConversationPage>({ method: 'GET', path: base(appId), query: params }),
    get: (conversationId: string, appId?: string) =>
      ctx.http.request<Conversation>({ method: 'GET', path: one(conversationId, appId) }),
    messages: (
      conversationId: string,
      params: QueryParams<'/v1/apps/{appId}/conversations/{conversationId}/messages', 'get'> = {},
      appId?: string,
    ) =>
      ctx.http.request<ConversationMessagePage>({
        method: 'GET',
        path: `${one(conversationId, appId)}/messages`,
        query: params,
      }),
    /** Metin, WhatsApp şablonu veya medya ile yanıt (202); gönderim kuyruğa alınır. */
    reply: (conversationId: string, body: ConversationReplyInput, appId?: string) =>
      ctx.http.request<ConversationReplyResult>({
        method: 'POST',
        path: `${one(conversationId, appId)}/messages`,
        body,
      }),
    /** Konuşmayı okundu olarak işaretler. */
    markRead: (conversationId: string, appId?: string) =>
      ctx.http.request<Conversation>({ method: 'POST', path: `${one(conversationId, appId)}/read` }),
  };
}

/** Gelen mesaj anahtar kelimeleri: etiket, olay, otomatik yanıt ve opt-in eylemleri. */
export function createSmsKeywords(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/sms-keywords`;
  const one = (keywordId: string, appId?: string) => `${base(appId)}/${enc(keywordId)}`;
  return {
    list: (appId?: string) => ctx.http.request<SmsKeywordList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateSmsKeywordInput, appId?: string) =>
      ctx.http.request<SmsKeyword>({ method: 'POST', path: base(appId), body }),
    update: (keywordId: string, body: UpdateSmsKeywordInput, appId?: string) =>
      ctx.http.request<SmsKeyword>({ method: 'PATCH', path: one(keywordId, appId), body }),
    delete: (keywordId: string, appId?: string) =>
      ctx.http.request<Ok>({ method: 'DELETE', path: one(keywordId, appId) }),
  };
}

/** WhatsApp Business şablonları: şablon listesi ve sağlayıcıdan eşitleme. */
export function createWhatsAppTemplates(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/whatsapp/templates`;
  return {
    /** İsteğe bağlı `status` filtresi. */
    list: (params: QueryParams<'/v1/apps/{appId}/whatsapp/templates', 'get'> = {}, appId?: string) =>
      ctx.http.request<WhatsAppTemplateList>({ method: 'GET', path: base(appId), query: params }),
    sync: (appId?: string) =>
      ctx.http.request<WhatsAppTemplateSync>({ method: 'POST', path: `${base(appId)}/sync` }),
  };
}
