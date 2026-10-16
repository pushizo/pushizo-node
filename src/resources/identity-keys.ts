import { createPrivateKey, sign, type KeyObject } from 'node:crypto';
import type { CreateIdentityKeyInput, IdentityKey, IdentityKeyList } from '../types.js';
import { enc, type ResourceContext } from './context.js';

/**
 * SDK JWT identity verification genel anahtarları (`admin` kapsamı, ADR-0023). Yalnızca genel anahtar (JWK veya PEM)
 * gönderilir; özel anahtar sunucunuzda kalır ve `createIdentityToken` ile belirteç imzalanır.
 */
export function createIdentityKeys(ctx: ResourceContext) {
  const base = (appId?: string) => `${ctx.appPath(appId)}/identity-keys`;
  return {
    list: (appId?: string) => ctx.http.request<IdentityKeyList>({ method: 'GET', path: base(appId) }),
    create: (body: CreateIdentityKeyInput, appId?: string) => ctx.http.request<IdentityKey>({ method: 'POST', path: base(appId), body }),
    /** Anahtarı iptal eder: bu anahtarla imzalı belirteçler artık kabul edilmez. */
    revoke: (keyId: string, appId?: string) => ctx.http.request<IdentityKey>({ method: 'DELETE', path: `${base(appId)}/${enc(keyId)}` }),
  };
}

export interface IdentityTokenOptions {
  /** ES256 (P-256) özel anahtarı: PEM veya KeyObject. */
  privateKey: string | KeyObject;
  /** Panelde/API'de kayıtlı anahtar kimliği. */
  kid: string;
  appId: string;
  externalId: string;
  /** Ömür (saniye, en çok 86 400). Varsayılan 3600. */
  expiresInSeconds?: number;
  /** Testler için sabit zaman (saniye). */
  now?: number;
}

const b64url = (input: Buffer | string) => Buffer.from(input).toString('base64url');

/**
 * SDK'ya verilecek kimlik belirteci (JWT, ES256): `sub` = external_id, `aud` = app_id. Mobil/web uygulamanız bu
 * belirteci kendi sunucunuzdan alır ve `Pushizo.login(externalId, { jwt })` ile SDK'ya verir.
 */
export function createIdentityToken(opts: IdentityTokenOptions): string {
  const ttl = opts.expiresInSeconds ?? 3600;
  if (ttl <= 0 || ttl > 86_400) throw new Error('expiresInSeconds 1…86400 aralığında olmalı.');
  const iat = opts.now ?? Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'ES256', typ: 'JWT', kid: opts.kid }));
  const payload = b64url(JSON.stringify({ sub: opts.externalId, aud: opts.appId, iat, exp: iat + ttl }));
  const key = typeof opts.privateKey === 'string' ? createPrivateKey(opts.privateKey) : opts.privateKey;
  // JWS ES256 imzası DER değil r||s (IEEE P1363) biçimindedir.
  const signature = sign('sha256', Buffer.from(`${header}.${payload}`), { key, dsaEncoding: 'ieee-p1363' });
  return `${header}.${payload}.${b64url(signature)}`;
}
