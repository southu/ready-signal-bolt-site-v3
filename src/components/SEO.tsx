import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

const DEFAULT_OG_IMAGE = '/og-image.png';
const SITE_URL = 'https://www.readysignal.com';

export default function SEO({ 
  title, 
  description, 
  canonical, 
  image,
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta
    setMeta('description', description);

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:image', image ? `${SITE_URL}${image}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`, true);
    
    if (canonical) {
      setMeta('og:url', canonical, true);
    }

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image ? `${SITE_URL}${image}` : `${SITE_URL}${DEFAULT_OG_IMAGE}`);

    // Canonical link
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
  }, [title, description, canonical, image, type]);

  return null;
}
