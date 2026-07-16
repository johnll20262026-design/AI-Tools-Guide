import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Diamond, Smartphone } from 'lucide-react';
import QrCodeImage from './QrCodeImage';
import { WechatIcon } from './icons';
import { prefetchRoute, prefetchOnHover } from '@/lib/prefetch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const FOOTER_LINKS = [
  { label: '教程分类', anchorId: 'categories' },
  { label: '学习路径', anchorId: 'paths' },
  { label: '实战案例', anchorId: 'cases' },
  { label: '数据统计', anchorId: 'stats' },
];

const LEGAL_LINKS = [
  { label: '关于我们', to: '/about' },
  { label: '隐私政策', to: '/privacy' },
];

function WechatFollowPill({ onOpenQr }: { onOpenQr: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenQr}
      className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer"
    >
      <WechatIcon className="size-4 text-primary" />
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
        微信搜一搜
        <span className="text-foreground font-semibold ml-1.5 group-hover:text-primary transition-colors">AI造物指南</span>
      </span>
      <span className="w-px h-3.5 bg-border"></span>
      <span className="text-[11px] text-primary/80 group-hover:text-primary transition-colors">点击扫码关注</span>
    </button>
  );
}

function MiniProgramPill({ onOpenQr }: { onOpenQr: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpenQr}
      className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all cursor-pointer"
    >
      <Smartphone className="size-4 text-primary" />
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
        微信小程序
        <span className="text-foreground font-semibold ml-1.5 group-hover:text-primary transition-colors">口袋调音器</span>
      </span>
      <span className="w-px h-3.5 bg-border"></span>
      <span className="text-[11px] text-primary/80 group-hover:text-primary transition-colors">扫码体验</span>
    </button>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';
  const [qrOpen, setQrOpen] = useState(false);
  const [qrType, setQrType] = useState<'wechat' | 'miniprogram'>('wechat');

  const openQr = (type: 'wechat' | 'miniprogram') => {
    setQrType(type);
    setQrOpen(true);
  };

  const scrollToAnchor = (anchorId: string) => {
    if (isHome) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { state: { scrollTo: anchorId } });
    }
  };

  const isWechat = qrType === 'wechat';

  return (
    <footer className="w-full border-t border-border bg-muted/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <WechatFollowPill onOpenQr={() => openQr('wechat')} />
          <MiniProgramPill onOpenQr={() => openQr('miniprogram')} />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <NavLink
            to="/membership"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary to-teal-500 text-white hover:from-primary/90 hover:to-teal-500/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 hover:scale-105"
            {...prefetchOnHover(() => prefetchRoute('/membership'))}
          >
            <Diamond className="size-3.5" />
            AI资讯会员
          </NavLink>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.anchorId}
                type="button"
                onClick={() => scrollToAnchor(link.anchorId)}
                data-route-link={isHome ? undefined : ''}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer min-h-[44px] px-2 py-2 flex items-center"
              >
                {link.label}
              </button>
            ))}
            {LEGAL_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[44px] px-2 py-2 flex items-center"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI造物指南
          </p>
        </div>
      </div>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-sm p-6">
          <DialogHeader className="text-center">
            <div className="mx-auto flex items-center justify-center gap-2 mb-2">
              {isWechat ? (
                <WechatIcon className="size-5 text-primary" />
              ) : (
                <Smartphone className="size-5 text-primary" />
              )}
              <DialogTitle className="text-lg font-bold text-foreground">
                {isWechat ? '微信扫码关注' : '扫码体验小程序'}
              </DialogTitle>
            </div>
            <DialogDescription className="text-sm text-muted-foreground">
              {isWechat ? (
                <>微信扫一扫，关注「<span className="text-primary font-semibold">AI造物指南</span>」公众号</>
              ) : (
                <>微信扫一扫，使用「<span className="text-primary font-semibold">口袋调音器</span>」小程序</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3">
            <QrCodeImage
              size="xl"
              label={isWechat ? '公众号二维码' : '小程序二维码'}
              src={isWechat ? '/qrcode.png' : '/miniprogram.png'}
            />
            <p className="text-xs text-muted-foreground text-center">
              {isWechat ? (
                <>获取最新AI教程、实战案例<br />会员专属内容、工具更新通知</>
              ) : (
                <>✅ 完全免费 · 无内购<br />随时随地调音练琴，内置调音器和节拍器</>
              )}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
