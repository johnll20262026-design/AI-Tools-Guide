import { NavLink } from 'react-router-dom';
import { ArrowRight, Diamond, Sparkles, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MEMBERSHIP_PLANS, MEMBERSHIP_EARLY_BIRD_LIMIT } from '@/data/membership';

export default function MembershipCTASection() {
  return (
    <section id="membership" className="py-20 md:py-28 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl border border-border bg-card p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/40 animate-pulse">
              <Clock className="size-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-500">🔥 早鸟特惠 · 限前{MEMBERSHIP_EARLY_BIRD_LIMIT}名 · 抢完立即恢复原价</span>
            </div>

            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-primary" />
              <span className="text-xs font-bold tracking-widest text-primary uppercase">PREMIUM MEMBERSHIP</span>
              <Sparkles className="size-5 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
              每天 5 分钟，掌握 AI 赚钱先机
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI 资讯、赚钱案例、工具评测，每日邮件推送
              <br />
              信息差直接拉满，比别人早一步发现机会
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 md:p-8 transition-all duration-300 ${
                  plan.badge
                    ? 'border-primary/50 bg-gradient-to-b from-primary/5 to-card shadow-lg shadow-primary/10'
                    : 'border-border bg-background/50 hover:border-primary/30'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-teal-400 text-white text-xs font-bold shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div className="text-center mb-5">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {plan.icon && <span className="mr-2">{plan.icon}</span>}
                    {plan.name}
                  </h3>
                  <div className="flex items-end justify-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground line-through">
                      ¥{plan.originalPrice}/月
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-xs font-bold">
                      省 ¥{plan.savings}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg text-primary font-bold">¥</span>
                    <span className="text-4xl md:text-5xl font-black text-primary">
                      {plan.earlyBirdPrice}
                    </span>
                    <span className="text-muted-foreground ml-1">/月</span>
                  </div>
                  <p className="mt-2 text-xs text-orange-500 font-semibold">
                    🔥 早鸟价 · 前{MEMBERSHIP_EARLY_BIRD_LIMIT}名专享
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.slice(0, 3).map((feature) => (
                    <li key={feature.title} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature.title}</span>
                    </li>
                  ))}
                  {plan.id === 'premium' && (
                    <li className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">🎁 免费赠送 AI 定制专属音乐 1 首（价值¥299）</span>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="relative text-center">
            <p className="text-sm text-muted-foreground mb-4">
              原价基础版 ¥299/月 · 定制版 ¥699/月 · 
              <span className="text-orange-500 font-semibold"> 前{MEMBERSHIP_EARLY_BIRD_LIMIT}名早鸟价最高立省¥500</span>
            </p>
            <div className="inline-block">
              <Button asChild size="lg" className="gap-2 text-base px-10 py-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200">
                <NavLink to="/membership">
                  <Diamond className="size-4" />
                  查看全部方案立即订阅
                  <ArrowRight className="size-4" />
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
