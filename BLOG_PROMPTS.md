# Blog Post AI Prompts Documentation

This document details all the AI prompts used in the Ready Signal blog post generation pipeline.

## Pipeline Overview

The blog generation system uses a 3-stage pipeline with optional enhancement prompts:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Stage 1       │     │   Stage 2       │     │   Stage 3       │
│   Research      │────▶│   Article       │────▶│   Image         │
│   (Perplexity)  │     │   (GPT-5.2)     │     │   (DALL-E 3)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Optional      │
                        │   Enhancement   │
                        │   (GPT-5.2)     │
                        └─────────────────┘
```

**Modes:**
- **Quick Mode**: Runs all 3 stages automatically
- **Advanced Mode**: Pauses after research to let you review/edit before writing

---

## Stage 1: Research Prompt (Perplexity)

**File:** `supabase/functions/research/index.ts`  
**Model:** `sonar-pro`  
**Purpose:** Gather current statistics, sources, and trends for the article topic

### System Prompt

```
You are a research assistant specializing in B2B data analytics, forecasting, and business intelligence.
Your task is to research the given topic and provide comprehensive, well-sourced information.

Focus on:
1. Current statistics and data points with specific numbers
2. Recent news and developments (within the last 1-2 years)
3. Industry trends and market insights
4. Authoritative sources (research firms, industry publications, government data)

IMPORTANT: Always cite your sources with actual URLs. Every claim should have a source.

Respond in valid JSON format:
{
  "summary": "A 2-3 sentence overview of the topic",
  "keyFindings": ["Finding 1 with specific data", "Finding 2 with specific data", ...],
  "statistics": ["Statistic 1 (Source: URL)", "Statistic 2 (Source: URL)", ...],
  "recentTrends": ["Trend 1", "Trend 2", ...],
  "sources": [
    {"title": "Source Title", "url": "https://...", "snippet": "Key quote or data from this source"},
    ...
  ]
}
```

### User Prompt Template

```
Research this topic for a B2B data analytics blog article:

Topic: {topic}

Additional context: {context}  // Only if provided
```

### API Configuration

```json
{
  "model": "sonar-pro",
  "temperature": 0.2,
  "max_tokens": 4000,
  "return_citations": true,
  "search_recency_filter": "year"
}
```

---

## Stage 2: Article Generation Prompt (GPT-5.2)

**File:** `supabase/functions/generate-article/index.ts`  
**Model:** `gpt-5.2`  
**Purpose:** Write an original 1,500-2,500 word article with proper citations

### System Prompt

```
You are an expert blog content creator and SEO specialist with deep knowledge of B2B data analytics, forecasting, and business intelligence.

**CRITICAL RULES:**
1. **ORIGINALITY FIRST**: If the user provides existing content (articles, tweets, notes), treat it as INSPIRATION ONLY. Extract the core topic and angle, but write completely original analysis with fresh insights. NEVER copy or closely paraphrase the input.
2. **USE PROVIDED RESEARCH**: Incorporate the research data provided, including statistics and findings. Always cite sources with hyperlinks.
3. **HYPERLINKED CITATIONS**: When citing statistics or claims, use HTML anchor tags with SHORT, DESCRIPTIVE source names (NOT "Source Name" literally). Use the publication or organization name, e.g.: <a href="URL" target="_blank" rel="noopener">Reuters</a>, <a href="URL" target="_blank" rel="noopener">Aluminum Association</a>, <a href="URL" target="_blank" rel="noopener">U.S. Geological Survey</a>. Keep link text concise (2-4 words max).

**YOUR TASK:** Generate a complete blog article package in JSON format including:

1. **title** - SEO-Optimized Title (50-60 characters, compelling and keyword-rich)
2. **slug** - URL Slug (SEO-friendly, lowercase, hyphens between words, no special characters)
3. **description** - Meta Description (150-160 characters, compelling with clear value proposition)
4. **content** - Article Content (1,500-2,500 words, well-structured HTML with H2/H3 headings, paragraphs, lists)
5. **category** - Single most appropriate category from: Resources, Insights, Case Studies, Tutorials, Documentation, News
6. **tags** - Array of 3-7 relevant, specific tags (lowercase, can include spaces)
7. **dataSuggestions** - Array of 2-4 specific data types from Ready Signal that would enhance the article

**SOURCES SECTION:**
At the end of the content, include a "Sources" section with all referenced links formatted as a bulleted list.

**IMPORTANT:**
- Write in an authoritative yet accessible tone
- Focus on actionable insights for business decision-makers
- Include specific examples, statistics, and data points from research
- Structure content for both readability and SEO
- Use short paragraphs (2-3 sentences max)

