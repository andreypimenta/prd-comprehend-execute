import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { SymptomRating } from './SymptomRating';
import { ComplianceTracker } from './ComplianceTracker';
import { CheckinFormData } from '@/types/checkin';
import { useCheckin } from '@/hooks/useCheckin';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const STEPS = [
  { id: 1, title: 'Avaliação de Sintomas', description: 'Como você se sente esta semana?' },
  { id: 2, title: 'Aderência aos Suplementos', description: 'Quantos dias você tomou seus suplementos?' },
  { id: 3, title: 'Métricas de Bem-estar', description: 'Registre peso e exercícios' },
  { id: 4, title: 'Observações', description: 'Notas adicionais e efeitos colaterais' },
];

export const CheckinForm = () => {
  const navigate = useNavigate();
  const { submitCheckin, hasCheckinThisWeek, currentWeek } = useCheckin();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplements, setSupplements] = useState<Array<{ id: string; name: string }>>([]);
  
  const [formData, setFormData] = useState<CheckinFormData>({
    fatigue_level: 5,
    energy_level: 5,
    mood_level: 5,
    sleep_quality: 5,
    stress_level: 5,
    focus_level: 5,
    custom_symptoms: [],
    supplement_adherence: {},
    weight: undefined,
    exercise_frequency: undefined,
    notes: '',
    side_effects: '',
  });

  useEffect(() => {
    if (hasCheckinThisWeek()) {
      toast.info('Você já fez o check-in desta semana!');
      navigate('/progress');
    }
    fetchUserSupplements();
  }, []);

  const fetchUserSupplements = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const { data: recommendations, error } = await supabase
        .from('recommendations')
        .select(`
          id,
          supplement_id,
          supplements (
            id,
            name
          )
        `)
        .eq('user_id', user.user.id);

      if (error) throw error;

      const supplementList = recommendations?.map(rec => ({
        id: rec.supplement_id,
        name: rec.supplements?.name || 'Suplemento',
      })) || [];

      setSupplements(supplementList);

      // Initialize compliance tracking
      const initialCompliance: Record<string, any> = {};
      supplementList.forEach(supplement => {
        initialCompliance[supplement.id] = {
          supplement_id: supplement.id,
          supplement_name: supplement.name,
          days_taken: 0,
          total_days: 7,
        };
      });
      
      setFormData(prev => ({
        ...prev,
        supplement_adherence: initialCompliance,
      }));
    } catch (error) {
      console.error('Error fetching supplements:', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await submitCheckin(formData);
    if (success) {
      navigate('/progress');
    }
    setIsSubmitting(false);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true; // Symptom ratings are always valid
      case 2:
        return true; // Compliance tracking is optional
      case 3:
        return true; // Wellness metrics are optional
      case 4:
        return true; // Notes are optional
      default:
        return true;
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Check-in Semanal - Semana {currentWeek}
          </h1>
          <p className="text-muted-foreground">
            {STEPS[currentStep - 1].description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Etapa {currentStep} de {STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% completo
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              {STEPS[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <SymptomRating
                  label="Nível de Fadiga"
                  value={formData.fatigue_level}
                  onChange={(value) => setFormData(prev => ({ ...prev, fatigue_level: value }))}
                  description="Como tem sido seu cansaço esta semana?"
                  lowLabel="Sem fadiga"
                  highLabel="Muito fatigado"
                />
                <SymptomRating
                  label="Nível de Energia"
                  value={formData.energy_level}
                  onChange={(value) => setFormData(prev => ({ ...prev, energy_level: value }))}
                  description="Quanta energia você teve esta semana?"
                  lowLabel="Sem energia"
                  highLabel="Muita energia"
                />
                <SymptomRating
                  label="Humor"
                  value={formData.mood_level}
                  onChange={(value) => setFormData(prev => ({ ...prev, mood_level: value }))}
                  description="Como tem estado seu humor?"
                  lowLabel="Muito baixo"
                  highLabel="Excelente"
                />
                <SymptomRating
                  label="Qualidade do Sono"
                  value={formData.sleep_quality}
                  onChange={(value) => setFormData(prev => ({ ...prev, sleep_quality: value }))}
                  description="Como tem dormido esta semana?"
                  lowLabel="Muito mal"
                  highLabel="Excelente"
                />
                <SymptomRating
                  label="Nível de Estresse"
                  value={formData.stress_level}
                  onChange={(value) => setFormData(prev => ({ ...prev, stress_level: value }))}
                  description="Quanto estresse você sentiu?"
                  lowLabel="Sem estresse"
                  highLabel="Muito estressado"
                />
                <SymptomRating
                  label="Capacidade de Foco"
                  value={formData.focus_level}
                  onChange={(value) => setFormData(prev => ({ ...prev, focus_level: value }))}
                  description="Como tem sido sua concentração?"
                  lowLabel="Sem foco"
                  highLabel="Foco excelente"
                />
              </div>
            )}

            {currentStep === 2 && (
              <ComplianceTracker
                supplements={supplements}
                compliance={formData.supplement_adherence}
                onChange={(compliance) => setFormData(prev => ({ ...prev, supplement_adherence: compliance }))}
              />
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="weight">Peso (kg) - Opcional</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="Ex: 70.5"
                      value={formData.weight || ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        weight: e.target.value ? parseFloat(e.target.value) : undefined 
                      }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exercise">Dias de exercício (última semana)</Label>
                    <Input
                      id="exercise"
                      type="number"
                      min="0"
                      max="7"
                      placeholder="Ex: 3"
                      value={formData.exercise_frequency || ''}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        exercise_frequency: e.target.value ? parseInt(e.target.value) : undefined 
                      }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="notes">Observações Gerais (Opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Como você se sentiu esta semana? Alguma mudança importante na sua rotina ou saúde?"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="side-effects">Efeitos Colaterais (Opcional)</Label>
                  <Textarea
                    id="side-effects"
                    placeholder="Notou algum efeito colateral dos suplementos ou outros sintomas?"
                    value={formData.side_effects}
                    onChange={(e) => setFormData(prev => ({ ...prev, side_effects: e.target.value }))}
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!isStepValid() || isSubmitting}
          >
            {isSubmitting ? (
              'Salvando...'
            ) : currentStep === STEPS.length ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Concluir Check-in
              </>
            ) : (
              <>
                Próximo
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};