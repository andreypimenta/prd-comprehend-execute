-- Expand supplements table with new fields
ALTER TABLE public.supplements 
ADD COLUMN IF NOT EXISTS mechanism TEXT,
ADD COLUMN IF NOT EXISTS agent_category TEXT,
ADD COLUMN IF NOT EXISTS medical_conditions TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS synergy_potential TEXT,
ADD COLUMN IF NOT EXISTS priority_level TEXT DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS scientific_evidence TEXT DEFAULT 'moderate';

-- Create therapeutic_protocols table
CREATE TABLE IF NOT EXISTS public.therapeutic_protocols (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  condition TEXT NOT NULL,
  supplement_combination JSONB NOT NULL DEFAULT '[]',
  synergy_description TEXT,
  expected_efficacy TEXT,
  implementation_phases JSONB DEFAULT '{}',
  monitoring_parameters JSONB DEFAULT '{}',
  individualization_factors JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create protocol_recommendations table
CREATE TABLE IF NOT EXISTS public.protocol_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocol_id UUID REFERENCES public.therapeutic_protocols(id),
  confidence_score INTEGER NOT NULL DEFAULT 0,
  personalization_notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.therapeutic_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies for therapeutic_protocols (public read access)
CREATE POLICY "Protocols are publicly viewable" 
ON public.therapeutic_protocols 
FOR SELECT 
USING (true);

-- Create policies for protocol_recommendations (user-specific access)
CREATE POLICY "Users can view their own protocol recommendations" 
ON public.protocol_recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own protocol recommendations" 
ON public.protocol_recommendations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own protocol recommendations" 
ON public.protocol_recommendations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own protocol recommendations" 
ON public.protocol_recommendations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_therapeutic_protocols_updated_at
  BEFORE UPDATE ON public.therapeutic_protocols
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_protocol_recommendations_updated_at
  BEFORE UPDATE ON public.protocol_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();