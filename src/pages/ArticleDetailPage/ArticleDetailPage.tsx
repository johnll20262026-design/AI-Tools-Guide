import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ChevronLeft, ChevronRight, Home, ArrowUpToLine, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ALL_ARTICLES } from '@/data/articles';
import { MOCK_ARTICLES_BY_CATEGORY } from '@/data/categories';
import { MOCK_LEARNING_PATHS } from '@/data/learningPaths';
import { MOCK_CASES } from '@/data/cases';

function parseArticleId(id: string) {
  const pathMatch = id.match(/^path-(beginner|intermediate|professional)-(\d+)$/);
  if (pathMatch) {
    return { type: 'path' as const, pathId: pathMatch[1], step: parseInt(pathMatch[2]) };
  }
  const caseMatch = id.match(/^case-(\d+)-(\d+)$/);
  if (caseMatch) {
    return { type: 'case' as const, caseId: caseMatch[1], step: parseInt(caseMatch[2]) };
  }
  const catMatch = id.match(/^([a-z]+)-(\d+)$/);
  if (catMatch) {
    return { type: 'category' as const, categoryId: catMatch[1], index: parseInt(catMatch[2]) };
  }
  return null;
}

interface INavItem {
  id: string;
  title: string;
}

function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary to-teal-400 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 size-11 rounded-full bg-primary text-white shadow-lg shadow-primary/30 flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-110 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="回到顶部"
    >
      <ArrowUpToLine className="size-5" />
    </button>
  );
}

