-- Add audio narration columns to blog_articles
ALTER TABLE blog_articles
  ADD COLUMN IF NOT EXISTS audio_url TEXT,
  ADD COLUMN IF NOT EXISTS audio_voice TEXT DEFAULT 'nova',
  ADD COLUMN IF NOT EXISTS audio_status TEXT DEFAULT 'none' CHECK (audio_status IN ('none', 'generating', 'completed', 'failed')),
  ADD COLUMN IF NOT EXISTS audio_duration_seconds INTEGER;

-- Create the audio storage bucket (public read)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('audio', 'audio', true, 52428800, ARRAY['audio/mpeg', 'audio/mp3'])
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to audio files
CREATE POLICY "Public audio read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'audio');

-- Allow service role to upload audio files
CREATE POLICY "Service role audio write" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'audio');

-- Allow service role to overwrite audio files (for regeneration)
CREATE POLICY "Service role audio update" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'audio');

-- Allow service role to delete audio files
CREATE POLICY "Service role audio delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'audio');
