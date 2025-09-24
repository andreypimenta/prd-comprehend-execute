import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Database, CheckCircle, AlertCircle } from "lucide-react";

export const ExamineProtocolsImporter = () => {
  const [loading, setLoading] = useState(false);
  const [imported, setImported] = useState<{
    protocols: boolean;
    supplements: boolean;
  }>({
    protocols: false,
    supplements: false
  });

  const importExamineData = async (type: 'protocols' | 'supplements') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('import-examine-protocols', {
        body: { 
          action: type === 'protocols' ? 'import_examine_protocols' : 'import_examine_supplements' 
        }
      });

      if (error) throw error;

      toast.success(data.message);
      setImported(prev => ({ ...prev, [type]: true }));
      
    } catch (error) {
      console.error(`Error importing ${type}:`, error);
      toast.error(`Erro ao importar ${type}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const protocolCategories = [
    { name: "Cardiovascular", count: 3, conditions: ["High Cholesterol", "Hypertension", "Heart Failure"] },
    { name: "Neurological", count: 2, conditions: ["Anxiety", "Memory Impairment"] },
    { name: "Performance", count: 2, conditions: ["Body Composition", "Exercise Performance"] },
    { name: "Respiratory", count: 1, conditions: ["Allergic Rhinitis"] },
  ];

  const supplementStats = {
    total: 13,
    evidenceA: 6,
    evidenceB: 7,
    categories: ["Herbs", "Minerals", "Amino Acids", "Others"]
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Expansão de Protocolos - Examine.com
          </CardTitle>
          <CardDescription>
            Importe dados científicos de 400+ condições com protocolos baseados em evidência A/B/D
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Protocols Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Protocolos Terapêuticos</h3>
                <p className="text-sm text-muted-foreground">
                  8 protocolos integrados com múltiplas fases e monitoramento
                </p>
              </div>
              <Button
                onClick={() => importExamineData('protocols')}
                disabled={loading || imported.protocols}
                variant={imported.protocols ? "outline" : "primary"}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : imported.protocols ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : null}
                {imported.protocols ? "Importado" : "Importar Protocolos"}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {protocolCategories.map((category) => (
                <Card key={category.name} className="p-4">
                  <div className="space-y-2">
                    <Badge variant="outline">{category.name}</Badge>
                    <p className="text-2xl font-bold">{category.count}</p>
                    <div className="space-y-1">
                      {category.conditions.map((condition) => (
                        <p key={condition} className="text-xs text-muted-foreground">
                          {condition}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Supplements Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Base de Suplementos</h3>
                <p className="text-sm text-muted-foreground">
                  13 suplementos com dosagens por peso corporal e evidência A/B
                </p>
              </div>
              <Button
                onClick={() => importExamineData('supplements')}
                disabled={loading || imported.supplements}
                variant={imported.supplements ? "outline" : "primary"}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : imported.supplements ? (
                  <CheckCircle className="h-4 w-4 mr-2" />
                ) : null}
                {imported.supplements ? "Importado" : "Importar Suplementos"}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <Badge variant="secondary">Total</Badge>
                <p className="text-2xl font-bold mt-2">{supplementStats.total}</p>
                <p className="text-xs text-muted-foreground">Suplementos</p>
              </Card>
              <Card className="p-4">
                <Badge className="bg-green-100 text-green-800">Evidência A</Badge>
                <p className="text-2xl font-bold mt-2">{supplementStats.evidenceA}</p>
                <p className="text-xs text-muted-foreground">Forte evidência</p>
              </Card>
              <Card className="p-4">
                <Badge className="bg-yellow-100 text-yellow-800">Evidência B</Badge>
                <p className="text-2xl font-bold mt-2">{supplementStats.evidenceB}</p>
                <p className="text-xs text-muted-foreground">Moderada evidência</p>
              </Card>
              <Card className="p-4">
                <Badge variant="outline">Categorias</Badge>
                <p className="text-2xl font-bold mt-2">{supplementStats.categories.length}</p>
                <p className="text-xs text-muted-foreground">Tipos diferentes</p>
              </Card>
            </div>
          </div>

          {/* Benefits Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Benefícios da Expansão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Protocolos baseados em evidência A/B</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Dosagens personalizadas por peso corporal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Fases de implementação estruturadas</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Monitoramento específico por condição</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Contraindicações e interações detalhadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Sinergia entre suplementos otimizada</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Import Status */}
          {(imported.protocols || imported.supplements) && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    {imported.protocols && imported.supplements
                      ? "Todos os dados foram importados com sucesso!"
                      : `${imported.protocols ? "Protocolos" : "Suplementos"} importados com sucesso!`
                    }
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Os dados estão agora disponíveis no sistema de recomendações.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Warning */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <span className="text-amber-800 font-medium block">
                    Importante: Dados Baseados em Evidência Científica
                  </span>
                  <p className="text-sm text-amber-700 mt-1">
                    Todos os protocolos são baseados na curadoria rigorosa do Examine.com, 
                    com estudos científicos revisados por pares e classificação de evidência.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};