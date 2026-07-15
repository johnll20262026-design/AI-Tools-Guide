import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section id="hero" className="w-full relative overflow-hidden py-20 md:py-32">
      {/* 背景装饰 — 极淡的科技感暗纹 */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8"
        >
          <Sparkles className="size-3.5" />
          面向中文用户的 AI 工具实战教程
        </motion.div>

        {/* 主标题 — AI 青绿高亮 + Tools Guide 深色粗体 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05]"
        >
          <span className="bg-gradient-to-r from-primary via-primary to-emerald-500 bg-clip-text text-transparent">AI</span>
          {' '}Tools Guide
        </motion.h1>

        {/* 副标题 — 中文简介 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 space-y-1"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            面向中文用户的 AI 工具实战教程与落地指南。
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            覆盖 Prompt 工程、AI 绘画、AI 编程、
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            AI 办公、AI Agent 和真实案例。
          </p>
        </motion.div>

        {/* 三个操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            variant="secondary"
            size="lg"
            className="h-12 px-8 rounded-full text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => {
              document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            浏览 AI 教程分类
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="h-12 px-8 rounded-full text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => {
              document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            选择学习路径
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="h-12 px-8 rounded-full text-base font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => {
              document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            查看实战案例
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