export default function ArticleDetailPage() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [articleId]);

  const article = articleId ? ALL_ARTICLES[articleId] : undefined;
  const parsed = articleId ? parseArticleId(articleId) : null;

  const nav = useMemo(() => {
    if (!parsed || !articleId) return null;

    if (parsed.type === 'category') {
      const articles = MOCK_ARTICLES_BY_CATEGORY[parsed.categoryId];
      if (!articles || articles.length <= 1) return null;
      const idx = articles.findIndex(a => a.id === articleId);
      if (idx === -1) return null;
      return {
        prev: idx > 0 ? articles[idx - 1] : null,
        next: idx < articles.length - 1 ? articles[idx + 1] : null,
        label: '同分类文章',
      };
    }

    if (parsed.type === 'path') {
      const pathData = MOCK_LEARNING_PATHS.find(p => p.id === parsed.pathId);
      if (!pathData) return null;
      const total = pathData.steps.length;
      const cur = parsed.step;
      const prevId = cur > 1 ? `path-${parsed.pathId}-${cur - 1}` : null;
      const nextId = cur < total ? `path-${parsed.pathId}-${cur + 1}` : null;
      return {
        prev: prevId && ALL_ARTICLES[prevId] ? { id: prevId, title: ALL_ARTICLES[prevId].title } : null,
        next: nextId && ALL_ARTICLES[nextId] ? { id: nextId, title: ALL_ARTICLES[nextId].title } : null,
        label: `${pathData.title} · 第 ${cur}/${total} 步`,
      };
    }

    if (parsed.type === 'case') {
      const caseData = MOCK_CASES.find(c => c.id === parsed.caseId);
      if (!caseData) return null;
      const total = caseData.steps.length;
      const cur = parsed.step;
      const prevId = cur > 1 ? `case-${parsed.caseId}-${cur - 1}` : null;
      const nextId = cur < total ? `case-${parsed.caseId}-${cur + 1}` : null;
      return {
        prev: prevId && ALL_ARTICLES[prevId] ? { id: prevId, title: ALL_ARTICLES[prevId].title } : null,
        next: nextId && ALL_ARTICLES[nextId] ? { id: nextId, title: ALL_ARTICLES[nextId].title } : null,
        label: `${caseData.title} · 第 ${cur}/${total} 步`,
      };
    }

    return null;
  }, [parsed, articleId]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SEO title="文章即将上线" description="这篇文章正在精心编写中，敬请期待" />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="max-w-md mx-auto px-4 text-center space-y-5">
            <div className="size-16 mx-auto rounded-2xl bg-muted flex items-center justify-center">
              <Clock className="size-8 text-muted-foreground/40" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">文章即将上线</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                这篇文章的内容正在精心编写中，很快就会与大家见面。请先浏览其他已发布的文章。
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="size-4" />
                返回上一级
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
                <Home className="size-4" />
                返回首页
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgressBar />
      <Header />
      <SEO title={article.title} description={article.description} />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 顶部导航按钮 */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" />
            返回上一级
          </button>
          <span className="text-muted-foreground/30">|</span>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="size-3.5" />
            返回首页
          </button>
        </div>

        {/* 文章头部 */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" />
              {article.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" />
              {article.readTime}
            </span>
          </div>
        </header>

        {/* 文章正文 - 使用react-markdown渲染 */}
        <article className="article-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-20">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-base font-semibold text-foreground mt-6 mb-2">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-base leading-[1.8] text-foreground/85 mb-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside pl-6 mb-4 space-y-2 text-foreground/85">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside pl-6 mb-4 space-y-2 text-foreground/85">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-base leading-relaxed pl-1 marker:text-primary">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/50 bg-primary/5 pl-4 pr-4 py-3 my-6 rounded-r-lg">
                  <div className="text-foreground/80 text-base leading-relaxed italic">
                    {children}
                  </div>
                </blockquote>
              ),
              code: ({ className, children }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[0.9em] font-mono">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block bg-[#1c2128] text-[#e6edf3] px-4 py-4 overflow-x-auto text-sm font-mono leading-relaxed">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-[#1c2128] rounded-lg overflow-hidden my-5 border border-border">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6 rounded-lg border border-border">
                  <table className="w-full text-sm border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-muted">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-border/50 px-4 py-3 text-foreground/80">
                  {children}
                </td>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="my-8 border-border" />,
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || ''}
                  className="rounded-lg my-6 max-w-full h-auto border border-border"
                  loading="lazy"
                />
              ),
            }}
          >
            {article.content ?? ''}
          </ReactMarkdown>
        </article>

        {/* 底部导航：上一篇 / 下一篇 */}
        {nav && (
          <div className="mt-12 pt-8 border-t border-border">
            {nav.label && (
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                {nav.label}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              {nav.prev ? (
                <NavLink
                  to={`/article/${nav.prev.id}`}
                  className="flex-1 group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card transition-colors"
                >
                  <ChevronLeft className="size-5 shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="min-w-0">
                    <span className="text-xs text-muted-foreground">上一篇</span>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                      {nav.prev.title}
                    </p>
                  </div>
                </NavLink>
              ) : (
                <div className="flex-1" />
              )}
              {nav.next ? (
                <NavLink
                  to={`/article/${nav.next.id}`}
                  className="flex-1 group flex items-start justify-end gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card transition-colors text-right"
                >
                  <div className="min-w-0">
                    <span className="text-xs text-muted-foreground">下一篇</span>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                      {nav.next.title}
                    </p>
                  </div>
                  <ChevronRight className="size-5 shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </NavLink>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        )}

        {/* 底部操作按钮 */}
        <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            返回上一级
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Home className="size-4" />
            返回首页
          </Button>
        </div>

        {/* 相关文章推荐 — 基于 article.related 字段 */}
        {article.related && article.related.length > 0 && (() => {
          const relatedArticles = article.related
            .map(rid => ALL_ARTICLES[rid])
            .filter((a): a is NonNullable<typeof a> => Boolean(a));
          if (relatedArticles.length === 0) return null;
          return (
            <section className="mt-10 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="size-4 text-primary" />
                <h2 className="text-base font-bold text-foreground">相关推荐</h2>
                <span className="h-px flex-1 bg-border" />
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedArticles.map(ra => (
                  <li key={ra.id}>
                    <NavLink
                      to={`/article/${ra.id}`}
                      className="group/rel flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-card transition-colors h-full"
                    >
                      <ChevronRight className="size-4 shrink-0 mt-0.5 text-muted-foreground group-hover/rel:text-primary transition-colors" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground group-hover/rel:text-primary transition-colors line-clamp-2">
                          {ra.title}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3" />
                            {ra.readTime}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="size-3" />
                            {ra.date}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}
      </div>
      <BackToTopButton />
      <Footer />
    </div>
  );
}
