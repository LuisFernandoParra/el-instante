import { Byline } from '@/components/atoms/Byline';
import { Eyebrow } from '@/components/atoms/Eyebrow';
import { Pending, shouldRender } from '@/components/atoms/Pending';
import type { Article } from '@/data';

interface ArticleHeaderProps {
  article: Article;
  sectionName?: string;
}

export function ArticleHeader({ article, sectionName }: ArticleHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <Eyebrow>{sectionName}</Eyebrow>
      <h1 className="text-titular font-bold lg:text-titular-lg">{article.headline}</h1>
      {shouldRender(article.dek) && (
        <p className="text-entradilla lg:text-entradilla-lg">
          {article.dek ?? <Pending field="dek" />}
        </p>
      )}
      <Byline author={article.author} publishedAt={article.publishedAt} />
    </header>
  );
}
