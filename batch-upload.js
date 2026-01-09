#!/usr/bin/env node

/**
 * Batch Upload Script for RAG Chatbot Knowledge Base
 *
 * Usage:
 *   node batch-upload.js ./knowledge-base
 *
 * Or with specific category:
 *   node batch-upload.js ./knowledge-base/modeling --category modeling
 *
 * Environment variables:
 *   SUPABASE_URL - Your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Your service role key
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Parse command line arguments
const args = process.argv.slice(2);
const targetDir = args[0] || './knowledge-base';
const category = args.find(arg => arg.startsWith('--category='))?.split('=')[1] || 'general';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateConfig() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    log('❌ Error: Missing environment variables', 'red');
    log('\nPlease set the following environment variables:', 'yellow');
    log('  SUPABASE_URL - Your Supabase project URL', 'yellow');
    log('  SUPABASE_SERVICE_ROLE_KEY - Your service role key', 'yellow');
    log('\nExample:', 'yellow');
    log('  export SUPABASE_URL="https://xxxxx.supabase.co"', 'blue');
    log('  export SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."', 'blue');
    log('  node batch-upload.js ./knowledge-base', 'blue');
    process.exit(1);
  }
}

async function ingestDocument(filePath, category) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    const relativePath = path.relative(targetDir, filePath);
    const documentId = `docs/${category}/${relativePath.replace(/\\/g, '/')}`;

    log(`\n📄 Processing: ${fileName}`, 'blue');
    log(`   Path: ${relativePath}`);
    log(`   Size: ${(content.length / 1024).toFixed(2)} KB`);
    log(`   Document ID: ${documentId}`);

    // Extract tags from content (look for common keywords)
    const tags = extractTags(content, fileName);

    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/ingest-document`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({
          content,
          documentName: fileName,
          documentId,
          metadata: {
            category,
            tags,
            filePath: relativePath,
            fileSize: content.length,
            uploadedAt: new Date().toISOString(),
          },
          chunkSize: 1000,
          chunkOverlap: 200,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      log(`✅ Success! Created ${data.chunksCreated} chunks`, 'green');
      return { success: true, chunks: data.chunksCreated };
    } else {
      log(`❌ Failed: ${data.error}`, 'red');
      return { success: false, error: data.error };
    }
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

function extractTags(content, fileName) {
  const tags = [];
  const lowerContent = content.toLowerCase();

  // Common forecasting keywords
  const keywords = {
    'arima': 'arima',
    'ets': 'ets',
    'prophet': 'prophet',
    'lstm': 'lstm',
    'xgboost': 'xgboost',
    'time series': 'time-series',
    'python': 'python',
    'r language': 'r',
    'pandas': 'pandas',
    'statsmodels': 'statsmodels',
    'scikit-learn': 'scikit-learn',
    'cross-validation': 'validation',
    'seasonality': 'seasonality',
    'trend': 'trend',
  };

  for (const [keyword, tag] of Object.entries(keywords)) {
    if (lowerContent.includes(keyword)) {
      tags.push(tag);
    }
  }

  // Add file extension as tag
  const ext = path.extname(fileName).slice(1);
  if (ext) tags.push(ext);

  return [...new Set(tags)]; // Remove duplicates
}

function findFiles(dir, extensions = ['.md', '.txt']) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (stat.isFile() && extensions.includes(path.extname(item))) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

async function main() {
  log('🤖 RAG Chatbot - Batch Document Upload', 'blue');
  log('═'.repeat(50), 'blue');

  validateConfig();

  if (!fs.existsSync(targetDir)) {
    log(`❌ Error: Directory not found: ${targetDir}`, 'red');
    log('\nUsage: node batch-upload.js <directory> [--category=name]', 'yellow');
    process.exit(1);
  }

  log(`\n📂 Scanning directory: ${targetDir}`);
  log(`📋 Category: ${category}`);

  const files = findFiles(targetDir);

  if (files.length === 0) {
    log('❌ No .md or .txt files found', 'red');
    process.exit(1);
  }

  log(`\n✨ Found ${files.length} document(s) to upload`, 'green');
  log('═'.repeat(50), 'blue');

  const results = {
    success: 0,
    failed: 0,
    totalChunks: 0,
  };

  for (const file of files) {
    const result = await ingestDocument(file, category);

    if (result.success) {
      results.success++;
      results.totalChunks += result.chunks;
    } else {
      results.failed++;
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  log('\n═'.repeat(50), 'blue');
  log('📊 Upload Summary:', 'blue');
  log(`✅ Successful: ${results.success}`, 'green');
  log(`❌ Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'reset');
  log(`📦 Total chunks created: ${results.totalChunks}`);
  log('═'.repeat(50), 'blue');

  if (results.success > 0) {
    log('\n🎉 Documents uploaded! Your chatbot can now answer questions about these documents.', 'green');
    log('\nNext steps:', 'yellow');
    log('1. Test the chatbot with relevant questions', 'yellow');
    log('2. Review the quality of responses', 'yellow');
    log('3. Upload more documents as needed', 'yellow');
  }
}

main().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
