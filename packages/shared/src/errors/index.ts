export class JubileeError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    code: string,
    statusCode: number,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'JubileeError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, JubileeError.prototype);
  }

  toJSON(): Record<string, unknown> {
    return {
      error: this.code,
      error_description: this.message,
      details: this.details,
    };
  }
}

export class AuthenticationError extends JubileeError {
  constructor(message: string, code = 'authentication_error', details?: Record<string, unknown>) {
    super(message, code, 401, details);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends JubileeError {
  constructor(message: string, code = 'authorization_error', details?: Record<string, unknown>) {
    super(message, code, 403, details);
    this.name = 'AuthorizationError';
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class ValidationError extends JubileeError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'validation_error', 400, details);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends JubileeError {
  constructor(resource: string) {
    super(`${resource} not found`, 'not_found', 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class RateLimitError extends JubileeError {
  public readonly retryAfter: number;

  constructor(retryAfter: number) {
    super('Too many requests', 'rate_limit_exceeded', 429, { retryAfter });
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

export class InternalError extends JubileeError {
  constructor(message = 'Internal server error') {
    super(message, 'internal_error', 500);
    this.name = 'InternalError';
    Object.setPrototypeOf(this, InternalError.prototype);
  }
}

export function isJubileeError(error: unknown): error is JubileeError {
  return error instanceof JubileeError;
}

export function toJubileeError(error: unknown): JubileeError {
  if (isJubileeError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalError(error.message);
  }

  return new InternalError('Unknown error');
}
