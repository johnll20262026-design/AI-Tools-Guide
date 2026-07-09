import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Home, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SEO
        title="隐私政策"
        description="AI工具指南隐私政策，说明我们如何收集、使用和保护您的个人信息。"
      />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <NavLink to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="size-4" />
            返回首页
          </NavLink>
        </div>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="size-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">隐私政策</h1>
              <p className="text-sm text-muted-foreground mt-1">最后更新：2026年7月1日</p>
            </div>
          </div>
        </header>

        <article className="prose prose-neutral max-w-none space-y-8">
          <section>
            <p className="text-base leading-[1.8] text-foreground/85">
              AI工具指南（以下简称"本网站"）非常重视用户的隐私保护。本隐私政策旨在说明我们如何收集、使用、存储和保护您在使用本网站时提供的信息。请您在使用本网站前仔细阅读本政策。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">一、信息收集</h2>
            <div className="space-y-4">
              <p className="text-base leading-[1.8] text-foreground/85">
                本网站是一个纯静态内容网站，我们不会强制要求您注册账号或提供个人信息。但在以下情况下，我们可能会收集相关信息：
              </p>
              <ul className="list-disc list-outside pl-6 space-y-2 text-foreground/85">
                <li className="text-base leading-relaxed pl-1 marker:text-primary">
                  <strong>日志信息：</strong>与大多数网站一样，我们的服务器会自动记录您访问时的基本信息，包括IP地址、浏览器类型、访问时间、页面浏览记录等。这些信息用于网站流量分析和性能优化，不会与个人身份关联。
                </li>
                <li className="text-base leading-relaxed pl-1 marker:text-primary">
                  <strong>Cookie和类似技术：</strong>本网站可能使用Cookie来记住您的偏好设置，以及通过第三方分析工具（如Google Analytics、Cloudflare Analytics）收集匿名的访问统计数据。
                </li>
                <li className="text-base leading-relaxed pl-1 marker:text-primary">
                  <strong>第三方服务：</strong>如果您通过本网站的二维码添加微信/公众号或进行赞赏支付，相关信息由微信支付、支付宝等第三方平台处理，本网站不存储您的支付信息或个人联系方式。
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">二、广告服务</h2>
            <div className="space-y-4">
              <p className="text-base leading-[1.8] text-foreground/85">
                本网站可能通过第三方广告网络（如Google AdSense、百度联盟等）展示广告。这些第三方服务商可能使用Cookie、Web Beacon等技术来收集相关信息，以便向您展示与您兴趣相关的广告。
              </p>
              <ul className="list-disc list-outside pl-6 space-y-2 text-foreground/85">
                <li className="text-base leading-relaxed pl-1 marker:text-primary">
                  Google作为第三方广告供应商，使用Cookie在本网站上投放广告。
                </li>
                <li className="text-base leading-relaxed pl-1 marker:text-primary">
                  用户可以通过访问Google广告设置页面选择退出个性化广告。
                </li>
                <li className="text-base leading-relaxed pl-1 marker:text-primary">
                  第三方广告供应商的隐私政策适用于其数据收集和使用行为，我们建议您查阅相关政策了解详情。
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">三、信息使用</h2>
            <div className="space-y-4">
              <p className="text-base leading-[1.8] text-foreground/85">
                我们收集的信息将用于以下目的：
              </p>
              <ul className="list-disc list-outside pl-6 space-y-2 text-foreground/85">
                <li className="text-base leading-relaxed pl-1 marker:text-primary">提供、维护和改进本网站的内容和服务</li>
                <li className="text-base leading-relaxed pl-1 marker:text-primary">分析网站使用情况，优化用户体验</li>
                <li className="text-base leading-relaxed pl-1 marker:text-primary">防止欺诈和滥用行为，保障网站安全</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">四、信息共享</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              我们不会向任何第三方出售、交易或出租您的个人信息。在以下情况下，我们可能会共享信息：经您同意的共享、法律法规要求、为保护我们的合法权益、与可信赖的服务提供商合作（他们均受保密协议约束）。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">五、外部链接</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              本网站可能包含指向外部网站的链接。我们不对这些外部网站的隐私政策或内容负责。点击外部链接离开本网站后，建议您查阅所访问网站的隐私政策。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">六、Cookie管理</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              您可以通过浏览器设置管理或删除Cookie。但请注意，禁用Cookie可能会影响本网站某些功能的正常使用。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">七、儿童隐私</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              本网站内容面向AI工具学习者和从业者，不专门面向13岁以下的儿童。我们不会故意收集儿童的个人信息。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">八、政策更新</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，重大变更时我们会在网站显著位置提示。
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">九、联系我们</h2>
            <p className="text-base leading-[1.8] text-foreground/85">
              如果您对本隐私政策有任何疑问，可以通过网站右下角的"意见反馈"功能联系我们。
            </p>
          </section>
        </article>

        <div className="mt-12 pt-6 border-t border-border flex items-center gap-3">
          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="size-4" />
            返回上一页
          </Button>
          <Button variant="outline" asChild className="gap-2">
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
