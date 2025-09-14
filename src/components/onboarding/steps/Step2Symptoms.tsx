import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { OnboardingData, AVAILABLE_SYMPTOMS } from "@/types/onboarding";
import { Activity, Search } from "lucide-react";

interface Step2SymptomsProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onValidation: (isValid: boolean) => void;
}

export function Step2Symptoms({ data, onUpdate, onValidation }: Step2SymptomsProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(data.symptoms || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSymptoms = AVAILABLE_SYMPTOMS.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Sempre válido, mesmo sem sintomas selecionados
    onValidation(true);
    onUpdate({ symptoms: selectedSymptoms });
  }, [selectedSymptoms]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Como você se sente?</CardTitle>
        <CardDescription className="text-lg">
          Selecione os sintomas que você tem sentido recentemente (opcional)
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar sintomas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sintomas selecionados */}
        {selectedSymptoms.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Selecionados ({selectedSymptoms.length}):</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <Badge
                  key={symptom}
                  variant="default"
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleSymptom(symptom)}
                >
                  {symptom} ✕
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Lista de sintomas */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Sintomas disponíveis:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto">
            {filteredSymptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom);
              return (
                <div
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{symptom}</span>
                    {isSelected && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredSymptoms.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Nenhum sintoma encontrado para "{searchTerm}"
          </p>
        )}

        {selectedSymptoms.length === 0 && (
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              💡 Não tem nenhum sintoma? Sem problemas! Isso nos ajuda a entender que você está se sentindo bem.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}