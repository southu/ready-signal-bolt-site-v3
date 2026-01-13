#!/usr/bin/env node
/**
 * Blog Migration Script
 * 
 * This script parses WordPress blog exports and generates the blogArticles.ts data file.
 * It also copies images to the public/blog-images directory.
 * 
 * Usage: node scripts/migrate-blogs.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const PROJECT_ROOT = path.resolve(__dirname, '..');
const BLOG_SOURCE_DIR = path.join(PROJECT_ROOT, 'documentation and help files', 'bog content and images', 'blog-articles');
const BLOG_IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'blog-images');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'blogArticles.ts');

// Ensure output directories exist
if (!fs.existsSync(BLOG_IMAGES_DIR)) {
  fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });
}

/**
 * Clean HTML content by stripping Elementor markup and extracting semantic content
 */
function cleanHtmlContent(html, slug) {
  // Remove DOCTYPE, html, head, body wrapper
  let content = html
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<link[^>]*>/gi, '');

  // Remove Elementor-specific divs and wrappers
  content = content
    .replace(/<div[^>]*class="[^"]*elementor[^"]*"[^>]*>/gi, '')
    .replace(/<div[^>]*data-elementor[^>]*>/gi, '')
    .replace(/<div[^>]*data-element_type[^>]*>/gi, '')
    .replace(/<div[^>]*data-widget_type[^>]*>/gi, '')
    .replace(/<div[^>]*class="[^"]*e-con[^"]*"[^>]*>/gi, '')
    .replace(/<div[^>]*class="[^"]*e-flex[^"]*"[^>]*>/gi, '')
    .replace(/<div[^>]*class="elementor-widget-container"[^>]*>/gi, '')
    .replace(/<div[^>]*class="e-con-inner"[^>]*>/gi, '');

  // Remove article wrapper
  content = content
    .replace(/<article[^>]*>/gi, '')
    .replace(/<\/article>/gi, '');

  // Clean up empty divs and extra closing divs
  // Multiple passes to handle nested empty divs
  for (let i = 0; i < 10; i++) {
    content = content.replace(/<div[^>]*>\s*<\/div>/gi, '');
  }
  
  // Remove orphan closing divs (be careful here)
  // Count opening and closing divs and balance them
  const openDivs = (content.match(/<div/gi) || []).length;
  const closeDivs = (content.match(/<\/div>/gi) || []).length;
  const extraClosing = closeDivs - openDivs;
  
  if (extraClosing > 0) {
    for (let i = 0; i < extraClosing; i++) {
      content = content.replace(/<\/div>/, '');
    }
  }

  // Remove the repeated "TAKE THE NEXT STEP" sections and CTA blocks
  content = content.replace(/<h3[^>]*>TAKE THE NEXT STEP<\/h3>[\s\S]*?(?=<h[1-6]|$)/gi, '');
  content = content.replace(/TAKE THE NEXT STEP/gi, '');
  
  // Remove button wrappers and links to app signup
  content = content.replace(/<div[^>]*class="[^"]*button-wrapper[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  content = content.replace(/<a[^>]*href="https:\/\/app\.readysignal\.com[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
  content = content.replace(/<a[^>]*href="#elementor-action[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');

  // Remove duplicate h1 titles (keep only first one)
  const h1Match = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/i);
  if (h1Match) {
    const firstH1 = h1Match[0];
    // Remove all h1s then add back the first one at the beginning isn't needed
    // Just remove duplicates after the first
    let foundFirst = false;
    content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, (match) => {
      if (!foundFirst) {
        foundFirst = true;
        return ''; // Remove the h1 entirely - we'll use the title from metadata
      }
      return '';
    });
  }

  // Clean up Elementor post info (author/date) - we'll use metadata for this
  content = content.replace(/<ul[^>]*class="[^"]*elementor-post-info[^"]*"[^>]*>[\s\S]*?<\/ul>/gi, '');
  content = content.replace(/<li[^>]*class="[^"]*elementor-icon-list-item[^"]*"[^>]*>[\s\S]*?<\/li>/gi, '');

  // Fix image paths - update to use local blog-images folder
  content = content.replace(/src="images\//g, `src="/blog-images/${slug}/`);
  content = content.replace(/srcset="images\//g, `srcset="/blog-images/${slug}/`);
  
  // Remove external WordPress image URLs from srcset (keep only local)
  content = content.replace(/srcset="[^"]*https:\/\/www\.readysignal\.com[^"]*"/gi, '');

  // Clean up wp-block classes but keep semantic structure
  content = content.replace(/class="wp-block-[^"]*"/gi, '');
  content = content.replace(/class="is-layout-[^"]*"/gi, '');
  content = content.replace(/class="wp-container-[^"]*"/gi, '');
  content = content.replace(/class="has-text-align-[^"]*"/gi, '');
  content = content.replace(/class="wp-element-button"/gi, '');

  // Remove figure/image wrappers with empty style attributes
  content = content.replace(/style="flex-basis:\d+%"/gi, '');
  content = content.replace(/<div[^>]*style=""[^>]*>/gi, '');

  // Clean up empty spans
  content = content.replace(/<span[^>]*>\s*<\/span>/gi, '');

  // Remove multiple consecutive whitespace/newlines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  content = content.replace(/>\s+</g, '>\n<');

  // Trim whitespace
  content = content.trim();

  // Final cleanup - remove any remaining empty elements
  content = content.replace(/<p>\s*<\/p>/gi, '');
  content = content.replace(/<ul>\s*<\/ul>/gi, '');
  content = content.replace(/<ol>\s*<\/ol>/gi, '');
  content = content.replace(/<div>\s*<\/div>/gi, '');

  return content;
}

/**
 * Determine category from metadata categories array or default
 */
function determineCategory(categories) {
  if (!categories || categories.length === 0) {
    return 'Resources';
  }
  
  // Map WordPress categories to cleaner display names
  const categoryMap = {
    'Resources': 'Resources',
    'Uncategorized': 'Resources',
    'Blog': 'Insights',
    'News': 'News',
    'Case Studies': 'Case Studies',
    'Tutorials': 'Tutorials',
    'Documentation': 'Documentation'
  };
  
  return categoryMap[categories[0]] || categories[0];
}

/**
 * Extract a clean excerpt from content for description if none provided
 */
function extractExcerpt(content, maxLength = 160) {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (text.length <= maxLength) {
    return text;
  }
  
  // Find a good break point
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Copy images from article folder to public/blog-images
 */
function copyImages(slug, articleDir) {
  const imagesDir = path.join(articleDir, 'images');
  
  if (!fs.existsSync(imagesDir)) {
    return;
  }
  
  const targetDir = path.join(BLOG_IMAGES_DIR, slug);
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const images = fs.readdirSync(imagesDir);
  
  for (const image of images) {
    // Skip logo files
    if (image.includes('logo') || image.includes('ready-signal-opaque')) {
      continue;
    }
    
    const sourcePath = path.join(imagesDir, image);
    const targetPath = path.join(targetDir, image);
    
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`  Copied: ${image}`);
    } catch (err) {
      console.error(`  Error copying ${image}:`, err.message);
    }
  }
}

