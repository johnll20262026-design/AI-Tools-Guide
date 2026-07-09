import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Check, QrCode, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MEMBERSHIP_PLANS, MEMBERSHIP_EARLY_BIRD_LIMIT } from '@/data/membership';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QrCodeImage from '@/components/QrCodeImage';

export default function MembershipPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="AI资讯会员" description="加入AI Tools Guide会员，获取每日AI资讯早报、精选行业动态、深度工具测评。早鸟特惠限前10名，基础版¥69/月，定制版¥199/月。" />
      <Header />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 返回导航 */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <NavLink to="/" className="gap-1.5">
              <Home className="size-4" />
              返回首页
            </NavLink>
          </Button>
        </div>

        {/* 顶部早鸟特惠提示条 */}
        <div className="mb-8 p-4 md:p-5 rounded-xl bg-gradient-to-r from-primary/20 via-teal-500/20 to-emerald-500/20 border border-primary/40 flex items-center justify-center gap-3 animate-pulse">
          <Clock className="size-5 text-primary shrink-0" />
          <p className="text-sm md:text-base font-medium text-foreground">
            <span className="text-primary font-bold">🔥 早鸟特惠进行中</span>
            <span className="text-muted-foreground mx-2">|</span>
            限前 <span className="text-primary font-bold">{MEMBERSHIP_EARLY_BIRD_LIMIT}</span> 名，抢完立即恢复原价
          </p>
        </div>

        {/* Hero 标题区 */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="size-5 text-primary" />
            <span className="text-xs font-bold tracking-widest text-primary uppercase">AI NEWS MEMBERSHIP</span>
            <Sparkles className="size-5 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
            AI 资讯会员
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            每天 5 分钟，掌握 AI 圈最新动态、赚钱案例、工具评测<br />
            信息差直接拉满，比别人早一步发现机会
          </p>
        </header>

        {/* 价格卡片区 */}
        <section className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.badge
                    ? 'border-primary/50 shadow-lg shadow-primary/5 scale-[1.02]'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-teal-400 text-white text-xs font-bold shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    {plan.icon && <span className="mr-2">{plan.icon}</span>}
                    {plan.name}
                  </h3>
                  <div className="flex items-end justify-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground line-through">
                      ¥{plan.originalPrice}/月
                    </span>
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-bold">
                      省 ¥{plan.savings}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg text-primary font-bold">¥</span>
                    <span className="text-5xl md:text-6xl font-black text-primary">
                      {plan.earlyBirdPrice}
                    </span>
                    <span className="text-muted-foreground ml-1">/月</span>
                  </div>
                  <p className="mt-2 text-xs text-primary font-medium">
                    🔥 早鸟价 · 限前{MEMBERSHIP_EARLY_BIRD_LIMIT}名
                  </p>
                </div>

                <div className="space-y-5 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature.title}>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <span>{feature.icon}</span>
                        {feature.title}
                      </h4>
                      <ul className="space-y-1.5 pl-6">
                        {feature.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 订阅方式区 */}
        <section className="max-w-md mx-auto text-center">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <QrCode className="size-5 text-primary" />
              扫码订阅
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              添加公众号，发送「<span className="text-primary font-semibold">会员</span>」即可咨询订阅
            </p>
            <div className="flex justify-center mb-2">
              <QrCodeImage size="lg" label="公众号二维码" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              订阅后24小时内开通，每日邮件推送
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