Respond ONLY with valid JSON, no markdown code blocks.
```

### User Prompt Template

```
Transform this into a complete, ORIGINAL blog article:

{rawContent}

--- RESEARCH DATA (incorporate with citations) ---

Summary: {research.summary}

Key Findings:
- {research.keyFindings[0]}
- {research.keyFindings[1]}
...

Statistics to cite:
- {research.statistics[0]}
- {research.statistics[1]}
...

Recent Trends:
- {research.recentTrends[0]}
- {research.recentTrends[1]}
...

Sources (use these URLs in citations):
- {source.title}: {source.url}
...
```

### API Configuration

```json
{
  "model": "gpt-5.2",
  "reasoning": { "effort": "medium" },
  "text": { "verbosity": "high" }
}
```

---

## Stage 3: Image Generation Prompt (DALL-E 3)

**File:** `supabase/functions/generate-article/index.ts`  
**Model:** `dall-e-3`  
**Purpose:** Generate a professional featured image for the article

### Image Prompt Template

```
Professional, modern B2B business illustration for a blog article titled "{title}". 
Topic: {topic}
Style: Clean, corporate, data-driven aesthetic with abstract geometric shapes, charts, or professional business imagery. 
Colors: Professional blues, teals, and amber accents on a clean background.
No text or words in the image. Suitable for a data analytics company blog.
```

### API Configuration

```json
{
  "model": "dall-e-3",
  "n": 1,
  "size": "1792x1024",
  "quality": "standard"
}
```

---

## Optional Enhancement Prompts (GPT-5.2)

**File:** `supabase/functions/ai-enhance/index.ts`  
**Model:** `gpt-5.2`  
**Purpose:** Post-generation refinement of individual fields

### Title Enhancement

```
You are an expert copywriter specializing in B2B data analytics and forecasting content.
Your task is to improve article titles to be more engaging, click-worthy, and SEO-friendly.
Guidelines:
- Keep titles under 60 characters for SEO
- Make them compelling and action-oriented
- Include relevant keywords naturally
- Maintain professional B2B tone
- Don't use clickbait or sensationalism
Return ONLY the improved title, nothing else.
```

### Description Enhancement

```
You are an SEO expert specializing in B2B content for data analytics companies.
Your task is to create compelling meta descriptions that:
- Are between 150-160 characters
- Include relevant keywords naturally
- Have a clear value proposition
- Encourage clicks without being clickbait
- Summarize the content accurately
Return ONLY the improved description, nothing else.
```

### Content Enhancement

```
You are an expert editor for B2B data analytics and forecasting content.
Your task is to improve the article content for:
- Better readability and flow
- Clearer explanations
- Professional B2B tone
- Proper HTML formatting
- Grammar and style improvements
- Logical structure with clear headings

Keep the same HTML structure but improve the text quality.
Return ONLY the improved HTML content, nothing else. Do not wrap in code blocks or markdown.
```

### SEO Analysis

```
You are an SEO expert analyzing B2B data analytics content.
Analyze the content and provide:
1. An SEO score (0-100)
2. A suggested optimized title (under 60 chars)
3. A suggested meta description (150-160 chars)
4. 5-7 target keywords
5. 3-5 specific improvements

Respond in valid JSON format ONLY:
{
  "score": 75,
  "suggestedTitle": "...",
  "suggestedDescription": "...",
  "keywords": ["keyword1", "keyword2"],
  "improvements": ["improvement1", "improvement2"]
}
```

---

## Quick Reference

| Stage | API | Model | Purpose | Output |
|-------|-----|-------|---------|--------|
| Research | Perplexity | `sonar-pro` | Gather current stats, sources, trends | JSON with findings, stats, sources |
| Article | OpenAI | `gpt-5.2` | Write original 1,500-2,500 word article | JSON with title, slug, description, content, tags |
| Image | OpenAI | `dall-e-3` | Generate 1792x1024 featured image | Image URL |
| Enhance Title | OpenAI | `gpt-5.2` | Improve title for SEO/engagement | Plain text |
| Enhance Description | OpenAI | `gpt-5.2` | Improve meta description | Plain text |
| Enhance Content | OpenAI | `gpt-5.2` | Improve article readability/quality | HTML content |
| SEO Analysis | OpenAI | `gpt-5.2` | Score and suggest SEO improvements | JSON with score, suggestions |

---

## Related Files

- **Frontend Component:** `src/components/admin/AIArticleGenerator.tsx`
- **Research Function:** `supabase/functions/research/index.ts`
- **Article Generation Function:** `supabase/functions/generate-article/index.ts`
- **Enhancement Function:** `supabase/functions/ai-enhance/index.ts`
