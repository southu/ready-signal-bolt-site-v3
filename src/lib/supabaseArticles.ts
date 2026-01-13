import { supabase } from './supabase';

// Database article type (matches Supabase schema)
export interface DBArticle {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  author: string;
  published_date: string;
  modified_date: string | null;
  category: string;
  tags: string[];
  featured_image: string | null;
  content: string;
  excerpt: string | null;
  is_published: boolean;
  created_at: string;
}

// Frontend article type (for compatibility with existing components)
export interface Article {
  id?: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  category: string;
  tags: string[];
  image?: string;
  content: string;
  status?: 'draft' | 'published';
}

// Convert database format to frontend format
export function dbToFrontend(dbArticle: DBArticle): Article {
  return {
    id: dbArticle.id,
    slug: dbArticle.slug,
    title: dbArticle.title,
    description: dbArticle.description || '',
    author: dbArticle.author,
    publishedDate: dbArticle.published_date ? dbArticle.published_date.split('T')[0] : new Date().toISOString().split('T')[0],
    modifiedDate: dbArticle.modified_date ? dbArticle.modified_date.split('T')[0] : undefined,
    category: dbArticle.category,
    tags: dbArticle.tags || [],
    image: dbArticle.featured_image || undefined,
    content: dbArticle.content,
    status: dbArticle.is_published ? 'published' : 'draft',
  };
}

// Convert frontend format to database format
export function frontendToDb(article: Partial<Article>): Partial<DBArticle> {
  const dbArticle: Partial<DBArticle> = {};

  if (article.slug !== undefined) dbArticle.slug = article.slug;
  if (article.title !== undefined) dbArticle.title = article.title;
  if (article.description !== undefined) dbArticle.description = article.description;
  if (article.author !== undefined) dbArticle.author = article.author;
  if (article.publishedDate !== undefined) dbArticle.published_date = article.publishedDate;
  if (article.modifiedDate !== undefined) dbArticle.modified_date = article.modifiedDate;
  if (article.category !== undefined) dbArticle.category = article.category;
  if (article.tags !== undefined) dbArticle.tags = article.tags;
  if (article.image !== undefined) dbArticle.featured_image = article.image || null;
  if (article.content !== undefined) dbArticle.content = article.content;
  if (article.status !== undefined) dbArticle.is_published = article.status === 'published';

  return dbArticle;
}

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && !url.includes('placeholder'));
}

// ============ READ OPERATIONS ============

/**
 * Fetch all published articles
 */
export async function fetchPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('is_published', true)
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching published articles:', error);
    throw error;
  }

  return (data || []).map(dbToFrontend);
}

/**
 * Fetch all articles (for admin)
 */
export async function fetchAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching all articles:', error);
    throw error;
  }

  return (data || []).map(dbToFrontend);
}

/**
 * Fetch a single article by slug
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    console.error('Error fetching article:', error);
    throw error;
  }

  return data ? dbToFrontend(data) : null;
}

/**
 * Fetch article by ID
 */
export async function fetchArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching article by ID:', error);
    throw error;
  }

  return data ? dbToFrontend(data) : null;
}

// ============ CREATE OPERATIONS ============

/**
 * Create a new article
 */
export async function createArticle(article: Omit<Article, 'id'>): Promise<Article> {
  const dbData = frontendToDb(article);
  
  const { data, error } = await supabase
    .from('blog_articles')
    .insert([dbData])
    .select()
    .single();

  if (error) {
    console.error('Error creating article:', error);
    throw error;
  }

  return dbToFrontend(data);
}

// ============ UPDATE OPERATIONS ============

/**
 * Update an existing article
 */
export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
  const dbData = frontendToDb(updates);
  
  const { data, error } = await supabase
    .from('blog_articles')
    .update(dbData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating article:', error);
    throw error;
  }

  return dbToFrontend(data);
}

/**
 * Publish an article (change status to published)
 */
export async function publishArticle(id: string): Promise<Article> {
  return updateArticle(id, { status: 'published' });
}

/**
 * Unpublish an article (change status to draft)
 */
export async function unpublishArticle(id: string): Promise<Article> {
  return updateArticle(id, { status: 'draft' });
}

// ============ DELETE OPERATIONS ============

/**
 * Delete an article
 */
export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase
    .from('blog_articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}

// ============ UTILITY FUNCTIONS ============

/**
 * Generate a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Check if a slug is unique
 */
export async function isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
  let query = supabase
    .from('blog_articles')
    .select('id')
    .eq('slug', slug);
  
  if (excludeId) {
    query = query.neq('id', excludeId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error checking slug uniqueness:', error);
    return false;
  }
  
  return !data || data.length === 0;
}

/**
 * Get all unique categories
 */
export async function fetchCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('category')
    .order('category');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = new Set(data?.map(d => d.category) || []);
  return Array.from(categories);
}

/**
 * Get all unique tags
 */
export async function fetchTags(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_articles')
    .select('tags');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  const tags = new Set<string>();
  data?.forEach(d => {
    (d.tags || []).forEach((tag: string) => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

