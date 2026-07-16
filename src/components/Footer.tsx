import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Diamond, X, Smartphone } from 'lucide-react';
import QrCodeImage from './QrCodeImage';

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
      <svg className="size-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
      </svg>
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

function QrModal({
  open,
  onClose,
  type,
}: {
  open: boolean;
  onClose: () => void;
  type: 'wechat' | 'miniprogram';
}) {
  if (!open) return null;

  const isWechat = type === 'wechat';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-card rounded-2xl border border-border shadow-2xl p-6 max-w-sm w-full animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 size-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="关闭"
        >
          <X className="size-4" />
        </button>
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex items-center gap-2">
            {isWechat ? (
              <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              </svg>
            ) : (
              <Smartphone className="size-5 text-primary" />
            )}
            <h3 className="text-lg font-bold text-foreground">
              {isWechat ? '微信扫码关注' : '扫码体验小程序'}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {isWechat ? (
              <>微信扫一扫，关注「<span className="text-primary font-semibold">AI造物指南</span>」公众号</>
            ) : (
              <>微信扫一扫，使用「<span className="text-primary font-semibold">口袋调音器</span>」小程序</>
            )}
          </p>
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
      </div>
    </div>
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
      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} type={qrType} />
    </footer>
  );
}
