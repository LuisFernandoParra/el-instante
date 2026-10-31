import { Tag } from '@/components/atoms/Tag';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { CaptionedImage } from '@/components/molecules/CaptionedImage';
import { ArticleBody } from '@/components/organisms/ArticleBody';
import { ArticleHeader } from '@/components/organisms/ArticleHeader';
import { MoreStoriesGrid } from '@/components/organisms/MoreStoriesGrid';
import { RelatedInline, RelatedList } from '@/components/organisms/RelatedBlock';
import { articleLayout, getTeaser, sectionOf, ui, type Article } from '@/data';

interface ArticleTemplateProps {
  article: Article;
}

export function ArticleTemplate({ article }: ArticleTemplateProps) {
  const sectionName = sectionOf(article)?.name;
  const { relatedA, relatedB, relatedC, moreStories, tagsTitle, breadcrumb } = articleLayout;

  return (
    <article className="mx-auto flex max-w-nota flex-col gap-6 px-4 py-6 lg:py-8">
      <Breadcrumb
        label={ui.a11y.breadcrumb}
        homeLabel={breadcrumb[0] ?? ''}
        current={sectionName}
      />
      <ArticleHeader article={article} sectionName={sectionName} />
      <CaptionedImage
        src={article.heroImage}
        alt={article.heroAlt}
        caption={article.heroCaption}
        credit={article.heroCredit}
      />

      <div className="mx-auto w-full max-w-lectura">
        <ArticleBody
          blocks={article.body}
          inserts={{
            [relatedA.afterParagraph]: <RelatedInline teasers={article.related.A.map(getTeaser)} />,
            [relatedB.afterParagraph]: <RelatedInline teasers={article.related.B.map(getTeaser)} />,
          }}
        />
        <RelatedList separator={relatedC.separator} teasers={relatedC.fillerIds.map(getTeaser)} />
      </div>

      <div className="mt-8">
        <MoreStoriesGrid title={moreStories.title} teasers={moreStories.fillerIds.map(getTeaser)} />
      </div>

      {article.tags.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-medium uppercase">{tagsTitle}</h2>
          <ul className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag}>
                <Tag label={tag} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
