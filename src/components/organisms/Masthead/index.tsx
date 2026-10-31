import { Logo } from '@/components/atoms/Logo';

interface MastheadProps {
  name: string;
  isHome: boolean;
}

export function Masthead({ name, isHome }: MastheadProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-linea bg-papel py-3 text-center">
      <Logo name={name} isPageHeading={isHome} className="text-3xl lg:text-4xl" />
    </div>
  );
}
