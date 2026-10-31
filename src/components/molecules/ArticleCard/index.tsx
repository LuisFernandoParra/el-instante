import { Link } from 'react-router-dom';
import { CardContent, type CardVariant } from '@/components/molecules/CardContent';
import type { Teaser } from '@/data';

interface ArticleCardProps {
  to: string;
  teaser: Teaser;
  variant: CardVariant;
  headingLevel?: 'h3' | 'p';
}

export function ArticleCard({ to, teaser, variant, headingLevel }: ArticleCardProps) {
  return (
    <Link to={to} className="group block">
      <CardContent teaser={teaser} variant={variant} headingLevel={headingLevel} />
    </Link>
  );
}
