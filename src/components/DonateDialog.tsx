import { QrCode, ArrowRight, Heart, MessageCircle } from 'lucide-react';
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
import { WechatIcon, AlipayIcon } from './icons';

type DialogType = 'member' | 'feedback' | 'donate' | null;

interface DonateDialogProps {
  open: boolean;
  dialogType: DialogType;
  onClose: () => void;
  onSwitchType: (type: DialogType) => void;
}

export default function DonateDialog({ open, dialogType, onClose, onSwitchType }: DonateDialogProps) {
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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className={cn(
        dialogType === 'donate' ? 'sm:max-w-lg' : 'sm:max-w-md',
        'max-h-[90vh] overflow-y-auto p-4 sm:p-6'
      )}>
        {currentDialog && dialogType !== 'donate' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2 text-foreground">
                <QrCode className="size-5 text-primary" />
                {currentDialog.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
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
                <Button variant="default" onClick={onClose} className="gap-2 min-h-[44px] px-6">
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
              <DialogTitle className="text-xl flex items-center gap-2 text-foreground">
                <Heart className="size-5 text-primary fill-primary" />
                {currentDialog.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {currentDialog.desc}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground text-center mb-5">
                {currentDialog.tip}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="rounded-xl bg-card border border-border p-4 text-center hover:border-green-500/30 transition-colors">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#07c160] mb-2">
                    <WechatIcon className="size-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">微信支付</h3>
                  <p className="text-xs text-muted-foreground mb-3">微信扫一扫</p>
                  <div className="flex justify-center">
                    <QrCodeImage size="sm" label="微信收款码" src="/wechat-pay.png" className="!w-28 !h-28" />
                  </div>
                </div>

                <div className="rounded-xl bg-card border border-border p-4 text-center hover:border-blue-500/30 transition-colors">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#1677ff] mb-2">
                    <AlipayIcon className="text-lg" />
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
                  variant="secondary"
                  onClick={() => {
                    onClose();
                    setTimeout(() => onSwitchType('feedback'), 100);
                  }}
                  className="gap-2 w-full min-h-[44px]"
                >
                  <MessageCircle className="size-4" />
                  意见反馈
                </Button>
                <Button variant="default" onClick={onClose} className="gap-2 w-full min-h-[44px]">
                  我知道了
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
