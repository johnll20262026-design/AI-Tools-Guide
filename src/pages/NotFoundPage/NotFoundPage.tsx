import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SEO title="页面未找到" description="您访问的页面不存在，请返回首页继续浏览 AI 工具教程。" />
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md"
        >
          <div className="text-8xl font-bold text-primary mb-4 font-mono">404</div>
          <h1 className="text-2xl font-semibold text-foreground mb-3">页面不存在</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            您访问的页面可能已被移除、重命名，或者输入了错误的地址。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              返回首页
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-border bg-card text-foreground hover:bg-accent transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              返回上一页
            </button>
          </div>
          <div className="mt-10 pt-8 border-t border-border/50 text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2 mb-2">
              <Search className="w-3.5 h-3.5" />
              您可以试试这些：
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/article/path-beginner-1" className="text-primary hover:underline">入门指南</Link>
              <span>·</span>
              <Link to="/article/case-1-1" className="text-primary hover:underline">实战案例</Link>
              <span>·</span>
              <Link to="/article/prompt-1" className="text-primary hover:underline">Prompt 工程</Link>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
