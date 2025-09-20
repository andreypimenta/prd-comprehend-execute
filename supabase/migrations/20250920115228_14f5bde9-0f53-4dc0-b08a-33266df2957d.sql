-- Fix security issues from the linter

-- Fix search path for the function
CREATE OR REPLACE FUNCTION public.get_current_week_number(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  first_checkin_date TIMESTAMP WITH TIME ZONE;
  current_week INTEGER;
BEGIN
  -- Get the date of the first checkin for this user
  SELECT MIN(checkin_date) INTO first_checkin_date 
  FROM public.weekly_checkins 
  WHERE weekly_checkins.user_id = get_current_week_number.user_id;
  
  -- If no checkins yet, start with week 1
  IF first_checkin_date IS NULL THEN
    RETURN 1;
  END IF;
  
  -- Calculate week number based on first checkin
  current_week := CEIL(EXTRACT(EPOCH FROM (now() - first_checkin_date)) / (7 * 24 * 3600)) + 1;
  
  RETURN GREATEST(current_week, 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Add RLS policies for verification_tokens table if it doesn't have them
-- First check if we need to remove this table since it appears to be unused
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'verification_tokens' AND table_schema = 'public') THEN
    -- Since this table appears to be empty and unused, let's add basic RLS policies
    CREATE POLICY "Users can manage their own verification tokens" 
    ON public.verification_tokens 
    FOR ALL 
    USING (identifier = current_setting('request.jwt.claims', true)::json->>'email');
  END IF;
END $$;