/**
 * Get the first significant image from content for featured image
 */
function extractFeaturedImage(content, slug) {
  const imgMatch = content.match(/<img[^>]*src="([^"]+)"[^>]*>/i);
  if (imgMatch && imgMatch[1]) {
    const src = imgMatch[1];
    // If it's a local path, return it
    if (src.startsWith('/blog-images/')) {
      return src;
    }
    // If it's a relative images path, convert it
    if (src.startsWith('images/')) {
      return `/blog-images/${slug}/${src.replace('images/', '')}`;
    }
  }
  return undefined;
}

/**
 * Process a single blog article directory
 */
function processArticle(slug, articleDir) {
  const metadataPath = path.join(articleDir, 'metadata.json');
  const contentPath = path.join(articleDir, 'content.html');
  
  // Check required files exist
  if (!fs.existsSync(metadataPath) || !fs.existsSync(contentPath)) {
    console.warn(`  Skipping ${slug}: missing metadata.json or content.html`);
    return null;
  }
  
  // Read and parse metadata
  let metadata;
  try {
    const metadataRaw = fs.readFileSync(metadataPath, 'utf-8');
    metadata = JSON.parse(metadataRaw);
  } catch (err) {
    console.error(`  Error parsing metadata for ${slug}:`, err.message);
    return null;
  }
  
  // Read and clean content
  let content;
  try {
    const contentRaw = fs.readFileSync(contentPath, 'utf-8');
    content = cleanHtmlContent(contentRaw, slug);
  } catch (err) {
    console.error(`  Error reading content for ${slug}:`, err.message);
    return null;
  }
  
  // Copy images
  copyImages(slug, articleDir);
  
  // Extract featured image
  const featuredImage = extractFeaturedImage(content, slug);
  
  // Build article object
  const article = {
    slug: slug,
    title: metadata.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: metadata.description || extractExcerpt(content),
    author: metadata.author || 'Ready Signal Team',
    publishedDate: metadata.published_date ? metadata.published_date.split('T')[0] : '2025-01-01',
    modifiedDate: metadata.modified_date ? metadata.modified_date.split('T')[0] : undefined,
    category: determineCategory(metadata.categories),
    tags: metadata.tags || [],
    image: featuredImage,
    content: content
  };
  
  return article;
}

