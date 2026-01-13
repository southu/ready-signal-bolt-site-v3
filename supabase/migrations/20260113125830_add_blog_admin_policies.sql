/*
  # Add Blog Admin RLS Policies

  1. Security Changes
    - Add INSERT policy for anonymous users (admin panel)
    - Add UPDATE policy for anonymous users (admin panel)
    - Add DELETE policy for anonymous users (admin panel)
    - Add SELECT policy for all articles (admin panel needs to see drafts)

  2. Notes
    - These policies allow the blog admin panel to function without authentication
    - In production, consider adding authentication to the admin panel
*/

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Allow anonymous insert for admin" ON blog_articles;
  DROP POLICY IF EXISTS "Allow anonymous update for admin" ON blog_articles;
  DROP POLICY IF EXISTS "Allow anonymous delete for admin" ON blog_articles;
  DROP POLICY IF EXISTS "Allow anonymous select all for admin" ON blog_articles;
END $$;

-- Allow anonymous users to insert articles (for admin panel)
CREATE POLICY "Allow anonymous insert for admin"
  ON blog_articles
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update articles (for admin panel)
CREATE POLICY "Allow anonymous update for admin"
  ON blog_articles
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete articles (for admin panel)
CREATE POLICY "Allow anonymous delete for admin"
  ON blog_articles
  FOR DELETE
  TO anon
  USING (true);

-- Allow anonymous users to read all articles (admin needs to see drafts)
CREATE POLICY "Allow anonymous select all for admin"
  ON blog_articles
  FOR SELECT
  TO anon
  USING (true);
