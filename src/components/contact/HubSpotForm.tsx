import { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  portalId?: string;
  formId?: string;
  region?: string;
}

export default function HubSpotForm({
  portalId = '3894723',
  formId = '17d74227-1cac-49f2-923f-de99a49b6aa1',
  region = 'na1',
}: HubSpotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load HubSpot script if not already loaded
    if (!scriptLoaded.current) {
      const existingScript = document.querySelector(`script[src*="hsforms.net/forms/embed/${portalId}"]`);
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://js.hsforms.net/forms/embed/${portalId}.js`;
        script.defer = true;
        document.body.appendChild(script);
      }
      
      scriptLoaded.current = true;
    }
  }, [portalId]);

  return (
    <div
      ref={containerRef}
      className="hs-form-frame hubspot-form-container"
      data-region={region}
      data-form-id={formId}
      data-portal-id={portalId}
    />
  );
}
