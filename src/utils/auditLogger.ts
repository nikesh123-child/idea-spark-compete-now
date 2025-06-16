import { supabase } from '@/integrations/supabase/client';

export type AuditEventType = 
  | 'login_attempt'
  | 'login_success' 
  | 'login_failure'
  | 'logout'
  | 'password_change'
  | 'data_access'
  | 'security_violation'
  | 'rate_limit_exceeded';

export interface AuditLog {
  event_type: AuditEventType;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
  timestamp: string;
}

export const logAuditEvent = async (event: Omit<AuditLog, 'timestamp' | 'ip_address' | 'user_agent'>) => {
  try {
    const auditLog: AuditLog = {
      ...event,
      timestamp: new Date().toISOString(),
      ip_address: await getClientIP(),
      user_agent: navigator.userAgent
    };

    // In a real application, you'd send this to your backend
    // For now, we'll log to console and localStorage for demonstration
    console.log('Audit Event:', auditLog);
    
    const existingLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
    existingLogs.push(auditLog);
    
    // Keep only last 100 entries to prevent storage overflow
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100);
    }
    
    localStorage.setItem('audit_logs', JSON.stringify(existingLogs));
    
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
};

const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
};

export const getAuditLogs = (): AuditLog[] => {
  try {
    return JSON.parse(localStorage.getItem('audit_logs') || '[]');
  } catch {
    return [];
  }
};
