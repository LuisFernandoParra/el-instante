import { Pending, shouldRender } from '@/components/atoms/Pending';
import { formatDate } from '@/data/format';

interface BylineProps {
  author?: string;
  publishedAt?: string;
}

export function Byline({ author, publishedAt }: BylineProps) {
  if (!shouldRender(author) && !shouldRender(publishedAt)) return null;

  return (
    <p className="flex flex-wrap items-center gap-x-2 border-l-2 border-acento pl-2 text-pie">
      {author ? <span className="font-semibold">{author}</span> : <Pending field="author" />}
      {publishedAt ? (
        <time dateTime={publishedAt} className="text-tinta-suave">
          {formatDate(publishedAt)}
        </time>
      ) : (
        <Pending field="publishedAt" />
      )}
    </p>
  );
}
