/*
  # Improve Partial Word Search
  
  1. Changes
    - Update search_help_articles function to handle partial word matches
    - Add prefix matching with :* operator for better autocomplete
    - Include ILIKE fallback for substring matches
    - Combine multiple search strategies for comprehensive results
  
  2. Search Strategy
    - Primary: Full-text search with prefix matching
    - Secondary: ILIKE pattern matching for partial words
    - Ranking: Prioritize exact matches over partial matches
*/

-- Improved search function with partial word matching
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
DECLARE
  tsquery_str text;
BEGIN
  -- Add prefix matching operator for partial word search
  tsquery_str := regexp_replace(search_query, '\s+', ':* & ', 'g') || ':*';
  
  RETURN QUERY
  SELECT DISTINCT
    a.id,
    a.title,
    a.description,
    a.url,
    a.category,
    a.tags,
    GREATEST(
      -- Full-text search rank
      COALESCE(ts_rank(a.search_vector, to_tsquery('english', tsquery_str)), 0),
      -- Bonus for ILIKE matches in title (highest priority)
      CASE WHEN a.title ILIKE '%' || search_query || '%' THEN 1.0 ELSE 0 END,
      -- Bonus for ILIKE matches in description
      CASE WHEN a.description ILIKE '%' || search_query || '%' THEN 0.5 ELSE 0 END,
      -- Bonus for ILIKE matches in content
      CASE WHEN a.content ILIKE '%' || search_query || '%' THEN 0.3 ELSE 0 END,
      -- Bonus for tag matches
      CASE WHEN EXISTS (
        SELECT 1 FROM unnest(a.tags) tag 
        WHERE tag ILIKE '%' || search_query || '%'
      ) THEN 0.4 ELSE 0 END
    ) as rank
  FROM help_articles a
  WHERE 
    a.search_vector @@ to_tsquery('english', tsquery_str)
    OR a.title ILIKE '%' || search_query || '%'
    OR a.description ILIKE '%' || search_query || '%'
    OR a.content ILIKE '%' || search_query || '%'
    OR EXISTS (
      SELECT 1 FROM unnest(a.tags) tag 
      WHERE tag ILIKE '%' || search_query || '%'
    )
  ORDER BY rank DESC, a.title
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Improved autocomplete suggestions with partial matching
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
    a.title ILIKE '%' || search_prefix || '%' OR
    a.description ILIKE '%' || search_prefix || '%' OR
    EXISTS (
      SELECT 1 FROM unnest(a.tags) tag 
      WHERE tag ILIKE '%' || search_prefix || '%'
    )
  ORDER BY 
    CASE 
      WHEN a.title ILIKE search_prefix || '%' THEN 1
      WHEN a.title ILIKE '%' || search_prefix || '%' THEN 2
      WHEN EXISTS (
        SELECT 1 FROM unnest(a.tags) tag 
        WHERE tag ILIKE search_prefix || '%'
      ) THEN 3
      ELSE 4
    END,
    a.title
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
