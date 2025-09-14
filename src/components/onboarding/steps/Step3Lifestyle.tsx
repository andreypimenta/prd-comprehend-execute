import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OnboardingData } from "@/types/onboarding";
import { Moon, Brain, Dumbbell } from "lucide-react";

interface Step3LifestyleProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onValidation: (isValid: boolean) => void;
}

export function Step3Lifestyle({ data, onUpdate, onValidation }: Step3LifestyleProps) {
  const [lifestyle, setLifestyle] = useState(data.lifestyle || {
    sleepQuality: 3,
    stressLevel: 3,
    exerciseFrequency: 2,
  });

  useEffect(() => {
    // Sempre válido
    onValidation(true);
    onUpdate({ lifestyle });
  }, [lifestyle]);

  const updateField = (field: keyof typeof lifestyle, value: number) => {
    const updatedLifestyle = { ...lifestyle, [field]: value };
    setLifestyle(updatedLifestyle);
  };

  const getSleepQualityLabel = (value: number) => {
    const labels = ["Muito ruim", "Ruim", "Regular", "Boa", "Excelente"];
    return labels[value - 1] || "Regular";
  };

  const getStressLevelLabel = (value: number) => {
    const labels = ["Muito baixo", "Baixo", "Moderado", "Alto", "Muito alto"];
    return labels[value - 1] || "Moderado";
  };

  const getExerciseFrequencyLabel = (value: number) => {
    if (value === 0) return "Sedentário";
    if (value <= 2) return "Pouco ativo";
    if (value <= 4) return "Moderadamente ativo";
    return "Muito ativo";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Seu estilo de vida</CardTitle>
        <CardDescription className="text-lg">
          Queremos entender melhor seus hábitos diários
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Qualidade do Sono */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-full flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label className="text-base font-medium">Qualidade do sono</Label>
              <p className="text-sm text-muted-foreground">Como você avalia seu sono na maioria das noites?</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Muito ruim</span>
              <span className="font-medium text-primary">{getSleepQualityLabel(lifestyle.sleepQuality)}</span>
              <span>Excelente</span>
            </div>
            <Slider
              value={[lifestyle.sleepQuality]}
              onValueChange={([value]) => updateField('sleepQuality', value)}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Nível de Estresse */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-accent" />
            </div>
            <div>
              <Label className="text-base font-medium">Nível de estresse</Label>
              <p className="text-sm text-muted-foreground">Qual seu nível de estresse no dia a dia?</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Muito baixo</span>
              <span className="font-medium text-primary">{getStressLevelLabel(lifestyle.stressLevel)}</span>
              <span>Muito alto</span>
            </div>
            <Slider
              value={[lifestyle.stressLevel]}
              onValueChange={([value]) => updateField('stressLevel', value)}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Frequência de Exercícios */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-glow/20 to-accent/20 rounded-full flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary-glow" />
            </div>
            <div>
              <Label className="text-base font-medium">Frequência de exercícios</Label>
              <p className="text-sm text-muted-foreground">Quantas vezes por semana você se exercita?</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0x/semana</span>
              <span className="font-medium text-primary">
                {lifestyle.exerciseFrequency}x/semana - {getExerciseFrequencyLabel(lifestyle.exerciseFrequency)}
              </span>
              <span>7x/semana</span>
            </div>
            <Slider
              value={[lifestyle.exerciseFrequency]}
              onValueChange={([value]) => updateField('exerciseFrequency', value)}
              min={0}
              max={7}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Resumo */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-sm">Resumo do seu estilo de vida:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Qualidade do sono: {getSleepQualityLabel(lifestyle.sleepQuality)}</li>
            <li>• Nível de estresse: {getStressLevelLabel(lifestyle.stressLevel)}</li>
            <li>• Exercícios: {lifestyle.exerciseFrequency}x por semana ({getExerciseFrequencyLabel(lifestyle.exerciseFrequency)})</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}