#!/usr/bin/env node
/**
 * Generate Sitemap
 * 
 * This script generates a sitemap.xml file by:
 * 1. Fetching published articles from Supabase
 * 2. Combining with static pages
 * 3. Writing to public/sitemap.xml
 * 
 * Usage: node scripts/generate-sitemap.mjs
 * 
 * This runs automatically as a prebuild step.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'public', 'sitemap.xml');

// Load environment variables from .env file
function loadEnv() {
  const envPath = path.join(PROJECT_ROOT, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    });
  }
}

loadEnv();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const SITE_URL = 'https://www.readysignal.com';

// Static pages with their priorities
const STATIC_PAGES = [
  // Core pages (high priority)
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/platform/', priority: '0.9', changefreq: 'weekly' },
  { path: '/solutions/', priority: '0.9', changefreq: 'weekly' },
  { path: '/how-it-works/', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/', priority: '0.7', changefreq: 'monthly' },
  { path: '/pricing/', priority: '0.8', changefreq: 'monthly' },
  { path: '/plans/', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact-us/', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrations/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.8', changefreq: 'daily' },
  { path: '/assistant/', priority: '0.8', changefreq: 'monthly' },
  { path: '/data-catalog/', priority: '0.8', changefreq: 'monthly' },
  { path: '/forecasting-engine/', priority: '0.8', changefreq: 'monthly' },
  { path: '/recommendation-engine/', priority: '0.8', changefreq: 'monthly' },
  { path: '/ai-bi-consulting/', priority: '0.7', changefreq: 'monthly' },
  { path: '/help-center/', priority: '0.7', changefreq: 'monthly' },
  { path: '/datarobot/', priority: '0.7', changefreq: 'monthly' },
  
  // Data source pages
  { path: '/data-sources/', priority: '0.7', changefreq: 'monthly' },
  { path: '/data-economic/', priority: '0.7', changefreq: 'monthly' },
  { path: '/data-weather/', priority: '0.7', changefreq: 'monthly' },
  { path: '/data-demographic/', priority: '0.7', changefreq: 'monthly' },
  { path: '/public-health/', priority: '0.7', changefreq: 'monthly' },
  
  // Industry pages
  { path: '/industries/cpg-retail/', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/private-equity/', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/supply-chain/', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/b2b-marketing/', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/b2c-marketing/', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/manufacturing/', priority: '0.8', changefreq: 'monthly' },
  
  // Documentation pages
  { path: '/ready-signal-a-brief-introduction/', priority: '0.6', changefreq: 'monthly' },
  { path: '/how-to-create-a-signal/', priority: '0.6', changefreq: 'monthly' },
  { path: '/how-to-create-a-signal-video-version/', priority: '0.6', changefreq: 'monthly' },
  { path: '/overview-of-data-science-treatments/', priority: '0.6', changefreq: 'monthly' },
  { path: '/data-grains-explained/', priority: '0.6', changefreq: 'monthly' },
  { path: '/how-to-export-your-processed-control-data-signal/', priority: '0.6', changefreq: 'monthly' },
  { path: '/how-to-reduce-the-size-of-your-signal/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ready-signal-feature-details/', priority: '0.6', changefreq: 'monthly' },
  { path: '/domo-data-connector/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ready-signal-and-domo-case-study/', priority: '0.6', changefreq: 'monthly' },
  { path: '/united-states-zip-code-data-table/', priority: '0.5', changefreq: 'yearly' },
  { path: '/us-state-abbreviations-data-table/', priority: '0.5', changefreq: 'yearly' },
  { path: '/united-states-fips-codes-data-table/', priority: '0.5', changefreq: 'yearly' },
  { path: '/united-states-electoral-college-data-table/', priority: '0.5', changefreq: 'yearly' },
  { path: '/sp-500-companies-data-table/', priority: '0.5', changefreq: 'monthly' },
  { path: '/box-cox-transformation/', priority: '0.6', changefreq: 'monthly' },
  { path: '/yeo-johnson-transformation/', priority: '0.6', changefreq: 'monthly' },
  { path: '/logarithmic-transformation/', priority: '0.6', changefreq: 'monthly' },
  { path: '/order-norm-transformation/', priority: '0.6', changefreq: 'monthly' },
  { path: '/seasonal-adjustment/', priority: '0.6', changefreq: 'monthly' },
  { path: '/advertising-adstock/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ready-signal-api-documentation/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ready-signal-api-documentation-python-sdk/', priority: '0.6', changefreq: 'monthly' },
  { path: '/ready-signal-api-documentation-r-3-6/', priority: '0.6', changefreq: 'monthly' },
  
  // Forecasting Fundamentals articles
  { path: '/what-is-forecasting-definition-distinctions-misconceptions/', priority: '0.7', changefreq: 'monthly' },
  { path: '/end-to-end-forecasting-process-decision-driven/', priority: '0.7', changefreq: 'monthly' },
  { path: '/choosing-forecast-target-variables/', priority: '0.7', changefreq: 'monthly' },
  { path: '/forecasting-data-requirements-signal-noise-external-data/', priority: '0.7', changefreq: 'monthly' },
  { path: '/managing-missing-data-time-series-forecasting/', priority: '0.7', changefreq: 'monthly' },
  { path: '/forecasting-model-classes-model-selection-guide/', priority: '0.7', changefreq: 'monthly' },
  { path: '/evaluate-forecast-quality-metrics-backtesting-decision-weighted/', priority: '0.7', changefreq: 'monthly' },
  { path: '/scenario-forecasting-decision-making-under-uncertainty/', priority: '0.7', changefreq: 'monthly' },
  { path: '/forecast-failures-regime-shifts-detection-governance-learning/', priority: '0.7', changefreq: 'monthly' },
  { path: '/integrating-forecasts-into-business-processes-continuous-improvement/', priority: '0.7', changefreq: 'monthly' },

  // Legal pages
  { path: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-use/', priority: '0.3', changefreq: 'yearly' },
];

/**
 * Fetch published articles from Supabase
 */
