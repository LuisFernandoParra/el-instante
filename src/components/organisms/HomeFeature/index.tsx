import { Link } from 'react-router-dom';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Pending, shouldRender } from '@/components/atoms/Pending';
import { ResponsiveImage } from '@/components/atoms/ResponsiveImage';
import { articlePath, sectionOf, type Article } from '@/data';

interface HomeFeatureProps {
  article: Article;
}

export function HomeFeature({ article }: HomeFeatureProps) {
  return (
    <section>
      <Link to={articlePath(article.slug)} className="group flex flex-col gap-3">
        <ResponsiveImage
          src={article.heroImage}
          alt={article.heroAlt}
          sizes="(min-width: 1024px) 50rem, 100vw"
          priority
        />
        <Eyebrow>{sectionOf(article)?.name}</Eyebrow>
        <h2 className="text-titular font-bold group-hover:text-acento-fuerte group-hover:underline lg:text-titular-lg">
          {article.headline}
        </h2>
        {shouldRender(article.dek) && (
          <p className="text-entradilla lg:text-entradilla-lg">
            {article.dek ?? <Pending field="dek" />}
          </p>
        )}
      </Link>
    </section>
  );
}
