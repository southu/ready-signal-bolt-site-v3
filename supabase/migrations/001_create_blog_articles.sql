-- Create blog_articles table for Ready Signal CMS
-- Run this in your Supabase SQL Editor

-- Create the blog_articles table
CREATE TABLE IF NOT EXISTS blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  author TEXT NOT NULL DEFAULT 'Ready Signal Team',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  modified_date DATE,
  category TEXT NOT NULL DEFAULT 'Resources',
  tags TEXT[] DEFAULT '{}',
  image TEXT,
  content TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON blog_articles(status);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published_date ON blog_articles(published_date DESC);

-- Create full-text search index for search functionality
CREATE INDEX IF NOT EXISTS idx_blog_articles_search ON blog_articles 
USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || content));

-- Enable Row Level Security (optional - adjust based on your needs)
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published articles
CREATE POLICY "Public can view published articles" ON blog_articles
  FOR SELECT
  USING (status = 'published');

-- Policy: Authenticated users can do everything (for admin)
CREATE POLICY "Authenticated users have full access" ON blog_articles
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Function to update modified_date automatically
CREATE OR REPLACE FUNCTION update_modified_date()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.modified_date = CURRENT_DATE;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update modified_date on updates
CREATE TRIGGER blog_articles_updated
  BEFORE UPDATE ON blog_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_date();

-- Comment on table for documentation
COMMENT ON TABLE blog_articles IS 'Blog articles for Ready Signal marketing website';

