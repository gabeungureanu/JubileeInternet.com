export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogContext {
  service?: string;
  requestId?: string;
  userId?: string;
  clientId?: string;
  traceId?: string;
  spanId?: string;
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

export interface Logger {
  trace(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: Error, context?: LogContext): void;
  fatal(message: string, error?: Error, context?: LogContext): void;
  child(context: LogContext): Logger;
}

const SENSITIVE_KEYS = [
  'password',
  'secret',
  'token',
  'key',
  'authorization',
  'cookie',
  'credential',
  'apikey',
  'api_key',
  'accesstoken',
  'access_token',
  'refreshtoken',
  'refresh_token',
  'idtoken',
  'id_token',
  'jwt',
  'bearer',
];

export function sanitizeLogData(data: unknown): unknown {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeLogData);
  }

  if (typeof data === 'object') {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = SENSITIVE_KEYS.some((sk) => lowerKey.includes(sk));

      if (isSensitive) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeLogData(value);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  return data;
}

export function createRequestContext(
  requestId: string,
  additionalContext?: Partial<LogContext>
): LogContext {
  return {
    requestId,
    ...additionalContext,
  };
}

export function createAuditContext(
  eventType: string,
  userId: string | null,
  clientId: string | null,
  additionalContext?: Record<string, unknown>
): LogContext {
  return {
    audit: true,
    eventType,
    userId: userId ?? undefined,
    clientId: clientId ?? undefined,
    ...additionalContext,
  } as LogContext;
}

export const AUDIT_EVENTS = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  LOGOUT: 'logout',
  TOKEN_ISSUED: 'token_issued',
  TOKEN_REFRESHED: 'token_refreshed',
  TOKEN_REVOKED: 'token_revoked',
  PASSWORD_CHANGED: 'password_changed',
  EMAIL_VERIFIED: 'email_verified',
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_UNLOCKED: 'account_unlocked',
  AUTHORIZATION_GRANTED: 'authorization_granted',
  AUTHORIZATION_DENIED: 'authorization_denied',
} as const;

export type AuditEvent = (typeof AUDIT_EVENTS)[keyof typeof AUDIT_EVENTS];
