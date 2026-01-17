// Script to import static blog articles into Supabase
// Run with: node scripts/import-articles.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase config - using anon key since we have insert policies
const SUPABASE_URL = 'https://mojalognwmftpgtflhuj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vamFsb2dud21mdHBndGZsaHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5ODA4NTgsImV4cCI6MjA4MzU1Njg1OH0.3MQu4pPzL8k7_BJfRdiQr9pdWbSl6f5f4s4BKPSEt3s';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Read and parse the blogArticles.ts file
async function getStaticArticles() {
  const filePath = join(__dirname, '../src/data/blogArticles.ts');
  const content = readFileSync(filePath, 'utf-8');
  
  // Extract the articles array - it's between "export const blogArticles" and the final ];
  const match = content.match(/export const blogArticles[^=]*=\s*(\[[\s\S]*\]);/);
  if (!match) {
    throw new Error('Could not find blogArticles array in file');
  }
  
  // Safely evaluate the array (remove TypeScript types)
  const arrayString = match[1]
    .replace(/as const/g, '')
    .replace(/\/\/.*$/gm, '') // Remove comments
    .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
  
  // Use Function constructor to evaluate
  const articles = new Function(`return ${arrayString}`)();
  
  return articles;
}

async function importArticles() {
  console.log('Reading static articles...');
  const articles = await getStaticArticles();
  console.log(`Found ${articles.length} articles to import`);
  
  // Check existing articles
  const { data: existing, error: checkError } = await supabase
    .from('blog_articles')
    .select('slug');
  
  if (checkError) {
    console.error('Error checking existing articles:', checkError);
    return;
  }
  
  const existingSlugs = new Set(existing?.map(a => a.slug) || []);
  console.log(`${existingSlugs.size} articles already exist in database`);
  
  // Filter out existing articles
  const newArticles = articles.filter(a => !existingSlugs.has(a.slug));
  console.log(`${newArticles.length} new articles to import`);
  
  if (newArticles.length === 0) {
    console.log('No new articles to import');
    return;
  }
  
  // Transform to database format
  const dbArticles = newArticles.map(article => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    author: article.author,
    published_date: article.publishedDate,
    modified_date: article.modifiedDate || article.publishedDate,
    category: article.category,
    tags: article.tags,
    image: article.image,
    content: article.content,
    status: 'published',
    featured: article.featured || false,
  }));
  
  // Insert in batches of 20
  const batchSize = 20;
  let imported = 0;
  
  for (let i = 0; i < dbArticles.length; i += batchSize) {
    const batch = dbArticles.slice(i, i + batchSize);
    
    const { error } = await supabase
      .from('blog_articles')
      .insert(batch);
    
    if (error) {
      console.error(`Error importing batch ${i / batchSize + 1}:`, error);
    } else {
      imported += batch.length;
      console.log(`Imported ${imported}/${dbArticles.length} articles`);
    }
  }
  
  console.log(`\n✅ Successfully imported ${imported} articles!`);
}

importArticles().catch(console.error);
