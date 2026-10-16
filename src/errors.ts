/** API hata zarfından türetilen istisna; `status` ve `code` ile programatik işleme. */
export class PushizoError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly requestId?: string,
    readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'PushizoError';
  }

  /** 429 veya 5xx: yeniden denenebilir. */
  get retryable(): boolean {
    return this.status === 0 || this.status === 429 || this.status >= 500;
  }
}
