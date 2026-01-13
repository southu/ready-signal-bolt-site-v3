#!/usr/bin/env node
/**
 * Blog Migration Script v2.0
 * 
 * This script parses WordPress blog exports and generates the blogArticles.ts data file.
 * It includes advanced HTML cleaning to handle Elementor markup, deduplication,
 * proper list formatting, and download link extraction.
 * 
 * Usage: node scripts/migrate-blogs.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

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

// Icon images to exclude (used for download buttons, not actual content)
const ICON_IMAGES = [
  'excel.png',
  'download.png',
  'excel-icon.png',
  'download-icon.png',
  'pdf-icon.png',
  'pdf.png',
  'csv.png',
  'file-icon.png',
  'icon.png'
];

/**
 * Check if an image filename is an icon (should be excluded)
 */
function isIconImage(filename) {
  const basename = path.basename(filename).toLowerCase();
  // Check against known icon names
  if (ICON_IMAGES.some(icon => basename === icon || basename.includes(icon.replace('.png', '')))) {
    return true;
  }
  // Also check for very small icon-like names
  if (basename.match(/^(excel|download|pdf|csv|file|icon|doc|xls|xlsx)\.(png|jpg|gif|svg)$/i)) {
    return true;
  }
  return false;
}

/**
 * Create a hash of content for deduplication
 */
function hashContent(text) {
  return crypto.createHash('md5').update(text.trim()).digest('hex');
}

/**
 * Extract download links from WordPress file blocks
 */
