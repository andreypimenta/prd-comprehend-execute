import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnboardingData } from "@/types/onboarding";
import { User, Scale, Ruler } from "lucide-react";

interface Step1BasicInfoProps {
  data: Partial<OnboardingData>;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onValidation: (isValid: boolean) => void;
}

export function Step1BasicInfo({ data, onUpdate, onValidation }: Step1BasicInfoProps) {
  const [basicInfo, setBasicInfo] = useState(data.basicInfo || {
    age: 0,
    gender: 'male' as const,
    weight: 0,
    height: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    validateForm();
  }, [basicInfo]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!basicInfo.age || basicInfo.age < 18 || basicInfo.age > 100) {
      newErrors.age = "Idade deve estar entre 18 e 100 anos";
    }

    if (!basicInfo.weight || basicInfo.weight < 30 || basicInfo.weight > 300) {
      newErrors.weight = "Peso deve estar entre 30 e 300 kg";
    }

    if (!basicInfo.height || basicInfo.height < 100 || basicInfo.height > 250) {
      newErrors.height = "Altura deve estar entre 100 e 250 cm";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0 && !!basicInfo.gender;
    onValidation(isValid);

    if (isValid) {
      onUpdate({ basicInfo });
    }
  };

  const updateField = (field: string, value: any) => {
    const updatedInfo = { ...basicInfo, [field]: value };
    setBasicInfo(updatedInfo);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Vamos conhecer você!</CardTitle>
        <CardDescription className="text-lg">
          Precisamos de algumas informações básicas para personalizar suas recomendações
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Idade */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-medium">Idade *</Label>
            <div className="relative">
              <Input
                id="age"
                type="number"
                value={basicInfo.age || ''}
                onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
                placeholder="Ex: 30"
                className={errors.age ? "border-destructive" : ""}
              />
            </div>
            {errors.age && <p className="text-destructive text-sm">{errors.age}</p>}
          </div>

          {/* Gênero */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Gênero *</Label>
            <Select 
              value={basicInfo.gender} 
              onValueChange={(value) => updateField('gender', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione seu gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Peso */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">Peso (kg) *</Label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="weight"
                type="number"
                value={basicInfo.weight || ''}
                onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
                placeholder="Ex: 70"
                className={`pl-10 ${errors.weight ? "border-destructive" : ""}`}
              />
            </div>
            {errors.weight && <p className="text-destructive text-sm">{errors.weight}</p>}
          </div>

          {/* Altura */}
          <div className="space-y-2">
            <Label htmlFor="height" className="text-sm font-medium">Altura (cm) *</Label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="height"
                type="number"
                value={basicInfo.height || ''}
                onChange={(e) => updateField('height', parseInt(e.target.value) || 0)}
                placeholder="Ex: 175"
                className={`pl-10 ${errors.height ? "border-destructive" : ""}`}
              />
            </div>
            {errors.height && <p className="text-destructive text-sm">{errors.height}</p>}
          </div>
        </div>

        {/* IMC Info */}
        {basicInfo.weight > 0 && basicInfo.height > 0 && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Seu IMC:</p>
            <p className="text-lg font-semibold text-primary">
              {((basicInfo.weight / Math.pow(basicInfo.height / 100, 2)).toFixed(1))} kg/m²
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}