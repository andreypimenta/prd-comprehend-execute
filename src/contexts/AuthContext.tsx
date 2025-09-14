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
    console.log("🔐 AuthContext: Inicializando autenticação...");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, supabaseSession) => {
        console.log("🔐 AuthContext: Evento de auth:", event, supabaseSession?.user?.email);
        
        if (supabaseSession?.user) {
          console.log("🔐 AuthContext: Usuário detectado, buscando dados customizados...");
          // Get our custom user data
          const customUser = await authLib.getUserByAuthId(supabaseSession.user.id);
          if (customUser) {
            console.log("🔐 AuthContext: Dados customizados encontrados:", customUser.email);
            setUser(customUser);
            setSession({
              id: supabaseSession.access_token.substring(0, 20),
              sessionToken: supabaseSession.access_token,
              userId: customUser.id,
              expires: new Date(supabaseSession.expires_at ? supabaseSession.expires_at * 1000 : Date.now() + 3600000),
              createdAt: new Date(),
            });
          } else {
            console.log("🔐 AuthContext: Dados customizados não encontrados");
          }
        } else {
          console.log("🔐 AuthContext: Nenhum usuário, limpando estado");
          setUser(null);
          setSession(null);
        }
        setIsLoading(false);
      }
    );

    // Get initial session - apenas uma vez
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔐 AuthContext: Sessão inicial:", session?.user?.email || 'nenhuma');
      if (!session) {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (credentials: SignInCredentials) => {
    try {
      console.log("🔐 AuthContext: Tentando fazer login...", credentials.email);
      setIsLoading(true);
      const response = await authLib.signIn(credentials);

      if (response.error) {
        console.log("🔐 AuthContext: Erro no login:", response.error.message);
        return response;
      }

      console.log("🔐 AuthContext: Login bem-sucedido! onAuthStateChange vai atualizar o estado");
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando...",
      });

      return response;
    } catch (error) {
      console.log("🔐 AuthContext: Erro inesperado:", error);
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