import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import HomePage from "@/pages/HomePage/HomePage";
import ArticleDetailPage from "@/pages/ArticleDetailPage/ArticleDetailPage";
import ResourcesPage from "@/pages/ResourcesPage/ResourcesPage";
import GuitarTunerPage from "@/pages/GuitarTunerPage/GuitarTunerPage";
import LotteryPage from "@/pages/LotteryPage/LotteryPage";
import MembershipPage from "@/pages/MembershipPage/MembershipPage";
import PrivacyPage from "@/pages/PrivacyPage/PrivacyPage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

export default function App() {
  return (
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
  );
}
