import { useEffect, useRef, useState, type RefObject } from 'react';

export function useInViewReveal<T extends Element>(): {
  ref: RefObject<T>;
  isVisible: boolean;
} {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -5% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
