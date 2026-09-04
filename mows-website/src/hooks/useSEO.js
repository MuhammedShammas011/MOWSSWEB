import { useEffect } from 'react';

export default function useSEO({ title, description, url }) {
  useEffect(() => {
    // 1. Update Document Title
    const finalTitle = title ? `${title} | Mows` : 'Mows | Premium Coworking Spaces';
    document.title = finalTitle;
    
    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || 'Mows provides premium coworking spaces for professionals, startups, and enterprises in Kerala.');
    }

    // 3. Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', url ? `https://www.mowshub.com${url}` : 'https://www.mowshub.com/');
    }

    // 4. Update OpenGraph Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute('content', description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url ? `https://www.mowshub.com${url}` : 'https://www.mowshub.com/');

    // 5. Update Twitter Tags
    let twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', finalTitle);
    
    let twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && description) twDesc.setAttribute('content', description);

  }, [title, description, url]);
}
