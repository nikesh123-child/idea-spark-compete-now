
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { logAuditEvent } from '@/utils/auditLogger';
import { checkRateLimit } from '@/utils/security';

export interface SecureAuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  loginAttempts: number;
  isLocked: boolean;
}

export const useSecureAuth = () => {
  const [authState, setAuthState] = useState<SecureAuthState>({
    user: null,
    session: null,
    loading: true,
    loginAttempts: 0,
    isLocked: false
  });

  useEffect(() => {
    // Initialize security headers
    const addSecurityHeaders = () => {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://ootdksampvekmrifdwau.supabase.co";
      document.head.appendChild(meta);
    };
    
    addSecurityHeaders();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false
        }));

        // Log authentication events
        if (event === 'SIGNED_IN') {
          await logAuditEvent({
            event_type: 'login_success',
            user_id: session?.user?.id,
            details: { method: 'email_password' }
          });
        } else if (event === 'SIGNED_OUT') {
          await logAuditEvent({
            event_type: 'logout',
            user_id: session?.user?.id
          });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false
      }));
    });

    return () => subscription.unsubscribe();
  }, []);

  const secureLogin = async (email: string, password: string) => {
    // Check rate limiting
    if (!checkRateLimit('login', 5, 15 * 60 * 1000)) { // 5 attempts per 15 minutes
      setAuthState(prev => ({ ...prev, isLocked: true }));
      await logAuditEvent({
        event_type: 'rate_limit_exceeded',
        details: { action: 'login', email }
      });
      throw new Error('Too many login attempts. Please try again later.');
    }

    try {
      await logAuditEvent({
        event_type: 'login_attempt',
        details: { email }
      });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          loginAttempts: prev.loginAttempts + 1 
        }));
        
        await logAuditEvent({
          event_type: 'login_failure',
          details: { email, error: error.message }
        });
        
        throw error;
      }

      // Reset login attempts on success
      setAuthState(prev => ({ 
        ...prev, 
        loginAttempts: 0,
        isLocked: false 
      }));

    } catch (error) {
      throw error;
    }
  };

  const secureLogout = async () => {
    try {
      await logAuditEvent({
        event_type: 'logout',
        user_id: authState.user?.id
      });
      
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    ...authState,
    secureLogin,
    secureLogout
  };
};
