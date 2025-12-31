import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email must be at most 255 characters')
  .transform((email) => email.toLowerCase().trim());

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .refine(
    (password) => /[A-Z]/.test(password),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (password) => /[0-9]/.test(password),
    'Password must contain at least one number'
  );

export const displayNameSchema = z
  .string()
  .min(1, 'Display name is required')
  .max(100, 'Display name must be at most 100 characters')
  .trim();

export const uuidSchema = z.string().uuid('Invalid UUID format');

export const urlSchema = z.string().url('Invalid URL format');

export const redirectUriSchema = z
  .string()
  .url('Invalid redirect URI')
  .refine(
    (uri) => {
      try {
        const url = new URL(uri);
        return url.protocol === 'https:' || url.hostname === 'localhost' || url.hostname === '127.0.0.1';
      } catch {
        return false;
      }
    },
    'Redirect URI must use HTTPS (except for localhost)'
  );

export const scopeSchema = z
  .string()
  .regex(
    /^[a-zA-Z_][a-zA-Z0-9_]*$/,
    'Scope must start with a letter or underscore and contain only alphanumeric characters and underscores'
  );

export const scopeListSchema = z
  .string()
  .transform((s) => s.split(' ').filter(Boolean))
  .pipe(z.array(scopeSchema));

export const clientIdSchema = z
  .string()
  .min(8, 'Client ID must be at least 8 characters')
  .max(64, 'Client ID must be at most 64 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Client ID must contain only alphanumeric characters, hyphens, and underscores');

export const stateSchema = z
  .string()
  .min(16, 'State must be at least 16 characters')
  .max(512, 'State must be at most 512 characters');

export const nonceSchema = z
  .string()
  .min(16, 'Nonce must be at least 16 characters')
  .max(512, 'Nonce must be at most 512 characters');

export const codeVerifierSchema = z
  .string()
  .min(43, 'Code verifier must be at least 43 characters')
  .max(128, 'Code verifier must be at most 128 characters')
  .regex(/^[A-Za-z0-9._~-]+$/, 'Code verifier contains invalid characters');

export const codeChallengeSchema = z
  .string()
  .min(43, 'Code challenge must be at least 43 characters')
  .max(128, 'Code challenge must be at most 128 characters');

export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

export function validateSafe<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, errors: result.error };
}

export function formatValidationErrors(error: z.ZodError): string[] {
  return error.errors.map((e) => {
    const path = e.path.join('.');
    return path !== '' ? `${path}: ${e.message}` : e.message;
  });
}
