import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function isNavigableHref(href: string | null): boolean {
  if (!href) return false;
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return false;
  }
  return true;
}

function isModifiedClick(e: MouseEvent | TouchEvent): boolean {
  if ('metaKey' in e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)) return true;
  return false;
}

export default function RouteLoadingIndicator() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLoading = () => {
    setLoading(true);
    setProgress(15);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev < 70) return prev + Math.random() * 12;
        if (prev < 85) return prev + Math.random() * 4;
        return prev;
      });
    }, 150);
  };

  useEffect(() => {
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // 处理 <a> 链接
      const link = target.closest('a');
      if (link) {
        if (link.target === '_blank') return;
        const href = link.getAttribute('href');
        if (!isNavigableHref(href)) return;
        if (isModifiedClick(e)) return;
        startLoading();
        return;
      }

      // 处理通过 button 触发的路由跳转（data-route-link 标记）
      const button = target.closest<HTMLElement>('button[data-route-link], [role="button"][data-route-link]');
      if (button) {
        startLoading();
      }
    };

    document.addEventListener('click', handlePointer, true);
    document.addEventListener('touchstart', handlePointer, { passive: true, capture: true });

    return () => {
      document.removeEventListener('click', handlePointer, true);
      document.removeEventListener('touchstart', handlePointer, true);
    };
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
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
