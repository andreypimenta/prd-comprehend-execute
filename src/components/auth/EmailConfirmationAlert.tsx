import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Mail, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailConfirmationAlertProps {
  email: string;
  onClose?: () => void;
}

export function EmailConfirmationAlert({ email, onClose }: EmailConfirmationAlertProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [lastResendTime, setLastResendTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleResendConfirmation = async () => {
    if (resendCount >= 3) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de reenvios. Aguarde alguns minutos.",
        variant: "destructive",
      });
      return;
    }

    setIsResending(true);
    
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
        setResendCount(prev => prev + 1);
        setLastResendTime(new Date());
        toast({
          title: "Email enviado!",
          description: "Verifique sua caixa de entrada e spam.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const canResend = resendCount < 3 && (!lastResendTime || 
    new Date().getTime() - lastResendTime.getTime() > 60000); // 1 minuto entre reenvios

  return (
    <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="space-y-3">
        <div className="space-y-2">
          <p className="font-medium text-amber-800 dark:text-amber-200">
            Confirme seu email para continuar
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Enviamos um link de confirmação para <strong>{email}</strong>. 
            Clique no link para ativar sua conta e fazer login.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendConfirmation}
            disabled={isResending || !canResend}
            className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900"
          >
            {isResending ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Reenviar email ({3 - resendCount} restantes)
              </>
            )}
          </Button>
          
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-amber-700 hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900"
            >
              Fechar
            </Button>
          )}
        </div>

        <div className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
          <p className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Verifique também a pasta de spam
          </p>
          <p className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            O link expira em 24 horas
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
}