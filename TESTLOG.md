# TESTLOG — ai-marketing-data responsive pass

## Required pre-change production baseline

Captured before code changes against
`https://www.readysignal.com/ai-marketing-data` on 2026-07-23 with Lighthouse
13.4.1, using its default mobile emulation and headless Chromium.

- Deployed SHA: `f4cf95e5efa375de191e55e3514e97e16de3843d`
- HTTPS status: 200
- Performance: **51**
- Accessibility: **96**
- First Contentful Paint: **4.2 s**
- Largest Contentful Paint: **5.3 s** (`5337.801 ms`)
- Total Blocking Time: **810 ms**
- Speed Index: **4.2 s**
- Cumulative Layout Shift: **0**
- Image alt audit: **pass** (score 1)
- Image delivery audit: **fail**, estimated savings 26 KiB
- Unsized images audit: **partial failure** (score 0.5)

The image delivery audit identified the 800×162 PNG Ready Signal logo as the
only offender: it was rendered at approximately 158×32, lacked explicit
dimensions, was not in a modern format, and accounted for about 26 KiB of
potential savings.

Raw baseline report:
`test-evidence/lighthouse/baseline.json`

## Post-change verification

### Local production build

- `npm run build`: pass
- Targeted ESLint for the modified landing components and responsive test:
  pass
- Repository-wide typecheck/lint: retains pre-existing failures in unrelated
  files; no failure is in the modified landing components
- Chromium responsive suite: 5/5 pass at 375, 390, 768, 1280, and 1440
- WebKit responsive suite: 5/5 pass at 375, 390, 768, 1280, and 1440
- At 375×667, the h1, supporting value statement, and CTA are fully inside
  the initial viewport
- Form inputs, textarea, and submit button are visible and contained at 375
  and 1280 in both engines
- Every rendered image has either descriptive alt text or, for zero-sized
  analytics pixels, `alt="" role="presentation"`

Local Lighthouse comparison (same Lighthouse version and mobile settings):

- Performance: **54** (baseline 51)
- Accessibility: **100** (baseline 96)
- Largest Contentful Paint: **5.1 s** (baseline 5.3 s)
- Cumulative Layout Shift: **0** (baseline 0)
- Image delivery audit: **pass** (baseline fail)
- Unsized images audit: **pass** (baseline partial failure)
- Image alt audit: **pass**

Local reports and proof:

- `test-evidence/lighthouse/local-after.json`
- `test-evidence/screenshots/ai-marketing-data-375-local.png`
- `test-evidence/responsive.spec.ts`

### Deployed verification

Verified against `https://www.readysignal.com` after production reached
application SHA `73cb0c2ca150abf8348db28238a7b2607f3c3787`.

- `GET /ai-marketing-data`: 200
- `GET /`: 200
- Chromium: **6/6 pass** (five campaign widths plus home navigation)
- WebKit: **6/6 pass** (five campaign widths plus home navigation)
- No horizontal document overflow or right-edge element overflow at 375, 390,
  768, 1280, or 1440 in either engine
- The styled HubSpot form has visible, contained inputs, textarea, and submit
  control at 375 and 1280 in both engines
- At 375×667, the h1, supporting value statement, and CTA are fully visible at
  `scrollY=0`
- Every rendered image meets the descriptive-alt or decorative-presentation
  requirement
- At 1280, the headline, benefits, proof, and complete form sections render
- The home navigation's “How It Works” dropdown contains a working
  `/ai-marketing-data` link

Production Lighthouse 13.4.1:

- Performance: **53** (baseline 51)
- Accessibility: **100** (baseline 96)
- First Contentful Paint: **4.4 s**
- Largest Contentful Paint: **5.3 s** (`5273.187 ms`; baseline `5337.801 ms`)
- Total Blocking Time: **680 ms** (baseline 810 ms)
- Speed Index: **4.4 s**
- Cumulative Layout Shift: **0** (baseline 0)
- Image delivery audit: **pass**
- Unsized images audit: **pass**
- Image alt audit: **pass**
- Color contrast audit: **pass**

Production report:
`test-evidence/lighthouse/deployed-after.json`

Required deployed 375×667 Chromium proof screenshot:
`test-evidence/screenshots/ai-marketing-data-375-deployed.png`
