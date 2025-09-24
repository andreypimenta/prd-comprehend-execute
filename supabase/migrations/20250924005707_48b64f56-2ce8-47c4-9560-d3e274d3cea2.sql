-- Expandir tabela scientific_evidence com campos de controle automático
ALTER TABLE public.scientific_evidence 
ADD COLUMN IF NOT EXISTS nivel_evidencia text DEFAULT 'moderate',
ADD COLUMN IF NOT EXISTS impacto_classificacao text DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active',
ADD COLUMN IF NOT EXISTS auto_update_source text,
ADD COLUMN IF NOT EXISTS evidence_score numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_verification_date timestamp with time zone DEFAULT now(),
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending';

-- Criar tabela de alertas de segurança
CREATE TABLE public.security_alerts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplement_id text NOT NULL,
  alert_type text NOT NULL, -- 'recall', 'interaction', 'adverse_event', 'dosage_warning'
  severity text NOT NULL DEFAULT 'medium', -- 'critical', 'high', 'medium', 'low'
  source text NOT NULL, -- 'FDA', 'EMA', 'ANVISA', 'HC'
  title text NOT NULL,
  description text,
  alert_date date NOT NULL,
  status text NOT NULL DEFAULT 'active', -- 'active', 'resolved', 'under_review'
  affected_products jsonb DEFAULT '[]'::jsonb,
  recommended_actions jsonb DEFAULT '[]'::jsonb,
  external_reference text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on security_alerts
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;

-- Policy for security alerts (publicly viewable for transparency)
CREATE POLICY "Security alerts are publicly viewable" 
ON public.security_alerts 
FOR SELECT 
USING (true);

-- Criar tabela de histórico de atualizações automáticas
CREATE TABLE public.evidence_updates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplement_id text NOT NULL,
  update_type text NOT NULL, -- 'evidence_level_change', 'new_study', 'safety_alert', 'dosage_update'
  old_value jsonb,
  new_value jsonb,
  confidence_score numeric DEFAULT 0,
  automatic boolean NOT NULL DEFAULT true,
  approved_by uuid,
  approved_at timestamp with time zone,
  justification text,
  source_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on evidence_updates
ALTER TABLE public.evidence_updates ENABLE ROW LEVEL SECURITY;

-- Policy for evidence updates (publicly viewable for transparency)
CREATE POLICY "Evidence updates are publicly viewable" 
ON public.evidence_updates 
FOR SELECT 
USING (true);

-- Criar tabela de trabalhos de monitoramento
CREATE TABLE public.monitoring_jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_type text NOT NULL, -- 'evidence_collection', 'safety_monitoring', 'classification_update'
  status text NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  target_supplements jsonb DEFAULT '[]'::jsonb,
  parameters jsonb DEFAULT '{}'::jsonb,
  progress jsonb DEFAULT '{}'::jsonb,
  results jsonb DEFAULT '{}'::jsonb,
  error_message text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  next_run_at timestamp with time zone,
  run_interval_hours integer DEFAULT 24,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on monitoring_jobs
ALTER TABLE public.monitoring_jobs ENABLE ROW LEVEL SECURITY;

-- Policy for monitoring jobs (admin access only for now)
CREATE POLICY "Monitoring jobs are publicly viewable" 
ON public.monitoring_jobs 
FOR SELECT 
USING (true);

-- Criar tabela de classificações automáticas
CREATE TABLE public.evidence_classifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplement_id text NOT NULL,
  classification_type text NOT NULL, -- 'evidence_level', 'safety_profile', 'efficacy_rating'
  old_classification text,
  new_classification text NOT NULL,
  confidence_score numeric NOT NULL DEFAULT 0,
  reasoning text,
  supporting_studies jsonb DEFAULT '[]'::jsonb,
  auto_approved boolean NOT NULL DEFAULT false,
  requires_review boolean NOT NULL DEFAULT true,
  reviewed_by uuid,
  reviewed_at timestamp with time zone,
  review_notes text,
  applied_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on evidence_classifications
ALTER TABLE public.evidence_classifications ENABLE ROW LEVEL SECURITY;

-- Policy for evidence classifications (publicly viewable for transparency)
CREATE POLICY "Evidence classifications are publicly viewable" 
ON public.evidence_classifications 
FOR SELECT 
USING (true);

-- Criar índices para performance
CREATE INDEX idx_security_alerts_supplement_severity ON public.security_alerts(supplement_id, severity);
CREATE INDEX idx_security_alerts_date_status ON public.security_alerts(alert_date DESC, status);
CREATE INDEX idx_evidence_updates_supplement_type ON public.evidence_updates(supplement_id, update_type);
CREATE INDEX idx_evidence_updates_date ON public.evidence_updates(created_at DESC);
CREATE INDEX idx_monitoring_jobs_status_next_run ON public.monitoring_jobs(status, next_run_at);
CREATE INDEX idx_evidence_classifications_supplement_review ON public.evidence_classifications(supplement_id, requires_review);

-- Criar trigger para updated_at
CREATE TRIGGER update_security_alerts_updated_at
  BEFORE UPDATE ON public.security_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evidence_updates_updated_at
  BEFORE UPDATE ON public.evidence_updates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_monitoring_jobs_updated_at
  BEFORE UPDATE ON public.monitoring_jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evidence_classifications_updated_at
  BEFORE UPDATE ON public.evidence_classifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();