/**
 * Generate the TypeScript output file
 */
function generateOutputFile(articles) {
  const output = `// Blog Articles Data
// This file contains all blog article content for the Ready Signal website
// Auto-generated by scripts/migrate-blogs.mjs on ${new Date().toISOString()}
// To add a new article, add an entry to the blogArticles array following the BlogArticle interface

export interface BlogArticle {
  slug: string;           // URL slug (e.g., "what-is-seasonal-adjustment")
  title: string;          // Article title
  description: string;    // Meta description for SEO
  author: string;         // Author name
  publishedDate: string;  // ISO date string (e.g., "2025-03-21")
  modifiedDate?: string;  // Optional modified date
  category: string;       // Primary category
  tags: string[];         // Array of tags
  image?: string;         // Featured image URL (optional)
  content: string;        // HTML content of the article
}

// Helper function to get article by slug
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug);
}

// Helper function to get all article slugs (for routing)
export function getAllSlugs(): string[] {
  return blogArticles.map(article => article.slug);
}

// Helper function to get articles by category
export function getArticlesByCategory(category: string): BlogArticle[] {
  return blogArticles.filter(article => article.category === category);
}

// Helper function to get recent articles
export function getRecentArticles(count: number = 6): BlogArticle[] {
  return [...blogArticles]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, count);
}

// All blog articles
export const blogArticles: BlogArticle[] = ${JSON.stringify(articles, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\\nGenerated ${OUTPUT_FILE} with ${articles.length} articles`);
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('Starting blog migration...\\n');
  console.log(`Source: ${BLOG_SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_FILE}\\n`);
  
  // Get all article directories
  const articleDirs = fs.readdirSync(BLOG_SOURCE_DIR)
    .filter(name => {
      const fullPath = path.join(BLOG_SOURCE_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    });
  
  console.log(`Found ${articleDirs.length} article directories\\n`);
  
  const articles = [];
  
  for (const slug of articleDirs) {
    console.log(`Processing: ${slug}`);
    const articleDir = path.join(BLOG_SOURCE_DIR, slug);
    const article = processArticle(slug, articleDir);
    
    if (article) {
      articles.push(article);
    }
  }
  
  // Sort articles by date (newest first)
  articles.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  
  // Generate output file
  generateOutputFile(articles);
  
  console.log(`\\nMigration complete! ${articles.length} articles processed.`);
}

// Run migration
migrate().catch(console.error);

