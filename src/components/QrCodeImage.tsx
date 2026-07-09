import { useState } from 'react';
import { QrCode } from 'lucide-react';

interface QrCodeImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
  src?: string;
}

const SIZE_MAP = {
  sm: 'w-28 h-28',
  md: 'w-36 h-36',
  lg: 'w-44 h-44',
  xl: 'w-52 h-52',
};

export default function QrCodeImage({
  size = 'lg',
  className = '',
  label,
  src = '/qrcode.png',
}: QrCodeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`${SIZE_MAP[size]} rounded-xl bg-muted/40 border border-dashed border-border flex flex-col items-center justify-center gap-2 ${className}`}>
        <QrCode className="size-10 text-muted-foreground/40" />
        <p className="text-xs text-muted-foreground text-center px-2">{label || '二维码'}</p>
      </div>
    );
  }

  return (
    <div className={`${SIZE_MAP[size]} rounded-xl bg-white p-2 shadow-md overflow-hidden ${className}`}>
      <img
        src={src}
        alt={label || '二维码'}
        className="w-full h-full object-contain"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
