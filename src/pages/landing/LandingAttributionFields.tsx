import { useEffect, useState } from 'react';
import {
  captureLandingAttribution,
  LANDING_ATTRIBUTION_PARAM_KEYS,
  type LandingAttribution,
} from './captureLandingAttribution';

/**
 * Captures UTM/query params + referrer on mount and exposes them as
 * sessionStorage/localStorage values and hidden form fields for HubSpot.
 * Landing-route only.
 */
function LandingAttributionFields() {
  const [attribution, setAttribution] = useState<LandingAttribution | null>(
    null
  );

  useEffect(() => {
    setAttribution(captureLandingAttribution());
  }, []);

  if (!attribution) {
    return null;
  }

  return (
    <form
      id="landing-attribution-fields"
      name="landing-attribution"
      aria-hidden="true"
      hidden
      data-landing-attribution="captured"
      data-utm-source={attribution.utm_source}
      data-utm-medium={attribution.utm_medium}
      data-utm-campaign={attribution.utm_campaign}
      data-utm-term={attribution.utm_term}
      data-utm-content={attribution.utm_content}
      data-gclid={attribution.gclid}
      data-referrer={attribution.referrer}
    >
      {LANDING_ATTRIBUTION_PARAM_KEYS.map((key) => (
        <input
          key={key}
          type="hidden"
          name={key}
          value={attribution[key]}
          data-attribution-field={key}
          readOnly
        />
      ))}
      <input
        type="hidden"
        name="referrer"
        value={attribution.referrer}
        data-attribution-field="referrer"
        readOnly
      />
    </form>
  );
}

export default LandingAttributionFields;
