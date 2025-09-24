-- Make matrix-data bucket public for easier access during development
UPDATE storage.buckets 
SET public = true 
WHERE id = 'matrix-data';