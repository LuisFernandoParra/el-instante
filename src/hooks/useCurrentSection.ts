import { matchPath, useLocation } from 'react-router-dom';
import { getArticle } from '@/data';

export function useCurrentSection(): string | undefined {
  const { pathname } = useLocation();
  const match = matchPath('/nota/:slug', pathname);
  return match?.params.slug ? getArticle(match.params.slug)?.section : undefined;
}
