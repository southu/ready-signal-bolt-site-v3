#!/usr/bin/env node
/**
 * Export Blog Articles to Supabase Format
 * 
 * This script reads the current blogArticles.ts and exports the data
 * in a format ready for Supabase import.
 * 
 * Usage: node scripts/export-to-supabase.mjs
 * 
 * Output: Creates a JSON file that can be imported into Supabase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_ARTICLES_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'blogArticles.ts');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'supabase', 'seed', 'blog_articles.json');

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read and parse the TypeScript file
const content = fs.readFileSync(BLOG_ARTICLES_FILE, 'utf-8');

// Extract the array content (everything after "blogArticles: BlogArticle[] = ")
const arrayMatch = content.match(/export const blogArticles: BlogArticle\[\] = \[([\s\S]*)\];?\s*$/);

if (!arrayMatch) {
  console.error('Could not find blogArticles array in file');
  process.exit(1);
}

// Parse the JSON-like content
// The content is valid JSON wrapped in a TS file
const arrayContent = '[' + arrayMatch[1] + ']';

let articles;
try {
  articles = JSON.parse(arrayContent);
} catch (err) {
  console.error('Error parsing articles:', err.message);
  process.exit(1);
}

console.log(`Found ${articles.length} articles\n`);

// Transform to Supabase format
const supabaseArticles = articles.map((article, index) => {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description || '',
    author: article.author || 'Ready Signal Team',
    published_date: article.publishedDate,
    modified_date: article.modifiedDate || null,
    category: article.category || 'Resources',
    tags: article.tags || [],
    image: article.image || null,
    content: article.content,
    status: 'published', // All existing articles are published
  };
});

// Write the JSON file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(supabaseArticles, null, 2));
console.log(`Exported ${supabaseArticles.length} articles to ${OUTPUT_FILE}`);

// Also create a SQL insert script for direct import
const SQL_OUTPUT_FILE = path.join(PROJECT_ROOT, 'supabase', 'seed', 'blog_articles_seed.sql');

const sqlStatements = supabaseArticles.map(article => {
  const escapeSql = (str) => str ? str.replace(/'/g, "''") : '';
  const tagsArray = article.tags.length > 0 
    ? `ARRAY[${article.tags.map(t => `'${escapeSql(t)}'`).join(', ')}]::text[]`
    : "'{}'::text[]";
  
  return `INSERT INTO blog_articles (slug, title, description, author, published_date, modified_date, category, tags, image, content, status)
VALUES (
  '${escapeSql(article.slug)}',
  '${escapeSql(article.title)}',
  '${escapeSql(article.description)}',
  '${escapeSql(article.author)}',
  '${article.published_date}',
  ${article.modified_date ? `'${article.modified_date}'` : 'NULL'},
  '${escapeSql(article.category)}',
  ${tagsArray},
  ${article.image ? `'${escapeSql(article.image)}'` : 'NULL'},
  '${escapeSql(article.content)}',
  '${article.status}'
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  author = EXCLUDED.author,
  published_date = EXCLUDED.published_date,
  modified_date = EXCLUDED.modified_date,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image = EXCLUDED.image,
  content = EXCLUDED.content,
  status = EXCLUDED.status;`;
}).join('\n\n');

fs.writeFileSync(SQL_OUTPUT_FILE, `-- Blog Articles Seed Data\n-- Generated on ${new Date().toISOString()}\n-- ${supabaseArticles.length} articles\n\n${sqlStatements}\n`);
console.log(`Created SQL seed file at ${SQL_OUTPUT_FILE}`);

console.log('\n✅ Export complete!');
console.log('\nNext steps:');
console.log('1. Run the migration SQL in Supabase SQL Editor: supabase/migrations/001_create_blog_articles.sql');
console.log('2. Run the seed SQL to import articles: supabase/seed/blog_articles_seed.sql');
console.log('   Or import the JSON file via Supabase Table Editor');

