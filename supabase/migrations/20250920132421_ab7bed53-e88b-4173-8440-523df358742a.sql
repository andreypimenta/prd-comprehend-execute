-- Create table for user selected supplements
CREATE TABLE public.user_selected_supplements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recommendation_id TEXT NOT NULL,
  supplement_id TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  target_duration_weeks INTEGER DEFAULT 12,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_selected_supplements ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own selected supplements" 
ON public.user_selected_supplements 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own selected supplements" 
ON public.user_selected_supplements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own selected supplements" 
ON public.user_selected_supplements 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own selected supplements" 
ON public.user_selected_supplements 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_selected_supplements_updated_at
BEFORE UPDATE ON public.user_selected_supplements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_user_selected_supplements_user_id ON public.user_selected_supplements(user_id);
CREATE INDEX idx_user_selected_supplements_active ON public.user_selected_supplements(user_id, is_active);