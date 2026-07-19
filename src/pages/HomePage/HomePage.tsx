import { Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HeroSection from '@/pages/HomePage/sections/HeroSection';
import CategoriesSection from '@/pages/HomePage/sections/CategoriesSection';
import { MOCK_CASES } from '@/data/cases';

const StatsSection = lazy(() => import('@/pages/HomePage/sections/StatsSection'));
const PathsSection = lazy(() => import('@/pages/HomePage/sections/PathsSection'));
const CasesSection = lazy(() => import('@/pages/HomePage/sections/CasesSection'));
const MembershipCTASection = lazy(() => import('@/pages/HomePage/sections/MembershipCTASection'));

function SectionPlaceholder({ height = 400 }: { height?: number }) {
  return <div style={{ height, minHeight: height }} className="w-full bg-background" />;
}

function LazySections() {
  useEffect(() => {
    const startLoad = () => {
      const refs = [
        () => import('@/pages/HomePage/sections/StatsSection'),
        () => import('@/pages/HomePage/sections/PathsSection'),
        () => import('@/pages/HomePage/sections/CasesSection'),
        () => import('@/pages/HomePage/sections/MembershipCTASection'),
      ];
      let i = 0;
      const next = () => { if (i < refs.length) { refs[i++](); setTimeout(next, 100); } };
      setTimeout(next, 200);
    };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(startLoad, { timeout: 1500 });
    } else {
      setTimeout(startLoad, 300);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<SectionPlaceholder height={280} />}>
        <StatsSection id="stats" />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height={420} />}>
        <PathsSection />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height={560} />}>
        <CasesSection cases={MOCK_CASES} />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder height={320} />}>
        <MembershipCTASection />
      </Suspense>
    </>
  );
}

export default function HomePage() {
  const location = useLocation();
  const state = location.state as { scrollTo?: string } | null;

  useEffect(() => {
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [state?.scrollTo]);

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Header />
      <main className="space-y-0">
        <HeroSection />
        <CategoriesSection />
        <LazySections />
      </main>
      <Footer />
    </div>
  );
}
