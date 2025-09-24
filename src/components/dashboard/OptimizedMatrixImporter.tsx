import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Download, Database, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImportStats {
  supplements: {
    imported: number;
    skipped: number;
    total: number;
  };
  protocols: {
    imported: number;
    skipped: number;
    total: number;
  };
}

export function OptimizedMatrixImporter() {
  const [loadingSupplements, setLoadingSupplements] = useState(false);
  const [loadingProtocols, setLoadingProtocols] = useState(false);
  const [stats, setStats] = useState<ImportStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSupplementsImport = async () => {
    setLoadingSupplements(true);
    setError(null);
    
    try {
      toast.info("Iniciando importação de suplementos...");
      
      const { data, error } = await supabase.functions.invoke('import-supplements');
      
      if (error) throw error;
      
      if (data?.success) {
        const supplementStats = {
          imported: data.imported || 0,
          skipped: data.skipped || 0,
          total: data.total || 0
        };
        
        setStats(prev => ({
          ...prev,
          supplements: supplementStats
        }));
        
        toast.success(`✅ Suplementos importados com sucesso! ${supplementStats.imported} importados, ${supplementStats.skipped} ignorados`);
      } else {
        throw new Error(data?.error || 'Erro desconhecido na importação');
      }
    } catch (err: any) {
      console.error('Erro na importação de suplementos:', err);
      setError(`Erro na importação de suplementos: ${err.message}`);
      toast.error("❌ Erro na importação de suplementos");
    } finally {
      setLoadingSupplements(false);
    }
  };

  const handleProtocolsImport = async () => {
    setLoadingProtocols(true);
    setError(null);
    
    try {
      toast.info("Iniciando importação de protocolos...");
      
      const { data, error } = await supabase.functions.invoke('import-protocols');
      
      if (error) throw error;
      
      if (data?.success) {
        const protocolStats = {
          imported: data.imported || 0,
          skipped: data.skipped || 0,
          total: data.total || 0
        };
        
        setStats(prev => ({
          ...prev,
          protocols: protocolStats
        }));
        
        toast.success(`✅ Protocolos importados com sucesso! ${protocolStats.imported} importados, ${protocolStats.skipped} ignorados`);
      } else {
        throw new Error(data?.error || 'Erro desconhecido na importação');
      }
    } catch (err: any) {
      console.error('Erro na importação de protocolos:', err);
      setError(`Erro na importação de protocolos: ${err.message}`);
      toast.error("❌ Erro na importação de protocolos");
    } finally {
      setLoadingProtocols(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Importador de Matriz Otimizada
        </CardTitle>
        <CardDescription>
          Sistema otimizado para importação de suplementos e protocolos terapêuticos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Supplements Import */}
          <div className="space-y-3">
            <h3 className="font-semibold">Importar Suplementos</h3>
            <Button 
              onClick={handleSupplementsImport}
              disabled={loadingSupplements}
              className="w-full"
              variant="outline"
            >
              {loadingSupplements ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando Suplementos...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Importar Suplementos
                </>
              )}
            </Button>
            
            {stats?.supplements && (
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Importação Concluída</span>
                </div>
                <div className="text-sm space-y-1">
                  <p>Total: {stats.supplements.total}</p>
                  <p>Importados: {stats.supplements.imported}</p>
                  <p>Ignorados: {stats.supplements.skipped}</p>
                </div>
              </div>
            )}
          </div>

          {/* Protocols Import */}
          <div className="space-y-3">
            <h3 className="font-semibold">Importar Protocolos</h3>
            <Button 
              onClick={handleProtocolsImport}
              disabled={loadingProtocols}
              className="w-full"
              variant="outline"
            >
              {loadingProtocols ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando Protocolos...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Importar Protocolos
                </>
              )}
            </Button>
            
            {stats?.protocols && (
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Importação Concluída</span>
                </div>
                <div className="text-sm space-y-1">
                  <p>Total: {stats.protocols.total}</p>
                  <p>Importados: {stats.protocols.imported}</p>
                  <p>Ignorados: {stats.protocols.skipped}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">ℹ️ Sobre o Importador Otimizado</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Processamento em lotes pequenos para evitar timeout</li>
            <li>• Duas funções separadas para melhor performance</li>
            <li>• Importação de dados do arquivo JSON completo</li>
            <li>• Sistema de retry automático para falhas</li>
          </ul>
          
          <Button 
            onClick={async () => {
              try {
                toast.info("Preparando dados para importação...");
                const { data, error } = await supabase.functions.invoke('upload-matrix-data');
                if (error) throw error;
                if (data?.success) {
                  toast.success("✅ Dados preparados com sucesso!");
                } else {
                  throw new Error(data?.error || 'Erro na preparação dos dados');
                }
              } catch (err: any) {
                console.error('Erro na preparação:', err);
                toast.error("❌ Erro na preparação dos dados");
              }
            }}
            variant="secondary"
            size="sm"
            className="mt-3"
          >
            Preparar Dados para Importação
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}