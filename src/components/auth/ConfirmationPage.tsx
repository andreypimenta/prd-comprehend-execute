import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Clock, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const confirmed = searchParams.get('confirmed');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    if (confirmed === 'true') {
      setStatus('success');
      toast({
        title: "Email confirmado!",
        description: "Sua conta foi ativada com sucesso.",
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else if (error) {
      if (error === 'access_denied' || errorDescription?.includes('expired')) {
        setStatus('expired');
      } else {
        setStatus('error');
      }
    }
  }, [searchParams, navigate, toast]);

  const handleResendConfirmation = async () => {
    if (!email) {
      toast({
        title: "Email necessário",
        description: "Digite seu email para reenviar a confirmação.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/login?confirmed=true`
        }
      });

      if (error) {
        toast({
          title: "Erro ao reenviar",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email enviado!",
          description: "Verifique sua caixa de entrada e spam.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="flex items-center justify-center py-8">
            <Clock className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Confirmando email...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">Email Confirmado!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Sua conta foi ativada com sucesso. Você será redirecionado automaticamente.
            </p>
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Ir para Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl">
            {status === 'expired' ? 'Link Expirado' : 'Erro na Confirmação'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertDescription>
              {status === 'expired' 
                ? 'O link de confirmação expirou ou já foi usado. Solicite um novo link.'
                : 'Houve um problema ao confirmar seu email. Tente novamente.'
              }
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            />
            
            <Button 
              onClick={handleResendConfirmation}
              className="w-full"
              disabled={!email}
            >
              <Mail className="w-4 h-4 mr-2" />
              Reenviar Confirmação
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Voltar ao Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}