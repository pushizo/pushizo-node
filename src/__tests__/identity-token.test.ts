import { generateKeyPairSync, verify } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { HeroSignal, createIdentityToken } from '../index.js';

describe('SDK JWT identity verification belirteci (ES256)', () => {
  const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' });

  it('başlık, talepler ve r||s imzası doğrulanabilir', () => {
    const token = createIdentityToken({ privateKey, kid: 'main', appId: 'app_1', externalId: 'kullanici-1', expiresInSeconds: 600, now: 1_800_000_000 });
    const [h, p, s] = token.split('.');
    expect(JSON.parse(Buffer.from(h!, 'base64url').toString())).toEqual({ alg: 'ES256', typ: 'JWT', kid: 'main' });
    expect(JSON.parse(Buffer.from(p!, 'base64url').toString())).toEqual({ sub: 'kullanici-1', aud: 'app_1', iat: 1_800_000_000, exp: 1_800_000_600 });
    const sig = Buffer.from(s!, 'base64url');
    expect(sig).toHaveLength(64);
    expect(verify('sha256', Buffer.from(`${h}.${p}`), { key: publicKey, dsaEncoding: 'ieee-p1363' }, sig)).toBe(true);
  });

  it('PEM anahtarı kabul eder; statik yardımcı aynı sonucu üretir; 24 saatten uzun ömür reddedilir', () => {
    const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
    const opts = { privateKey: pem, kid: 'k', appId: 'a', externalId: 'e', now: 1 };
    expect(HeroSignal.identityToken(opts).split('.').slice(0, 2)).toEqual(createIdentityToken(opts).split('.').slice(0, 2));
    expect(() => createIdentityToken({ ...opts, expiresInSeconds: 90_000 })).toThrow();
  });
});
