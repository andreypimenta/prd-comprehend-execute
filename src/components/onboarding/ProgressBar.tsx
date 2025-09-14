import { Progress } from "@/components/ui/progress";
import { OnboardingStep } from "@/types/onboarding";

interface ProgressBarProps {
  steps: OnboardingStep[];
  currentStep: number;
}

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Etapa {currentStep} de {steps.length}</span>
        <span>{Math.round(progress)}% concluído</span>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center space-y-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step.isComplete
                  ? "bg-primary text-primary-white"
                  : step.isActive
                  ? "bg-accent text-primary-navy"
                  : "bg-secondary-lightGray text-text-darkGray"
              }`}
            >
              {step.isComplete ? "✓" : step.id}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-foreground">{step.title}</p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}