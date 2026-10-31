import { CardContent, type CardVariant } from '@/components/molecules/CardContent';
import type { Teaser } from '@/data';

interface FillerCardProps {
  teaser: Teaser;
  variant: CardVariant;
  headingLevel?: 'h3' | 'p';
}

/** Imita una nota que no existe: sin enlace, sin foco y sin hover. */
export function FillerCard({ teaser, variant, headingLevel }: FillerCardProps) {
  return (
    <div>
      <CardContent teaser={teaser} variant={variant} headingLevel={headingLevel} />
    </div>
  );
}
