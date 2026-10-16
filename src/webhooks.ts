import { createHmac, timingSafeEqual } from 'node:crypto';

/** Webhook imza başlığı (küçük harfle de gelir; Node `req.headers` anahtarları küçük harftir). */
export const WEBHOOK_SIGNATURE_HEADER = 'pushizo-signature';
export const WEBHOOK_EVENT_ID_HEADER = 'pushizo-event-id';
/** Varsayılan zaman damgası toleransı (sn): daha eski `t` ile gelen istek tekrar (replay) sayılır. */
export const WEBHOOK_DEFAULT_TOLERANCE_SECONDS = 300;

export type WebhookVerifyFailure = 'missing_header' | 'malformed_header' | 'timestamp_out_of_tolerance' | 'signature_mismatch';

export type WebhookVerifyResult = { ok: true; timestamp: number } | { ok: false; reason: WebhookVerifyFailure };

export interface VerifyWebhookOptions {
  /** HAM istek gövdesi (string veya Buffer). JSON'u ayrıştırıp yeniden serileştirmeyin; imza ham baytlar üzerindedir. */
  payload: string | Buffer;
  /** `Pushizo-Signature` başlık değeri. */
  header: string | string[] | null | undefined;
  /** Endpoint secret'ı (`whsec_…`). Rotasyon sırasında eski ve yeni secret birlikte verilebilir. */
  secret: string | string[];
  toleranceSeconds?: number;
  /** Test için şimdiki zaman (ms). */
  now?: number;
}

/**
 * Pushizo webhook imzasını doğrular: `Pushizo-Signature: t=<unix>,v1=<hex>` — `v1 = HMAC-SHA256(secret, t + "." + gövde)`.
 * Zaman damgası tolerans dışındaysa (varsayılan 5 dk) reddedilir; sabit zamanlı karşılaştırma kullanılır.
 *
 * ```ts
 * app.post('/hooks/pushizo', express.raw({ type: 'application/json' }), (req, res) => {
 *   const result = verifyWebhookSignature({ payload: req.body, header: req.headers['pushizo-signature'], secret: process.env.HS_WEBHOOK_SECRET! });
 *   if (!result.ok) return res.status(400).send(result.reason);
 *   const event = JSON.parse(req.body.toString('utf8'));
 *   // Pushizo-Event-Id ile tekrarları ayıklayın, 2xx ile hızlı yanıt verin.
 *   res.sendStatus(204);
 * });
 * ```
 */
export function verifyWebhookSignature(options: VerifyWebhookOptions): WebhookVerifyResult {
  const raw = Array.isArray(options.header) ? options.header[0] : options.header;
  if (!raw) return { ok: false, reason: 'missing_header' };
  let timestamp: number | null = null;
  const signatures: Buffer[] = [];
  for (const part of raw.split(',')) {
    const idx = part.indexOf('=');
    if (idx <= 0) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key === 't' && /^\d+$/.test(value)) timestamp = Number(value);
    else if (key === 'v1' && /^[0-9a-f]{64}$/.test(value)) signatures.push(Buffer.from(value, 'hex'));
  }
  if (timestamp === null || signatures.length === 0) return { ok: false, reason: 'malformed_header' };
  const nowSec = Math.floor((options.now ?? Date.now()) / 1000);
  if (Math.abs(nowSec - timestamp) > (options.toleranceSeconds ?? WEBHOOK_DEFAULT_TOLERANCE_SECONDS))
    return { ok: false, reason: 'timestamp_out_of_tolerance' };
  for (const secret of Array.isArray(options.secret) ? options.secret : [options.secret]) {
    const expected = createHmac('sha256', secret).update(`${timestamp}.`).update(options.payload).digest();
    if (signatures.some((sig) => sig.length === expected.length && timingSafeEqual(sig, expected))) return { ok: true, timestamp };
  }
  return { ok: false, reason: 'signature_mismatch' };
}

/** Webhook olayı (tekil gövde). Batch gövdesi `{ events: WebhookEvent[] }` biçimindedir. */
export interface WebhookEvent<T = Record<string, unknown>> {
  id: string;
  type: string;
  created_at: string;
  app_id: string;
  data: T;
}

export class WebhookSignatureError extends Error {
  constructor(readonly reason: WebhookVerifyFailure) {
    super(`Pushizo webhook imzası geçersiz: ${reason}`);
    this.name = 'WebhookSignatureError';
  }
}

/** İmzayı doğrular ve gövdeyi olay listesine çevirir (tekil veya batch). Geçersizse `WebhookSignatureError` fırlatır. */
export function constructWebhookEvents(options: VerifyWebhookOptions): WebhookEvent[] {
  const result = verifyWebhookSignature(options);
  if (!result.ok) throw new WebhookSignatureError(result.reason);
  const body = JSON.parse(typeof options.payload === 'string' ? options.payload : options.payload.toString('utf8')) as
    | WebhookEvent
    | { events: WebhookEvent[] };
  return 'events' in body ? body.events : [body];
}
