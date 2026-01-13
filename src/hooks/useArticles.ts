import { useState, useEffect, useCallback } from 'react';
import {
  Article,
  fetchPublishedArticles,
  fetchAllArticles,
  fetchArticleBySlug,
  fetchArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  isSupabaseConfigured,
} from '../lib/supabaseArticles';
import { blogArticles as staticArticles, BlogArticle } from '../data/blogArticles';

// Convert static BlogArticle to Article format
function staticToArticle(staticArticle: BlogArticle): Article {
  return {
    slug: staticArticle.slug,
    title: staticArticle.title,
    description: staticArticle.description,
    author: staticArticle.author,
    publishedDate: staticArticle.publishedDate,
    modifiedDate: staticArticle.modifiedDate,
    category: staticArticle.category,
    tags: staticArticle.tags,
    image: staticArticle.image,
    content: staticArticle.content,
    status: 'published',
  };
}

/**
 * Hook to fetch published articles (for public blog pages)
 */
export function usePublishedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      
      try {
        if (isSupabaseConfigured()) {
          const data = await fetchPublishedArticles();
          setArticles(data);
        } else {
          // Fallback to static data
          setArticles(staticArticles.map(staticToArticle));
        }
      } catch (err) {
        console.error('Error loading articles, falling back to static data:', err);
        setError(err as Error);
        // Fallback to static data on error
        setArticles(staticArticles.map(staticToArticle));
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, []);

  return { articles, loading, error };
}

/**
 * Hook to fetch all articles (for admin dashboard)
 */
export function useAllArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (isSupabaseConfigured()) {
        const data = await fetchAllArticles();
        setArticles(data);
      } else {
        // Fallback to static data
        setArticles(staticArticles.map(staticToArticle));
      }
    } catch (err) {
      console.error('Error loading articles:', err);
      setError(err as Error);
      setArticles(staticArticles.map(staticToArticle));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { articles, loading, error, refresh };
}

/**
 * Hook to fetch a single article by slug
 */
export function useArticleBySlug(slug: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      if (!slug) {
        setArticle(null);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        if (isSupabaseConfigured()) {
          const data = await fetchArticleBySlug(slug);
          setArticle(data);
        } else {
          // Fallback to static data
          const staticArticle = staticArticles.find(a => a.slug === slug);
          setArticle(staticArticle ? staticToArticle(staticArticle) : null);
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError(err as Error);
        // Try fallback
        const staticArticle = staticArticles.find(a => a.slug === slug);
        setArticle(staticArticle ? staticToArticle(staticArticle) : null);
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [slug]);

  return { article, loading, error };
}

/**
 * Hook to fetch a single article by ID (for editing)
 */
export function useArticleById(id: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!id) {
      setArticle(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchArticleById(id);
      setArticle(data);
    } catch (err) {
      console.error('Error loading article:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { article, loading, error, refresh };
}

/**
 * Hook for article CRUD operations
 */
export function useArticleOperations() {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(async (article: Omit<Article, 'id'>): Promise<Article> => {
    setSaving(true);
    setError(null);
    
    try {
      const created = await createArticle(article);
      return created;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const update = useCallback(async (id: string, updates: Partial<Article>): Promise<Article> => {
    setSaving(true);
    setError(null);
    
    try {
      const updated = await updateArticle(id, updates);
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    setDeleting(true);
    setError(null);
    
    try {
      await deleteArticle(id);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setDeleting(false);
    }
  }, []);

  return { create, update, remove, saving, deleting, error };
}

