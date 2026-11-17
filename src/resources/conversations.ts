import type {
  AiAgent,
  AiAgentList,
  AiAgentMetrics,
  AiAgentRunList,
  AiAgentWithSecret,
  AssignConversationInput,
  CreateAiAgentInput,
  UpdateAiAgentInput,
  Conversation,
  ConversationActivity,
  ConversationMessagePage,
  ConversationPage,
  ConversationReplyInput,
  ConversationReplyResult,
  ConversationTagsInput,
  ConversationTagsResult,
  CreateSmsKeywordInput,
  Ok,
  QueryParams,
  SmsKeyword,
  SmsKeywordList,
  UpdateConversationInput,
  UpdateSmsKeywordInput,
  WhatsAppTemplateList,
  WhatsAppTemplateSync,
} from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * İki yönlü konuşmalar (SMS, WhatsApp, RCS, e-posta, canlı sohbet): gelen kutusu, mesaj geçmişi, yanıt,
 * durum, atama, etiket ve zaman çizelgesi (ADR-0040).
 */
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
    /** Durum: `open`, `pending` veya `resolved` (`closed`, `resolved` ile eşdeğerdir). */
    update: (conversationId: string, body: UpdateConversationInput, appId?: string) =>
      ctx.http.request<Conversation>({ method: 'PATCH', path: one(conversationId, appId), body }),
    /**
     * Temsilciye ve/veya takıma atar; `null` atamayı kaldırır. `inbox.manage` yetkisi olmayan anahtar
     * yalnızca kendine atayabilir.
     */
    assign: (conversationId: string, body: AssignConversationInput, appId?: string) =>
      ctx.http.request<Conversation>({ method: 'POST', path: `${one(conversationId, appId)}/assign`, body }),
    /** Konuşmanın kişisine etiket ekler (`add`) veya kaldırır (`remove`). */
    updateTags: (conversationId: string, body: ConversationTagsInput, appId?: string) =>
      ctx.http.request<ConversationTagsResult>({ method: 'POST', path: `${one(conversationId, appId)}/tags`, body }),
    /** Zaman çizelgesi: atama, durum değişikliği, ilk yanıt ve bot devri olayları. */
    activity: (conversationId: string, appId?: string) =>
      ctx.http.request<ConversationActivity>({ method: 'GET', path: `${one(conversationId, appId)}/activity` }),
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

/**
 * Konuşmalı AI ajanı (ADR-0085): tanım, araç imza anahtarı rotasyonu, çalışma kayıtları ve ölçümler. Oluşturma ve
 * rotasyon yanıtındaki `tool_secret` yalnız bir kez döner.
 */
export function createAiAgents(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/ai-agents`;
  const one = (agentId: string, appId?: string) => `${base(appId)}/${enc(agentId)}`;
  return {
    list: (appId?: string) => ctx.http.request<AiAgentList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateAiAgentInput, appId?: string) => ctx.http.request<AiAgentWithSecret>({ method: 'POST', path: base(appId), body }),
    get: (agentId: string, appId?: string) => ctx.http.request<AiAgent>({ method: 'GET', path: one(agentId, appId) }),
    update: (agentId: string, body: UpdateAiAgentInput, appId?: string) => ctx.http.request<AiAgent>({ method: 'PATCH', path: one(agentId, appId), body }),
    delete: (agentId: string, appId?: string) => ctx.http.request<void>({ method: 'DELETE', path: one(agentId, appId) }),
    rotateSecret: (agentId: string, appId?: string) => ctx.http.request<AiAgentWithSecret>({ method: 'POST', path: `${one(agentId, appId)}/rotate-secret` }),
    metrics: (agentId: string, appId?: string) => ctx.http.request<AiAgentMetrics>({ method: 'GET', path: `${one(agentId, appId)}/metrics` }),
    /** Çalışma kayıtları (`agent_id`, `conversation_id`, `status`, `limit`, `cursor`). */
    runs: (params: QueryParams<'/v1/apps/{appId}/ai-agents/runs', 'get'> = {}, appId?: string) =>
      ctx.http.request<AiAgentRunList>({ method: 'GET', path: `${base(appId)}/runs`, query: params }),
  };
}
