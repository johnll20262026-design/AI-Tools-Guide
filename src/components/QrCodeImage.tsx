import { QrCode } from 'lucide-react';

interface QrCodeImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
  src?: string;
}

const SIZE_MAP = {
  sm: { container: 'w-28 h-28', img: 112 },
  md: { container: 'w-36 h-36', img: 144 },
  lg: { container: 'w-44 h-44', img: 176 },
  xl: { container: 'w-52 h-52', img: 208 },
};

export default function QrCodeImage({
  size = 'lg',
  className = '',
  label,
  src = '/qrcode.png',
}: QrCodeImageProps) {
  return (
    <div className={`${SIZE_MAP[size].container} rounded-xl bg-white p-2 shadow-md overflow-hidden relative ${className}`}>
      <img
        src={src}
        alt={label || '二维码'}
        width={SIZE_MAP[size].img}
        height={SIZE_MAP[size].img}
        className="w-full h-full object-contain"
        loading="eager"
        decoding="async"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div 
        className="absolute inset-2 rounded-lg bg-muted flex-col items-center justify-center gap-2"
        style={{ display: 'none' }}
      >
        <QrCode className="size-10 text-muted-foreground/50" />
        <p className="text-xs text-muted-foreground text-center px-2">{label || '二维码'}</p>
      </div>
    </div>
  );
}
