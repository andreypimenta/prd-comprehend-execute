import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AVAILABLE_PREFERRED_FORMS, AVAILABLE_DIETARY_RESTRICTIONS } from "@/types/onboarding";
import { DollarSign, Pill, ShieldCheck } from "lucide-react";

interface Step5PreferencesProps {
  data: {
    budgetRange: number;
    preferredForms: string[];
    dietaryRestrictions: string[];
  };
  onChange: (data: {
    budgetRange: number;
    preferredForms: string[];
    dietaryRestrictions: string[];
  }) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function Step5Preferences({ data, onChange, onValidationChange }: Step5PreferencesProps) {
  const [budgetRange, setBudgetRange] = useState(data.budgetRange || 150);
  const [preferredForms, setPreferredForms] = useState<string[]>(data.preferredForms || []);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(data.dietaryRestrictions || []);

  const formatBudget = (value: number) => {
    if (value >= 500) return "R$ 500+";
    return `R$ ${value}`;
  };

  const handleBudgetChange = (value: number[]) => {
    const newBudget = value[0];
    setBudgetRange(newBudget);
    
    const newData = {
      budgetRange: newBudget,
      preferredForms,
      dietaryRestrictions,
    };
    
    onChange(newData);
    onValidationChange(preferredForms.length > 0);
  };

  const handlePreferredFormsChange = (form: string, checked: boolean) => {
    let newForms: string[];
    if (checked) {
      newForms = [...preferredForms, form];
    } else {
      newForms = preferredForms.filter(f => f !== form);
    }
    
    setPreferredForms(newForms);
    
    const newData = {
      budgetRange,
      preferredForms: newForms,
      dietaryRestrictions,
    };
    
    onChange(newData);
    onValidationChange(newForms.length > 0);
  };

  const handleDietaryRestrictionsChange = (restriction: string, checked: boolean) => {
    let newRestrictions: string[];
    if (checked) {
      newRestrictions = [...dietaryRestrictions, restriction];
    } else {
      newRestrictions = dietaryRestrictions.filter(r => r !== restriction);
    }
    
    setDietaryRestrictions(newRestrictions);
    
    const newData = {
      budgetRange,
      preferredForms,
      dietaryRestrictions: newRestrictions,
    };
    
    onChange(newData);
    onValidationChange(preferredForms.length > 0);
  };

  return (
    <div className="space-y-6">
      {/* Orçamento Mensal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5 text-primary" />
            Orçamento Mensal
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Defina o valor que você está disposto a investir mensalmente em suplementos
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-3">
            <Slider
              value={[budgetRange]}
              onValueChange={handleBudgetChange}
              max={500}
              min={50}
              step={25}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R$ 50</span>
            <span className="font-medium text-foreground">{formatBudget(budgetRange)}</span>
            <span>R$ 500+</span>
          </div>
        </CardContent>
      </Card>

      {/* Preferências de Forma */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Pill className="h-5 w-5 text-primary" />
            Preferências de Forma Farmacêutica
            <span className="text-sm font-normal text-destructive">*</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Selecione as formas de suplementos que você prefere (obrigatório pelo menos uma)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_PREFERRED_FORMS.map((form) => (
              <div key={form} className="flex items-center space-x-2">
                <Checkbox
                  id={form}
                  checked={preferredForms.includes(form)}
                  onCheckedChange={(checked) => handlePreferredFormsChange(form, checked as boolean)}
                />
                <Label 
                  htmlFor={form} 
                  className="text-sm cursor-pointer"
                >
                  {form}
                </Label>
              </div>
            ))}
          </div>
          {preferredForms.length === 0 && (
            <p className="text-sm text-destructive mt-2">
              Selecione pelo menos uma forma farmacêutica
            </p>
          )}
        </CardContent>
      </Card>

      {/* Restrições Alimentares */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Restrições Alimentares e Religiosas
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Informe suas restrições para receber recomendações compatíveis (opcional)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_DIETARY_RESTRICTIONS.map((restriction) => (
              <div key={restriction} className="flex items-center space-x-2">
                <Checkbox
                  id={restriction}
                  checked={dietaryRestrictions.includes(restriction)}
                  onCheckedChange={(checked) => handleDietaryRestrictionsChange(restriction, checked as boolean)}
                />
                <Label 
                  htmlFor={restriction} 
                  className="text-sm cursor-pointer"
                >
                  {restriction}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}