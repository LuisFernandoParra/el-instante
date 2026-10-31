import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Pending, shouldRender } from '@/components/atoms/Pending';
import { ResponsiveImage } from '@/components/atoms/ResponsiveImage';
import type { Teaser } from '@/data';

export type CardVariant = 'photo' | 'category' | 'title';

interface CardContentProps {
  teaser: Teaser;
  variant: CardVariant;
  headingLevel?: 'h3' | 'p';
}

/**
 * Interior común de tarjetas reales y de relleno, para que se vean idénticas.
 * El hover solo actúa dentro de un `.group`, y solo la tarjeta real lo tiene.
 */
export function CardContent({ teaser, variant, headingLevel = 'h3' }: CardContentProps) {
  const Title = headingLevel;

  return (
    <>
      {variant === 'photo' && (
        <ResponsiveImage
          src={teaser.image}
          alt={teaser.imageAlt}
          sizes="(min-width: 1024px) 16rem, (min-width: 640px) 33vw, 100vw"
          className="mb-3"
        />
      )}
      {variant !== 'title' && shouldRender(teaser.category) && (
        <div className="mb-1">
          <Eyebrow>{teaser.category ?? <Pending field="category" />}</Eyebrow>
        </div>
      )}
      <Title className="text-tarjeta font-semibold group-hover:text-acento-fuerte group-hover:underline">
        {teaser.title}
      </Title>
    </>
  );
}
