import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function isNavigableHref(href: string | null): boolean {
  if (!href) return false;
  if (href.startsWith('#')) return false;
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }
  return true;
}

function isAnchorNavigation(el: HTMLElement): boolean {
  const anchor = el.closest('a');
  if (anchor) {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) return true;
    if (href && href.includes('#') && !href.startsWith('http')) {
      const path = href.split('#')[0];
      if (path === '' || path === window.location.pathname) return true;
    }
  }
  return false;
}

function isModifiedClick(e: MouseEvent): boolean {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return true;
  return false;
}

export default function RouteLoadingIndicator() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = () => {
    setProgress(10);

    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    showTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, 200);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev < 70) return prev + Math.random() * 10;
        if (prev < 85) return prev + Math.random() * 3;
        return prev;
      });
    }, 200);
  };

  const stopLoading = () => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 200);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (isModifiedClick(e)) return;

      if (isAnchorNavigation(target)) return;

      const link = target.closest('a');
      if (link) {
        if (link.target === '_blank') return;
        const href = link.getAttribute('href');
        if (!isNavigableHref(href)) return;
        startLoading();
        return;
      }

      const button = target.closest<HTMLElement>('button[data-route-link], [role="button"][data-route-link]');
      if (button) {
        startLoading();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    stopLoading();
  }, [location.pathname, location.search]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <div
        className="h-1 bg-gradient-to-r from-primary to-teal-400 shadow-lg shadow-primary/50"
        style={{
          width: `${Math.min(progress, 100)}%`,
          transition: 'width 0.2s ease-out',
        }}
      />
    </div>
  );
}
