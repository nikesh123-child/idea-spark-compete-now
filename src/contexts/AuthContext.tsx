
import { createContext, useContext, ReactNode } from 'react';
import { useSecureAuth, SecureAuthState } from '@/hooks/useSecureAuth';

type AuthContextType = SecureAuthState & {
  secureLogin: (email: string, password: string) => Promise<void>;
  secureLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const secureAuth = useSecureAuth();

  return (
    <AuthContext.Provider value={secureAuth}>
      {!secureAuth.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
