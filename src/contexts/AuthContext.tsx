import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

interface AuthContextType {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'apple') => Promise<{ error?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("🔐 AuthContext: Inicializando autenticação...");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, supabaseSession) => {
        console.log("🔐 AuthContext: Evento de auth:", event, supabaseSession?.user?.email);
        
        setUser(supabaseSession?.user ?? null);
        setSession(supabaseSession ?? null);
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔐 AuthContext: Sessão inicial:", session?.user?.email || 'nenhuma');
      setUser(session?.user ?? null);
      setSession(session ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("🔐 AuthContext: Tentando fazer login...", email);
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("🔐 AuthContext: Erro no login:", error.message);
        return { error };
      }

      console.log("🔐 AuthContext: Login bem-sucedido!");
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Redirecionando...",
      });

      return {};
    } catch (error) {
      console.log("🔐 AuthContext: Erro inesperado:", error);
      return { error: { message: "Erro inesperado no login" } };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: name || '',
          }
        }
      });

      if (error) {
        return { error };
      }

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar a conta.",
      });

      return {};
    } catch (error) {
      return { error: { message: "Erro inesperado no cadastro" } };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();

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

  const signInWithProvider = async (provider: 'google' | 'apple') => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        return { error };
      }

      return {};
    } catch (error) {
      return { error: { message: `Erro no login com ${provider}` } };
    } finally {
      setIsLoading(false);
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