import { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  portalId?: string;
  formId?: string;
  region?: string;
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
        }) => void;
      };
    };
  }
}

export default function HubSpotForm({
  portalId = '3894723',
  formId = '921a93d3-b577-4c9e-a8b0-cb69a5809200',
  region = 'na1',
}: HubSpotFormProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const formCreated = useRef(false);

  useEffect(() => {
    // Load HubSpot script if not already loaded
    const existingScript = document.querySelector('script[src*="hsforms"]');
    
    const createForm = () => {
      if (window.hbspt && formRef.current && !formCreated.current) {
        formCreated.current = true;
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#hubspot-form-${formId}`,
        });
      }
    };

    if (existingScript) {
      // Script already loaded, just create the form
      createForm();
    } else {
      // Load the script
      const script = document.createElement('script');
      script.src = '//js.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.async = true;
      script.onload = () => {
        // Small delay to ensure hbspt is available
        setTimeout(createForm, 100);
      };
      document.body.appendChild(script);
    }

    return () => {
      formCreated.current = false;
    };
  }, [portalId, formId, region]);

  return (
    <div
      id={`hubspot-form-${formId}`}
      ref={formRef}
      className="hubspot-form-container"
    />
  );
}
