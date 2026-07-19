import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Diamond, Heart, MessageCircle, MessageSquare } from 'lucide-react';
import { prefetchRoute } from '@/lib/prefetch';
import DonateDialog from './DonateDialog';

export default function FloatingActionButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'member' | 'feedback' | 'donate' | null>(null);

  useEffect(() => {
    setMenuOpen(false);
    setDialogType(null);
  }, [location.pathname]);

  useEffect(() => {
    const images = ['/qrcode.png', '/wechat.png', '/wechat-pay.png', '/alipay.png', '/miniprogram.png', '/website-qrcode.png'];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const closeDialog = () => {
    setDialogType(null);
  };

  const openDialog = (type: 'member' | 'feedback' | 'donate') => {
    setMenuOpen(false);
    setDialogType(type);
  };

  const handleHoverMembership = () => {
    prefetchRoute('/membership');
  };

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {menuOpen && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate('/membership');
              }}
              onMouseEnter={handleHoverMembership}
              onTouchStart={handleHoverMembership}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/30 bg-card shadow-lg hover:border-primary hover:bg-primary/5 hover:shadow-xl transition-all text-left group min-h-[44px]"
            >
              <div className="size-9 rounded-lg bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Diamond className="size-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">AI资讯会员</p>
                <p className="text-xs text-primary font-medium">🔥 早鸟特惠 · 限前10名</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => openDialog('feedback')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card shadow-lg hover:border-primary/50 hover:bg-primary/5 hover:shadow-xl transition-all text-left group min-h-[44px]"
            >
              <div className="size-9 rounded-lg bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle className="size-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">意见反馈</p>
                <p className="text-xs text-muted-foreground transition-colors">添加企业微信，一对一沟通</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => openDialog('donate')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card shadow-lg hover:border-primary/50 hover:bg-primary/5 hover:shadow-xl transition-all text-left group min-h-[44px]"
            >
              <div className="size-9 rounded-lg bg-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Heart className="size-4 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">赞赏支持</p>
                <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">为极致体验注入动力 ❤️</p>
              </div>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="size-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          aria-label="快捷菜单"
        >
          {menuOpen ? (
            <X className="size-6" />
          ) : (
            <MessageSquare className="size-6" />
          )}
        </button>
      </div>

      <DonateDialog
        open={dialogType !== null}
        dialogType={dialogType}
        onClose={closeDialog}
        onSwitchType={(type) => setDialogType(type)}
      />
    </>
  );
}
