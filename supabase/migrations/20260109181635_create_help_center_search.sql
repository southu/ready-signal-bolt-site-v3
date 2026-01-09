/*
  # Help Center Search System

  1. New Tables
    - `help_articles`
      - `id` (uuid, primary key)
      - `title` (text) - Article title
      - `description` (text) - Brief description
      - `content` (text) - Full searchable content
      - `url` (text) - Article URL path
      - `category` (text) - Category for grouping
      - `tags` (text[]) - Array of tags for filtering
      - `search_vector` (tsvector) - Full-text search vector
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `search_analytics`
      - `id` (uuid, primary key)
      - `search_query` (text) - What the user searched for
      - `results_count` (integer) - Number of results returned
      - `clicked_result` (text) - URL of clicked result (nullable)
      - `session_id` (text) - Anonymous session identifier
      - `created_at` (timestamptz)

  2. Indexes
    - GIN index on search_vector for fast full-text search
    - Index on category for filtering
    - Index on search_query for analytics
    
  3. Security
    - Enable RLS on both tables
    - Allow public read access to help_articles
    - Allow public insert to search_analytics (for tracking)
*/

-- Create help_articles table
CREATE TABLE IF NOT EXISTS help_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  url text UNIQUE NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  search_vector tsvector,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create search_analytics table
CREATE TABLE IF NOT EXISTS search_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query text NOT NULL,
  results_count integer NOT NULL DEFAULT 0,
  clicked_result text,
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create GIN index for full-text search
CREATE INDEX IF NOT EXISTS help_articles_search_idx ON help_articles USING GIN(search_vector);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS help_articles_category_idx ON help_articles(category);

-- Create index on search_query for analytics
CREATE INDEX IF NOT EXISTS search_analytics_query_idx ON search_analytics(search_query);

-- Create index on created_at for analytics queries
CREATE INDEX IF NOT EXISTS search_analytics_created_at_idx ON search_analytics(created_at DESC);

-- Function to update search_vector automatically
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'C');
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update search_vector on insert/update
DROP TRIGGER IF EXISTS help_articles_search_vector_update ON help_articles;
CREATE TRIGGER help_articles_search_vector_update
  BEFORE INSERT OR UPDATE ON help_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_search_vector();

-- Function to search articles with ranking
CREATE OR REPLACE FUNCTION search_help_articles(
  search_query text,
  limit_count integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  title text,
  description text,
  url text,
  category text,
  tags text[],
  rank real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.description,
    a.url,
    a.category,
    a.tags,
    ts_rank(a.search_vector, websearch_to_tsquery('english', search_query)) as rank
  FROM help_articles a
  WHERE a.search_vector @@ websearch_to_tsquery('english', search_query)
  ORDER BY rank DESC, a.title
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get autocomplete suggestions
CREATE OR REPLACE FUNCTION get_search_suggestions(
  search_prefix text,
  limit_count integer DEFAULT 5
)
RETURNS TABLE (
  title text,
  url text,
  category text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.title,
    a.url,
    a.category
  FROM help_articles a
  WHERE 
    a.title ILIKE search_prefix || '%' OR
    a.description ILIKE search_prefix || '%'
  ORDER BY 
    CASE 
      WHEN a.title ILIKE search_prefix || '%' THEN 1
      ELSE 2
    END,
    a.title
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE help_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for help_articles
CREATE POLICY "Anyone can view help articles"
  ON help_articles
  FOR SELECT
  TO public
  USING (true);

-- RLS Policies for search_analytics
CREATE POLICY "Anyone can insert search analytics"
  ON search_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view analytics"
  ON search_analytics
  FOR SELECT
  TO authenticated
  USING (true);
