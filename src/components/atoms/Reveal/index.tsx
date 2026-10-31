import type { ReactNode } from 'react';
import { useInViewReveal } from '@/hooks/useInViewReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/** Entrada sutil al hacer scroll. Con prefers-reduced-motion el contenido aparece sin animar. */
export function Reveal({ children, className = '' }: RevealProps) {
  const { ref, isVisible } = useInViewReveal<HTMLDivElement>();
  const state = isVisible ? 'opacity-100' : 'motion-safe:translate-y-2 motion-safe:opacity-0';

  return (
    <div
      ref={ref}
      className={`motion-safe:transition motion-safe:duration-500 ${state} ${className}`}
    >
      {children}
    </div>
  );
}
