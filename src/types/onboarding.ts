// types/onboarding.ts
export interface OnboardingData {
  // Etapa 1: Dados Básicos
  basicInfo: {
    age: number;
    gender: 'male' | 'female' | 'other';
    weight: number; // kg
    height: number; // cm
  };

  // Etapa 2: Sintomas
  symptoms: string[];

  // Etapa 3: Estilo de Vida
  lifestyle: {
    sleepQuality: number; // 1-5
    stressLevel: number; // 1-5
    exerciseFrequency: number; // vezes por semana
  };

  // Etapa 4: Objetivos
  goals: string[];
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

export const AVAILABLE_SYMPTOMS = [
  "Fadiga",
  "Insônia",
  "Ansiedade",
  "Dores musculares",
  "Dores articulares",
  "Dificuldade de concentração",
  "Problemas digestivos",
  "Dores de cabeça",
  "Baixa imunidade",
  "Mudanças de humor",
  "Falta de energia",
  "Estresse excessivo",
  "Problemas de pele",
  "Cãibras musculares",
  "Recuperação lenta pós-treino",
];

export const AVAILABLE_GOALS = [
  "Ganho de massa muscular",
  "Perda de peso",
  "Melhoria da energia",
  "Redução do estresse",
  "Melhoria do sono",
  "Fortalecimento do sistema imunológico",
  "Melhoria da concentração",
  "Redução da fadiga",
  "Melhoria da performance atlética",
  "Saúde cardiovascular",
  "Saúde óssea",
  "Anti-envelhecimento",
  "Melhoria da digestão",
  "Controle hormonal",
  "Recuperação muscular",
];