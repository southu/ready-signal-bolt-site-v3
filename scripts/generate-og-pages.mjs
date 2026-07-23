/**
 * Post-build script: Generate per-route index.html files with correct OG meta tags.
 *
 * Social media crawlers (LinkedIn, Slack, iMessage, Twitter, etc.) don't execute
 * JavaScript — they only read the raw HTML. Since this is an SPA, every route
 * serves the same index.html with generic meta tags.
 *
 * This script runs after `vite build` and creates a directory + index.html for
 * each known route, with the correct <title>, og:title, og:description, og:url,
 * twitter:title, and twitter:description baked into the HTML.
 *
 * Cloudflare Pages serves these static files before falling through to the SPA
 * catch-all, so crawlers get page-specific previews while browsers still load
 * the full React app.
 *
 * To add a new page: add an entry to the `pages` array below.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const SITE_URL = 'https://www.readysignal.com';

// ─── Route → Meta mapping ────────────────────────────────────────────────────
// Each entry produces a dist/[path]/index.html with correct OG tags.
// Dynamic routes (blog/:slug, data/:slug) are NOT included — they require
// server-side rendering or a worker to handle. Static pages only.

const pages = [
  // ── Core Marketing ──
  {
    path: '/platform',
    title: 'Signal Discovery Engine | Automate Feature Engineering & Selection',
    description: 'Eliminate 80% of data wrangling time. Instantly test 3 million+ features from 40,000+ data sources for causality. Pipe results directly into Python, R, or Databricks.',
  },
  {
    path: '/solutions',
    title: 'Managed Precision Forecasting | Human-in-the-Loop Predictive AI',
    description: 'A fully managed forecasting service for CFOs and Supply Chain leaders. We provide expert governance, narrative explainability, and risk scenario modeling.',
  },
  {
    path: '/how-it-works',
    title: 'How It Works | Signal Discovery Process',
    description: 'Learn how Ready Signal\'s 4-step process transforms raw data into validated forecasts: Ingest, Discover, Govern, and Predict with Granger Causality testing.',
  },
  {
    path: '/about',
    title: 'About Ready Signal | Precision Forecasting Experts',
    description: 'Learn about Ready Signal\'s mission to transform forecasting through signal discovery and causal validation. Meet our team of data scientists and economists.',
  },
  {
    path: '/contact',
    title: 'Contact Ready Signal | Get Started with Precision Forecasting',
    description: 'Contact Ready Signal to discuss your forecasting needs. Choose between self-service API access or fully managed forecasting services.',
  },
  {
    path: '/contact-us',
    title: 'Contact Ready Signal | Get Started with Precision Forecasting',
    description: 'Contact Ready Signal to discuss your forecasting needs. Choose between self-service API access or fully managed forecasting services.',
  },
  {
    path: '/pricing',
    title: 'Pricing | Ready Signal Plans & Packages',
    description: 'Flexible pricing for signal discovery and precision forecasting. Start free with API access or choose managed forecasting services for enterprise.',
  },
  {
    path: '/plans',
    title: 'Pricing | Ready Signal Plans & Packages',
    description: 'Flexible pricing for signal discovery and precision forecasting. Start free with API access or choose managed forecasting services for enterprise.',
  },
  {
    path: '/integrations',
    title: 'Integrations | Connect Ready Signal to Your Stack',
    description: 'Integrate Ready Signal with Python, R, Databricks, Snowflake, and BI tools. Model-agnostic API works with your existing data infrastructure.',
  },
  {
    path: '/data-catalog',
    title: 'Data Catalog | Ready Signal',
    description: 'Over 40,000 data sources and 3 million+ features to enrich your forecasts. Centralized data repository continuously updated and easy to integrate.',
  },
  {
    path: '/forecasting-engine',
    title: 'Forecasting Engine | Ready Signal',
    description: 'Make better business decisions with confidence using Ready Signal\'s Automated Forecasting tool. Generate accurate, automated forecasts at scale.',
  },
  {
    path: '/recommendation-engine',
    title: 'Recommendation Engine | Ready Signal',
    description: 'Unlock the full potential of your business with Ready Signal\'s AI-powered Recommendation Engine. Effortlessly discover the most relevant external factors and market trends.',
  },
  {
    path: '/blog',
    title: 'Blog and Resources | Ready Signal',
    description: 'Free resources for today\'s analysts & data scientists to dive into new challenges & keep up with today\'s current industry news.',
  },
  {
    path: '/blog-and-resources',
    title: 'Blog and Resources | Ready Signal',
    description: 'Free resources for today\'s analysts & data scientists to dive into new challenges & keep up with today\'s current industry news.',
  },
  {
    path: '/help-center',
    title: 'Help Center | Ready Signal',
    description: 'Find guides, tutorials, and documentation to help you get the most out of Ready Signal\'s external data platform.',
  },
  {
    path: '/demo',
    title: 'Interactive Demo | Ready Signal',
    description: 'Experience the Ready Signal workflow in this interactive demo. See how external data enhancement improves forecasting accuracy.',
  },
  {
    path: '/ai-bi-consulting',
    title: 'AI & BI Consulting | Ready Signal',
    description: 'Our team of skilled professionals can convert your ideas into outcomes that are ready for production. AI and BI consulting services for organizations of all sizes.',
  },
  {
    path: '/datarobot',
    title: 'DataRobot AI Accelerator | Ready Signal',
    description: 'Unlock the full potential of DataRobot with Ready Signal. Accelerate your workflow and seamlessly integrate external data sources to enrich your predictive models.',
  },

  // ── Industry Pages ──
  {
    path: '/industries/supply-chain',
    title: 'Supply Chain Forecasting That Explains What Changed—and Why | Ready Signal',
    description: 'Supply chain forecasting that explains what changed—and why—by using external drivers to produce explainable forecasts your teams can trust and act on.',
  },
  {
    path: '/industries/private-equity',
    title: 'Explainable Forecasting for Private Equity Portfolios | Ready Signal',
    description: 'Driver-level, externally enriched forecasting for private equity portfolios. Improve portfolio company performance visibility, strengthen PE valuation support, and explain macro-driven variance with defensible, repeatable models.',
  },
  {
    path: '/industries/cpg-retail',
    title: 'CPG Demand Forecasting | Predict Consumer Shifts with External Data',
    description: 'Improve CPG forecast accuracy by tracking Truck Transportation Employment and other leading indicators. Predict consumer demand up to 11 months in advance.',
  },
  {
    path: '/industries/manufacturing',
    title: 'Manufacturing Demand Forecasting | Production Planning Software',
    description: 'Optimize production planning with external demand signals. Track labor market indicators, commodity prices, and economic trends affecting manufacturing.',
  },
  {
    path: '/industries/b2b-marketing',
    title: 'B2B Marketing Forecasting | Predict Business Demand Signals',
    description: 'Leverage external economic signals to forecast B2B demand. Track leading indicators for business purchasing decisions and market shifts.',
  },
  {
    path: '/industries/b2c-marketing',
    title: 'B2C Marketing Forecasting | Predict Consumer Behavior Trends',
    description: 'Forecast consumer demand with external signals. Track economic indicators, weather patterns, and labor stats that influence consumer purchasing.',
  },

  // ── Data Pages ──
  {
    path: '/data-economic',
    title: 'Economic Data | Ready Signal',
    description: 'Access comprehensive economic data from the Federal Reserve, Bureau of Labor Statistics, and more to enhance your predictive models and forecasts.',
  },
  {
    path: '/data-weather',
    title: 'Weather Data | Ready Signal',
    description: 'Access comprehensive weather data from NOAA and other sources to enhance your predictive models with climate and weather patterns.',
  },
  {
    path: '/data-demographic',
    title: 'Demographic Data | Ready Signal',
    description: 'Access comprehensive demographic data from the U.S. Census Bureau and other sources to enhance your market analysis and forecasting.',
  },
  {
    path: '/public-health',
    title: 'Public Health Data | Ready Signal',
    description: 'Access comprehensive public health data from the CDC and other sources to factor health trends into your forecasting and planning.',
  },
  {
    path: '/data-sources',
    title: 'Data Sources | Government & Institutional Data Providers | Ready Signal',
    description: 'Access curated data from trusted sources including the Bureau of Labor Statistics, Federal Reserve, Census Bureau, and more for your predictive analytics models.',
  },

  // ── API Documentation ──
  {
    path: '/ready-signal-api-documentation',
    title: 'Ready Signal API Documentation',
    description: 'Learn how to authenticate, access endpoints, and retrieve processed signal data using the Ready Signal Platform API.',
  },
  {
    path: '/ready-signal-api-documentation-python-sdk',
    title: 'Python SDK Documentation | Ready Signal API',
    description: 'Learn how to integrate Ready Signal with Python 3.6+ using the official SDK to automate your forecasting workflows.',
  },
  {
    path: '/ready-signal-api-documentation-r-3-6',
    title: 'R API Documentation | Ready Signal',
    description: 'Learn how to connect to Ready Signal using R 3.6+ for data science and forecasting workflows.',
  },

  // ── Help / Docs ──
  {
    path: '/ready-signal-a-brief-introduction',
    title: 'Ready Signal - A Brief Introduction | Ready Signal',
    description: 'Get started with Ready Signal - learn how to find external data that improves your forecasts.',
  },
  {
    path: '/how-to-create-a-signal',
    title: 'How to Create a Signal | Ready Signal Help',
    description: 'Step by step guide on how to create a signal in Ready Signal from start to finish.',
  },
  {
    path: '/how-to-create-a-signal-video-version',
    title: 'How to Create a Signal - Video Version | Ready Signal',
    description: 'Watch a video walkthrough of how to create a signal in Ready Signal.',
  },
  {
    path: '/overview-of-data-science-treatments',
    title: 'Overview of Data Science Treatments | Ready Signal',
    description: 'Learn about the variety of Data Science Treatments that can be applied to features within a signal to improve data usefulness.',
  },
  {
    path: '/data-grains-explained',
    title: 'Data Grains Explained | Ready Signal',
    description: 'Understand geographic and time grains in Ready Signal and how they affect your signal output.',
  },
  {
    path: '/how-to-export-your-processed-control-data-signal',
    title: 'How to Export Your Processed Control Data (Signal) | Ready Signal',
    description: 'Learn how to export and leverage processed signal data from Ready Signal in your predictive models.',
  },
  {
    path: '/how-to-reduce-the-size-of-your-signal',
    title: 'How to Reduce the Size of Your Signal | Ready Signal',
    description: 'Learn how to control the size of your Ready Signal output by adjusting time grain, geo grain, and date range.',
  },
  {
    path: '/ready-signal-feature-details',
    title: 'Overview of Feature Details Page | Ready Signal',
    description: 'Learn how to use the Feature Details page to understand and configure individual features in your signal.',
  },
  {
    path: '/domo-data-connector',
    title: 'Domo Data Connector | Ready Signal',
    description: 'Learn how to connect Ready Signal to Domo for seamless BI integration.',
  },
  {
    path: '/ready-signal-and-domo-case-study',
    title: 'Ready Signal and Domo - Case Study | Ready Signal',
    description: 'See how Ready Signal integrates with Domo to power advanced analytics and forecasting.',
  },

  // ── Data Reference Tables ──
  {
    path: '/united-states-zip-code-data-table',
    title: 'United States Zip Code Data Table | Ready Signal',
    description: 'Reference information about US ZIP codes and how they\'re used in Ready Signal for geographic data analysis.',
  },
  {
    path: '/us-state-abbreviations-data-table',
    title: 'State Abbreviation Data Table | Ready Signal',
    description: 'Complete reference table of US state abbreviations for data integration and modeling.',
  },
  {
    path: '/united-states-fips-codes-data-table',
    title: 'FIPS County Codes Data Table | Ready Signal',
    description: 'Reference for Federal Information Processing Standard (FIPS) county codes used in Ready Signal.',
  },
  {
    path: '/united-states-electoral-college-data-table',
    title: 'Electoral College Data Table | Ready Signal',
    description: 'Reference table of Electoral College votes by state for political and demographic analysis.',
  },
  {
    path: '/sp-500-companies-data-table',
    title: 'S&P 500 Companies Data Table | Ready Signal',
    description: 'Reference table of S&P 500 companies for financial and market analysis.',
  },

  // ── Transformations / Treatments ──
  {
    path: '/box-cox-transformation',
    title: 'What is a Box-Cox Transformation? | Ready Signal',
    description: 'Box-Cox Transformations can help reduce non-constant variance in a dataset for better statistical analysis.',
  },
  {
    path: '/yeo-johnson-transformation',
    title: 'What is a Yeo-Johnson Power Transformation? | Ready Signal',
    description: 'The Yeo-Johnson transformation is a power transformation that works with zero and negative values.',
  },
  {
    path: '/logarithmic-transformation',
    title: 'What is a Logarithmic Transformation? | Ready Signal',
    description: 'Logarithmic transformations allow datasets to become more readable and useful for statistical analysis.',
  },
  {
    path: '/order-norm-transformation',
    title: 'What is an Order-Norm Transformation? | Ready Signal',
    description: 'Order-Norm is a rank-based procedure that maps values to the percentile of a normal distribution.',
  },
  {
    path: '/seasonal-adjustment',
    title: 'What is Seasonal Adjustment? | Ready Signal',
    description: 'Seasonal adjustments allow for a dataset to remove predictable seasonal patterns for cleaner analysis.',
  },
  {
    path: '/advertising-adstock',
    title: 'What does Advertising Adstock Mean? | Ready Signal',
    description: 'Advertising adstock models an advertisement\'s build and decay throughout its lifecycle.',
  },

  // ── Static Blog Posts ──
  {
    path: '/blog/top-9-data-driven-indicators-tariffs',
    title: 'Top 9 Data-Driven Indicators to Understand Tariffs | Ready Signal',
    description: 'Navigate the complex world of tariffs with data-driven economic indicators and predictive analytics.',
  },
  {
    path: '/blog/navigating-tariff-impacts-proactively',
    title: 'Navigating Tariff Impacts Proactively | Ready Signal',
    description: 'Transform uncertainty into strategic opportunities with AI-driven forecasting during tariff changes.',
  },
  {
    path: '/blog/transform-retail-strategy-external-data-ai',
    title: 'Transform Your Retail Strategy with External Data and AI | Ready Signal',
    description: 'Discover how external data and AI can revolutionize your retail forecasting and decision-making process.',
  },
  {
    path: '/blog/interaction-variables',
    title: 'Ready Signal Introduces Interaction Variables | Ready Signal',
    description: 'Deepen your economic insights with our new interaction variables feature for more nuanced analysis.',
  },
  {
    path: '/blog/high-precision-forecasting',
    title: 'High-Precision Forecasting: Reduce Errors and Gain Market Insights | Ready Signal',
    description: 'Learn how to improve forecast accuracy and unlock market-based insights for better decision-making.',
  },
  {
    path: '/blog/discovering-flu-impact-on-sales',
    title: 'Discovering Flu Impact on Sales | Ready Signal',
    description: 'Unmasking the flu factor in sales forecasting and understanding seasonal health impacts on business.',
  },

  // ── Ad-only landing (not in sitemap; not linked from nav/footer) ──
  {
    path: '/lp/campaign-preview',
    title: 'Stop Reacting. Start Predicting. | Ready Signal',
    description: 'Reduce forecast error by ~50% with 40,000+ validated external data signals. Discover Granger-tested economic, weather, and labor indicators that anticipate market shifts before they hit your P&L.',
  },

  // ── Legal ──
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Ready Signal',
    description: 'Ready Signal\'s privacy policy explaining how we collect, use, disclose, and protect personal information.',
  },
  {
    path: '/terms-of-use',
    title: 'Terms of Service | Ready Signal',
    description: 'Ready Signal\'s terms of service governing the use of our data intelligence and analytics platform.',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Ready Signal',
    description: 'Ready Signal\'s terms of service governing the use of our data intelligence and analytics platform.',
  },
];


// ─── HTML generation ─────────────────────────────────────────────────────────

function run() {
  const indexPath = join(distDir, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  const template = readFileSync(indexPath, 'utf-8');
  let created = 0;

  for (const page of pages) {
    const html = injectMeta(template, page);
    const dir = join(distDir, page.path);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf-8');
    created++;
  }

  console.log(`✅ Generated ${created} OG-tagged index.html files in dist/`);
}

function injectMeta(html, { path, title, description }) {
  const url = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}/og-image.png`;

  let result = html;

  // <title>
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // <meta name="description">
  result = result.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(description)}" />`
  );

  // og:title
  result = result.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`
  );

  // og:description
  result = result.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(description)}" />`
  );

  // og:url
  result = result.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(url)}" />`
  );

  // og:image (ensure production domain)
  result = result.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeAttr(ogImage)}" />`
  );

  // twitter:title
  result = result.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`
  );

  // twitter:description
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`
  );

  // twitter:image (ensure production domain)
  result = result.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`
  );

  // Self-referencing canonical for ad-only LP (crawlers skip client SEO component)
  if (path === '/lp/campaign-preview') {
    const canonicalTag = `<link rel="canonical" href="${escapeAttr(url)}" />`;
    if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/.test(result)) {
      result = result.replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
        canonicalTag
      );
    } else {
      result = result.replace(
        /<\/head>/i,
        `    ${canonicalTag}\n  </head>`
      );
    }
  }

  return result;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

run();
