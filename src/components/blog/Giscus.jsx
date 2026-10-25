import React, { useEffect, useRef } from 'react';
import giscusConfig from '../../config/giscus';

const currentTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

// The site uses HashRouter, so location.pathname is the same on every page.
// Map discussions by the post slug (mapping="specific") instead of the URL.
const Giscus = ({ term }) => {
  const ref = useRef(null);
  const configured = Boolean(giscusConfig.repoId && giscusConfig.categoryId);

  useEffect(() => {
    const container = ref.current;
    if (!configured || !container) return undefined;

    container.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    const attrs = {
      'data-repo': giscusConfig.repo,
      'data-repo-id': giscusConfig.repoId,
      'data-category': giscusConfig.category,
      'data-category-id': giscusConfig.categoryId,
      'data-mapping': 'specific',
      'data-term': term,
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': currentTheme(),
      'data-lang': 'en',
      'data-loading': 'lazy',
    };
    Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
    container.appendChild(script);

    // Keep the comment box in sync with the site's light/dark toggle.
    const observer = new MutationObserver(() => {
      const frame = container.querySelector('iframe.giscus-frame');
      frame?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: currentTheme() } } },
        'https://giscus.app'
      );
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, [term, configured]);

  if (!configured) {
    return <p className="post__comments-note">Comments are coming soon.</p>;
  }
  return <div ref={ref} className="post__comments" />;
};

export default Giscus;
