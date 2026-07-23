#!/usr/bin/env node
/**
 * Write Version Artifact
 *
 * Emits public/version as JSON containing the deployed git commit SHA so that
 * the /version endpoint serves a readable SHA instead of the SPA index.html.
 *
 * The SHA is derived from Netlify's COMMIT_REF env var when available, falling
 * back to `git rev-parse HEAD` for local builds.
 *
 * Usage: node scripts/write-version.mjs
 *
 * This runs automatically as a prebuild step.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'public', 'version');

function resolveSha() {
  const fromEnv = process.env.COMMIT_REF || process.env.COMMIT_SHA;
  if (fromEnv && fromEnv.trim()) {
    return fromEnv.trim();
  }
  try {
    return execSync('git rev-parse HEAD', { cwd: PROJECT_ROOT }).toString().trim();
  } catch (err) {
    console.warn('[write-version] Could not resolve git SHA:', err.message);
    return 'unknown';
  }
}

const sha = resolveSha();
const payload = JSON.stringify({ sha, version: sha }) + '\n';

fs.writeFileSync(OUTPUT_FILE, payload);
console.log(`[write-version] Wrote ${OUTPUT_FILE} -> ${sha}`);
