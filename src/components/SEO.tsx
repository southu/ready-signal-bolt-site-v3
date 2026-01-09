import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  useEffect(() => {
    document.title = title;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', description);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
  }, [title, description, canonical]);

  return null;
}
