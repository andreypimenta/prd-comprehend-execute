import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, ArrowRight, TrendingDown } from 'lucide-react';
import { useAbsorptionOptimization } from '@/hooks/useAbsorptionOptimization';
import type { PharmaceuticalForm } from '@/hooks/useAbsorptionOptimization';

interface DoseCalculatorProps {
  forms: PharmaceuticalForm[];
}

export const DoseCalculator = ({ forms }: DoseCalculatorProps) => {
  const [currentDose, setCurrentDose] = useState<number>(1000);
  const [currentFormIndex, setCurrentFormIndex] = useState<number>(0);
  const [targetFormIndex, setTargetFormIndex] = useState<number>(2); // Default to lipossomal
  
  const { calculateEquivalentDose } = useAbsorptionOptimization();

  const currentForm = forms[currentFormIndex];
  const targetForm = forms[targetFormIndex];

  const { equivalentDose, reduction } = calculateEquivalentDose(
    currentDose,
    currentForm.bioavailabilityFactor,
    targetForm.bioavailabilityFactor
  );

  const monthlySavings = currentDose > 0 ? 
    ((currentDose - equivalentDose) / currentDose) * (targetForm.costMultiplier * 60) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Calculadora de Dose Equivalente
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Descubra quanto você realmente precisa com formas otimizadas
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current dose input */}
          <div className="space-y-2">
            <Label htmlFor="current-dose">Dose Atual (mg)</Label>
            <Input
              id="current-dose"
              type="number"
              value={currentDose}
              onChange={(e) => setCurrentDose(Number(e.target.value))}
              placeholder="Ex: 1000"
              className="text-lg"
            />
          </div>

          {/* Current form selector */}
          <div className="space-y-2">
            <Label>Forma Atual</Label>
            <Select value={currentFormIndex.toString()} onValueChange={(value) => setCurrentFormIndex(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {forms.map((form, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {form.name} ({form.bioavailabilityFactor}x)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Target form selector */}
        <div className="space-y-2">
          <Label>Forma Otimizada</Label>
          <Select value={targetFormIndex.toString()} onValueChange={(value) => setTargetFormIndex(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {forms.map((form, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {form.name} ({form.bioavailabilityFactor}x) - {form.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        {currentDose > 0 && currentFormIndex !== targetFormIndex && (
          <div className="space-y-4">
            {/* Dose conversion visualization */}
            <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Dose Atual</p>
                <p className="text-2xl font-bold text-foreground">{currentDose}mg</p>
                <p className="text-xs text-muted-foreground">{currentForm.name}</p>
              </div>
              
              <ArrowRight className="h-6 w-6 text-primary" />
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Dose Equivalente</p>
                <p className="text-2xl font-bold text-accent">{equivalentDose}mg</p>
                <p className="text-xs text-muted-foreground">{targetForm.name}</p>
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <p className="font-semibold text-green-700 dark:text-green-400">Redução</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{reduction}%</p>
                <p className="text-xs text-green-600">na quantidade necessária</p>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="font-semibold text-blue-700 dark:text-blue-400">Eficiência</p>
                <p className="text-2xl font-bold text-blue-600">{targetForm.absorptionRate}%</p>
                <p className="text-xs text-blue-600">vs {currentForm.absorptionRate}% atual</p>
              </div>

              <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <p className="font-semibold text-purple-700 dark:text-purple-400">Potencialização</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(targetForm.bioavailabilityFactor / currentForm.bioavailabilityFactor).toFixed(1)}x
                </p>
                <p className="text-xs text-purple-600">mais absorção</p>
              </div>
            </div>

            {/* Highlight extreme improvements */}
            {reduction > 90 && (
              <div className="p-4 bg-gradient-to-r from-accent to-primary rounded-lg text-white">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-white text-accent font-bold">
                    REVOLUÇÃO
                  </Badge>
                  <p className="font-bold">
                    Redução de {reduction}% na quantidade necessária!
                  </p>
                </div>
                <p className="text-sm opacity-90 mt-1">
                  Com apenas {equivalentDose}mg da forma {targetForm.name.toLowerCase()}, 
                  você obtém o mesmo efeito de {currentDose}mg da forma padrão.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};