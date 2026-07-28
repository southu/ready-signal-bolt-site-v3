const SITE_URL = 'https://www.readysignal.com';

/**
 * JSON-LD structured data for /forecasting-landing.
 * Organization + BreadcrumbList only — no FAQ or SoftwareApplication schema,
 * since the page renders no content that would back it.
 */
export const FORECASTING_LANDING_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ready Signal',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Forecasting Signals',
        item: `${SITE_URL}/forecasting-landing`,
      },
    ],
  },
];
