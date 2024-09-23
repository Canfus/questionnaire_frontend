import { useRef, useState, useEffect, useCallback } from 'react';

import type { UseScrollWindowFunction } from './useScrollWindow.interface';

export const useScrollWindow: UseScrollWindowFunction = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { offset } = props || {};

  const checkScrollTop = useCallback((): boolean => {
    if (offset) {
      return window.scrollY > offset;
    }

    return window.scrollY > 0;
  }, [offset]);

  const [isTop, setIsTop] = useState<boolean>(checkScrollTop());

  useEffect(() => {
    const onPageScroll = (): void => setIsTop(checkScrollTop());

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onPageScroll);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', onPageScroll);
      }
    };
  }, [checkScrollTop]);

  useEffect(() => {
    const button = buttonRef.current;
    const onTopClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    if (typeof window !== 'undefined' && button) {
      button.addEventListener('click', onTopClick);
    }

    return () => {
      if (typeof window !== 'undefined' && button) {
        button.removeEventListener('click', onTopClick);
      }
    };
  }, []);

  return [isTop, buttonRef];
};
