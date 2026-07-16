import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, MessageCircle, X, Diamond, QrCode, ArrowRight, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import QrCodeImage from './QrCodeImage';

type DialogType = 'member' | 'feedback' | 'donate' | null;

export default function FloatingActionButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  useEffect(() => {
    setMenuOpen(false);
    setDialogType(null);
  }, [location.pathname]);

  const closeDialog = () => {
    setDialogType(null);
  };

  const openDialog = (type: DialogType) => {
    setMenuOpen(false);
    setDialogType(type);
  };

  const dialogConfig: Record<Exclude<DialogType, null>, {
    title: string;
    desc: string;
    keyword: string;
    tip: string;
    qrLabel: string;
    qrSrc?: string;
  }> = {
    member: {
      title: 'AI 资讯会员咨询',
      desc: '扫码关注公众号，咨询会员详情、获取教程更新',
      keyword: '会员',
      tip: '关注后发送「会员」即可咨询，24小时内回复',
      qrLabel: '公众号二维码',
    },
    feedback: {
      title: '意见反馈',
      desc: '添加企业微信，直接发送你的建议或问题',
      keyword: '反馈',
      tip: '一对一沟通，我们会认真对待每一条建议',
      qrLabel: '企业微信二维码',
      qrSrc: '/wechat.png',
    },
    donate: {
      title: '赞赏支持',
      desc: '如果教程对你有帮助，欢迎请作者喝杯咖啡 ☕',
      keyword: '',
      tip: '感谢你的支持，这是我持续更新的动力！',
      qrLabel: '赞赏收款码',
    },
  };

  const currentDialog = dialogType ? dialogConfig[dialogType] : null;

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] animate-in fade-in duration-200"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {menuOpen && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate('/membership');
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/30 bg-card shadow-lg hover:border-primary hover:bg-primary/5 hover:shadow-xl transition-all text-left group"
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card shadow-lg hover:border-primary/50 hover:bg-primary/5 hover:shadow-xl transition-all text-left group"
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card shadow-lg hover:border-primary/50 hover:bg-primary/5 hover:shadow-xl transition-all text-left group"
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

        <motion.div
          animate={{ scale: menuOpen ? 1 : [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
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
        </motion.div>
      </div>

      <Dialog open={dialogType !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className={cn(
          dialogType === 'donate' ? 'sm:max-w-lg' : 'sm:max-w-md',
          'max-h-[90vh] overflow-y-auto p-4 sm:p-6'
        )}>
          {currentDialog && dialogType !== 'donate' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  <QrCode className="size-5 text-primary" />
                  {currentDialog.title}
                </DialogTitle>
                <DialogDescription>
                  {currentDialog.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="py-6 flex flex-col items-center">
                <div className="mb-4">
                  <QrCodeImage
                    size="xl"
                    label={currentDialog.qrLabel}
                    src={currentDialog.qrSrc || '/qrcode.png'}
                  />
                </div>
                <div className="text-center space-y-2">
                  {currentDialog.keyword && (
                    <>
                      <p className="text-sm text-foreground font-medium">
                        {dialogType === 'member' ? '扫码关注公众号，发送：' : '扫码添加企业微信时，备注：'}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                        <span className="text-primary font-bold">
                          「{currentDialog.keyword}」
                        </span>
                      </div>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground mt-3">
                    {currentDialog.tip}
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" onClick={closeDialog} className="gap-2">
                    我知道了
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {currentDialog && dialogType === 'donate' && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  <Heart className="size-5 text-primary fill-primary" />
                  {currentDialog.title}
                </DialogTitle>
                <DialogDescription>
                  {currentDialog.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-muted-foreground text-center mb-5">
                  {currentDialog.tip}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div className="rounded-xl bg-card border border-border p-4 text-center hover:border-green-500/30 transition-colors">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 mb-2">
                      <svg className="size-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">微信支付</h3>
                    <p className="text-xs text-muted-foreground mb-3">微信扫一扫</p>
                    <div className="flex justify-center">
                      <QrCodeImage size="sm" label="微信收款码" src="/wechat-pay.png" className="!w-28 !h-28" />
                    </div>
                  </div>

                  <div className="rounded-xl bg-card border border-border p-4 text-center hover:border-blue-500/30 transition-colors">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 mb-2">
                      <span className="text-lg font-bold text-blue-500" style={{ fontFamily: 'serif' }}>支</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">支付宝</h3>
                    <p className="text-xs text-muted-foreground mb-3">支付宝扫一扫</p>
                    <div className="flex justify-center">
                      <QrCodeImage size="sm" label="支付宝收款码" src="/alipay.png" className="!w-28 !h-28" />
                    </div>
                  </div>
                </div>

                <div className="text-center px-3 py-2 rounded-lg bg-muted/30 mb-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    * 您的支持将用于服务器运维、内容创作，确保优质教程持续更新。
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      closeDialog();
                      setTimeout(() => openDialog('feedback'), 100);
                    }}
                    className="gap-2 w-full"
                  >
                    <MessageCircle className="size-4" />
                    意见反馈
                  </Button>
                  <Button variant="outline" onClick={closeDialog} className="gap-2 w-full">
                    我知道了
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
