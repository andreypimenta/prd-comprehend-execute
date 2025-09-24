-- Create storage bucket for matrix data
INSERT INTO storage.buckets (id, name, public) VALUES ('matrix-data', 'matrix-data', false);

-- Create storage policies for matrix data
CREATE POLICY "Matrix data is accessible by functions" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'matrix-data');

CREATE POLICY "Functions can upload matrix data" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'matrix-data');