-- Update weekly_checkins table to match PRD schema
ALTER TABLE public.weekly_checkins 
ADD COLUMN IF NOT EXISTS wellbeing JSONB DEFAULT '{"energy": 3, "mood": 3, "sleep": 3, "overall": 3}'::jsonb,
ADD COLUMN IF NOT EXISTS feedback JSONB DEFAULT '{"positiveChanges": [], "concerns": [], "overallSatisfaction": 3}'::jsonb,
ADD COLUMN IF NOT EXISTS metrics JSONB DEFAULT '{"wellbeingScore": 0, "complianceScore": 0, "overallImprovement": 50}'::jsonb,
ADD COLUMN IF NOT EXISTS week_number_formatted TEXT;

-- Update existing records to have proper week formatting
UPDATE public.weekly_checkins 
SET week_number_formatted = EXTRACT(YEAR FROM checkin_date)::text || '-W' || LPAD(EXTRACT(WEEK FROM checkin_date)::text, 2, '0')
WHERE week_number_formatted IS NULL;

-- Add index for the new formatted week column
CREATE INDEX IF NOT EXISTS idx_weekly_checkins_week_formatted ON public.weekly_checkins(user_id, week_number_formatted);