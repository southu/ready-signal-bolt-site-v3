/**
 * CTA parity audit for the forecasting-landing "Start Free Trial" hero CTA
 * vs the home page's top "Start Free Trial" hero CTA.
 *
 * Usage: node scripts/cta-parity-audit.mjs <before|after> [baseUrl]
 *
 * For each breakpoint (desktop 1440, tablet 768, mobile 375) it:
 *  - reads computed styles (font, color, background, padding, radius, shadow)
 *    of both CTAs, at rest and on hover
 *  - measures CTA placement relative to the hero headline/subheadline
 *  - records bounding boxes of the other hero elements (layout-shift check)
 *  - saves per-page hero screenshots plus a side-by-side composite image
 *    under screenshots/cta-parity/
 *  - writes all measurements to screenshots/cta-parity/audit-<phase>.json
 *    and prints any rest/hover/placement discrepancies
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import path from 'node:path';

const phase = process.argv[2];
if (phase !== 'before' && phase !== 'after') {
  console.error('Usage: node scripts/cta-parity-audit.mjs <before|after> [baseUrl]');
  process.exit(1);
}
const BASE = process.argv[3] || 'http://localhost:4173';
const OUT_DIR = path.resolve('screenshots/cta-parity');
mkdirSync(OUT_DIR, { recursive: true });

const BREAKPOINTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const PAGES = {
  home: { url: `${BASE}/`, cta: '#hero-start-free-trial' },
  forecasting: { url: `${BASE}/forecasting-landing`, cta: '#forecasting-hero-start-free-trial' },
};

const STYLE_PROPS = [
  'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
  'color', 'backgroundColor', 'backgroundImage',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius',
  'borderTopColor', 'borderStyle', 'boxShadow', 'display', 'alignItems', 'justifyContent',
  'textAlign', 'textTransform',
];
const HOVER_PROPS = ['backgroundColor', 'color', 'boxShadow'];

function readStyles(page, selector, props) {
  return page.$eval(
    selector,
    (el, propList) => {
      const cs = getComputedStyle(el);
      const out = {};
      for (const p of propList) out[p] = cs[p];
      return out;
    },
    props
  );
}

async function measurePage(context, key, bp) {
  const { url, cta } = PAGES[key];
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector(cta);
  // Let entrance animations finish so positions are final.
  await page.waitForTimeout(2000);

  const rest = await readStyles(page, cta, STYLE_PROPS);

  const layout = await page.$eval(cta, (el) => {
    const box = (n) => {
      if (!n) return null;
      const r = n.getBoundingClientRect();
      return { top: r.top, left: r.left, width: r.width, height: r.height, bottom: r.bottom, right: r.right };
    };
    const section = el.closest('section');
    const headline = section.querySelector('h1');
    const subheadline = headline ? headline.nextElementSibling : null;
    // Decorative hero visual: first element of the second grid column.
    const grid = section.querySelector('.grid');
    const heroImage = grid && grid.children.length > 1 ? grid.children[1] : null;
    return {
      cta: box(el),
      headline: box(headline),
      subheadline: box(subheadline),
      heroImage: box(heroImage),
      section: box(section),
      placement: {
        ctaLeftMinusHeadlineLeft: headline ? el.getBoundingClientRect().left - headline.getBoundingClientRect().left : null,
        ctaTopMinusSubheadlineBottom: subheadline ? el.getBoundingClientRect().top - subheadline.getBoundingClientRect().bottom : null,
      },
      tag: el.tagName,
      id: el.id,
    };
  });

  // Screenshot the hero section (element screenshot -> full section even if taller than viewport)
  const sectionHandle = await page.$(`${cta} >> xpath=ancestor::section[1]`);
  const shotPath = path.join(OUT_DIR, `${phase}-${bp.name}-${key}-hero.png`);
  await sectionHandle.screenshot({ path: shotPath, animations: 'disabled' });

  // Hover state
  await page.hover(cta);
  await page.waitForTimeout(600);
  const hover = await readStyles(page, cta, HOVER_PROPS);

  await page.close();
  return { rest, hover, layout, screenshot: shotPath };
}

function diffObjects(a, b, props) {
  const diffs = [];
  for (const p of props) {
    if (a[p] !== b[p]) diffs.push({ prop: p, home: a[p], forecasting: b[p] });
  }
  return diffs;
}

async function composeSideBySide(browser, bp, results) {
  // Stitch home + forecasting hero shots into one labelled composite.
  const img = (file) => `data:image/png;base64,${readFileSync(file).toString('base64')}`;
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#1f2937;font-family:sans-serif">
    <div style="display:flex;gap:16px;padding:16px;align-items:flex-start">
      <figure style="margin:0">
        <figcaption style="color:#fff;padding:6px 2px;font-size:15px">HOME hero CTA — ${bp.name} ${bp.width}px (${phase})</figcaption>
        <img src="${img(results.home.screenshot)}" style="width:${bp.width}px;display:block;border:1px solid #4b5563">
      </figure>
      <figure style="margin:0">
        <figcaption style="color:#fff;padding:6px 2px;font-size:15px">FORECASTING-LANDING hero CTA — ${bp.name} ${bp.width}px (${phase})</figcaption>
        <img src="${img(results.forecasting.screenshot)}" style="width:${bp.width}px;display:block;border:1px solid #4b5563">
      </figure>
    </div></body></html>`;
  const page = await browser.newPage({ viewport: { width: bp.width * 2 + 64, height: 900 } });
  await page.setContent(html, { waitUntil: 'load' });
  const out = path.join(OUT_DIR, `${bp.name}-${phase}-side-by-side.png`);
  await page.screenshot({ path: out, fullPage: true });
  await page.close();
  return out;
}

const browser = await chromium.launch();
const report = {};
let discrepancyCount = 0;

for (const bp of BREAKPOINTS) {
  const context = await browser.newContext({
    viewport: { width: bp.width, height: bp.height },
    reducedMotion: 'reduce',
  });
  const home = await measurePage(context, 'home', bp);
  const forecasting = await measurePage(context, 'forecasting', bp);
  await context.close();

  const composite = await composeSideBySide(browser, bp, { home, forecasting });

  const restDiffs = diffObjects(home.rest, forecasting.rest, STYLE_PROPS);
  const hoverDiffs = diffObjects(home.hover, forecasting.hover, HOVER_PROPS);
  const hoverChanged = HOVER_PROPS.filter((p) => forecasting.rest[p] !== forecasting.hover[p]);

  report[bp.name] = { home, forecasting, restDiffs, hoverDiffs, hoverChanged, composite };

  console.log(`\n=== ${bp.name} (${bp.width}px) ===`);
  console.log(`composite: ${composite}`);
  if (restDiffs.length === 0) console.log('rest styles: MATCH');
  else {
    discrepancyCount += restDiffs.length;
    console.log('rest style DIFFS:');
    for (const d of restDiffs) console.log(`  ${d.prop}: home=${d.home} | forecasting=${d.forecasting}`);
  }
  if (hoverDiffs.length === 0) console.log('hover styles: MATCH');
  else {
    discrepancyCount += hoverDiffs.length;
    console.log('hover style DIFFS:');
    for (const d of hoverDiffs) console.log(`  ${d.prop}: home=${d.home} | forecasting=${d.forecasting}`);
  }
  console.log(`forecasting hover changes vs rest: ${hoverChanged.join(', ') || 'NONE (missing hover state!)'}`);
  console.log(
    `placement: home ctaLeft-h1Left=${home.layout.placement.ctaLeftMinusHeadlineLeft}px, ctaTop-subBottom=${home.layout.placement.ctaTopMinusSubheadlineBottom}px | ` +
    `forecasting ctaLeft-h1Left=${forecasting.layout.placement.ctaLeftMinusHeadlineLeft}px, ctaTop-subBottom=${forecasting.layout.placement.ctaTopMinusSubheadlineBottom}px`
  );
}

await browser.close();
writeFileSync(path.join(OUT_DIR, `audit-${phase}.json`), JSON.stringify(report, null, 2));
console.log(`\nSaved audit-${phase}.json. Total computed-style discrepancies: ${discrepancyCount}`);
