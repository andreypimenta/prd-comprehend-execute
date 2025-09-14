// Following PRD validation schemas
import { z } from "zod";

// Auth validation schemas
export const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
});

export const signUpSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número"),
  confirmPassword: z.string(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Email inválido")
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Senha atual é obrigatória"),
  newPassword: z.string()
    .min(8, "Nova senha deve ter pelo menos 8 caracteres")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Nova senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

// User profile validation schemas
export const userProfileSchema = z.object({
  age: z.number().min(13, "Idade mínima: 13 anos").max(120, "Idade máxima: 120 anos").optional(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  height: z.number().min(100, "Altura mínima: 100cm").max(250, "Altura máxima: 250cm").optional(),
  weight: z.number().min(30, "Peso mínimo: 30kg").max(300, "Peso máximo: 300kg").optional(),
  symptoms: z.array(z.string()).max(20, "Máximo 20 sintomas").optional(),
  healthGoals: z.array(z.string()).max(10, "Máximo 10 objetivos").optional(),
  exerciseFrequency: z.number().min(0, "Mínimo: 0").max(7, "Máximo: 7 dias por semana").optional(),
  sleepQuality: z.number().min(1, "Mínimo: 1").max(10, "Máximo: 10").optional(),
  stressLevel: z.number().min(1, "Mínimo: 1").max(10, "Máximo: 10").optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
  email: z.string().email("Email inválido").optional(),
  image: z.string().url("URL de imagem inválida").optional(),
});

// Onboarding validation schemas
export const basicInfoSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  age: z.number().min(13, "Idade mínima: 13 anos").max(120, "Idade máxima: 120 anos"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
  height: z.number().min(100, "Altura mínima: 100cm").max(250, "Altura máxima: 250cm"),
  weight: z.number().min(30, "Peso mínimo: 30kg").max(300, "Peso máximo: 300kg"),
});

export const symptomsSchema = z.object({
  symptoms: z.array(z.string()).min(1, "Selecione pelo menos um sintoma").max(20, "Máximo 20 sintomas"),
});

export const lifestyleSchema = z.object({
  exerciseFrequency: z.number().min(0, "Mínimo: 0").max(7, "Máximo: 7 dias por semana"),
  sleepQuality: z.number().min(1, "Mínimo: 1").max(10, "Máximo: 10"),
  stressLevel: z.number().min(1, "Mínimo: 1").max(10, "Máximo: 10"),
});

export const goalsSchema = z.object({
  healthGoals: z.array(z.string()).min(1, "Selecione pelo menos um objetivo").max(10, "Máximo 10 objetivos"),
});

// Export types
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type SymptomsFormData = z.infer<typeof symptomsSchema>;
export type LifestyleFormData = z.infer<typeof lifestyleSchema>;
export type GoalsFormData = z.infer<typeof goalsSchema>;