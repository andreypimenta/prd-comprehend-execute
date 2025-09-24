-- Create RLS policies for matrix-data storage bucket

-- Policy to allow edge functions to upload files to matrix-data bucket
CREATE POLICY "Allow edge functions to upload to matrix-data bucket"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'matrix-data');

-- Policy to allow edge functions to read files from matrix-data bucket  
CREATE POLICY "Allow edge functions to read from matrix-data bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'matrix-data');

-- Policy to allow edge functions to update files in matrix-data bucket
CREATE POLICY "Allow edge functions to update matrix-data bucket"
ON storage.objects  
FOR UPDATE
USING (bucket_id = 'matrix-data');

-- Policy to allow public read access to matrix-data bucket (for import functions)
CREATE POLICY "Allow public read access to matrix-data"
ON storage.objects
FOR SELECT
USING (bucket_id = 'matrix-data');