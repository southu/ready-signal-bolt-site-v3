# Help Center Search Setup Guide

This guide explains how to set up and use the Help Center search functionality.

## Features

- **Full-Text Search**: Search across all documentation articles with relevance ranking
- **Autocomplete**: Get real-time suggestions as you type (triggers after 2 characters)
- **Search Analytics**: Track what users search for and which results they click
- **Categorized Results**: Results show category badges for easy navigation
- **Mobile Responsive**: Works seamlessly on all devices

## Database Setup

The database schema has already been created with the migration file:
- `supabase/migrations/create_help_center_search.sql`

This migration creates:
1. `help_articles` table - Stores all searchable content
2. `search_analytics` table - Tracks search queries and clicks
3. Full-text search indexes and functions
4. Autocomplete suggestion function
5. Proper RLS policies for public read access

## Populating the Search Database

To populate the database with help articles:

1. Open your browser and navigate to:
   ```
   http://localhost:5173/populate-search.html
   ```
   (Or use the production URL with `/populate-search.html`)

2. Click the "Populate Database" button

3. Wait for confirmation that articles were added

4. You're done! The search is now fully functional

### Manual Population (Alternative Method)

If you prefer to populate manually via code:

```typescript
import { supabase } from './src/lib/supabase';
import { helpArticlesData } from './src/data/helpArticles';

await supabase
  .from('help_articles')
  .upsert(helpArticlesData, { onConflict: 'url' });
```

## How It Works

### Search Flow

1. User types in the search box
2. After 200ms, autocomplete suggestions appear
3. After 500ms, full search results are displayed
4. Every search query is logged to analytics
5. When a user clicks a result, the click is tracked

### Components

- **HelpCenter.tsx** - Main page with search UI
- **SearchResults.tsx** - Displays search results with highlighting
- **SearchAutocomplete.tsx** - Shows real-time suggestions
- **searchService.ts** - Handles all search API calls
- **supabase.ts** - Supabase client configuration

### Search Functions

#### `searchArticles(query, limit)`
Performs full-text search and returns ranked results.

#### `getSearchSuggestions(prefix, limit)`
Returns autocomplete suggestions based on title matching.

#### `trackClickedResult(query, url)`
Records when a user clicks on a search result.

## Analytics

Search analytics are automatically tracked in the `search_analytics` table:

- Search query text
- Number of results returned
- Clicked result URL (if applicable)
- Anonymous session ID
- Timestamp

### Viewing Analytics

Only authenticated users can view analytics data. To query analytics:

```sql
SELECT
  search_query,
  COUNT(*) as search_count,
  AVG(results_count) as avg_results,
  COUNT(clicked_result) as clicks
FROM search_analytics
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY search_query
ORDER BY search_count DESC
LIMIT 20;
```

## Customization

### Adding More Articles

1. Add article data to `src/data/helpArticles.ts`
2. Re-run the populate script
3. Articles with the same URL will be updated (upsert behavior)

### Adjusting Search Behavior

Edit the search functions in the migration file:
- `search_help_articles()` - Modify ranking weights
- `get_search_suggestions()` - Change suggestion logic

### Styling

Search components use Tailwind CSS classes and can be customized:
- Category colors are defined in `categoryColors` object
- Modify colors, spacing, and layout in component files

## Troubleshooting

### Search Not Working

1. Check that the migration was applied successfully
2. Verify the database is populated with articles
3. Check browser console for errors
4. Ensure Supabase environment variables are set correctly

### No Results Appearing

1. Verify articles exist in `help_articles` table
2. Check that search_vector is being generated (automatic via trigger)
3. Try simpler search terms

### Autocomplete Not Showing

1. Type at least 2 characters
2. Check browser console for API errors
3. Verify the `get_search_suggestions` function exists in database

## Performance

- Search queries are debounced (500ms for search, 200ms for autocomplete)
- Database indexes ensure fast full-text search
- Session IDs are stored in sessionStorage for analytics tracking
- Results are limited to prevent large payloads

## Security

- All search queries are public (no authentication required)
- RLS policies prevent unauthorized data access
- Search analytics use anonymous session IDs
- No user PII is collected or stored
