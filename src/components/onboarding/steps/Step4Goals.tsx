import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { OnboardingData, AVAILABLE_GOALS } from "@/types/onboarding";
import { Target, Search, CheckCircle } from "lucide-react";

interface Step4GoalsProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onValidation: (isValid: boolean) => void;
}

export function Step4Goals({ data, onUpdate, onValidation }: Step4GoalsProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGoals = AVAILABLE_GOALS.filter(goal =>
    goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Válido se pelo menos um objetivo foi selecionado
    const isValid = selectedGoals.length > 0;
    onValidation(isValid);
    onUpdate({ goals: selectedGoals });
  }, [selectedGoals]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Quais são seus objetivos?</CardTitle>
        <CardDescription className="text-lg">
          Selecione o que você deseja alcançar com a suplementação
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar objetivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Objetivos selecionados */}
        {selectedGoals.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h4 className="text-sm font-medium text-foreground">Seus objetivos ({selectedGoals.length}):</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedGoals.map((goal) => (
                <Badge
                  key={goal}
                  variant="default"
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleGoal(goal)}
                >
                  {goal} ✕
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Lista de objetivos */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Objetivos disponíveis:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto">
            {filteredGoals.map((goal) => {
              const isSelected = selectedGoals.includes(goal);
              return (
                <div
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium flex-1">{goal}</span>
                    {isSelected && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {filteredGoals.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Nenhum objetivo encontrado para "{searchTerm}"
          </p>
        )}

        {selectedGoals.length === 0 && (
          <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg text-center">
            <p className="text-sm text-accent font-medium">
              🎯 Selecione pelo menos um objetivo para continuar
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}