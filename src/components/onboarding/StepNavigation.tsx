import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onComplete,
  isNextDisabled = false,
  isLoading = false,
}: StepNavigationProps) {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1 || isLoading}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      {isLastStep ? (
        <Button
          onClick={onComplete}
          disabled={isNextDisabled || isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? "Finalizando..." : "Finalizar"}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={isNextDisabled || isLoading}
        >
          Próximo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}