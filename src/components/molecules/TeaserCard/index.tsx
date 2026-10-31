import { ArticleCard } from '@/components/molecules/ArticleCard';
import type { CardVariant } from '@/components/molecules/CardContent';
import { FillerCard } from '@/components/molecules/FillerCard';
import type { Teaser } from '@/data';

interface TeaserCardProps {
  teaser: Teaser;
  variant: CardVariant;
  headingLevel?: 'h3' | 'p';
}

export function TeaserCard({ teaser, variant, headingLevel }: TeaserCardProps) {
  return teaser.to ? (
    <ArticleCard to={teaser.to} teaser={teaser} variant={variant} headingLevel={headingLevel} />
  ) : (
    <FillerCard teaser={teaser} variant={variant} headingLevel={headingLevel} />
  );
}
