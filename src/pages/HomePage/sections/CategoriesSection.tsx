import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Palette,
  Video,
  Code2,
  FileText,
  Bot,
  Server,
  Shield,
  Clock,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MOCK_CATEGORIES, MOCK_ARTICLES_BY_CATEGORY } from '@/data/categories';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Palette,
  Video,
  Code2,
  FileText,
  Bot,
  Server,
  Shield,
};

export default memo(function CategoriesSection() {
  return (
    <section id="categories" className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 区块标题 */}
        <div className="mb-10 md:mb-14">
          <p className="text-sm font-semibold text-primary mb-2">教程分类</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            系统化学习路径
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-xl">
            覆盖 AI 工具全领域，从入门到精通，找到适合你的学习方向
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {MOCK_CATEGORIES.map((category, i) => {
            const Icon = ICON_MAP[category.icon];
            const articles = MOCK_ARTICLES_BY_CATEGORY[category.id] ?? [];

            return (
              <motion.div
                key={category.id}
                id={`category-${category.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="group h-full border-border/60 bg-card shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-5 md:p-6 flex flex-col gap-3">
                    {/* 图标 + 数量 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                          {Icon && <Icon className="size-5 text-primary" />}
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {category.count} 篇
                        </span>
                      </div>
                    </div>

                    {/* 标题 */}
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {category.description}
                    </p>

                    {/* 文章标题列表 */}
                    <div className="mt-1 pt-3 border-t border-border/40 space-y-2">
                      {articles.slice(0, 5).map((article) => (
                        <Link
                          key={article.id}
                          to={`/article/${article.id}`}
                          className="group/link flex items-start gap-2 rounded-md px-2 py-1.5 -mx-2 hover:bg-muted/50 transition-colors duration-200"
                        >
                          <ArrowRight className="size-3.5 shrink-0 mt-0.5 text-muted-foreground/40 group-hover/link:text-primary transition-colors" />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-foreground group-hover/link:text-primary transition-colors leading-snug line-clamp-1">
                              {article.title}
                            </h4>
                            <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground/60">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="size-2.5" />
                                {article.date}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="size-2.5" />
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                      {articles.length > 5 && (
                        <p className="text-xs text-muted-foreground/50 pl-5">
                          还有 {articles.length - 5} 篇...
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
