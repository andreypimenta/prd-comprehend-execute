-- Add preferences columns to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN budget_range numeric,
ADD COLUMN preferred_forms jsonb DEFAULT '[]'::jsonb,
ADD COLUMN dietary_restrictions jsonb DEFAULT '[]'::jsonb;