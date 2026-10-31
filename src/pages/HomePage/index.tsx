import { HomeTemplate } from '@/components/templates/HomeTemplate';
import { homeMeta } from '@/data/seo';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const meta = homeMeta();

export function HomePage() {
  useDocumentMeta(meta);
  return <HomeTemplate />;
}
