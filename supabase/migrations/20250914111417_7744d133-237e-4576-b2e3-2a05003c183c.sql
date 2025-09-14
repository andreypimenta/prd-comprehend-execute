-- Add missing columns to user_profiles table for onboarding data
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS gender TEXT CHECK (gender IN ('male', 'female', 'other'));
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS weight FLOAT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS height FLOAT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS symptoms TEXT[] DEFAULT '{}';
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 5);
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 5);
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS exercise_frequency INTEGER CHECK (exercise_frequency >= 0 AND exercise_frequency <= 7);
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS health_goals TEXT[] DEFAULT '{}';