import * as jose from 'jose';
import type { JubileeTokenPayload, JubileeIdTokenPayload, TokenValidationResult } from '../types/index.js';

export interface TokenValidatorConfig {
  issuer: string;
  jwksUri: string;
  audience?: string | string[];
  clockTolerance?: number;
}

export class TokenValidator {
  private jwks: jose.JWTVerifyGetKey;
  private config: TokenValidatorConfig;

  constructor(config: TokenValidatorConfig) {
    this.config = config;
    this.jwks = jose.createRemoteJWKSet(new URL(config.jwksUri));
  }

  async validateAccessToken(token: string): Promise<TokenValidationResult> {
    try {
      const { payload } = await jose.jwtVerify(token, this.jwks, {
        issuer: this.config.issuer,
        audience: this.config.audience,
        clockTolerance: this.config.clockTolerance ?? 30,
        typ: 'at+jwt',
      });

      return {
        valid: true,
        payload: payload as unknown as JubileeTokenPayload,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async validateIdToken(
    token: string,
    expectedNonce?: string
  ): Promise<TokenValidationResult> {
    try {
      const { payload } = await jose.jwtVerify(token, this.jwks, {
        issuer: this.config.issuer,
        audience: this.config.audience,
        clockTolerance: this.config.clockTolerance ?? 30,
      });

      const idPayload = payload as unknown as JubileeIdTokenPayload;

      if (expectedNonce !== undefined && idPayload.nonce !== expectedNonce) {
        return {
          valid: false,
          error: 'Nonce mismatch',
        };
      }

      return {
        valid: true,
        payload: idPayload,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export function extractBearerToken(authorizationHeader: string | undefined): string | null {
  if (authorizationHeader === undefined) {
    return null;
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    return null;
  }

  return authorizationHeader.slice(7);
}

export function parseScopes(scopeString: string | undefined): string[] {
  if (scopeString === undefined || scopeString.trim() === '') {
    return [];
  }

  return scopeString.split(' ').filter((s) => s.length > 0);
}

export function hasScope(tokenScopes: string[], requiredScope: string): boolean {
  return tokenScopes.includes(requiredScope);
}

export function hasAllScopes(tokenScopes: string[], requiredScopes: string[]): boolean {
  return requiredScopes.every((scope) => tokenScopes.includes(scope));
}

export function hasAnyScope(tokenScopes: string[], requiredScopes: string[]): boolean {
  return requiredScopes.some((scope) => tokenScopes.includes(scope));
}

export function generatePKCEChallenge(verifier: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);

  const hashBuffer = new Uint8Array(32);
  const crypto = globalThis.crypto;

  return crypto.subtle
    .digest('SHA-256', data)
    .then((hash) => {
      const hashArray = new Uint8Array(hash);
      return base64UrlEncode(hashArray);
    }) as unknown as string;
}

export function generatePKCEVerifier(length = 43): string {
  const array = new Uint8Array(length);
  globalThis.crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

function base64UrlEncode(data: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...data));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
