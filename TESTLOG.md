# TESTLOG — landing-page-launch iteration 1

## Chosen route

**Path: `/landing`** (canonical URL: `https://www.readysignal.com/landing`)

Rationale: non-colliding with existing `/landing-preview`, `/lp/campaign-preview`, and `/lp/chatgpt-demand-planning`. Not linked from nav/footer/sitemap (additive marketing page only).

## Change scope (strictly additive)

### New files under `src/pages/landing/`

| File | Role |
|------|------|
| `Landing.tsx` | Page shell: SEO + Hero → TrustBanner → HowItWorks → Benefits → FinalCTA |
| `FinalCTA.tsx` | Final CTA section: HubSpot form embed (`hs-form-frame`, portal `3894723`, form `17d74227-1cac-49f2-923f-de99a49b6aa1`) + **Start Free Trial** link to `https://app.readysignal.com/auth/sign-up` |

### Outside `src/pages/landing/` (route registration only)

`src/App.tsx` — **2 additive lines** (import + route; both required for the page to compile and match):

```diff
+import Landing from './pages/landing/Landing';
...
+          <Route path="/landing" element={<Landing />} />
```

### Unchanged (byte-for-byte)

- `src/pages/Home.tsx` — no diff
- All other previously-shipping pages/components — no diff
- `public/sitemap.xml` restored after prebuild so it is not part of the commit

### git status (pre-commit)

```
 M src/App.tsx
?? src/pages/landing/FinalCTA.tsx
?? src/pages/landing/Landing.tsx
?? TESTLOG.md
?? test-evidence/   (local screenshots; optional evidence)
```

### git diff --stat (shipping code)

```
 src/App.tsx | 2 ++
 1 file changed, 2 insertions(+)
```

Plus two new untracked files under `src/pages/landing/` only.

## Local checks

| Command | Result |
|---------|--------|
| `npm run build` | **PASS** (vite build + postbuild OG pages) |
| `npm run typecheck` | Pre-existing errors only (unused vars elsewhere). **Zero errors in new landing files.** |
| `npm run lint` | Pre-existing errors only. **`eslint` on `Landing.tsx` + `FinalCTA.tsx`: clean.** |

### typecheck/lint isolation for new code

```
npx eslint src/pages/landing/Landing.tsx src/pages/landing/FinalCTA.tsx  → clean
tsc errors matching landing/(Landing|FinalCTA) → none
```

## Local HTTP smoke (Vite dev `http://127.0.0.1:5173`)

| Path | Status |
|------|--------|
| `/` | 200 |
| `/pricing` | 200 |
| `/blog` | 200 |
| `/landing` | 200 |
| `/industries/cpg-retail` | 200 |
| `/landing-preview` | 200 |

## DOM verification (`/landing` dump-dom)

Matches found (acceptance criteria 5–6):

| Marker | Count |
|--------|------:|
| Stop Reacting (hero) | ≥1 |
| Trusted by (trust banner) | 1 |
| How It Works | 1 |
| Benefits | 1 |
| Ready to upgrade (final CTA) | 1 |
| Start Free Trial | 2 (hero + final CTA) |
| `hs-form-frame` / hubspot-form / `data-form-id` | present |
| Get in Touch | 1 |

## Screenshots (dev server)

Captured with headless Chromium against `http://127.0.0.1:5173`:

| Viewport | File |
|----------|------|
| 375×2400 | `test-evidence/screenshots/landing-375.png` |
| 768×2400 | `test-evidence/screenshots/landing-768.png` |
| 1280×3000 | `test-evidence/screenshots/landing-1280.png` |
| Home 1280 | `test-evidence/screenshots/home-1280.png` |
| Pricing 1280 | `test-evidence/screenshots/pricing-1280.png` |
| Blog 1280 | `test-evidence/screenshots/blog-1280.png` |
| Industries (CPG) 1280 | `test-evidence/screenshots/industries-1280.png` |

**Visual QA notes:**

- Landing page shows full section stack at all three widths; mobile stacks to single column; desktop shows 3-column How It Works + Benefits and 2-column final CTA.
- Final CTA dark band includes HubSpot form frame container + yellow **Start Free Trial** button.
- Homepage still renders primary hero (“Stop Reacting to Market Shifts…”) with nav — unchanged from baseline.

## Deploy verification (post-push) — PASSED

**Deployed commit:** `edc128d207759fc62cb54a11cb88e41de239f874`

### `/version`

```json
{"sha":"edc128d207759fc62cb54a11cb88e41de239f874","version":"edc128d207759fc62cb54a11cb88e41de239f874"}
```

(10/10 cache-busted polls returned this SHA after deploy settled.)

### Live HTTP statuses (follow redirects)

| Path | Status |
|------|--------|
| `/` | 200 |
| `/landing` | 200 |
| `/pricing` | 200 |
| `/blog` | 200 |
| `/industries` | 200 |
| `/industries/cpg-retail` | 200 |

### Production JS bundle includes landing markers

Deployed asset `/assets/index-DlEbSe21.js` contains:

- `path:"/landing"`
- `Ready to upgrade your business forecasts`
- `Trusted by forward-thinking`
- `Zero Black Boxes`
- HubSpot form id `17d74227-1cac-49f2-923f-de99a49b6aa1`

### Production visual QA

Headless Chromium screenshot of `https://www.readysignal.com/landing` at 1280px confirms:

1. Hero — “Stop Reacting. Start Predicting.” + Start Free Trial
2. Trust banner — “Trusted by forward-thinking…”
3. How It Works — 3 steps
4. Benefits — Zero Black Boxes / Massive Scale / Immediate ROI
5. Final CTA — HubSpot form fully rendered (First Name, Last Name, Business Email, …) + Start Free Trial button

Homepage still serves distinct hero (“Stop Reacting to Market Shifts. Start Predicting Them.”) — no regression.

## Commit message intent

> Add marketing landing page at /landing (hero, trust, how-it-works, benefits, final CTA with HubSpot + Start Free Trial). Additive only: new files under src/pages/landing/ plus App.tsx route registration.
