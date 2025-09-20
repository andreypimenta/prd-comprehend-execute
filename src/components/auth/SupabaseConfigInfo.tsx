import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, ExternalLink, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function SupabaseConfigInfo() {
  const { toast } = useToast();
  const currentUrl = window.location.origin;
  const projectId = "ehjpdcbyoqaoazknymbj";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência`,
    });
  };

  const openSupabaseAuth = () => {
    window.open(`https://supabase.com/dashboard/project/${projectId}/auth/url-configuration`, '_blank');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuração Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            <strong>CRÍTICO:</strong> Para resolver o erro de redirecionamento do email, configure estas URLs EXATAS no Supabase Dashboard:
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Site URL (copiar exatamente):</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="flex-1 p-2 bg-muted rounded text-sm">{currentUrl}</code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(currentUrl, 'Site URL')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Additional Redirect URLs (adicionar esta linha):</label>
            <div className="flex items-center gap-2 mt-1">
              <code className="flex-1 p-2 bg-muted rounded text-sm">{currentUrl}/**</code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(`${currentUrl}/**`, 'Redirect URL')}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <Button onClick={openSupabaseAuth} className="w-full">
          <ExternalLink className="w-4 h-4 mr-2" />
          Abrir Configuração no Supabase
        </Button>

        <Button 
          variant="outline"
          onClick={() => window.open('/google-oauth-setup', '_blank')}
          className="w-full"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Configurar Google OAuth
        </Button>

        <Alert>
          <AlertDescription className="text-xs">
            <strong>Passos:</strong><br />
            1. Clique no botão acima para abrir o Supabase Dashboard<br />
            2. Atualize o "Site URL" com a URL atual<br />
            3. Adicione a URL de redirecionamento na lista<br />
            4. Clique em "Save" para salvar as alterações
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}