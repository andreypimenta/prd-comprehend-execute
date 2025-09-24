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
import { Step5Preferences } from "./steps/Step5Preferences";

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
  {
    id: 5,
    title: "Preferências",
    description: "Orçamento e preferências",
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
  const { user, isAuthenticated } = useAuth();
  const { profile, isProfileComplete, loading: profileLoading } = useUserProfile();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !profileLoading) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, profileLoading, navigate]);

  // Redirect if user already has a complete profile
  useEffect(() => {
    if (!profileLoading && isAuthenticated && isProfileComplete) {
      console.log("🚀 OnboardingLayout: Perfil já completo, redirecionando para dashboard");
      toast({
        title: "Perfil já completo",
        description: "Redirecionando para seu dashboard...",
      });
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isProfileComplete, profileLoading, navigate, toast]);

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
        preferences: {
          budgetRange: profile.budget_range || 150,
          preferredForms: profile.preferred_forms || [],
          dietaryRestrictions: profile.dietary_restrictions || [],
        },
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
    if (currentStep < 5) {
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
      
      if (!isAuthenticated) {
        console.error("❌ OnboardingLayout: Usuário não autenticado");
        toast({
          title: "Erro de autenticação",
          description: "Faça login novamente.",
          variant: "destructive",
        });
        return;
      }

      // Obter usuário atual do Supabase Auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error("❌ OnboardingLayout: Erro ao obter usuário:", authError);
        toast({
          title: "Erro de autenticação",
          description: "Sessão expirada. Faça login novamente.",
          variant: "destructive",
        });
        return;
      }

      console.log("🔑 OnboardingLayout: User ID:", user.id);

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
        user_id: user.id,
        age: onboardingData.basicInfo.age,
        gender: onboardingData.basicInfo.gender,
        weight: onboardingData.basicInfo.weight,
        height: onboardingData.basicInfo.height,
        symptoms: onboardingData.symptoms || [],
        health_goals: onboardingData.goals || [],
        sleep_quality: onboardingData.lifestyle?.sleepQuality,
        stress_level: onboardingData.lifestyle?.stressLevel,
        exercise_frequency: onboardingData.lifestyle?.exerciseFrequency,
        budget_range: onboardingData.preferences?.budgetRange,
        preferred_forms: onboardingData.preferences?.preferredForms || [],
        dietary_restrictions: onboardingData.preferences?.dietaryRestrictions || [],
      };

      console.log("💾 OnboardingLayout: Dados preparados para salvamento:", profileData);

      // Usar upsert para inserir ou atualizar
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (error) {
        console.error("❌ OnboardingLayout: Erro ao salvar perfil:", error);
        toast({
          title: "Erro ao salvar perfil",
          description: `Erro: ${error.message}`,
          variant: "destructive",
        });
        return;
      }

      console.log("✅ OnboardingLayout: Perfil salvo com sucesso:", data);

      toast({
        title: "Onboarding concluído!",
        description: "Seus dados foram salvos com sucesso. Redirecionando para suas recomendações...",
      });
      
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
      case 5:
        return (
          <Step5Preferences
            data={onboardingData.preferences || { budgetRange: 150, preferredForms: [], dietaryRestrictions: [] }}
            onChange={(preferences) => updateStepData({ preferences })}
            onValidationChange={handleStepValidation}
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
              totalSteps={5}
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