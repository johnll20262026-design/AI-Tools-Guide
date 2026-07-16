import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import { prefetchRoute, prefetchOnHover } from '@/lib/prefetch';

type SmartLinkProps = Omit<RouterLinkProps, 'to'> & {
  to: string;
  children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onMouseEnter' | 'onTouchStart' | 'onFocus'>;

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  function SmartLink({ to, onMouseEnter, onTouchStart, onFocus, ...props }, ref) {
    const prefetchHandlers = prefetchOnHover(() => prefetchRoute(to));

    return (
      <RouterLink
        ref={ref}
        to={to}
        {...props}
        onMouseEnter={(e) => {
          prefetchHandlers.onMouseEnter();
          onMouseEnter?.(e);
        }}
        onTouchStart={(e) => {
          prefetchHandlers.onTouchStart();
          onTouchStart?.(e);
        }}
        onFocus={(e) => {
          prefetchHandlers.onFocus();
          onFocus?.(e);
        }}
      />
    );
  }
);

export function useSmartNav(to: string) {
  return prefetchOnHover(() => prefetchRoute(to));
}
