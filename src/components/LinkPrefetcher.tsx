import { useEffect } from 'react';
import { prefetchRoute } from '@/lib/prefetch';

export default function LinkPrefetcher() {
  useEffect(() => {
    let lastHoverHref = '';
    let lastTime = 0;

    const handleHover = (e: Event) => {
      const now = Date.now();
      if (now - lastTime < 50) return;
      lastTime = now;

      const el = e.target as HTMLElement;
      const anchor = el.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (href === lastHoverHref) return;
      lastHoverHref = href;

      prefetchRoute(href, false);
    };

    const handlePress = (e: Event) => {
      const el = e.target as HTMLElement;
      const anchor = el.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      if (href.startsWith('#')) return;

      prefetchRoute(href, true);
    };

    const opts: AddEventListenerOptions = { passive: true };
    document.addEventListener('mouseover', handleHover, opts);
    document.addEventListener('touchstart', handleHover, { ...opts, capture: true });
    document.addEventListener('focusin', handleHover, opts);

    document.addEventListener('pointerdown', handlePress, opts);

    return () => {
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('touchstart', handleHover, true);
      document.removeEventListener('focusin', handleHover);
      document.removeEventListener('pointerdown', handlePress);
    };
  }, []);

  return null;
}
