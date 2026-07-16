import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Code, Palette, Zap, Bot, Smartphone, Database, Clock, Calendar } from 'lucide-react';
import type { ICaseItem } from '@/types/tutorial';
import { ALL_ARTICLES_META } from '@/data/articles-meta';

interface CasesSectionProps {
  cases: ICaseItem[];
}

const CASE_IMAGES: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200&h=675',
  '2': 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200&h=675',
  '3': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=675',
  '4': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=675',
  '5': 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200&h=675',
  '6': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200&h=675',
};

interface ICaseStyle {
  gradient: string;
  iconColor: string;
  glowColor: string;
  icon: React.ReactNode;
}

const CASE_STYLES: Record<string, ICaseStyle> = {
  '1': {
    gradient: 'from-[#0d1b2a] via-[#1b263b] to-[#0d1b2a]',
    iconColor: 'text-[#00d4aa]',
    glowColor: 'bg-[#00d4aa]/20',
    icon: <Code className="size-20" strokeWidth={1} />,
  },
  '2': {
    gradient: 'from-[#1a0d20] via-[#2d1b3a] to-[#1a0d20]',
    iconColor: 'text-[#ff6b9d]',
    glowColor: 'bg-[#ff6b9d]/20',
    icon: <Palette className="size-20" strokeWidth={1} />,
  },
  '3': {
    gradient: 'from-[#0a1628] via-[#152a45] to-[#0a1628]',
    iconColor: 'text-[#4dabf7]',
    glowColor: 'bg-[#4dabf7]/20',
    icon: <Zap className="size-20" strokeWidth={1} />,
  },
  '4': {
    gradient: 'from-[#150d20] via-[#251838] to-[#150d20]',
    iconColor: 'text-[#b197fc]',
    glowColor: 'bg-[#b197fc]/20',
    icon: <Bot className="size-20" strokeWidth={1} />,
  },
  '5': {
    gradient: 'from-[#200d15] via-[#3a1825] to-[#200d15]',
    iconColor: 'text-[#ff8787]',
    glowColor: 'bg-[#ff8787]/20',
    icon: <Smartphone className="size-20" strokeWidth={1} />,
  },
  '6': {
    gradient: 'from-[#0d1a15] via-[#152e24] to-[#0d1a15]',
    iconColor: 'text-[#20c997]',
    glowColor: 'bg-[#20c997]/20',
    icon: <Database className="size-20" strokeWidth={1} />,
  },
};

function CaseCard({ item, index }: { item: ICaseItem; index: number }) {
  const style = CASE_STYLES[item.id] ?? CASE_STYLES['1'];
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !imgLoaded || imgError;

  return (
    <motion.div
      id={`case-${item.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <article className="overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full flex flex-col group">
        {/* 封面区 */}
        <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${style.gradient}`}>
          {/* 真实图片 */}
          {!imgError && (
            <img
              src={CASE_IMAGES[item.id] ?? CASE_IMAGES['1']}
              alt={item.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover:scale-105`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}
          {/* 加载/错误占位 */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showPlaceholder ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* 网格装饰 */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />
            {/* 径向光晕 */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 rounded-full ${style.glowColor} blur-3xl`} />
            {/* 图标 */}
            <div className={`relative ${style.iconColor} opacity-90 drop-shadow-lg transition-transform duration-500 group-hover:scale-110`}>
              {style.icon}
            </div>
          </div>
          {/* 暗色遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
          {/* 标签 */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/95 text-slate-900 backdrop-blur-sm border border-white/20 shadow-sm">
              {item.tag}
            </span>
          </div>
        </div>

        {/* 内容区 */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {/* 标题 + 箭头 */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <ArrowUpRight className="size-4 shrink-0 mt-1 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          {/* 描述 */}
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>

          {/* 工具标签 */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium text-primary bg-primary/10 border border-primary/20"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* 步骤列表 */}
          {item.steps && item.steps.length > 0 && (
            <div className="mt-5 pt-4 border-t border-border flex-1">
              <p className="text-xs font-semibold text-muted-foreground mb-3">
                共 {item.steps.length} 步教程
              </p>
              <ul className="space-y-2">
                {item.steps.map((step) => {
                  const articleId = `case-${item.id}-${step.step}`;
                  const article = ALL_ARTICLES_META[articleId];
                  return (
                  <li key={step.step}>
                    <Link
                      to={`/article/${articleId}`}
                      className="relative z-10 flex items-center gap-2.5 p-3 rounded-lg bg-muted/40 hover:bg-muted hover:border-primary/30 active:bg-muted/70 border border-transparent transition-all duration-150 group/step"
                    >
                      <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
                        {step.step}
                      </span>
                      <span className="text-sm font-medium text-foreground group-hover/step:text-primary transition-colors flex-1 truncate">
                        {article?.title ?? step.title}
                      </span>
                      <ChevronRight className="size-3.5 text-muted-foreground group-hover/step:text-primary shrink-0 transition-colors" />
                    </Link>
                    {(article?.readTime || article?.date) && (
                      <div className="flex items-center gap-3 pl-9 -mt-1 mb-1">
                        {article?.readTime && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/70">
                            <Clock className="size-2.5" />
                            {article.readTime}
                          </span>
                        )}
                        {article?.date && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/70">
                            <Calendar className="size-2.5" />
                            {article.date}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                );})}
              </ul>
            </div>
          )}
        </div>
      </article>
    </motion.div>
  );
}

export default memo(function CasesSection({ cases }: CasesSectionProps) {
  return (
    <section id="cases" className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 区块标题 */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              Cases
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            实战案例
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl">
            精选典型应用场景，看看 AI 工具如何在真实项目中发挥作用。
          </p>
        </div>

        {/* 案例卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {cases.map((item, i) => (
            <CaseCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
});
