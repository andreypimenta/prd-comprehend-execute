import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
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
  const [user, setUser] = React.useState<SupabaseUser | null>(null);
  const [session, setSession] = React.useState<SupabaseSession | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("🔐 AuthContext: Inicializando autenticação...");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, supabaseSession) => {
        console.log("🔐 AuthContext: Evento de auth:", event, supabaseSession?.user?.email);
        
        setUser(supabaseSession?.user ?? null);
        setSession(supabaseSession ?? null);
        setIsLoading(false);

        // Handle post-authentication navigation
        if (event === 'SIGNED_IN' && supabaseSession?.user) {
          setTimeout(() => {
            checkUserProfileAndRedirect(supabaseSession.user.id);
          }, 0);
        }
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

  const checkUserProfileAndRedirect = async (userId: string) => {
    try {
      // Check if user has completed profile (onboarding)
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profile) {
        // User has completed onboarding, go to dashboard
        navigate('/dashboard');
      } else {
        // User needs to complete onboarding
        navigate('/onboarding');
      }
    } catch (error) {
      // If no profile or error, assume onboarding is needed
      navigate('/onboarding');
    }
  };

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
      
      toast.success("Login realizado com sucesso!");

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

      toast.success("Conta criada com sucesso! Verifique seu email para confirmar a conta.");

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

      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'apple') => {
    try {
      console.log(`🔐 AuthContext: Tentando login com ${provider}...`);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        console.log(`🔐 AuthContext: Erro no login com ${provider}:`, error.message);
        return { error };
      }

      console.log(`🔐 AuthContext: Redirecionando para ${provider}...`);
      return {};
    } catch (error) {
      console.log(`🔐 AuthContext: Erro inesperado no ${provider}:`, error);
      return { error: { message: `Erro no login com ${provider}` } };
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