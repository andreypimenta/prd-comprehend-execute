import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { signInSchema, type SignInFormData } from "@/lib/validations";
import type { SignInCredentials } from "@/types/auth";
import { EmailConfirmationAlert } from "./EmailConfirmationAlert";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { signIn, user, isLoading } = useAuth();
  const { isProfileComplete, loading: profileLoading } = useUserProfile();
  const location = useLocation();
  const navigate = useNavigate();
  
  // All hooks must be called before any conditional logic
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema)
  });

  // Check for email confirmation success
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('confirmed') === 'true') {
      toast.success("Email confirmado com sucesso! Agora você pode fazer login normalmente.");
      // Clean up the URL
      navigate('/login', { replace: true });
    }
  }, [location.search, navigate]);
  
  // Handle redirect for logged in users based on profile completeness
  useEffect(() => {
    if (user && !profileLoading) {
      console.log("📝 LoginForm: Usuário logado, verificando perfil...", { 
        email: user.email, 
        isProfileComplete 
      });
      
      setIsRedirecting(true);
      
      if (isProfileComplete) {
        console.log("📝 LoginForm: Perfil completo, redirecionando para dashboard");
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        console.log("📝 LoginForm: Perfil incompleto, redirecionando para onboarding");
        navigate('/onboarding', { replace: true });
      }
    }
  }, [user, isProfileComplete, profileLoading, location.state, navigate]);

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("📝 LoginForm: Iniciando login para:", data.email);
      const response = await signIn(data.email, data.password);
      
      if (response.error) {
        console.log("📝 LoginForm: Erro no login:", response.error.message);
        
        // Tratamento específico para email não confirmado
        if (response.error.message.includes("Email not confirmed") || 
            response.error.message.includes("email_not_confirmed")) {
          setPendingEmail(data.email);
          setShowEmailConfirmation(true);
          toast.info("Email não confirmado. Confirme seu email para fazer login.");
        } else if (response.error.message.includes("requested path is invalid") ||
                   response.error.message.includes("localhost")) {
          toast.error("Problema com URLs do Supabase. Verifique a configuração.");
          setTimeout(() => {
            window.open('/supabase-config', '_blank');
          }, 1000);
        } else {
          setError("root", { message: response.error.message });
          toast.error(`Erro no login: ${response.error.message}`);
        }
      } else {
        console.log("📝 LoginForm: Login bem-sucedido! Aguardando verificação de perfil...");
        // O redirecionamento será feito pelo useEffect baseado no perfil
      }
    } catch (error) {
      console.error("📝 LoginForm: Erro inesperado:", error);
      toast.error("Erro inesperado. Tente novamente em alguns instantes.");
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    setSocialLoading(provider);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        if (error.message.includes("provider is not enabled")) {
          toast.error("Google OAuth não configurado. Configure no Supabase e tente novamente.");
          // Open config page after a delay
          setTimeout(() => {
            window.open('/google-oauth-setup', '_blank');
          }, 1000);
        } else {
          toast.error(`Erro no login: ${error.message}`);
        }
      }
    } catch (error) {
      toast.error(`Erro inesperado no login com ${provider === 'google' ? 'Google' : 'Apple'}`);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/95 shadow-card border-border/50">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Entrar no LoL Engine
        </CardTitle>
        <p className="text-muted-foreground">
          Faça login para acessar sua conta
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {showEmailConfirmation && (
          <EmailConfirmationAlert
            email={pendingEmail}
            onClose={() => setShowEmailConfirmation(false)}
          />
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                {...register("email")}
                type="email"
                placeholder="seu@email.com"
                className="pl-12"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                className="pl-12 pr-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-destructive text-sm text-center">{errors.root.message}</p>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || isRedirecting || profileLoading}
          >
            {isRedirecting ? "Redirecionando..." : isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialSignIn('google')}
            disabled={socialLoading !== null}
          >
            {socialLoading === 'google' ? (
              <div className="w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continuar com Google
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialSignIn('apple')}
            disabled={socialLoading !== null}
          >
            {socialLoading === 'apple' ? (
              <div className="w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            )}
            Continuar com Apple
          </Button>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Não tem uma conta? </span>
          <Link 
            to="/register" 
            className="text-primary hover:text-primary-glow font-semibold hover:underline transition-colors"
          >
            Criar conta
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}