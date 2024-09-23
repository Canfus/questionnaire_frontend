import { useEffect, useState, useCallback } from 'react';

import type { UseUserAgentProps } from './useUserAgent.interface';

export const useUserAgent = ({ breakpoint }: UseUserAgentProps): [boolean] => {
  const checkDevice = useCallback(
    (): boolean => window.innerWidth < breakpoint,
    [breakpoint],
  );

  const [isMobile, setIsMobile] = useState<boolean>(checkDevice());

  useEffect(() => {
    const onPageSizeChange = (): void => setIsMobile(checkDevice());

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onPageSizeChange);
      window.addEventListener('orientationchange', onPageSizeChange);
      window.addEventListener('load', onPageSizeChange);
      window.addEventListener('reload', onPageSizeChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onPageSizeChange);
        window.removeEventListener('orientationchange', onPageSizeChange);
        window.removeEventListener('load', onPageSizeChange);
        window.removeEventListener('reload', onPageSizeChange);
      }
    };
  }, [checkDevice]);

  return [isMobile];
};
