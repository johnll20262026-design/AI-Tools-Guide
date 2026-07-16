import { useEffect } from 'react';
import { prefetchRoute } from '@/lib/prefetch';

export default function LinkPrefetcher() {
  useEffect(() => {
    let lastHref = '';
    let lastTime = 0;

    const handleEnter = (e: Event) => {
      const now = Date.now();
      if (now - lastTime < 50) return;
      lastTime = now;

      const el = e.target as HTMLElement;
      const anchor = el.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (href === lastHref) return;
      lastHref = href;

      prefetchRoute(href);
    };

    const opts: AddEventListenerOptions = { passive: true };
    document.addEventListener('mouseover', handleEnter, opts);
    document.addEventListener('touchstart', handleEnter, { ...opts, capture: true });
    document.addEventListener('focusin', handleEnter, opts);

    return () => {
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('touchstart', handleEnter, true);
      document.removeEventListener('focusin', handleEnter);
    };
  }, []);

  return null;
}
