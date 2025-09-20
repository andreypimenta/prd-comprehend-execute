import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface DiagnosticCheck {
  name: string;
  status: 'checking' | 'success' | 'error' | 'warning';
  message: string;
  action?: () => void;
  actionLabel?: string;
}

export function GoogleOAuthDiagnostic() {
  const [checks, setChecks] = useState<DiagnosticCheck[]>([
    {
      name: "Conectividade com Google",
      status: 'checking',
      message: "Verificando conexão com accounts.google.com..."
    },
    {
      name: "Configuração do Supabase",
      status: 'checking', 
      message: "Verificando se Google Provider está ativo..."
    },
    {
      name: "URLs de Redirecionamento",
      status: 'checking',
      message: "Verificando configuração de URLs..."
    }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência!`);
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    
    // Reset all checks to checking
    setChecks(prev => prev.map(check => ({
      ...check,
      status: 'checking' as const
    })));

    // Check 1: Google connectivity
    try {
      const response = await fetch('https://accounts.google.com/.well-known/openid_configuration', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      
      setChecks(prev => prev.map((check, index) => 
        index === 0 ? {
          ...check,
          status: 'success' as const,
          message: "Conectividade com Google OK"
        } : check
      ));
    } catch (error) {
      setChecks(prev => prev.map((check, index) => 
        index === 0 ? {
          ...check,
          status: 'error' as const,
          message: "❌ Não é possível conectar com accounts.google.com. Verifique firewall/proxy."
        } : check
      ));
    }

    // Check 2: Supabase Google Provider
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { skipBrowserRedirect: true }
      });
      
      if (error && error.message.includes('provider is not enabled')) {
        setChecks(prev => prev.map((check, index) => 
          index === 1 ? {
            ...check,
            status: 'error' as const,
            message: "❌ Google Provider não está habilitado no Supabase",
            action: () => openUrl(`https://supabase.com/dashboard/project/ehjpdcbyoqaoazknymbj/auth/providers`),
            actionLabel: "Configurar no Supabase"
          } : check
        ));
      } else {
        setChecks(prev => prev.map((check, index) => 
          index === 1 ? {
            ...check,
            status: 'success' as const,
            message: "✅ Google Provider configurado no Supabase"
          } : check
        ));
      }
    } catch (error) {
      setChecks(prev => prev.map((check, index) => 
        index === 1 ? {
          ...check,
          status: 'warning' as const,
          message: "⚠️ Não foi possível verificar configuração do Supabase"
        } : check
      ));
    }

    // Check 3: URLs Configuration
    const currentUrl = window.location.origin;
    const expectedRedirectUrl = "https://ehjpdcbyoqaoazknymbj.supabase.co/auth/v1/callback";
    
    setChecks(prev => prev.map((check, index) => 
      index === 2 ? {
        ...check,
        status: 'warning' as const,
        message: "⚠️ Verifique URLs no Google Cloud Console manualmente",
        action: () => openUrl('https://console.cloud.google.com/apis/credentials'),
        actionLabel: "Abrir Google Console"
      } : check
    ));

    setIsRunning(false);
  };

  const getStatusIcon = (status: DiagnosticCheck['status']) => {
    switch (status) {
      case 'checking':
        return <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: DiagnosticCheck['status']) => {
    const variants = {
      checking: 'secondary',
      success: 'default',
      error: 'destructive', 
      warning: 'outline'
    } as const;
    
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Diagnóstico do Google OAuth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Erros comuns do Google OAuth:</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• <strong>403 - "Você não tem acesso a esta página"</strong>: OAuth Consent Screen não configurado ou app em modo "Testing" sem usuários autorizados</li>
                <li>• <strong>"Conexão recusada"</strong>: URLs incorretas no Google Cloud Console</li>
                <li>• <strong>"redirect_uri_mismatch"</strong>: URL de callback não coincide</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Verificações Automáticas</h3>
            <Button onClick={runDiagnostics} disabled={isRunning}>
              {isRunning ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
              {isRunning ? 'Verificando...' : 'Executar Diagnóstico'}
            </Button>
          </div>

          <div className="space-y-3">
            {checks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <div className="font-medium">{check.name}</div>
                    <div className="text-sm text-muted-foreground">{check.message}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(check.status)}
                  {check.action && check.actionLabel && (
                    <Button size="sm" variant="outline" onClick={check.action}>
                      {check.actionLabel}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuração Manual Necessária</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">1. URLs para Google Cloud Console</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm font-mono">https://8594051b-3005-4567-a5cf-abaa6c55c493.lovableproject.com</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard('https://8594051b-3005-4567-a5cf-abaa6c55c493.lovableproject.com', 'URL do projeto')}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm font-mono">http://localhost:3000</span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => copyToClipboard('http://localhost:3000', 'URL localhost')}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Adicione essas URLs em <strong>"Authorized JavaScript origins"</strong>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. URL de Redirecionamento</h4>
              <div className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm font-mono">https://ehjpdcbyoqaoazknymbj.supabase.co/auth/v1/callback</span>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => copyToClipboard('https://ehjpdcbyoqaoazknymbj.supabase.co/auth/v1/callback', 'URL de callback')}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Adicione esta URL em <strong>"Authorized redirect URIs"</strong>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. Escopos Necessários</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">openid</Badge>
                <Badge variant="outline">https://www.googleapis.com/auth/userinfo.email</Badge>
                <Badge variant="outline">https://www.googleapis.com/auth/userinfo.profile</Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => openUrl('https://console.cloud.google.com/apis/credentials')}
              className="flex-1"
            >
              Abrir Google Cloud Console
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => openUrl(`https://supabase.com/dashboard/project/ehjpdcbyoqaoazknymbj/auth/providers`)}
              className="flex-1"
            >
              Configurar Supabase
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🚨 Solução para Erro 403</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Erro 403 específico:</strong> O aplicativo está em modo "Testing" mas você não está na lista de usuários de teste.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-semibold">Opções para resolver:</h4>
            
            <div className="space-y-2">
              <h5 className="font-medium">Opção 1: Adicionar seu email como usuário de teste</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm pl-4">
                <li>Acesse o <strong>OAuth Consent Screen</strong> no Google Cloud Console</li>
                <li>Vá para a seção <strong>"Test users"</strong></li>
                <li>Clique em <strong>"ADD USERS"</strong></li>
                <li>Adicione seu email e salve</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Opção 2: Publicar o app (Recomendado)</h5>
              <ol className="list-decimal list-inside space-y-1 text-sm pl-4">
                <li>No <strong>OAuth Consent Screen</strong>, clique em <strong>"PUBLISH APP"</strong></li>
                <li>Confirme que quer tornar o app público</li>
                <li>O app ficará disponível para qualquer usuário Google</li>
              </ol>
            </div>
          </div>

          <Button 
            onClick={() => openUrl('https://console.cloud.google.com/apis/credentials/consent')}
            className="w-full"
          >
            Configurar OAuth Consent Screen
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Passo a Passo Completo</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-3 text-sm">
            <li><strong>Acesse o Google Cloud Console</strong> e selecione seu projeto</li>
            <li><strong>Configure o OAuth Consent Screen PRIMEIRO:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>Vá para "APIs & Services" → "OAuth consent screen"</li>
                <li>Escolha "External" e preencha as informações obrigatórias</li>
                <li>Adicione domínio autorizado: <code>ehjpdcbyoqaoazknymbj.supabase.co</code></li>
                <li>Publique o app ou adicione usuários de teste</li>
              </ul>
            </li>
            <li><strong>Crie as credenciais OAuth:</strong>
              <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                <li>Vá para "APIs & Services" → "Credentials"</li>
                <li>Crie OAuth 2.0 Client ID do tipo "Web application"</li>
                <li>Configure as URLs conforme mostrado acima</li>
              </ul>
            </li>
            <li><strong>Configure no Supabase</strong> com Client ID e Secret</li>
            <li><strong>Teste o login</strong> após salvar as configurações</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}