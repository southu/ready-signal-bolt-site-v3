-- Create logs table for debugging AI functions
CREATE TABLE IF NOT EXISTS function_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  function_name TEXT NOT NULL,
  level TEXT DEFAULT 'info' CHECK (level IN ('debug', 'info', 'warn', 'error')),
  message TEXT NOT NULL,
  data JSONB,
  -- Auto-expire after 24 hours
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Create index for faster queries
CREATE INDEX idx_logs_created_at ON function_logs(created_at DESC);
CREATE INDEX idx_logs_function_name ON function_logs(function_name);
CREATE INDEX idx_logs_level ON function_logs(level);
CREATE INDEX idx_logs_expires_at ON function_logs(expires_at);

-- Enable RLS
ALTER TABLE function_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role can do everything" ON function_logs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow anon to read logs (for debugging from admin panel)
CREATE POLICY "Anon can read logs" ON function_logs
  FOR SELECT
  USING (true);

-- Function to clean up expired logs (called automatically)
CREATE OR REPLACE FUNCTION cleanup_expired_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM function_logs WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to cleanup old logs on each insert (simple approach)
CREATE OR REPLACE FUNCTION cleanup_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Clean up expired logs (runs occasionally, not every insert)
  IF random() < 0.1 THEN  -- 10% chance on each insert
    PERFORM cleanup_expired_logs();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_cleanup_logs
  AFTER INSERT ON function_logs
  FOR EACH ROW
  EXECUTE FUNCTION cleanup_on_insert();

-- Grant permissions
GRANT ALL ON function_logs TO service_role;
GRANT SELECT ON function_logs TO anon;
GRANT INSERT ON function_logs TO anon;
