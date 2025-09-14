"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";
import { OnboardingData, OnboardingStep } from "@/types/onboarding";
import { ProgressBar } from "./ProgressBar";
import { StepNavigation } from "./StepNavigation";
import { Step1BasicInfo } from "./steps/Step1BasicInfo";
import { Step2Symptoms } from "./steps/Step2Symptoms";
import { Step3Lifestyle } from "./steps/Step3Lifestyle";
import { Step4Goals } from "./steps/Step4Goals";

const INITIAL_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "Dados Básicos",
    description: "Informações pessoais",
    isComplete: false,
    isActive: true,
  },
  {
    id: 2,
    title: "Sintomas",
    description: "Como você se sente",
    isComplete: false,
    isActive: false,
  },
  {
    id: 3,
    title: "Estilo de Vida",
    description: "Seus hábitos",
    isComplete: false,
    isActive: false,
  },
  {
    id: 4,
    title: "Objetivos",
    description: "O que deseja alcançar",
    isComplete: false,
    isActive: false,
  },
];

export function OnboardingLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, isProfileComplete, loading: profileLoading } = useUserProfile();

  // Redirect if user already has a complete profile
  useEffect(() => {
    if (!profileLoading && user && isProfileComplete) {
      console.log("🚀 OnboardingLayout: Perfil já completo, redirecionando para dashboard");
      toast({
        title: "Perfil já completo",
        description: "Redirecionando para seu dashboard...",
      });
      navigate('/dashboard', { replace: true });
    }
  }, [user, isProfileComplete, profileLoading, navigate, toast]);

  // Load existing profile data if available
  useEffect(() => {
    if (profile && !isProfileComplete) {
      console.log("🚀 OnboardingLayout: Carregando dados existentes do perfil");
      const existingData: Partial<OnboardingData> = {
        basicInfo: {
          age: profile.age || 0,
          gender: (profile.gender as 'male' | 'female' | 'other') || 'other',
          weight: profile.weight || 0,
          height: profile.height || 0,
        },
        symptoms: profile.symptoms || [],
        lifestyle: {
          sleepQuality: profile.sleep_quality || 1,
          stressLevel: profile.stress_level || 1,
          exerciseFrequency: profile.exercise_frequency || 0,
        },
        goals: profile.health_goals || [],
      };
      setOnboardingData(existingData);
    }
  }, [profile, isProfileComplete]);

  const updateStepData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const handleStepValidation = (isValid: boolean) => {
    setIsCurrentStepValid(isValid);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      // Marcar step atual como completo
      setSteps(prev =>
        prev.map(step =>
          step.id === currentStep
            ? { ...step, isComplete: true, isActive: false }
            : step.id === currentStep + 1
            ? { ...step, isActive: true }
            : step
        )
      );
      
      setCurrentStep(prev => prev + 1);
      setIsCurrentStepValid(false); // Reset validation for next step
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      // Marcar step atual como inativo e anterior como ativo
      setSteps(prev =>
        prev.map(step =>
          step.id === currentStep
            ? { ...step, isActive: false }
            : step.id === currentStep - 1
            ? { ...step, isComplete: false, isActive: true }
            : step
        )
      );
      
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = async () => {
    setIsLoading(true);
    
    try {
      console.log("🚀 OnboardingLayout: Iniciando salvamento dos dados:", onboardingData);
      console.log("👤 OnboardingLayout: User ID:", user?.id);
      
      if (!user) {
        console.error("❌ OnboardingLayout: Usuário não encontrado");
        toast({
          title: "Erro de autenticação",
          description: "Usuário não encontrado. Faça login novamente.",
          variant: "destructive",
        });
        return;
      }

      // Obter sessão do Supabase Auth diretamente
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.error("❌ OnboardingLayout: Sessão não encontrada");
        toast({
          title: "Erro de sessão",
          description: "Sessão expirada. Faça login novamente.",
          variant: "destructive",
        });
        return;
      }

      console.log("🔑 OnboardingLayout: Session User ID:", session.user.id);
      console.log("🔑 OnboardingLayout: User Auth ID:", user.authUserId);

      // Validar dados obrigatórios
      if (!onboardingData.basicInfo?.age || !onboardingData.basicInfo?.gender || 
          !onboardingData.basicInfo?.weight || !onboardingData.basicInfo?.height) {
        console.error("❌ OnboardingLayout: Dados básicos incompletos");
        toast({
          title: "Dados incompletos",
          description: "Por favor, complete todos os dados básicos",
          variant: "destructive",
        });
        return;
      }

      const profileData = {
        user_id: session.user.id, // Usar session.user.id diretamente para consistência com RLS
        age: onboardingData.basicInfo.age,
        gender: onboardingData.basicInfo.gender,
        weight: onboardingData.basicInfo.weight,
        height: onboardingData.basicInfo.height,
        symptoms: onboardingData.symptoms || [],
        health_goals: onboardingData.goals || [],
        sleep_quality: onboardingData.lifestyle?.sleepQuality,
        stress_level: onboardingData.lifestyle?.stressLevel,
        exercise_frequency: onboardingData.lifestyle?.exerciseFrequency,
      };

      console.log("💾 OnboardingLayout: Dados preparados para salvamento:", profileData);

      // Primeiro tentar fazer insert
      const { data: insertData, error: insertError } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single();

      if (insertError) {
        console.log("ℹ️ OnboardingLayout: Insert falhou, tentando update:", insertError.message);
        
        // Se insert falhar, tentar update
        const { data: updateData, error: updateError } = await supabase
          .from('user_profiles')
          .update(profileData)
          .eq('user_id', session.user.id)
          .select()
          .single();

        if (updateError) {
          console.error("❌ OnboardingLayout: Erro ao fazer update:", updateError);
          toast({
            title: "Erro ao salvar perfil",
            description: `Erro: ${updateError.message}`,
            variant: "destructive",
          });
          return;
        }

        console.log("✅ OnboardingLayout: Perfil atualizado com sucesso:", updateData);
      } else {
        console.log("✅ OnboardingLayout: Perfil inserido com sucesso:", insertData);
      }

      toast({
        title: "Onboarding concluído!",
        description: "Seus dados foram salvos com sucesso. Redirecionando para suas recomendações...",
      });
      
      // Aguardar um pouco para garantir que o banco foi atualizado
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verificar se o perfil foi realmente salvo
      const { data: verifyData, error: verifyError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (verifyError || !verifyData) {
        console.error("❌ OnboardingLayout: Perfil não foi salvo corretamente:", verifyError);
        toast({
          title: "Erro de verificação",
          description: "Erro: perfil não foi salvo. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      console.log("✅ OnboardingLayout: Perfil verificado no banco:", verifyData);
      
      // Redirecionar para resultados
      navigate('/results');
    } catch (err) {
      console.error("💥 OnboardingLayout: Erro inesperado:", err);
      toast({
        title: "Erro inesperado",
        description: "Erro inesperado ao salvar perfil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            data={onboardingData}
            onUpdate={updateStepData}
            onValidation={handleStepValidation}
          />
        );
      case 2:
        return (
          <Step2Symptoms
            data={onboardingData}
            onUpdate={updateStepData}
            onValidation={handleStepValidation}
          />
        );
      case 3:
        return (
          <Step3Lifestyle
            data={onboardingData}
            onUpdate={updateStepData}
            onValidation={handleStepValidation}
          />
        );
      case 4:
        return (
          <Step4Goals
            data={onboardingData}
            onUpdate={updateStepData}
            onValidation={handleStepValidation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <Card>
          <CardContent className="pt-6">
            <StepNavigation
              currentStep={currentStep}
              totalSteps={4}
              onPrevious={previousStep}
              onNext={nextStep}
              onComplete={completeOnboarding}
              isNextDisabled={!isCurrentStepValid}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}