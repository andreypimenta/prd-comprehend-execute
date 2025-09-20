import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, ExternalLink, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function GoogleOAuthConfig() {
  
  const projectUrl = window.location.origin;
  const supabaseProjectId = "ehjpdcbyoqaoazknymbj";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência.`);
  };

  const openGoogleConsole = () => {
    window.open('https://console.cloud.google.com/apis/credentials', '_blank');
  };

  const openSupabaseAuth = () => {
    window.open(`https://supabase.com/dashboard/project/${supabaseProjectId}/auth/providers`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Configuração do Google OAuth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              O erro "provider is not enabled" indica que o Google OAuth não está configurado no Supabase.
              Siga os passos abaixo para configurar corretamente.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Configurar Google Cloud Console</h3>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Acesse o Google Cloud Console e configure as seguintes URLs:
                </p>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Authorized JavaScript origins:</label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <code className="flex-1 text-sm">{projectUrl}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(projectUrl, "JavaScript Origins")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Authorized redirect URIs:</label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <code className="flex-1 text-sm">
                      https://{supabaseProjectId}.supabase.co/auth/v1/callback
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `https://${supabaseProjectId}.supabase.co/auth/v1/callback`, 
                        "Redirect URI"
                      )}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button onClick={openGoogleConsole} className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Google Cloud Console
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">2. Configurar Supabase</h3>
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Após obter o Client ID e Client Secret do Google:
                </p>
                
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Acesse Authentication → Providers no painel do Supabase</li>
                  <li>Habilite o provedor Google</li>
                  <li>Cole o Client ID e Client Secret</li>
                  <li>Salve as configurações</li>
                </ul>

                <Button onClick={openSupabaseAuth} className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Configurações do Supabase
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">3. Escopos necessários</h3>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Configure os seguintes escopos no Google Cloud Console:
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li><code>https://www.googleapis.com/auth/userinfo.email</code></li>
                  <li><code>https://www.googleapis.com/auth/userinfo.profile</code></li>
                  <li><code>openid</code></li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}