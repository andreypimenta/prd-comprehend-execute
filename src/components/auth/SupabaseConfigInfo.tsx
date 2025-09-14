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