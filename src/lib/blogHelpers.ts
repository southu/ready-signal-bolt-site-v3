import { Article } from './supabaseArticles';

/**
 * Industry → curated blog post slugs mapping.
 *
 * To update which posts appear on each industry page, edit the slug arrays below.
 * Slugs must match published blog article slugs exactly.
 * If fewer than `count` posts are found via this mapping, the helper backfills
 * from the latest published articles (excluding duplicates).
 */
export const industryPostMapping: Record<string, string[]> = {
  'supply-chain': [
    'navigating-tariff-impacts-proactively',
    'data-driven-indicators-tariff-effects-business',
    'navigating-economic-uncertainty',
  ],
  'private-equity': [
    'improve-forecast-accuracy',
    'essential_economic_indicators',
    'understanding-leading-indicators-a-key-to-business-success',
  ],
  'cpg-retail': [
    'ai-external-data-retail-strategy',
    'unmasking-the-flu-factor-in-sales-forecasting',
    'understanding-seasonality-business-strategy',
  ],
  'manufacturing': [
    'the-new-unemployment-truck-transportation',
    'leverage-data-in-the-plastic-industry',
    'navigating-economic-uncertainty',
  ],
  'b2b-marketing': [
    'improve-forecast-accuracy',
    'data-science-and-analytics-external-data',
    'hidden-insights-business-intelligence-strategy',
  ],
  'b2c-marketing': [
    'ai-external-data-retail-strategy',
    'understanding-seasonality-business-strategy',
    'starbucks-psl-early-release-whats-behind-the-shift-in-timing',
  ],
};

/**
 * Get the N most recently published articles.
 */
export function getLatestPosts(articles: Article[], count: number = 3): Article[] {
  return [...articles]
    .filter(a => a.category !== 'Help') // Exclude help/docs articles
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, count);
}

/**
 * Get related posts for an industry page.
 * Uses the curated mapping first, then backfills from latest posts if needed.
 */
export function getRelatedPosts(
  articles: Article[],
  industrySlug: string,
  count: number = 3,
): Article[] {
  const mappedSlugs = industryPostMapping[industrySlug] || [];

  // Find articles matching the curated slugs, preserving mapping order
  const mapped = mappedSlugs
    .map(slug => articles.find(a => a.slug === slug))
    .filter((a): a is Article => a !== undefined);

  if (mapped.length >= count) {
    return mapped.slice(0, count);
  }

  // Backfill from latest posts, excluding any already included
  const mappedSlugSet = new Set(mapped.map(a => a.slug));
  const backfill = getLatestPosts(articles, count + mapped.length)
    .filter(a => !mappedSlugSet.has(a.slug));

  return [...mapped, ...backfill].slice(0, count);
}
