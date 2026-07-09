import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import HeroSection from '@/pages/HomePage/sections/HeroSection';
import CategoriesSection from '@/pages/HomePage/sections/CategoriesSection';
import StatsSection from '@/pages/HomePage/sections/StatsSection';
import PathsSection from '@/pages/HomePage/sections/PathsSection';
import CasesSection from '@/pages/HomePage/sections/CasesSection';
import MembershipCTASection from '@/pages/HomePage/sections/MembershipCTASection';
import { MOCK_CASES } from '@/data/cases';

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
        <StatsSection id="stats" />
        <PathsSection />
        <CasesSection cases={MOCK_CASES} />
        <MembershipCTASection />
      </main>
      <Footer />
    </div>
  );
}
