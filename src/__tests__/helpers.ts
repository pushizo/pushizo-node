import { HeroSignal, type HeroSignalOptions } from '../index.js';

/** Sahte fetch'in kaydettiği istek. */
export interface RecordedCall {
  url: string;
  method: string;
  headers: Record<string, string>;
  /** JSON gövdeler metin, multipart gövdeler `FormData` olarak kalır. */
  body?: string | FormData;
}

export const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  });

/** Gerçek ağ olmadan istekleri kaydeden istemci (varsayılan app `app_1`). */
export function fakeClient(
  handler: (call: RecordedCall) => Response | Promise<Response> = () =>
    json(200, { data: [], next_cursor: null, has_more: false }),
  extra: Partial<HeroSignalOptions> = {},
) {
  const calls: RecordedCall[] = [];
  const hs = new HeroSignal({
    apiKey: 'hs_live_test',
    baseUrl: 'https://api.test/',
    appId: 'app_1',
    sleep: async () => undefined,
    fetch: async (input, init) => {
      const call: RecordedCall = {
        url:
          typeof input === 'string'
            ? input
            : input instanceof Request
              ? input.url
              : input.toString(),
        method: init?.method ?? 'GET',
        headers: (init?.headers as Record<string, string>) ?? {},
        body: init?.body as string | FormData | undefined,
      };
      calls.push(call);
      return handler(call);
    },
    ...extra,
  });
  return { hs, calls };
}
