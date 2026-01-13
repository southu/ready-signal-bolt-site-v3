# Blog Admin Setup Guide

This guide explains how to set up the blog admin system with Supabase and GPT-5 AI features.

## Quick Start

### 1. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Go to **SQL Editor** and run the migration script:
   
   ```sql
   -- Copy contents from: supabase/migrations/001_create_blog_articles.sql
   ```

3. Import existing articles by running:
   
   ```sql
   -- Copy contents from: supabase/seed/blog_articles_seed.sql
   ```

4. Get your Supabase credentials from **Settings > API**:
   - Project URL
   - Anon public key

### 2. Environment Variables

Add these to your `.env` file (or Bolt.new secrets):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. GPT-5 AI Features Setup

1. Go to your Supabase project **Edge Functions**
2. Create a new function called `ai-enhance`
3. Copy the code from `supabase/functions/ai-enhance/index.ts`
4. Add your OpenAI API key to project secrets:
   
   ```
   OPENAI_API_KEY=sk-your-openai-api-key
   ```

### 4. Deploy Edge Function

Using Supabase CLI:

```bash
supabase functions deploy ai-enhance --project-ref your-project-ref
```

Or deploy via the Supabase Dashboard Edge Functions editor.

## Admin Access

- **URL**: `/admin-blog`
- **Password**: `readysignal2026` (change this in production!)

## Features

### Article Management
- View all articles with search and filters
- Create new articles with intuitive form
- Edit existing articles
- Delete articles with confirmation
- Draft/Published status management

### AI Enhancement (GPT-5)
- **Enhance Title**: Click the sparkle button next to title to get AI suggestions
- **Enhance Description**: AI-optimized meta descriptions for SEO
- **Enhance Content**: Improve readability, grammar, and flow
- **SEO Analysis**: Comprehensive SEO score with AI recommendations

### Rich Text Editor
- HTML editing with toolbar shortcuts
- Live preview mode
- Insert headings, lists, links, images

### SEO Analyzer
- Real-time SEO checklist (title length, description, headings, images)
- AI-powered analysis with GPT-5
- Suggested optimized title and description
- Keyword recommendations
- Improvement suggestions

## Database Schema

The `blog_articles` table has these columns:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| slug | text | URL path (unique) |
| title | text | Article title |
| description | text | Meta description |
| author | text | Author name |
| published_date | date | Publication date |
| modified_date | date | Last modified |
| category | text | Primary category |
| tags | text[] | Array of tags |
| image | text | Featured image URL |
| content | text | HTML content |
| status | text | draft / published |

## File Structure

```
supabase/
├── config.toml              # Supabase configuration
├── migrations/
│   └── 001_create_blog_articles.sql  # Database schema
├── seed/
│   ├── blog_articles.json   # Articles as JSON
│   └── blog_articles_seed.sql # SQL import script
└── functions/
    └── ai-enhance/
        ├── index.ts         # GPT-5 AI function
        └── config.toml      # Function config

src/
├── components/admin/
│   ├── ArticleList.tsx      # Article table with search
│   ├── ArticleEditor.tsx    # Main editor form
│   ├── RichTextEditor.tsx   # HTML editor component
│   ├── AIEnhanceButton.tsx  # AI sparkle button
│   ├── SEOAnalyzer.tsx      # SEO analysis panel
│   └── DeleteConfirmDialog.tsx
├── lib/
│   └── supabaseArticles.ts  # CRUD operations
├── hooks/
│   └── useArticles.ts       # React data hooks
└── pages/
    └── AdminBlog.tsx        # Admin dashboard page
```

## Troubleshooting

### "Supabase Not Configured" Warning
The environment variables are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your environment.

### AI Enhancement Not Working
1. Check that the Edge Function is deployed
2. Verify `OPENAI_API_KEY` is set in Supabase secrets
3. Check browser console for errors

### Articles Not Loading
1. Verify the database migration was run
2. Check Row Level Security policies are correct
3. The app will fall back to static data if Supabase is unavailable

## Security Notes

- Change the admin password in production
- Consider adding proper authentication (Supabase Auth)
- The Edge Function currently allows unauthenticated calls - secure it for production

