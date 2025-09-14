import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { AuthContextType, User, Session, SignInCredentials, SignUpCredentials } from '@/types/auth';
import * as authLib from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        if (supabaseSession?.user) {
          // Get our custom user data
          const customUser = await authLib.getUserByAuthId(supabaseSession.user.id);
          if (customUser) {
            setUser(customUser);
            setSession({
              id: supabaseSession.access_token.substring(0, 20),
              sessionToken: supabaseSession.access_token,
              userId: customUser.id,
              expires: new Date(supabaseSession.expires_at ? supabaseSession.expires_at * 1000 : Date.now() + 3600000),
              createdAt: new Date(),
            });
          }
        } else {
          setUser(null);
          setSession(null);
        }
        setIsLoading(false);
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      const sessionData = await authLib.getCurrentSession();
      if (sessionData) {
        setUser(sessionData.user);
        setSession(sessionData.session);
      }
      setIsLoading(false);
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (credentials: SignInCredentials) => {
    try {
      setIsLoading(true);
      const response = await authLib.signIn(credentials);

      if (response.error) {
        return response;
      }

      if (response.user && response.session) {
        setUser(response.user);
        setSession(response.session);
      }

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
      });

      return response;
    } catch (error) {
      return { error: { message: "Erro inesperado no login" } };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      setIsLoading(true);
      const response = await authLib.signUp(credentials);

      if (response.error) {
        return response;
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar a conta.",
      });

      return response;
    } catch (error) {
      return { error: { message: "Erro inesperado no cadastro" } };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await authLib.signOut();
      
      setUser(null);
      setSession(null);

      toast({
        title: "Logout realizado com sucesso!",
        description: "Até logo!",
      });
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Erro ao fazer logout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: string) => {
    try {
      setIsLoading(true);
      const response = await authLib.signInWithProvider(provider as 'google' | 'apple');

      if (response.error) {
        return response;
      }

      return response;
    } catch (error) {
      return { error: { message: `Erro no login com ${provider}` } };
    } finally {
      setIsLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      await authLib.refreshSession();
      const sessionData = await authLib.getCurrentSession();
      if (sessionData) {
        setUser(sessionData.user);
        setSession(sessionData.session);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      if (!user) {
        return { error: { message: "Usuário não autenticado" } };
      }

      const updatedUser = await authLib.updateUser(user.id, data);
      if (updatedUser) {
        setUser(updatedUser);
        return { user: updatedUser };
      }

      return { error: { message: "Erro ao atualizar usuário" } };
    } catch (error) {
      return { error: { message: "Erro inesperado ao atualizar usuário" } };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    signInWithProvider,
    refreshSession,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}