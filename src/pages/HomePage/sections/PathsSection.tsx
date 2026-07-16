import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Zap, Code2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_LEARNING_PATHS } from '@/data/learningPaths';
import { ALL_ARTICLES_META } from '@/data/articles-meta';

const PATH_ICONS: Record<string, typeof GraduationCap> = {
  beginner: GraduationCap,
  intermediate: Zap,
  professional: Code2,
};

function PathsSection() {
  return (
    <section id="paths" className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 区块标题 */}
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary mb-2">学习路径</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            找到适合你的起点
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl">
            无论你是零基础小白还是资深开发者，这里都有一条为你量身定制的学习路线。
          </p>
        </div>

        {/* 路径卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_LEARNING_PATHS.map((path, i) => {
            const Icon = PATH_ICONS[path.id] ?? GraduationCap;

            return (
              <motion.div
                key={path.id}
                id={`path-${path.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="group h-full border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg font-bold text-foreground">
                          {path.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1 text-[10px] px-2 py-0 h-5 font-medium">
                          {path.target}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {path.description}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">
                      共 {path.steps.length} 个步骤
                    </p>
                  </CardHeader>

                  {/* 步骤文章列表 — 直接显示，点击 Link 跳转详情页 */}
                  <CardContent className="pt-0 pb-5 md:pb-6">
                    <ul className="space-y-2">
                      {path.steps.map((step, si) => {
                        const articleId = `path-${path.id}-${step.step}`;
                        const article = ALL_ARTICLES_META[articleId];
                        return (
                        <li key={step.step}>
                          <Link
                            to={`/article/${articleId}`}
                            className="relative z-10 flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted hover:border-primary/30 active:bg-muted/70 border border-transparent transition-all duration-150 group/step"
                          >
                            {/* 步骤序号 */}
                            <span className="flex items-center justify-center size-7 rounded-full bg-primary/15 text-xs font-bold text-primary shrink-0 mt-0.5 group-hover/step:bg-primary group-hover/step:text-primary-foreground transition-colors">
                              {step.step}
                            </span>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-semibold text-foreground group-hover/step:text-primary transition-colors">
                                  {article?.title ?? step.title}
                                </p>
                                <ArrowRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 group-hover/step:opacity-100 group-hover/step:text-primary transition-all" />
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                                {article?.description ?? step.description}
                              </p>

                              {/* 文章元信息 */}
                              <div className="flex items-center gap-4 mt-2">
                                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Clock className="size-3" />
                                  {article?.readTime ?? `${5 + si * 2} 分钟`}
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Calendar className="size-3" />
                                  {article?.date ?? `2026-06-${String(20 - si * 3).padStart(2, '0')}`}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );})}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(PathsSection);
