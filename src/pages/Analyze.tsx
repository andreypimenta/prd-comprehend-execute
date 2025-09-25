import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Zap, Brain, Target, CheckCircle } from "lucide-react";

export default function Analyze() {
  const navigate = useNavigate();
  const { profile, loading: profileLoading, hasProfile, isProfileComplete } = useUserProfile();
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const steps = [
    { icon: Brain, label: "Analisando perfil de saúde", duration: 2000 },
    { icon: Target, label: "Identificando necessidades", duration: 2500 },
    { icon: Zap, label: "Gerando recomendações personalizadas", duration: 3000 },
    { icon: CheckCircle, label: "Finalizando análise", duration: 1500 }
  ];

  useEffect(() => {
    if (!profileLoading) {
      if (!hasProfile || !isProfileComplete) {
        toast({
          title: "Perfil incompleto",
          description: "Complete seu perfil para receber recomendações personalizadas.",
          variant: "destructive"
        });
        navigate("/onboarding");
        return;
      }
      
      // Start analysis automatically when profile is ready
      startAnalysis();
    }
  }, [profileLoading, hasProfile, isProfileComplete, navigate]);

  const startAnalysis = async () => {
    setAnalyzing(true);
    let currentProgress = 0;

    try {
      // Simulate analysis steps with progress
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        setCurrentStep(step.label);
        
        // Animate progress during step
        const stepProgress = (i + 1) * 25;
        const startProgress = currentProgress;
        const progressDiff = stepProgress - startProgress;
        
        const stepStart = Date.now();
        
        while (currentProgress < stepProgress) {
          const elapsed = Date.now() - stepStart;
          const stepProgressPercent = Math.min(elapsed / step.duration, 1);
          currentProgress = startProgress + (progressDiff * stepProgressPercent);
          setProgress(currentProgress);
          
          if (stepProgressPercent >= 1) break;
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        // Small delay between steps
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Call the actual analysis API
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.functions.invoke('analyze', {
        body: { 
          userId: user.user.id,
          userProfile: profile
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      setProgress(100);
      setCurrentStep("Análise concluída!");
      
      // Wait a moment then redirect
      setTimeout(() => {
        toast({
          title: "Análise concluída!",
          description: "Suas recomendações personalizadas estão prontas.",
        });
        navigate("/results");
      }, 1000);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Erro na análise",
        description: "Ocorreu um erro durante a análise. Tente novamente.",
        variant: "destructive"
      });
      navigate("/dashboard");
    }
  };

  if (profileLoading) {
    return (
      <AppLayout title="Carregando">
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Nova Análise">
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-8 text-center space-y-6">
            {/* Animated Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = currentStep === step.label;
                    return (
                      <StepIcon 
                        key={index}
                        className={`w-8 h-8 absolute transition-all duration-500 ${
                          isActive 
                            ? "text-primary opacity-100 scale-100" 
                            : "text-muted-foreground opacity-0 scale-75"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="absolute -inset-2 border-2 border-primary/20 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-card-foreground">
                Analisando seu Perfil
              </h1>
              <p className="text-muted-foreground">
                Estamos criando recomendações personalizadas baseadas em suas necessidades de saúde
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm font-medium text-card-foreground">
                {currentStep}
              </p>
              <p className="text-xs text-muted-foreground">
                {Math.round(progress)}% concluído
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-2 pt-4">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const stepProgress = (index + 1) * 25;
                const isCompleted = progress >= stepProgress;
                const isCurrent = currentStep === step.label;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                      isCurrent 
                        ? "bg-primary/10 border border-primary/20" 
                        : isCompleted 
                        ? "bg-green-500/10" 
                        : "opacity-60"
                    }`}
                  >
                    <StepIcon 
                      className={`w-4 h-4 ${
                        isCompleted 
                          ? "text-green-500" 
                          : isCurrent 
                          ? "text-primary" 
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className={`text-sm ${
                      isCurrent 
                        ? "text-primary font-medium" 
                        : isCompleted 
                        ? "text-green-700" 
                        : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}