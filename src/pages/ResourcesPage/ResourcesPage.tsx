import { ExternalLink, Music, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QrCodeImage from '@/components/QrCodeImage';

interface IResourceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  action: {
    label: string;
    type: 'link' | 'qrcode' | 'embed';
    placeholder?: string;
    qrSrc?: string;
    qrLabel?: string;
  };
}

const RESOURCES: IResourceItem[] = [
  {
    id: 'guitar-tuner-web',
    title: '吉他调音器（网页版）',
    description: '专业精准的吉他标准调音工具，支持自动识别琴弦和手动选弦两种模式，麦克风收音实时识别音高。无需安装任何软件，浏览器打开即用。',
    tags: ['免费', '在线使用', '无需下载'],
    icon: <Music className="size-6 text-primary" />,
    action: {
      label: '立即使用',
      type: 'link',
      placeholder: '/tuner',
    },
  },
  {
    id: 'guitar-tuner-miniapp',
    title: '口袋调音器（微信小程序）',
    description: '手机端更方便，微信扫码直接使用，随时随地调音。支持自动识别琴弦和手动选弦两种模式，内置节拍器功能。✅ 完全免费，无内购，放心使用。',
    tags: ['小程序', '手机端', '完全免费'],
    icon: (
      <svg className="size-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    action: {
      label: '扫码使用',
      type: 'qrcode',
      qrSrc: '/miniprogram.png',
      qrLabel: '小程序二维码',
    },
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO title="免费资源" description="免费AI工具与实用小工具集合，包含在线吉他调音器等实用工具，持续更新中。" />
      <Header />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-12">
        {/* 返回导航 */}
        <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-8 flex-wrap">
          <Button variant="ghost" size="sm" asChild className="h-9 px-3 text-xs md:text-sm">
            <NavLink to="/" className="gap-1.5">
              <Home className="size-4" />
              返回首页
            </NavLink>
          </Button>
        </div>

        {/* 页面标题 */}
        <header className="text-center mb-8 md:mb-12 lg:mb-16 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            免费工具 & 资源中心
          </h1>
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            精选实用 AI 工具和小工具，免费使用
          </p>
        </header>

        {/* 资源卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESOURCES.map((resource) => (
            <Card
              key={resource.id}
              className="group border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    {resource.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg md:text-xl">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm leading-relaxed">
                      {resource.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* 操作区 */}
                {resource.action.type === 'link' && (
                  <Button
                    variant="default"
                    className="w-full gap-2"
                    asChild
                  >
                    <NavLink to={resource.action.placeholder || '#'}>
                      {resource.action.label}
                      <ExternalLink className="size-4" />
                    </NavLink>
                  </Button>
                )}

                {resource.action.type === 'qrcode' && (
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-4 md:p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <QrCodeImage
                        size="md"
                        label={resource.action.qrLabel || '二维码'}
                        src={resource.action.qrSrc || '/miniprogram.png'}
                      />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      微信扫一扫，立即使用
                    </p>
                    <p className="mt-1 text-xs text-primary font-medium">
                      ✅ 完全免费 · 无内购
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground px-2">
                      打开微信扫描上方二维码即可进入小程序
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 更多资源预告 */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-dashed border-border/60 bg-muted/30">
            <span className="text-sm text-muted-foreground">
              更多免费资源即将上线，敬请期待
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
