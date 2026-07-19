import { useState, useRef, useEffect, useCallback } from 'react';
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
  const imgRef = useRef<HTMLImageElement>(null);
  const isPriority = size === 'xl';

  const handleLoaded = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setErrored(true);
  }, []);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);

    const checkImg = () => {
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        setLoaded(true);
      }
    };

    checkImg();
    const timer1 = setTimeout(checkImg, 50);
    const timer2 = setTimeout(checkImg, 200);
    const fallbackTimer = setTimeout(() => setLoaded(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(fallbackTimer);
    };
  }, [src]);

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
      <img
        ref={imgRef}
        src={src}
        alt={label || '二维码'}
        width={SIZE_MAP[size].img}
        height={SIZE_MAP[size].img}
        className="w-full h-full object-contain relative z-[1]"
        loading={isPriority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={isPriority ? 'high' : 'auto'}
        onLoad={handleLoaded}
        onError={handleError}
      />
      {!loaded && (
        <div className="absolute inset-2 z-[2] flex items-center justify-center bg-white rounded-lg transition-opacity duration-200">
          <Loader2 className="size-8 text-primary animate-spin" />
        </div>
      )}
    </div>
  );
}
