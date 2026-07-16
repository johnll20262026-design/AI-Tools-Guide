import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteLoadingIndicator() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setProgress(15);

      if ((window as any).__routeLoadingInterval) {
        clearInterval((window as any).__routeLoadingInterval);
      }

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 70) return prev + Math.random() * 12;
          if (prev < 85) return prev + Math.random() * 4;
          return prev;
        });
      }, 150);

      (window as any).__routeLoadingInterval = interval;
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;
      if (link.target === '_blank') return;
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      startLoading();
    };

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;
      if (link.target === '_blank') return;
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return;

      startLoading();
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('touchstart', handleTouchStart, true);
    };
  }, []);

  useEffect(() => {
    if ((window as any).__routeLoadingInterval) {
      clearInterval((window as any).__routeLoadingInterval);
    }

    setProgress(100);
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 250);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <div
        className="h-1.5 bg-gradient-to-r from-primary to-teal-400 shadow-lg shadow-primary/50"
        style={{
          width: `${Math.min(progress, 100)}%`,
          transition: 'width 0.15s ease-out',
        }}
      />
      <div className="sr-only" role="status" aria-live="polite">
        页面加载中
      </div>
    </div>
  );
}