function extractDownloadLinks(html) {
  const downloads = [];
  const fileBlockRegex = /<div[^>]*class="[^"]*wp-block-file[^"]*"[^>]*>[\s\S]*?<a[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>[\s\S]*?<\/div>/gi;
  
  let match;
  while ((match = fileBlockRegex.exec(html)) !== null) {
    const url = match[1];
    const text = match[2].trim() || 'Download';
    if (url && !url.includes('#elementor-action')) {
      downloads.push({ url, text });
    }
  }
  
  // Also find standalone file links
  const standaloneRegex = /<a[^>]*class="[^"]*wp-block-file__button[^"]*"[^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/gi;
  while ((match = standaloneRegex.exec(html)) !== null) {
    const url = match[1];
    const text = match[2].trim() || 'Download';
    if (url && !url.includes('#elementor-action')) {
      downloads.push({ url, text });
    }
  }
  
  return downloads;
}

/**
 * Convert br-separated text to proper list
 */
function convertBrToList(text) {
  // Split by <br/> or <br> tags
  const items = text.split(/<br\s*\/?>/gi).map(item => item.trim()).filter(item => item.length > 0);
  
  // If we have 3+ items, convert to a list
  if (items.length >= 3) {
    const listItems = items.map(item => `<li>${item}</li>`).join('\n');
    return `<ul>\n${listItems}\n</ul>`;
  }
  
  // Otherwise, return with proper line breaks
  return items.join('<br/>');
}

/**
 * Clean HTML content with advanced processing
 */
function cleanHtmlContent(html, slug) {
  // Track seen content for deduplication
  const seenParagraphs = new Set();
  const seenLists = new Set();
  
  // Extract download links before cleaning (we'll add them back styled)
  const downloads = extractDownloadLinks(html);
  
  // Step 1: Remove document wrapper elements
  let content = html
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<link[^>]*>/gi, '');

  // Step 2: Remove all h1 titles (we use metadata title)
  content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');

  // Step 3: Remove Elementor post info (author/date blocks)
  content = content.replace(/<ul[^>]*class="[^"]*elementor-post-info[^"]*"[^>]*>[\s\S]*?<\/ul>/gi, '');
  content = content.replace(/<ul[^>]*class="[^"]*elementor-inline-items[^"]*"[^>]*>[\s\S]*?<\/ul>/gi, '');

  // Step 4: Remove "TAKE THE NEXT STEP" CTA sections entirely
  content = content.replace(/<h3[^>]*>[\s\S]*?TAKE THE NEXT STEP[\s\S]*?<\/h3>/gi, '');
  content = content.replace(/TAKE THE NEXT STEP/gi, '');
  
  // Remove CTA button containers
  content = content.replace(/<div[^>]*class="[^"]*elementor-button-wrapper[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  // Step 5: Remove popup action links (Elementor popup triggers)
  content = content.replace(/<a[^>]*href="[^"]*#elementor-action[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
  content = content.replace(/<a[^>]*href="[^"]*elementor-action%3A[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');

  // Step 6: Remove app.readysignal.com signup links (we add our own CTA)
  content = content.replace(/<a[^>]*href="https:\/\/app\.readysignal\.com\/auth\/sign-up[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');

  // Step 7: Remove file download blocks (we'll add them back styled)
  content = content.replace(/<div[^>]*class="[^"]*wp-block-file[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  content = content.replace(/<a[^>]*class="[^"]*wp-block-file__button[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');

  // Step 8: Remove wp-block-buttons containers
  content = content.replace(/<div[^>]*class="[^"]*wp-block-buttons[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  content = content.replace(/<div[^>]*class="[^"]*wp-block-button[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  // Step 9: Remove spacer blocks
  content = content.replace(/<div[^>]*class="[^"]*wp-block-spacer[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  content = content.replace(/<div[^>]*aria-hidden="true"[^>]*class="[^"]*wp-block-spacer[^"]*"[^>]*><\/div>/gi, '');

  // Step 10: Clean up Elementor wrapper divs
  const elementorDivPatterns = [
    /<div[^>]*class="[^"]*elementor[^"]*"[^>]*>/gi,
    /<div[^>]*data-elementor[^"]*[^>]*>/gi,
    /<div[^>]*data-element_type[^>]*>/gi,
    /<div[^>]*data-widget_type[^>]*>/gi,
    /<div[^>]*class="[^"]*e-con[^"]*"[^>]*>/gi,
    /<div[^>]*class="[^"]*e-flex[^"]*"[^>]*>/gi,
    /<div[^>]*class="[^"]*elementor-widget-container[^"]*"[^>]*>/gi,
    /<div[^>]*class="[^"]*e-con-inner[^"]*"[^>]*>/gi,
    /<div[^>]*class="[^"]*wp-block-columns[^"]*"[^>]*>/gi,
    /<div[^>]*class="[^"]*wp-block-column[^"]*"[^>]*>/gi,
  ];
  
  for (const pattern of elementorDivPatterns) {
    content = content.replace(pattern, '');
  }

  // Step 11: Remove orphan li elements (outside of ul/ol)
  content = content.replace(/<li[^>]*class="[^"]*elementor[^"]*"[^>]*>[\s\S]*?<\/li>/gi, '');

  // Step 12: Remove article wrapper
  content = content.replace(/<article[^>]*>/gi, '');
  content = content.replace(/<\/article>/gi, '');

  // Step 13: Fix image paths
  content = content.replace(/src="images\//g, `src="/blog-images/${slug}/`);
  
  // Remove srcset attributes (they reference WordPress CDN)
  content = content.replace(/\s*srcset="[^"]*"/gi, '');
  content = content.replace(/\s*sizes="[^"]*"/gi, '');

  // Step 14: Clean up remaining class and style attributes
  content = content.replace(/\s*class="[^"]*"/gi, '');
  content = content.replace(/\s*style="[^"]*"/gi, '');
  content = content.replace(/\s*data-[a-z-]+="[^"]*"/gi, '');
  content = content.replace(/\s*itemprop="[^"]*"/gi, '');
  content = content.replace(/\s*decoding="[^"]*"/gi, '');
  content = content.replace(/\s*fetchpriority="[^"]*"/gi, '');
  content = content.replace(/\s*loading="[^"]*"/gi, '');

  // Step 15: Remove empty/orphan closing divs - multiple passes
  for (let i = 0; i < 20; i++) {
    content = content.replace(/<div>\s*<\/div>/gi, '');
  }
  
  // Balance div tags
  const openDivCount = (content.match(/<div[^>]*>/gi) || []).length;
  const closeDivCount = (content.match(/<\/div>/gi) || []).length;
  
  if (closeDivCount > openDivCount) {
    for (let i = 0; i < closeDivCount - openDivCount; i++) {
      content = content.replace(/<\/div>/, '');
    }
  }

  // Step 16: Remove empty spans, figures without images
  content = content.replace(/<span>\s*<\/span>/gi, '');
  content = content.replace(/<figure>\s*<\/figure>/gi, '');

  // Step 17: Clean up figure tags - keep only the image
  content = content.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, (match, inner) => {
    const imgMatch = inner.match(/<img[^>]*>/i);
    if (imgMatch) {
      return imgMatch[0];
    }
    return '';
  });

  // Step 18: Convert <br/>-separated text in paragraphs to lists
  content = content.replace(/<p>([\s\S]*?)<\/p>/gi, (match, inner) => {
    // Check if this paragraph has multiple <br/> separated items
    if ((inner.match(/<br\s*\/?>/gi) || []).length >= 2) {
      return convertBrToList(inner);
    }
    return match;
  });

  // Step 19: Deduplicate paragraphs
  const paragraphPattern = /<p>([\s\S]*?)<\/p>/gi;
  content = content.replace(paragraphPattern, (match, inner) => {
    const trimmed = inner.trim();
    if (!trimmed) return '';
    
    const hash = hashContent(trimmed);
    if (seenParagraphs.has(hash)) {
      return ''; // Skip duplicate
    }
    seenParagraphs.add(hash);
    return `<p>${trimmed}</p>`;
  });

  // Step 20: Deduplicate headings (h2, h3)
  const seenHeadings = new Set();
  content = content.replace(/<(h[2-6])>([\s\S]*?)<\/\1>/gi, (match, tag, inner) => {
    const trimmed = inner.trim();
    if (!trimmed) return '';
    
    const hash = hashContent(trimmed);
    if (seenHeadings.has(hash)) {
      return ''; // Skip duplicate
    }
    seenHeadings.add(hash);
    return `<${tag}>${trimmed}</${tag}>`;
  });

  // Step 21: Deduplicate images and remove icon images
  const seenImages = new Set();
  content = content.replace(/<img[^>]*src="([^"]+)"[^>]*>/gi, (match, src) => {
    const filename = src.split('/').pop() || src;
    
    // Skip icon images (excel.png, download.png, etc.)
    if (isIconImage(filename)) {
      return ''; // Remove icon images
    }
    
    if (seenImages.has(src)) {
      return ''; // Skip duplicate
    }
    seenImages.add(src);
    // Clean the img tag
    const altMatch = match.match(/alt="([^"]*)"/i);
    const alt = altMatch ? altMatch[1] : '';
    return `<img src="${src}" alt="${alt}" />`;
  });

  // Step 21b: First, normalize all lists by removing their class attributes
  content = content.replace(/<(ol|ul)[^>]*>/gi, (match, tag) => `<${tag}>`);
  
  // Step 21c: Deduplicate lists (ul and ol elements)
  content = content.replace(/<(ul|ol)>([\s\S]*?)<\/\1>/gi, (match, tag, inner) => {
    const trimmed = inner.trim();
    if (!trimmed) return '';
    
    // Normalize content for hashing (remove extra whitespace, normalize item text)
    const normalizedItems = trimmed.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    const itemTexts = normalizedItems.map(item => {
      const textMatch = item.match(/<li[^>]*>([\s\S]*?)<\/li>/i);
      return textMatch ? textMatch[1].replace(/<[^>]*>/g, '').trim() : '';
    }).filter(t => t);
    
    const hash = hashContent(itemTexts.join('|'));
    if (seenLists.has(hash)) {
      return ''; // Skip duplicate list
    }
    seenLists.add(hash);
    return `<ul>${trimmed}</ul>`; // Convert all lists to ul for consistency
  });
  
  // Step 21d: Remove orphaned li items (not inside ul/ol)
  // Store valid lists and replace with placeholders
  const savedLists = [];
  content = content.replace(/<(ul|ol)>([\s\S]*?)<\/\1>/gi, (match) => {
    savedLists.push(match);
    return `<!--LIST_PLACEHOLDER_${savedLists.length - 1}-->`;
  });
  // Remove orphaned li items (now safe since lists are placeholders)
  content = content.replace(/<li[^>]*>[\s\S]*?<\/li>/gi, '');
  // Restore saved lists
  savedLists.forEach((list, i) => {
    content = content.replace(`<!--LIST_PLACEHOLDER_${i}-->`, list);
  });

  // Step 22: Update internal links to use relative paths
  content = content.replace(/href="https:\/\/www\.readysignal\.com\/([^"]+)"/gi, (match, path) => {
    // Convert to relative path
    return `href="/${path}"`;
  });

  // Step 23: Convert strong headings to proper h3
  content = content.replace(/<p><strong>([^<]{20,})<\/strong>\s*<\/p>/gi, (match, text) => {
    // If it looks like a heading (ends with common patterns), convert to h3
    if (text.match(/[?:]$/) || text.length < 100) {
      return `<h3>${text}</h3>`;
    }
    return match;
  });

  // Step 24: Remove empty paragraphs and clean whitespace
  content = content.replace(/<p>\s*<\/p>/gi, '');
  content = content.replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '');
  content = content.replace(/<ul>\s*<\/ul>/gi, '');
  content = content.replace(/<ol>\s*<\/ol>/gi, '');

  // Step 25: Add download cards back if we found any
  if (downloads.length > 0) {
    const uniqueDownloads = [...new Map(downloads.map(d => [d.url, d])).values()];
    const downloadHtml = uniqueDownloads.map(d => 
      `<div class="download-card">
        <a href="${d.url}" target="_blank" rel="noopener noreferrer" class="download-button">${d.text}</a>
      </div>`
    ).join('\n');
    
    // Find a good place to insert (after first image or first few paragraphs)
    const paragraphs = content.split('</p>');
    if (paragraphs.length > 3) {
      // Insert after 3rd paragraph
      paragraphs.splice(3, 0, `</p>\n${downloadHtml}`);
      content = paragraphs.join('</p>');
    } else {
      content += '\n' + downloadHtml;
    }
  }

  // Step 26: Final whitespace cleanup
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  content = content.replace(/>\s+</g, '>\n<');
  content = content.trim();

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
    'Documentation': 'Documentation',
    'Help': 'Help'
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
  
  // Clean existing directory
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });
  
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
 * Skips icon images like excel.png, download.png
 */
function extractFeaturedImage(content, slug) {
  // Find all images in content
  const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/gi;
  let match;
  
  while ((match = imgRegex.exec(content)) !== null) {
    const src = match[1];
    const filename = path.basename(src);
    
    // Skip icon images
    if (isIconImage(filename)) {
      continue;
    }
    
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
  console.log(`\nGenerated ${OUTPUT_FILE} with ${articles.length} articles`);
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('Starting blog migration v2.0...\n');
  console.log(`Source: ${BLOG_SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_FILE}\n`);
  
  // Clean existing blog images
  if (fs.existsSync(BLOG_IMAGES_DIR)) {
    console.log('Cleaning existing blog-images directory...');
    fs.rmSync(BLOG_IMAGES_DIR, { recursive: true });
    fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });
  }
  
  // Get all article directories
  const articleDirs = fs.readdirSync(BLOG_SOURCE_DIR)
    .filter(name => {
      const fullPath = path.join(BLOG_SOURCE_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    });
  
  console.log(`Found ${articleDirs.length} article directories\n`);
  
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
  
  console.log(`\nMigration complete! ${articles.length} articles processed.`);
}

// Run migration
migrate().catch(console.error);
