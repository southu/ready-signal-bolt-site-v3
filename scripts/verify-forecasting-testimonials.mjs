/**
 * Acceptance verifier for /forecasting-landing.
 *
 * Fetches the LIVE (or a supplied) rendered HTML of /forecasting-landing and
 * string-matches every supplied testimonial quote and its exact attribution
 * against it, plus the hero "Forecast Accuracy" stat and the en-dash / two-
 * sentence requirements for the 60–80% quote. Prints one PASS/FAIL line per
 * check and exits non-zero if anything fails.
 *
 * Quotes/attributions come from the same single source of truth the page
 * renders: src/pages/landing/forecastingTestimonials.json.
 *
 * Usage:
 *   node scripts/verify-forecasting-testimonials.mjs               # live URL
 *   node scripts/verify-forecasting-testimonials.mjs path/to.html  # local file
 *   URL=https://... node scripts/verify-forecasting-testimonials.mjs
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIVE_URL = process.env.URL || 'https://www.readysignal.com/forecasting-landing';

const testimonials = JSON.parse(
  readFileSync(join(__dirname, '..', 'src', 'pages', 'landing', 'forecastingTestimonials.json'), 'utf-8'),
);

// Decode HTML entities the prerender escapes (&amp; &lt; &gt;) so a literal
// attribution like "Global Advertising & Marketing Agency" matches against the
// escaped page source.
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

let pass = 0;
let fail = 0;
const line = (ok, label) => {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'} :: ${label}`);
};

async function getHtml() {
  const arg = process.argv[2];
  if (arg) {
    console.log(`# Source: local file ${arg}\n`);
    return readFileSync(arg, 'utf-8');
  }
  console.log(`# Source: ${LIVE_URL}\n`);
  const res = await fetch(LIVE_URL, { headers: { 'User-Agent': 'ready-signal-acceptance-verifier' } });
  line(res.status === 200, `HTTP 200 from ${LIVE_URL} (got ${res.status})`);
  return await res.text();
}

const html = await getHtml();
const decoded = decodeEntities(html);

// One PASS line per supplied quote and per attribution.
testimonials.items.forEach((item, i) => {
  const n = i + 1;
  line(decoded.includes(item.quote), `Quote #${n} full text present (no truncation): "${item.quote.slice(0, 48)}…"`);

  const attribution = [item.name, item.title, item.company].filter(Boolean);
  attribution.forEach((part) => {
    line(decoded.includes(part), `Attribution #${n} exact match: "${part}"`);
  });
});

// The 60–80% quote: en-dash U+2013 (not hyphen) + both sentences in full.
const enDashPhrase = '60–80% of my time cleaning and formatting public data';
line(html.includes(enDashPhrase), `60–80% phrase uses en-dash U+2013 (not hyphen)`);
line(!/60-80% of my time cleaning/.test(html), `60–80% phrase does NOT use a hyphen`);
line(
  decoded.includes('Before Ready Signal, I spent 60–80% of my time cleaning and formatting public data.'),
  `60–80% quote sentence 1 present in full`,
);
line(
  decoded.includes(
    'With Ready Signal handling much of that work, I can focus more on analysis and exploring new hypotheses.',
  ),
  `60–80% quote sentence 2 present in full`,
);

// Hero stat: "50%" adjacent to "Forecast Accuracy".
line(/Forecast Accuracy/.test(decoded), `Hero stat label "Forecast Accuracy" present`);
line(/50%/.test(decoded), `Hero stat value contains "50%"`);
const flIdx = decoded.indexOf('Forecast Accuracy');
const near = flIdx >= 0 ? decoded.slice(Math.max(0, flIdx - 200), flIdx + 200) : '';
line(/50%/.test(near), `"50%" appears adjacent to "Forecast Accuracy" in hero`);

// The old +14% figure must be gone everywhere.
line(!html.includes('+14%'), `No remaining "+14%" forecast-accuracy figure in the page HTML`);

console.log(`\n# Summary: ${pass} PASS, ${fail} FAIL`);
if (fail > 0) process.exit(1);
