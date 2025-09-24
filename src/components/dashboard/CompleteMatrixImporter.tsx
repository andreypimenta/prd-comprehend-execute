import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Download, Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImportStats {
  totalSupplements: number;
  importedSupplements: number;
  skippedSupplements: number;
  therapeuticProtocols: number;
}

export const CompleteMatrixImporter: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importStats, setImportStats] = useState<ImportStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleCompleteImport = async () => {
    setIsImporting(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress during the import
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 90));
      }, 500);

      const { data, error: importError } = await supabase.functions.invoke('import-complete-matrix', {
        body: { action: 'import_complete_matrix' }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (importError) {
        throw new Error(importError.message || 'Erro na importação');
      }

      if (data?.success) {
        setImportStats(data.stats);
        toast.success('Importação completa finalizada com sucesso!');
      } else {
        throw new Error(data?.error || 'Erro desconhecido na importação');
      }
    } catch (err: any) {
      console.error('Erro na importação completa:', err);
      setError(err.message);
      toast.error('Erro na importação: ' + err.message);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Importação Completa do JSON (537 Suplementos)
        </CardTitle>
        <CardDescription>
          Importa todos os 537 suplementos únicos do arquivo matriz_final_consolidada.json 
          com mecanismos de ação, evidências científicas e protocolos terapêuticos.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Import Button */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleCompleteImport}
            disabled={isImporting}
            className="w-full"
            size="lg"
          >
            {isImporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Iniciar Importação Completa
              </>
            )}
          </Button>

          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso da importação</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Stats */}
        {importStats && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-semibold">Importação finalizada com sucesso!</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between">
                    <span>Total de suplementos:</span>
                    <Badge variant="secondary">{importStats.totalSupplements}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Importados:</span>
                    <Badge variant="default">{importStats.importedSupplements}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Já existiam:</span>
                    <Badge variant="outline">{importStats.skippedSupplements}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Protocolos criados:</span>
                    <Badge variant="secondary">{importStats.therapeuticProtocols}</Badge>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Information Card */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h4 className="font-semibold text-sm">O que será importado:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• 537 suplementos únicos com mecanismos de ação detalhados</li>
            <li>• Classificação por evidência científica (A, B, D)</li>
            <li>• Categorização por agente terapêutico</li>
            <li>• Protocolos terapêuticos para 62+ condições de saúde</li>
            <li>• Sistema de priorização baseado em evidência</li>
            <li>• Atualização de dados já existentes</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};