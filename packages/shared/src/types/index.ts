export interface JubileeUser {
  id: string;
  email: string;
  emailVerified: boolean;
  displayName: string | null;
}

export interface JubileeTokenPayload {
  sub: string;
  iss: string;
  aud: string | string[];
  exp: number;
  iat: number;
  scope?: string;
  client_id?: string;
}

export interface JubileeIdTokenPayload extends JubileeTokenPayload {
  email?: string;
  email_verified?: boolean;
  name?: string;
  nonce?: string;
  auth_time?: number;
}

export interface TokenValidationResult {
  valid: boolean;
  payload?: JubileeTokenPayload;
  error?: string;
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  idToken?: string;
  expiresIn: number;
  tokenType: 'Bearer';
  scope?: string;
}

export type JubileeService = 'jubilee-browser' | 'jubilee-bible' | 'jubilee-sso';

export interface ServiceContext {
  service: JubileeService;
  environment: 'development' | 'staging' | 'production';
  version: string;
}
