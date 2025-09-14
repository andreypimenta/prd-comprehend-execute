import { CheckCircle, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SuccessRegistrationMessageProps {
  email: string;
}

export function SuccessRegistrationMessage({ email }: SuccessRegistrationMessageProps) {
  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/95 shadow-card border-border/50">
      <CardContent className="pt-6 space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Conta criada com sucesso!
          </h2>
          <p className="text-muted-foreground">
            Falta apenas um passo para completar seu cadastro.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300">
            <Mail className="w-5 h-5" />
            <span className="font-medium">Confirme seu email</span>
          </div>
          
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Enviamos um link de confirmação para:
          </p>
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 bg-amber-100 dark:bg-amber-900 px-3 py-2 rounded border">
            {email}
          </p>
          
          <div className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
            <p>• Clique no link para ativar sua conta</p>
            <p>• Verifique também a pasta de spam</p>
            <p>• O link expira em 24 horas</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Após confirmar seu email, você poderá fazer login normalmente.
          </p>
          
          <Button asChild className="w-full">
            <Link to="/login">
              Ir para o login
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}