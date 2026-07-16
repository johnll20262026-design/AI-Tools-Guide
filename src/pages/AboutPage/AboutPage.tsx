import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles, Target, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: '系统化教程',
      desc: '从Prompt工程到模型部署，覆盖AI工具8大核心领域，100+篇实战教程由浅入深。',
    },
    {
      icon: Target,
      title: '学习路径',
      desc: '为零基础小白、进阶用户和专业开发者分别定制学习路线，避免走弯路。',
    },
    {
      icon: Sparkles,
      title: '实战案例',
      desc: '精选真实AI应用场景，从需求分析到落地全流程拆解，即学即用。',
    },
    {
      icon: Users,
      title: '中文友好',
      desc: '所有内容面向中文用户，聚焦国内可访问的AI工具和本土化使用场景。',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SEO
        title="关于我们"
        description="AI Tools Guide 是面向中文用户的AI工具实战教程与落地指南，提供系统化的AI工具学习路径。"
      />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 flex-wrap">
          <NavLink to="/" className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-muted-foreground hover:text-primary transition-colors min-h-[44px] -ml-2 px-2">
            <ArrowLeft className="size-4" />
            返回首页
          </NavLink>
        </div>

        <header className="mb-8 md:mb-12 text-center md:text-left px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            关于 <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">AI Tools Guide</span>
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            面向中文用户的AI工具实战教程与落地指南
          </p>
        </header>

        <article className="space-y-10">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">我们的使命</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              AI技术正在以前所未有的速度改变我们的工作和生活方式，但海量的工具、碎片化的信息让很多人望而却步。AI Tools Guide 的使命是为中文用户提供一个<strong>系统化、可落地、持续更新</strong>的AI工具学习平台，帮助每一个人都能掌握AI工具，提升效率，创造价值。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">我们提供什么</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">内容覆盖领域</h2>
            <div className="flex flex-wrap gap-2">
              {['Prompt 工程', 'AI 绘画', 'AI 视频', 'AI 编程', 'AI 办公', 'AI Agent', '模型部署', 'AI 安全'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-sm bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">联系我们</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              如果您有任何建议、合作意向或问题反馈，可以通过网站右下角的"意见反馈"按钮联系我们。我们会认真对待每一条反馈，持续改进内容和体验。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">支持我们</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              如果您觉得本网站对您有帮助，可以通过右下角的"赞赏支持"请我们喝杯咖啡。您的支持是我们持续更新优质内容的动力。也欢迎您将网站分享给更多需要学习AI工具的朋友。
            </p>
          </section>
        </article>

        <div className="mt-8 md:mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2 h-11">
            <ArrowLeft className="size-4" />
            返回上一页
          </Button>
          <Button variant="outline" asChild className="gap-2 h-11">
            <NavLink to="/">
              <Home className="size-4" />
              返回首页
            </NavLink>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
