import { PushizoError } from './errors.js';

export interface HttpOptions {
  apiKey: string;
  baseUrl: string;
  fetch?: typeof fetch;
  /**
   * En fazla yeniden deneme (varsayılan 3). 429 her metotta; 5xx ve ağ hataları GET/HEAD/OPTIONS/PUT/DELETE'te,
   * POST/PATCH'te yalnızca `Idempotency-Key` varsa veya istek sunucuya hiç gönderilmediyse yeniden denenir.
   */
  maxRetries?: number;
  /** İstek zaman aşımı (ms, varsayılan 30 sn). */
  timeoutMs?: number;
  userAgent?: string;
  /** Testler için bekleme fonksiyonu. */
  sleep?: (ms: number) => Promise<void>;
}

export interface RequestInput {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  query?: object;
  /** JSON gövde; `FormData` verilirse multipart olarak (sınır başlığını fetch belirler) gönderilir. */
  body?: unknown;
  /** `Idempotency-Key` başlığı; yeniden denemelerde aynı anahtar gider. */
  idempotencyKey?: string;
}

const BACKOFF_MS = [300, 1000, 3000];

/** Sunucuda tekrarlanması ek yan etki doğurmayan HTTP metotları; 5xx ve ağ hatalarında serbestçe yeniden denenir. */
const IDEMPOTENT_METHODS = new Set(['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE']);

/** Bağlantı kurulmadan oluşan hatalar (bağlantı reddi, DNS, ağ/sunucu erişilemez, bağlantı zaman aşımı). */
const NOT_SENT_CODES = new Set([
  'ECONNREFUSED',
  'ENOTFOUND',
  'EAI_AGAIN',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'UND_ERR_CONNECT_TIMEOUT',
]);

/** `fetch` hatasının (ve `cause` zincirinin) isteğin sunucuya hiç gönderilmediğini gösterip göstermediği. */
export function requestNotSent(err: unknown): boolean {
  const seen = new Set<unknown>();
  const queue: unknown[] = [err];
  while (queue.length) {
    const cur = queue.shift();
    if (!cur || typeof cur !== 'object' || seen.has(cur)) continue;
    seen.add(cur);
    const { code, cause, errors } = cur as { code?: unknown; cause?: unknown; errors?: unknown };
    if (typeof code === 'string' && NOT_SENT_CODES.has(code)) return true;
    queue.push(cause);
    // Happy Eyeballs (IPv4/IPv6) denemeleri AggregateError içinde döner.
    if (Array.isArray(errors)) queue.push(...(errors as unknown[]));
  }
  return false;
}

/**
 * Yeniden deneme politikası: 429 her metotta (istek işlenmeden reddedilmiştir). 5xx ve ağ hataları
 * idempotent metotlarda; POST/PATCH'te yalnızca `Idempotency-Key` (veya gövdede `idempotency_key`) varsa ya da
 * istek sunucuya hiç gönderilmeden başarısız olduysa. Aksi hâlde tekrar, çift kayıt üretebilir.
 */
export function shouldRetry(
  method: string,
  status: number,
  hasIdempotencyKey: boolean,
  notSent: boolean,
): boolean {
  if (status === 429) return true;
  if (status !== 0 && status < 500) return false;
  return IDEMPOTENT_METHODS.has(method.toUpperCase()) || hasIdempotencyKey || notSent;
}

/** Bearer API anahtarı ile JSON istek; 429/5xx ve ağ hatalarında üstel geri çekilme. */
export class HttpClient {
  private readonly fetchImpl: typeof fetch;
  private readonly sleep: (ms: number) => Promise<void>;

  constructor(private readonly options: HttpOptions) {
    if (!options.apiKey) throw new Error('Pushizo: apiKey gerekli.');
    this.fetchImpl = options.fetch ?? ((input, init) => fetch(input, init));
    this.sleep = options.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
  }

  async request<T>(input: RequestInput): Promise<T> {
    const url = new URL(`${this.options.baseUrl.replace(/\/$/, '')}${input.path}`);
    for (const [k, v] of Object.entries((input.query ?? {}) as Record<string, unknown>)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(
        k,
        typeof v === 'string'
          ? v
          : typeof v === 'number' || typeof v === 'boolean'
            ? String(v)
            : JSON.stringify(v),
      );
    }
    const headers: Record<string, string> = {
      authorization: `Bearer ${this.options.apiKey}`,
      accept: 'application/json',
      'user-agent': this.options.userAgent ?? 'pushizo-node/0.1.0',
    };
    const multipart = input.body instanceof FormData;
    if (input.body !== undefined && !multipart) headers['content-type'] = 'application/json';
    if (input.idempotencyKey) headers['idempotency-key'] = input.idempotencyKey;
    const payload: NonNullable<Parameters<typeof fetch>[1]>['body'] =
      input.body === undefined
        ? undefined
        : multipart
          ? (input.body as FormData)
          : JSON.stringify(input.body);

    const maxRetries = this.options.maxRetries ?? BACKOFF_MS.length;
    const bodyKey =
      !multipart && input.body !== null && typeof input.body === 'object'
        ? (input.body as { idempotency_key?: unknown }).idempotency_key
        : undefined;
    const hasKey = Boolean(input.idempotencyKey) || (typeof bodyKey === 'string' && bodyKey !== '');
    let attempt = 0;
    for (;;) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.options.timeoutMs ?? 30_000);
      try {
        const response = await this.fetchImpl(url.toString(), {
          method: input.method,
          headers,
          body: payload,
          signal: controller.signal,
        });
        if (response.ok) {
          const text = await response.text();
          // `format=csv` raporları metin olarak döner; diğer tüm yanıtlar JSON'dur.
          if (/^text\/csv/i.test(response.headers.get('content-type') ?? '')) return text as T;
          return (text ? JSON.parse(text) : undefined) as T;
        }
        let envelope: {
          error?: {
            code?: string;
            message?: string;
            request_id?: string;
            details?: Record<string, unknown>;
          };
        } = {};
        try {
          envelope = (await response.json()) as typeof envelope;
        } catch {
          envelope = {};
        }
        const err = new PushizoError(
          response.status,
          envelope.error?.code ?? `HTTP_${response.status}`,
          envelope.error?.message ?? `HTTP ${response.status}`,
          envelope.error?.request_id ?? response.headers.get('x-request-id') ?? undefined,
          envelope.error?.details,
        );
        if (attempt >= maxRetries || !shouldRetry(input.method, err.status, hasKey, false))
          throw err;
        const retryAfter = Number(response.headers.get('retry-after'));
        await this.sleep(
          Number.isFinite(retryAfter) && retryAfter > 0
            ? retryAfter * 1000
            : BACKOFF_MS[Math.min(attempt, BACKOFF_MS.length - 1)]!,
        );
      } catch (err) {
        if (err instanceof PushizoError) throw err;
        if (attempt >= maxRetries || !shouldRetry(input.method, 0, hasKey, requestNotSent(err))) {
          throw new PushizoError(
            0,
            'NETWORK',
            err instanceof Error ? err.message : 'network error',
          );
        }
        await this.sleep(BACKOFF_MS[Math.min(attempt, BACKOFF_MS.length - 1)]!);
      } finally {
        clearTimeout(timer);
      }
      attempt++;
    }
  }
}
