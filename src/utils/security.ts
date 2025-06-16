
import DOMPurify from 'dompurify';
import { z } from 'zod';

// Input validation and sanitization
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim());
};

export const validateInput = (input: string, schema: z.ZodSchema): boolean => {
  try {
    schema.parse(input);
    return true;
  } catch {
    return false;
  }
};

// CSRF Token generation and validation
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

export const setCSRFToken = (): string => {
  const token = generateCSRFToken();
  sessionStorage.setItem('csrf_token', token);
  return token;
};

export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken === token;
};

// Rate limiting client-side tracking
interface RateLimit {
  count: number;
  resetTime: number;
}

const rateLimits = new Map<string, RateLimit>();

export const checkRateLimit = (action: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const key = `${action}_${Math.floor(now / windowMs)}`;
  
  const current = rateLimits.get(key) || { count: 0, resetTime: now + windowMs };
  
  if (now > current.resetTime) {
    rateLimits.delete(key);
    return true;
  }
  
  if (current.count >= limit) {
    return false;
  }
  
  current.count++;
  rateLimits.set(key, current);
  return true;
};

// Password strength validation
export const validatePasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Security headers utility
export const addSecurityHeaders = (): void => {
  // Content Security Policy
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://ootdksampvekmrifdwau.supabase.co";
  document.head.appendChild(meta);
  
  // X-Frame-Options
  const frameOptions = document.createElement('meta');
  frameOptions.httpEquiv = 'X-Frame-Options';
  frameOptions.content = 'DENY';
  document.head.appendChild(frameOptions);
  
  // X-Content-Type-Options
  const contentType = document.createElement('meta');
  contentType.httpEquiv = 'X-Content-Type-Options';
  contentType.content = 'nosniff';
  document.head.appendChild(contentType);
};

// Secure error handling
export const handleSecureError = (error: any): string => {
  console.error('Security event:', error);
  
  // Log security events but don't expose details to users
  const genericMessage = 'An error occurred. Please try again or contact support if the problem persists.';
  
  // In development, you might want more details
  if (process.env.NODE_ENV === 'development') {
    console.warn('Development mode - showing detailed error:', error);
  }
  
  return genericMessage;
};
