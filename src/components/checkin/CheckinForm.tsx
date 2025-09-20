import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { WellbeingRating } from './WellbeingRating';
import { SymptomImprovementRating } from './SymptomImprovementRating';
import { ComplianceTrackerPRD } from './ComplianceTrackerPRD';
import { FeedbackSection } from './FeedbackSection';
import { CheckinFormData } from '@/types/checkin';
import { useCheckin } from '@/hooks/useCheckin';
import { supabase } from '@/integrations/supabase/client';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const STEPS = [
  { id: 1, title: 'Avaliação de Sintomas', description: 'Como seus sintomas estão esta semana?' },
  { id: 2, title: 'Bem-estar Geral', description: 'Avalie seu bem-estar de 1 a 5' },
  { id: 3, title: 'Aderência aos Suplementos', description: 'Quantos dias você tomou seus suplementos?' },
  { id: 4, title: 'Feedback', description: 'Compartilhe suas observações' },
];

export const CheckinForm = () => {
  const navigate = useNavigate();
  const { submitCheckin, hasCheckinThisWeek, currentWeek } = useCheckin();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supplements, setSupplements] = useState<Array<{ id: string; name: string }>>([]);
  
  const [formData, setFormData] = useState<CheckinFormData>({
    symptom_ratings: {},
    wellbeing: {
      energy: 3,
      mood: 3,
      sleep: 3,
      overall: 3,
    },
    compliance: {},
    feedback: {
      positiveChanges: [],
      concerns: [],
      overallSatisfaction: 3,
    },
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

      const { data: userProfile, error: profileError } = await supabase
        .from('user_profiles')
        .select('symptoms')
        .eq('user_id', user.user.id)
        .single();

      if (profileError) throw profileError;

      const symptoms = userProfile?.symptoms || ['fadiga', 'energia', 'humor', 'sono', 'estresse', 'foco'];

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

      // Initialize symptom ratings for user's symptoms
      const initialSymptomRatings: Record<string, { current: number; improvement: number; notes?: string; }> = {};
      symptoms.forEach(symptom => {
        initialSymptomRatings[symptom] = {
          current: 5,
          improvement: 0,
          notes: ''
        };
      });

      // Initialize compliance tracking
      const initialCompliance: Record<string, { daysCompliant: number; missedDoses: number; reasonsForMissing?: string[]; }> = {};
      supplementList.forEach(supplement => {
        initialCompliance[supplement.id] = {
          daysCompliant: 7,
          missedDoses: 0,
          reasonsForMissing: []
        };
      });
      
      setFormData(prev => ({
        ...prev,
        symptom_ratings: initialSymptomRatings,
        compliance: initialCompliance,
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
                {Object.keys(formData.symptom_ratings).map((symptom) => (
                  <SymptomImprovementRating
                    key={symptom}
                    symptomName={symptom}
                    currentRating={formData.symptom_ratings[symptom].current}
                    improvementRating={formData.symptom_ratings[symptom].improvement}
                    notes={formData.symptom_ratings[symptom].notes}
                    onCurrentChange={(value) => setFormData(prev => ({
                      ...prev,
                      symptom_ratings: {
                        ...prev.symptom_ratings,
                        [symptom]: { ...prev.symptom_ratings[symptom], current: value }
                      }
                    }))}
                    onImprovementChange={(value) => setFormData(prev => ({
                      ...prev,
                      symptom_ratings: {
                        ...prev.symptom_ratings,
                        [symptom]: { ...prev.symptom_ratings[symptom], improvement: value }
                      }
                    }))}
                    onNotesChange={(notes) => setFormData(prev => ({
                      ...prev,
                      symptom_ratings: {
                        ...prev.symptom_ratings,
                        [symptom]: { ...prev.symptom_ratings[symptom], notes }
                      }
                    }))}
                  />
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <WellbeingRating
                  label="Nível de Energia"
                  value={formData.wellbeing.energy}
                  onChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    wellbeing: { ...prev.wellbeing, energy: value }
                  }))}
                  description="Quanta energia você teve esta semana?"
                  icon="⚡"
                />
                <WellbeingRating
                  label="Humor Geral"
                  value={formData.wellbeing.mood}
                  onChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    wellbeing: { ...prev.wellbeing, mood: value }
                  }))}
                  description="Como tem estado seu humor?"
                  icon="😊"
                />
                <WellbeingRating
                  label="Qualidade do Sono"
                  value={formData.wellbeing.sleep}
                  onChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    wellbeing: { ...prev.wellbeing, sleep: value }
                  }))}
                  description="Como tem dormido esta semana?"
                  icon="😴"
                />
                <WellbeingRating
                  label="Bem-estar Geral"
                  value={formData.wellbeing.overall}
                  onChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    wellbeing: { ...prev.wellbeing, overall: value }
                  }))}
                  description="Como você se sente no geral?"
                  icon="🌟"
                />
              </div>
            )}

            {currentStep === 3 && (
              <ComplianceTrackerPRD
                supplements={supplements}
                compliance={formData.compliance}
                onChange={(compliance) => setFormData(prev => ({ ...prev, compliance }))}
              />
            )}

            {currentStep === 4 && (
              <FeedbackSection
                feedback={formData.feedback}
                onChange={(feedback) => setFormData(prev => ({ ...prev, feedback }))}
              />
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