-- Update weekly_checkins table to match PRD schema exactly
ALTER TABLE public.weekly_checkins 
ADD COLUMN wellbeing JSONB DEFAULT '{"energy": 3, "mood": 3, "sleep": 3, "overall": 3}'::jsonb,
ADD COLUMN feedback JSONB DEFAULT '{"positiveChanges": [], "concerns": [], "overallSatisfaction": 3}'::jsonb,
ADD COLUMN metrics JSONB DEFAULT '{"wellbeingScore": 0, "complianceScore": 0, "overallImprovement": 50}'::jsonb,
ADD COLUMN week_number_formatted TEXT; -- Store as "2025-W37" format

-- Update existing records to have proper week formatting
UPDATE public.weekly_checkins 
SET week_number_formatted = EXTRACT(YEAR FROM checkin_date)::text || '-W' || LPAD(EXTRACT(WEEK FROM checkin_date)::text, 2, '0')
WHERE week_number_formatted IS NULL;

-- Add index for the new formatted week column
CREATE INDEX idx_weekly_checkins_week_formatted ON public.weekly_checkins(user_id, week_number_formatted);

-- Update checkin_reminders to match PRD
ALTER TABLE public.checkin_reminders 
ADD COLUMN type TEXT NOT NULL DEFAULT 'weekly_checkin',
ALTER COLUMN next_checkin_date RENAME TO scheduled_for,
ADD COLUMN sent BOOLEAN NOT NULL DEFAULT false;

-- Add check constraint for reminder types
ALTER TABLE public.checkin_reminders 
ADD CONSTRAINT chk_reminder_type CHECK (type IN ('weekly_checkin', 'supplement_reminder'));

-- Create function to calculate checkin metrics
CREATE OR REPLACE FUNCTION public.calculate_checkin_metrics(
  wellbeing_data JSONB,
  compliance_data JSONB,
  symptom_ratings_data JSONB
) RETURNS JSONB AS $$
DECLARE
  wellbeing_score INTEGER;
  compliance_score INTEGER;
  overall_improvement INTEGER;
  wellbeing_values INTEGER[];
  compliance_values JSONB;
  symptom_improvements INTEGER[];
  total_days INTEGER;
  compliant_days INTEGER;
  improvement_sum INTEGER;
BEGIN
  -- Calculate wellbeing score (average of all wellbeing values)
  wellbeing_values := ARRAY[
    (wellbeing_data->>'energy')::INTEGER,
    (wellbeing_data->>'mood')::INTEGER,
    (wellbeing_data->>'sleep')::INTEGER,
    (wellbeing_data->>'overall')::INTEGER
  ];
  wellbeing_score := (SELECT AVG(value)::INTEGER FROM UNNEST(wellbeing_values) AS value);
  
  -- Calculate compliance score (percentage of compliant days)
  total_days := 0;
  compliant_days := 0;
  
  FOR compliance_values IN SELECT value FROM jsonb_each(compliance_data)
  LOOP
    total_days := total_days + 7; -- 7 days per supplement
    compliant_days := compliant_days + (compliance_values->>'daysCompliant')::INTEGER;
  END LOOP;
  
  compliance_score := CASE 
    WHEN total_days > 0 THEN ROUND((compliant_days::DECIMAL / total_days) * 100)::INTEGER
    ELSE 0 
  END;
  
  -- Calculate overall improvement (from symptom improvements)
  improvement_sum := 0;
  SELECT COUNT(*) INTO total_days FROM jsonb_each(symptom_ratings_data);
  
  FOR compliance_values IN SELECT value FROM jsonb_each(symptom_ratings_data)
  LOOP
    improvement_sum := improvement_sum + (compliance_values->>'improvement')::INTEGER;
  END LOOP;
  
  overall_improvement := CASE
    WHEN total_days > 0 THEN ROUND((improvement_sum::DECIMAL / total_days) * 25 + 50)::INTEGER
    ELSE 50
  END;
  
  RETURN jsonb_build_object(
    'wellbeingScore', wellbeing_score,
    'complianceScore', compliance_score,
    'overallImprovement', overall_improvement
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Create function to schedule next reminder
CREATE OR REPLACE FUNCTION public.schedule_next_reminder(user_id_param UUID)
RETURNS VOID AS $$
DECLARE
  next_week TIMESTAMP WITH TIME ZONE;
BEGIN
  next_week := NOW() + INTERVAL '7 days';
  
  INSERT INTO public.checkin_reminders (user_id, type, scheduled_for, is_active)
  VALUES (user_id_param, 'weekly_checkin', next_week, true)
  ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;