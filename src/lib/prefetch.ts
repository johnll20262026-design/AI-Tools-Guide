const ric: (cb: (deadline: IdleDeadline) => void, opts?: IdleRequestOptions) => number =
  typeof requestIdleCallback !== 'undefined'
    ? requestIdleCallback
    : (cb) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1);

const lazyImporters = {
  article: () => import('@/pages/ArticleDetailPage/ArticleDetailPage'),
  resources: () => import('@/pages/ResourcesPage/ResourcesPage'),
  tuner: () => import('@/pages/GuitarTunerPage/GuitarTunerPage'),
  lottery: () => import('@/pages/LotteryPage/LotteryPage'),
  membership: () => import('@/pages/MembershipPage/MembershipPage'),
  privacy: () => import('@/pages/PrivacyPage/PrivacyPage'),
  about: () => import('@/pages/AboutPage/AboutPage'),
} as const;

type PrefetchKey = keyof typeof lazyImporters;

const prefetched = new Set<string>();

function matchPrefetchKey(path: string): PrefetchKey | null {
  if (path.startsWith('/article/')) return 'article';
  if (path === '/resources') return 'resources';
  if (path === '/tuner') return 'tuner';
  if (path === '/lottery') return 'lottery';
  if (path === '/membership') return 'membership';
  if (path === '/privacy') return 'privacy';
  if (path === '/about') return 'about';
  return null;
}

export function prefetchRoute(path: string, eager = false): void {
  const key = matchPrefetchKey(path);
  if (!key) return;
  if (prefetched.has(key)) return;
  prefetched.add(key);
  const importer = lazyImporters[key];
  if (importer) {
    if (eager) {
      importer().catch(() => {});
    } else {
      ric(() => {
        importer().catch(() => {});
      }, { timeout: 1500 });
    }
  }
}

export function prefetchOnHover(
  callback?: () => void
): {
  onMouseEnter: () => void;
  onTouchStart: () => void;
  onPointerDown: () => void;
  onFocus: () => void;
} {
  let done = false;
  const trigger = (_eager = false) => {
    if (done) return;
    done = true;
    callback?.();
  };
  return {
    onMouseEnter: () => trigger(false),
    onTouchStart: () => trigger(true),
    onPointerDown: () => trigger(true),
    onFocus: () => trigger(false),
  };
}

export function scheduleInitialPrefetch(): void {
  const criticalRoutes = ['/membership', '/resources', '/about'];

  ric(() => {
    criticalRoutes.forEach((route, i) => {
      setTimeout(() => prefetchRoute(route, false), i * 200);
    });
  }, { timeout: 2000 });

  ric(() => {
    prefetchRoute('/article/prompt-1', false);
    prefetchRoute('/tuner', false);
  }, { timeout: 5000 });
}
