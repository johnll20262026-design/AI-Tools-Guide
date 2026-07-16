import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import RouteLoadingIndicator from "@/components/RouteLoadingIndicator";
import LinkPrefetcher from "@/components/LinkPrefetcher";
import { scheduleInitialPrefetch } from "@/lib/prefetch";
import HomePage from "@/pages/HomePage/HomePage";

const ArticleDetailPage = lazy(() => import("@/pages/ArticleDetailPage/ArticleDetailPage"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage/ResourcesPage"));
const GuitarTunerPage = lazy(() => import("@/pages/GuitarTunerPage/GuitarTunerPage"));
const LotteryPage = lazy(() => import("@/pages/LotteryPage/LotteryPage"));
const MembershipPage = lazy(() => import("@/pages/MembershipPage/MembershipPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage/PrivacyPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage/AboutPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">加载中...</p>
      </div>
    </div>
  );
}

function InitialPrefetch() {
  useEffect(() => {
    scheduleInitialPrefetch();
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <RouteLoadingIndicator />
      <LinkPrefetcher />
      <InitialPrefetch />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="article/:articleId" element={<ArticleDetailPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="tuner" element={<GuitarTunerPage />} />
            <Route path="lottery" element={<LotteryPage />} />
            <Route path="membership" element={<MembershipPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
