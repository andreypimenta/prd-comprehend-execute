-- Create weekly_checkins table
CREATE TABLE public.weekly_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  checkin_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Symptom ratings (1-10 scale)
  fatigue_level INTEGER CHECK (fatigue_level >= 1 AND fatigue_level <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  mood_level INTEGER CHECK (mood_level >= 1 AND mood_level <= 10),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  focus_level INTEGER CHECK (focus_level >= 1 AND focus_level <= 10),
  
  -- Custom symptoms tracking
  custom_symptoms JSONB DEFAULT '[]'::jsonb,
  
  -- Supplement compliance
  supplement_adherence JSONB DEFAULT '{}'::jsonb,
  overall_compliance_percentage DECIMAL(5,2) DEFAULT 0,
  
  -- Additional notes
  notes TEXT,
  side_effects TEXT,
  
  -- Wellness metrics
  weight DECIMAL(5,2),
  exercise_frequency INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure only one checkin per user per week
  CONSTRAINT unique_user_week UNIQUE (user_id, week_number)
);

-- Create checkin_reminders table
CREATE TABLE public.checkin_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  next_checkin_date TIMESTAMP WITH TIME ZONE NOT NULL,
  reminder_frequency INTEGER NOT NULL DEFAULT 7, -- days
  is_active BOOLEAN NOT NULL DEFAULT true,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  push_notifications BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.weekly_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkin_reminders ENABLE ROW LEVEL SECURITY;

-- RLS policies for weekly_checkins
CREATE POLICY "Users can view their own checkins" 
ON public.weekly_checkins 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own checkins" 
ON public.weekly_checkins 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own checkins" 
ON public.weekly_checkins 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own checkins" 
ON public.weekly_checkins 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS policies for checkin_reminders
CREATE POLICY "Users can view their own reminders" 
ON public.checkin_reminders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reminders" 
ON public.checkin_reminders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
ON public.checkin_reminders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
ON public.checkin_reminders 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_weekly_checkins_updated_at
BEFORE UPDATE ON public.weekly_checkins
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_checkin_reminders_updated_at
BEFORE UPDATE ON public.checkin_reminders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_weekly_checkins_user_id ON public.weekly_checkins(user_id);
CREATE INDEX idx_weekly_checkins_week ON public.weekly_checkins(user_id, week_number);
CREATE INDEX idx_weekly_checkins_date ON public.weekly_checkins(checkin_date);
CREATE INDEX idx_checkin_reminders_user_id ON public.checkin_reminders(user_id);
CREATE INDEX idx_checkin_reminders_next_date ON public.checkin_reminders(next_checkin_date, is_active);

-- Create function to calculate week number
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;