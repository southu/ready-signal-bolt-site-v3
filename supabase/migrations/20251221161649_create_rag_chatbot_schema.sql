-- RAG Chatbot Knowledge Base Schema
--
-- 1. New Tables
--    - knowledge_base: Document chunks with vector embeddings
--    - chat_sessions: Chat conversation tracking
--    - chat_messages: Individual messages with retrieval context
--    - rate_limits: Rate limiting for cost control
--    - system_logs: Centralized logging
--    - system_prompts: Version-controlled system prompts
--
-- 2. Security
--    - Enable RLS on all tables
--    - Policies for authenticated and anonymous access
--    - Service role access for admin operations
--
-- 3. Performance
--    - HNSW vector index for fast similarity search
--    - B-tree indexes on foreign keys
--    - Partial indexes for common queries

-- Enable pgvector extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Knowledge Base table: stores document chunks with embeddings
CREATE TABLE IF NOT EXISTS knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  embedding vector(1536),
  metadata jsonb DEFAULT '{}'::jsonb,
  document_id text,
  document_name text,
  chunk_index int,
  token_count int,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for knowledge_base
CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx ON knowledge_base USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS knowledge_base_document_id_idx ON knowledge_base (document_id);
CREATE INDEX IF NOT EXISTS knowledge_base_metadata_category_idx ON knowledge_base ((metadata->>'category'));
CREATE INDEX IF NOT EXISTS knowledge_base_created_at_idx ON knowledge_base (created_at DESC);

-- Chat Sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_sessions_user_id_idx ON chat_sessions (user_id);
CREATE INDEX IF NOT EXISTS chat_sessions_created_at_idx ON chat_sessions (created_at DESC);

-- Chat Messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  retrieved_chunks uuid[],
  model_used text,
  tokens_used jsonb,
  latency_ms int,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_messages_session_id_idx ON chat_messages (session_id);
CREATE INDEX IF NOT EXISTS chat_messages_created_at_idx ON chat_messages (created_at DESC);

-- Rate Limits table
CREATE TABLE IF NOT EXISTS rate_limits (
  identifier text PRIMARY KEY,
  requests_count int DEFAULT 0,
  window_start timestamptz DEFAULT now(),
  blocked_until timestamptz
);

CREATE INDEX IF NOT EXISTS rate_limits_blocked_idx ON rate_limits (blocked_until) WHERE blocked_until IS NOT NULL;

-- System Logs table
CREATE TABLE IF NOT EXISTS system_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level text NOT NULL CHECK (level IN ('info', 'warn', 'error')),
  component text NOT NULL,
  message text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS system_logs_created_at_idx ON system_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS system_logs_level_idx ON system_logs (level) WHERE level IN ('warn', 'error');
CREATE INDEX IF NOT EXISTS system_logs_component_idx ON system_logs (component);

-- System Prompts table
CREATE TABLE IF NOT EXISTS system_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  version int NOT NULL DEFAULT 1,
  prompt_text text NOT NULL,
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(name, version)
);

CREATE INDEX IF NOT EXISTS system_prompts_active_idx ON system_prompts (name, is_active) WHERE is_active = true;

-- Enable Row Level Security
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_prompts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for knowledge_base (read-only for all, write for service role)
CREATE POLICY "Anyone can read knowledge base"
  ON knowledge_base FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert knowledge base"
  ON knowledge_base FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update knowledge base"
  ON knowledge_base FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete knowledge base"
  ON knowledge_base FOR DELETE
  TO service_role
  USING (true);

-- RLS Policies for chat_sessions
CREATE POLICY "Users can create chat sessions"
  ON chat_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own chat sessions"
  ON chat_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anonymous users can view their sessions"
  ON chat_sessions FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE POLICY "Users can update own chat sessions"
  ON chat_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can insert chat messages"
  ON chat_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_sessions
      WHERE chat_sessions.id = chat_messages.session_id
    )
  );

CREATE POLICY "Users can view chat messages in their sessions"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_sessions
      WHERE chat_sessions.id = chat_messages.session_id
      AND chat_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Anonymous users can view their chat messages"
  ON chat_messages FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM chat_sessions
      WHERE chat_sessions.id = chat_messages.session_id
      AND chat_sessions.user_id IS NULL
    )
  );

-- RLS Policies for rate_limits (service role only)
CREATE POLICY "Service role can manage rate limits"
  ON rate_limits FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for system_logs (service role only)
CREATE POLICY "Service role can insert logs"
  ON system_logs FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read logs"
  ON system_logs FOR SELECT
  TO service_role
  USING (true);

-- RLS Policies for system_prompts
CREATE POLICY "Anyone can read active system prompts"
  ON system_prompts FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Service role can manage system prompts"
  ON system_prompts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert default system prompt
INSERT INTO system_prompts (name, version, prompt_text, is_active)
VALUES (
  'default',
  1,
  'You are an expert forecasting consultant specializing in time series analysis, statistical modeling, and machine learning approaches. You help business analysts and data scientists with:

1. Choosing appropriate forecasting models (ARIMA, ETS, Prophet, ML models)
2. Troubleshooting Python forecasting code
3. Advising on external data integration for better predictions
4. Best practices for model validation and accuracy metrics

When answering:
- Be concise but thorough
- Provide code examples when relevant
- Reference specific documentation when available
- Ask clarifying questions if the query is ambiguous
- Acknowledge limitations when uncertain

Use the following context from our knowledge base to inform your answers. If the context does not contain relevant information, say so and provide general guidance based on industry best practices.',
  true
)
ON CONFLICT (name, version) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for knowledge_base updated_at
DROP TRIGGER IF EXISTS update_knowledge_base_updated_at ON knowledge_base;
CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function for vector similarity search
CREATE OR REPLACE FUNCTION search_knowledge_base(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5,
  filter_metadata jsonb DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  document_name text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.content,
    kb.metadata,
    kb.document_name,
    1 - (kb.embedding <=> query_embedding) as similarity
  FROM knowledge_base kb
  WHERE 
    (filter_metadata IS NULL OR kb.metadata @> filter_metadata)
    AND (1 - (kb.embedding <=> query_embedding)) > match_threshold
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
