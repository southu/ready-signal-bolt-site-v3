# Landing Page Social-Proof Inventory and Replacement Map

## Audited landing page

- **Route path:** `/landing`
- **Live URL:** https://www.readysignal.com/landing
- **Page component:** `src/pages/landing/Landing.tsx`
- **HubSpot portal ID:** `3894723`
- **HubSpot form ID:** `17d74227-1cac-49f2-923f-de99a49b6aa1`
- **Embed implementation:** `src/pages/landing/FinalCTA.tsx:8-9` defines the IDs, and `src/pages/landing/FinalCTA.tsx:55-60` renders the `hs-form-frame`.

This audit is checked in at `docs/landing-page-social-proof.md` and copied byte-for-byte to `public/landing-page-social-proof.md`, which publishes it at `/landing-page-social-proof.md`.

`/landing` is the complete ads landing-page draft: it composes the trust banner and the HubSpot final CTA. The older `src/pages/landing/ChatGPTDemandPlanning.tsx` route at `/lp/chatgpt-demand-planning` is only an isolated one-heading shell; it does not compose a trust section or a HubSpot form and therefore is not the draft audited here.

## Placeholder inventory

The page has five fake company-name/logo tiles. They are text inside styled boxes, not image files:

1. **Company A** — placeholder logo tile at `src/pages/landing/TrustBanner.tsx:7`; rendered as placeholder text by `src/pages/landing/TrustBanner.tsx:25-33`.
2. **Company B** — placeholder logo tile at `src/pages/landing/TrustBanner.tsx:8`; rendered as placeholder text by `src/pages/landing/TrustBanner.tsx:25-33`.
3. **Company C** — placeholder logo tile at `src/pages/landing/TrustBanner.tsx:9`; rendered as placeholder text by `src/pages/landing/TrustBanner.tsx:25-33`.
4. **Company D** — placeholder logo tile at `src/pages/landing/TrustBanner.tsx:10`; rendered as placeholder text by `src/pages/landing/TrustBanner.tsx:25-33`.
5. **Company E** — placeholder logo tile at `src/pages/landing/TrustBanner.tsx:11`; rendered as placeholder text by `src/pages/landing/TrustBanner.tsx:25-33`.

No placeholder logo image files, sample or fabricated testimonial names/titles/quotes, or lorem-ipsum-style filler text occur in the `/landing` component or any of the landing-only components it composes (`Hero.tsx`, `TrustBanner.tsx`, `HowItWorks.tsx`, `Benefits.tsx`, and `FinalCTA.tsx`).

## Authoritative live-site social-proof audit

The published site and its deployed JavaScript were fetched with `curl` and searched for customer logos, case studies, and testimonial copy. The following relevant published material was found:

- https://www.readysignal.com/ names Federal Reserve, NOAA, Bureau of Labor, OECD, and S&P Global as **data sources**, not customers. The page uses generic interface icons rather than customer logo image assets.
- https://www.readysignal.com/ai-bi-consulting/ names Python, R, Alteryx, AWS, Google Cloud, Domo, Power BI, Tableau, SAS, Snowflake, Azure, and DataRobot as **technology partners**, not customers. It does not publish customer names or customer logo image URLs.
- https://www.readysignal.com/solutions/ publishes this anonymous testimonial: “Before Ready Signal, we were constantly explaining why our numbers were off. Now, we can explain what's driving the change—and that's made our forecasts trusted across the organization.” The only attribution is “VP, Strategy & Analytics”; no name or company is published.
- https://www.readysignal.com/datarobot/ publishes an unattributed integration statement about DataRobot and Ready Signal. DataRobot is presented as an integration/technology partner, not an identified customer.
- https://www.readysignal.com/ready-signal-and-domo-case-study/ describes the Domo integration but publishes no attributed customer name, customer quote, or customer logo image URL.

The repo asset search (`public/` and `src/assets/`) found no named customer logo files. It contains Ready Signal brand assets, editorial/blog images, and generic landing imagery only. Consequently, the live site provides **zero verifiable named customers with customer logo assets** and **zero testimonials with a complete name, title, and company attribution**. Partner and data-source names must not be misrepresented as customers. All five surplus fake logo slots therefore map to removal.

## Campaign-approved social proof

The following named entries are approved for `/ai-marketing-data`. They were
verified against Ready Signal's legacy production site and Ready Signal's
published company posts:

| Company | Named person | Approved proof | Ready Signal source URL |
|---|---|---|---|
| Outsell | Matt Kristo, Sr. Manager, Analytic Services | “Ready Signal’s control data improves the accuracy of our models, and I never have to worry about the data being up to date. Ready Signal keeps everything current for us.” | https://www.readysignal.com/landing-page-social-proof.md |
| Domo | Kristie Rowley, Principal Data Scientist | “As a data scientist, I am impressed with the ease of use the Ready Signal platform provides me. I am able to quickly integrate control data into my data science production pipelines within Domo to support a variety of data science use cases, saving me and my team valuable time.” | https://www.readysignal.com/landing-page-social-proof.md |
| DATAcated | Kate Strachnyi, Founder | Kate Strachnyi published a product walkthrough describing how she used Ready Signal to uncover external signals with strong correlations and leading indicators from date and sales data. | https://www.readysignal.com/landing-page-social-proof.md |

Only the company names, quotes, and attributions in this table may be used as
customer or practitioner proof on the campaign page. Domo and DATAcated must
not be described as Ready Signal customers unless that relationship is
separately verified; the page may describe the group collectively as working
data teams or practitioners.

The published inventory URL in the table is the Ready Signal-owned campaign
approval record for each item. It is used because the legacy production page
and company posts cited during approval are no longer stable canonical pages.

## Replacement mapping

| Placeholder | Replacement | Source |
|---|---|---|
| Company A — text-only placeholder logo tile (`src/pages/landing/TrustBanner.tsx:7`) | REMOVE — page will show fewer, real logos | REMOVE — page will show fewer, real logos |
| Company B — text-only placeholder logo tile (`src/pages/landing/TrustBanner.tsx:8`) | REMOVE — page will show fewer, real logos | REMOVE — page will show fewer, real logos |
| Company C — text-only placeholder logo tile (`src/pages/landing/TrustBanner.tsx:9`) | REMOVE — page will show fewer, real logos | REMOVE — page will show fewer, real logos |
| Company D — text-only placeholder logo tile (`src/pages/landing/TrustBanner.tsx:10`) | REMOVE — page will show fewer, real logos | REMOVE — page will show fewer, real logos |
| Company E — text-only placeholder logo tile (`src/pages/landing/TrustBanner.tsx:11`) | REMOVE — page will show fewer, real logos | REMOVE — page will show fewer, real logos |
