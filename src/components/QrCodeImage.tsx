import { useState } from 'react';
import { QrCode, Loader2 } from 'lucide-react';

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
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`${SIZE_MAP[size].container} rounded-xl bg-muted border border-dashed border-border flex flex-col items-center justify-center gap-2 ${className}`}>
        <QrCode className="size-10 text-muted-foreground/50" />
        <p className="text-xs text-muted-foreground text-center px-2">{label || '二维码'}</p>
      </div>
    );
  }

  return (
    <div className={`${SIZE_MAP[size].container} rounded-xl bg-white p-2 shadow-md overflow-hidden relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-2 flex items-center justify-center bg-gray-50 rounded-lg">
          <Loader2 className="size-8 text-primary animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={label || '二维码'}
        width={SIZE_MAP[size].img}
        height={SIZE_MAP[size].img}
        className={`w-full h-full object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
    </div>
  );
}
