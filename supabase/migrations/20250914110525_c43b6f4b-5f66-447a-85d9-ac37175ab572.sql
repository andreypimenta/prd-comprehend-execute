-- Create supplements table
CREATE TABLE public.supplements (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('vitamin', 'mineral', 'herb', 'amino_acid', 'other')),
  description TEXT NOT NULL,
  benefits TEXT[] NOT NULL DEFAULT '{}',
  target_symptoms TEXT[] NOT NULL DEFAULT '{}',
  dosage_min FLOAT NOT NULL,
  dosage_max FLOAT NOT NULL,
  dosage_unit TEXT NOT NULL DEFAULT 'mg',
  timing TEXT NOT NULL DEFAULT 'morning' CHECK (timing IN ('morning', 'evening', 'with_meal', 'any')),
  evidence_level TEXT NOT NULL DEFAULT 'moderate' CHECK (evidence_level IN ('strong', 'moderate', 'limited')),
  contraindications TEXT[] NOT NULL DEFAULT '{}',
  interactions TEXT[] NOT NULL DEFAULT '{}',
  price_min FLOAT,
  price_max FLOAT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recommendations table
CREATE TABLE public.recommendations (
  id TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  supplement_id TEXT NOT NULL REFERENCES public.supplements(id) ON DELETE CASCADE,
  recommended_dosage FLOAT NOT NULL,
  confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
  reasoning TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on supplements table
ALTER TABLE public.supplements ENABLE ROW LEVEL SECURITY;

-- Enable RLS on recommendations table  
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Supplements are viewable by everyone (public database)
CREATE POLICY "Supplements are publicly viewable" 
ON public.supplements 
FOR SELECT 
USING (true);

-- Users can view their own recommendations
CREATE POLICY "Users can view their own recommendations" 
ON public.recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can create their own recommendations
CREATE POLICY "Users can create their own recommendations" 
ON public.recommendations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own recommendations
CREATE POLICY "Users can update their own recommendations" 
ON public.recommendations 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own recommendations
CREATE POLICY "Users can delete their own recommendations" 
ON public.recommendations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_recommendations_user_id ON public.recommendations(user_id);
CREATE INDEX idx_recommendations_supplement_id ON public.recommendations(supplement_id);
CREATE INDEX idx_recommendations_confidence ON public.recommendations(confidence DESC);
CREATE INDEX idx_supplements_target_symptoms ON public.supplements USING GIN(target_symptoms);

-- Insert initial supplement data
INSERT INTO public.supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES
('magnesio', 'Magnésio Glicinato', 'mineral', 'Mineral essencial para mais de 300 reações enzimáticas no corpo', 
 ARRAY['Melhora qualidade do sono', 'Reduz ansiedade e estresse', 'Alivia dores musculares', 'Suporte cardiovascular'], 
 ARRAY['Insônia', 'Ansiedade', 'Dores musculares', 'Fadiga'], 
 200, 400, 'mg', 'evening', 'strong', ARRAY['insuficiência renal'], ARRAY['antibióticos', 'diuréticos'], 25, 60),

('vitamina_d3', 'Vitamina D3', 'vitamin', 'Vitamina essencial para saúde óssea, imunidade e humor',
 ARRAY['Fortalece sistema imunológico', 'Melhora humor e energia', 'Saúde óssea', 'Reduz inflamação'],
 ARRAY['Baixa imunidade', 'Mudanças de humor', 'Fadiga'],
 1000, 4000, 'UI', 'morning', 'strong', ARRAY['hipercalcemia'], ARRAY['tiazídicos'], 15, 40),

('omega_3', 'Ômega 3 (EPA/DHA)', 'other', 'Ácidos graxos essenciais para saúde cerebral e cardiovascular',
 ARRAY['Melhora a saúde do coração', 'Suporte à função cerebral', 'Reduz inflamação', 'Estabiliza humor'],
 ARRAY['Mudanças de humor', 'Dificuldade de concentração', 'Dores articulares'],
 1000, 3000, 'mg', 'morning', 'strong', ARRAY[], ARRAY['anticoagulantes'], 30, 80),

('vitamina_b12', 'Vitamina B12', 'vitamin', 'Vitamina essencial para energia e função neurológica',
 ARRAY['Aumenta energia', 'Melhora concentração', 'Suporte neurológico', 'Formação de glóbulos vermelhos'],
 ARRAY['Fadiga', 'Dificuldade de concentração', 'Falta de energia'],
 500, 2000, 'mcg', 'morning', 'strong', ARRAY[], ARRAY[], 20, 45),

('ashwagandha', 'Ashwagandha', 'herb', 'Adaptógeno ayurvédico para estresse e energia',
 ARRAY['Reduz cortisol e estresse', 'Melhora energia', 'Suporte adrenal', 'Melhora qualidade do sono'],
 ARRAY['Ansiedade', 'Fadiga', 'Insônia', 'Estresse excessivo'],
 300, 600, 'mg', 'evening', 'moderate', ARRAY['gravidez', 'doenças autoimunes'], ARRAY['sedativos'], 35, 70),

('probioticos', 'Probióticos Multi-cepas', 'other', 'Bactérias benéficas para saúde intestinal e imunidade',
 ARRAY['Melhora digestão', 'Fortalece imunidade', 'Reduz inflamação', 'Suporte ao humor'],
 ARRAY['Problemas digestivos', 'Baixa imunidade'],
 10, 50, 'bilhões CFU', 'with_meal', 'moderate', ARRAY['imunocomprometidos'], ARRAY['antibióticos'], 40, 90),

('l_teanina', 'L-Teanina', 'amino_acid', 'Aminoácido para relaxamento e foco',
 ARRAY['Reduz ansiedade sem sonolência', 'Melhora foco e concentração', 'Promove relaxamento'],
 ARRAY['Ansiedade', 'Dificuldade de concentração', 'Estresse excessivo'],
 100, 200, 'mg', 'any', 'moderate', ARRAY[], ARRAY[], 25, 55),

('melatonina', 'Melatonina', 'hormone', 'Hormônio natural do sono',
 ARRAY['Melhora qualidade do sono', 'Reduz tempo para adormecer', 'Regula ritmo circadiano'],
 ARRAY['Insônia', 'Problemas de sono'],
 0.5, 3, 'mg', 'evening', 'strong', ARRAY['gravidez', 'crianças'], ARRAY['anticoagulantes'], 15, 35),

('vitamina_c', 'Vitamina C', 'vitamin', 'Antioxidante essencial para imunidade',
 ARRAY['Fortalece sistema imunológico', 'Antioxidante poderoso', 'Suporte à produção de colágeno'],
 ARRAY['Baixa imunidade', 'Recuperação lenta pós-treino'],
 500, 2000, 'mg', 'morning', 'strong', ARRAY[], ARRAY[], 10, 30),

('ferro', 'Ferro Quelato', 'mineral', 'Mineral essencial para energia e transporte de oxigênio',
 ARRAY['Combate anemia', 'Aumenta energia', 'Melhora transporte de oxigênio'],
 ARRAY['Fadiga', 'Falta de energia', 'Cansaço extremo'],
 15, 45, 'mg', 'morning', 'strong', ARRAY['hemocromatose'], ARRAY['antiácidos'], 20, 50);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_supplements_updated_at
  BEFORE UPDATE ON public.supplements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();