import { useEffect } from 'react';

function setMeta(name, content, attr = 'name') {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ZeroChill Co`;
    }

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, 'property');
      setMeta('twitter:description', description);
    }

    setMeta('og:title', title ? `${title} | ZeroChill Co` : 'ZeroChill Co', 'property');
    setMeta('twitter:title', title ? `${title} | ZeroChill Co` : 'ZeroChill Co');
    setMeta('theme-color', '#050505');
    setMeta('og:type', 'website', 'property');

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [title, description]);

  return null;
}
