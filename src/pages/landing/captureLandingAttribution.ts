/**
 * Landing-route-only attribution capture.
 * Reads UTM/query params + document.referrer on page load and persists them
 * so they can be submitted with the HubSpot form and/or sent to analytics.
 * Scoped to the new landing page — do not import from sitewide routes.
 */

export const LANDING_ATTRIBUTION_STORAGE_KEY = 'rs_landing_attribution';

export const LANDING_ATTRIBUTION_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
] as const;

export type LandingAttributionParamKey =
  (typeof LANDING_ATTRIBUTION_PARAM_KEYS)[number];

export type LandingAttribution = Record<LandingAttributionParamKey, string> & {
  referrer: string;
};

export function captureLandingAttribution(): LandingAttribution {
  const params = new URLSearchParams(window.location.search);

  const attribution = {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_term: params.get('utm_term') ?? '',
    utm_content: params.get('utm_content') ?? '',
    gclid: params.get('gclid') ?? '',
    referrer: document.referrer || '',
  } satisfies LandingAttribution;

  try {
    sessionStorage.setItem(
      LANDING_ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution)
    );

    // Individual keys for easy inspection / HubSpot field mapping
    for (const key of LANDING_ATTRIBUTION_PARAM_KEYS) {
      const value = attribution[key];
      if (value) {
        sessionStorage.setItem(key, value);
        localStorage.setItem(key, value);
      }
    }
    if (attribution.referrer) {
      sessionStorage.setItem('referrer', attribution.referrer);
      localStorage.setItem('referrer', attribution.referrer);
    }
  } catch {
    // Storage may be unavailable (private mode / blocked); hidden fields still work
  }

  return attribution;
}
