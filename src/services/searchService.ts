import { supabase } from '../lib/supabase';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  rank: number;
}

export interface SearchSuggestion {
  title: string;
  url: string;
  category: string;
}

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;

  sessionId = sessionStorage.getItem('search_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('search_session_id', sessionId);
  }
  return sessionId;
}

export async function searchArticles(query: string, limit: number = 10): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  try {
    const { data, error } = await supabase.rpc('search_help_articles', {
      search_query: query,
      limit_count: limit
    });

    if (error) {
      console.error('Search error:', error);
      return [];
    }

    await trackSearch(query, data?.length || 0);

    return data || [];
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
}

export async function getSearchSuggestions(prefix: string, limit: number = 5): Promise<SearchSuggestion[]> {
  if (!prefix.trim() || prefix.length < 2) return [];

  try {
    const { data, error } = await supabase.rpc('get_search_suggestions', {
      search_prefix: prefix,
      limit_count: limit
    });

    if (error) {
      console.error('Suggestions error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Suggestions failed:', error);
    return [];
  }
}

async function trackSearch(query: string, resultsCount: number): Promise<void> {
  try {
    await supabase.from('search_analytics').insert({
      search_query: query,
      results_count: resultsCount,
      session_id: getSessionId()
    });
  } catch (error) {
    console.error('Analytics tracking failed:', error);
  }
}

export async function trackClickedResult(query: string, clickedUrl: string): Promise<void> {
  try {
    await supabase.from('search_analytics').insert({
      search_query: query,
      results_count: 1,
      clicked_result: clickedUrl,
      session_id: getSessionId()
    });
  } catch (error) {
    console.error('Click tracking failed:', error);
  }
}
