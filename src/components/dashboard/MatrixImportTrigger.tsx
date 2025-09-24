import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Database, CheckCircle } from 'lucide-react';

export const MatrixImportTrigger = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const { toast } = useToast();

  const executeImport = async () => {
    setIsImporting(true);
    setImportResult(null);
    
    try {
      console.log('🚀 Iniciando importação da matriz...');
      
      const { data, error } = await supabase.functions.invoke('execute-matrix-import', {
        body: { action: 'import_matrix_data' }
      });

      if (error) {
        throw error;
      }

      console.log('✅ Importação concluída:', data);
      setImportResult(data);
      
      toast({
        title: "Importação Concluída!",
        description: `${data.stats?.supplements || 0} suplementos e ${data.stats?.protocols || 0} protocolos importados`,
      });

    } catch (error: any) {
      console.error('❌ Erro na importação:', error);
      
      toast({
        variant: "destructive",
        title: "Erro na Importação",
        description: error.message || 'Ocorreu um erro durante a importação',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="p-6 bg-card rounded-lg border">
      <div className="flex items-center gap-3 mb-4">
        <Database className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Importação da Matriz de Dados</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Execute a importação completa dos dados da matriz consolidada para popular a base de dados com suplementos e protocolos terapêuticos.
        </p>
        
        <Button 
          onClick={executeImport}
          disabled={isImporting}
          className="w-full"
        >
          {isImporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importando Dados...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Executar Importação Completa
            </>
          )}
        </Button>

        {importResult && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Importação Realizada com Sucesso!
              </span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Suplementos: {importResult.stats?.supplements || 0}</p>
              <p>• Protocolos: {importResult.stats?.protocols || 0}</p>
              <p>• Condições: {importResult.stats?.conditions || 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};