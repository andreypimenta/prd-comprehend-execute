-- Fix user_profiles table type inconsistency by removing foreign key constraint first
-- Drop foreign key constraint if it exists
ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_user_id_fkey;

-- Drop existing policies that use get_current_user_id()
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.user_profiles;

-- Update user_id column to be UUID to match auth.uid() and recommendations table
ALTER TABLE public.user_profiles ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

-- Create new RLS policies using auth.uid() directly (which returns UUID)
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.user_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Update recommendations table RLS policies to use proper UUID comparison
DROP POLICY IF EXISTS "Users can view their own recommendations" ON public.recommendations;
DROP POLICY IF EXISTS "Users can create their own recommendations" ON public.recommendations;
DROP POLICY IF EXISTS "Users can update their own recommendations" ON public.recommendations;
DROP POLICY IF EXISTS "Users can delete their own recommendations" ON public.recommendations;

CREATE POLICY "Users can view their own recommendations" 
ON public.recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recommendations" 
ON public.recommendations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendations" 
ON public.recommendations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recommendations" 
ON public.recommendations 
FOR DELETE 
USING (auth.uid() = user_id);