async function fetchArticlesFromSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('⚠️  Supabase credentials not found. Skipping article fetch.');
    return [];
  }

  try {
    const url = `${SUPABASE_URL}/rest/v1/blog_articles?status=eq.published&select=slug,published_date,modified_date`;
    
    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
    }

    const articles = await response.json();
    console.log(`📰 Fetched ${articles.length} published articles from Supabase`);
    return articles;
  } catch (error) {
    console.error('❌ Error fetching articles:', error.message);
    return [];
  }
}

/**
 * Generate XML for a single URL entry
 */
function generateUrlEntry(loc, lastmod, changefreq, priority) {
  let entry = `  <url>\n    <loc>${loc}</loc>\n`;
  if (lastmod) {
    entry += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  if (changefreq) {
    entry += `    <changefreq>${changefreq}</changefreq>\n`;
  }
  if (priority) {
    entry += `    <priority>${priority}</priority>\n`;
  }
  entry += `  </url>`;
  return entry;
}

/**
 * Generate the complete sitemap XML
 */
async function generateSitemap() {
  console.log('🗺️  Generating sitemap...\n');
  
  const today = new Date().toISOString().split('T')[0];
  const urls = [];

  // Add static pages
  console.log(`📄 Adding ${STATIC_PAGES.length} static pages`);
  for (const page of STATIC_PAGES) {
    urls.push(generateUrlEntry(
      `${SITE_URL}${page.path}`,
      today,
      page.changefreq,
      page.priority
    ));
  }

  // Fetch and add blog articles
  const articles = await fetchArticlesFromSupabase();
  console.log(`📝 Adding ${articles.length} blog articles`);
  
  for (const article of articles) {
    const lastmod = article.modified_date || article.published_date;
    urls.push(generateUrlEntry(
      `${SITE_URL}/${article.slug}/`,
      lastmod ? lastmod.split('T')[0] : today,
      'monthly',
      '0.5'
    ));
  }

  // Generate the XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, xml);
  
  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   Output: ${OUTPUT_FILE}`);
}

// Run the script
generateSitemap().catch(error => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});
