import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';
import { getArticle } from '@/data';
import { articleMeta, homeMeta } from '@/data/seo';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export function ArticlePage() {
  const { slug = '' } = useParams();
  const article = getArticle(slug);
  const meta = useMemo(() => (article ? articleMeta(article) : homeMeta()), [article]);
  useDocumentMeta(meta);

  return article ? <ArticleTemplate article={article} /> : <Navigate to="/" replace />;
}
