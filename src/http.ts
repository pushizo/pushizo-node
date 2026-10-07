import { HeroSignalError } from './errors.js';

export interface HttpOptions {
  apiKey: string;
  baseUrl: string;
  fetch?: typeof fetch;
  /** 429/5xx için en fazla yeniden deneme (varsayılan 3). */
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

/** Bearer API anahtarı ile JSON istek; 429/5xx ve ağ hatalarında üstel geri çekilme. */
export class HttpClient {
  private readonly fetchImpl: typeof fetch;
  private readonly sleep: (ms: number) => Promise<void>;

  constructor(private readonly options: HttpOptions) {
    if (!options.apiKey) throw new Error('HeroSignal: apiKey gerekli.');
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
      'user-agent': this.options.userAgent ?? 'herosignal-node/0.1.0',
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
        const err = new HeroSignalError(
          response.status,
          envelope.error?.code ?? `HTTP_${response.status}`,
          envelope.error?.message ?? `HTTP ${response.status}`,
          envelope.error?.request_id ?? response.headers.get('x-request-id') ?? undefined,
          envelope.error?.details,
        );
        if (!err.retryable || attempt >= maxRetries) throw err;
        const retryAfter = Number(response.headers.get('retry-after'));
        await this.sleep(
          Number.isFinite(retryAfter) && retryAfter > 0
            ? retryAfter * 1000
            : BACKOFF_MS[Math.min(attempt, BACKOFF_MS.length - 1)]!,
        );
      } catch (err) {
        if (err instanceof HeroSignalError) throw err;
        if (attempt >= maxRetries) {
          throw new HeroSignalError(
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
