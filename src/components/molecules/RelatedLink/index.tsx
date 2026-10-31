import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/atoms/Icon';
import type { Teaser } from '@/data';

interface RelatedLinkProps {
  teaser: Teaser;
}

const rowClass = 'flex items-center justify-between gap-4 py-4';

export function RelatedLink({ teaser }: RelatedLinkProps) {
  const content = (
    <>
      <span className="text-tarjeta font-semibold group-hover:text-acento-fuerte group-hover:underline">
        {teaser.title}
      </span>
      <Icon icon={ArrowRight} size={20} className="shrink-0" />
    </>
  );

  return teaser.to ? (
    <Link to={teaser.to} className={`group ${rowClass}`}>
      {content}
    </Link>
  ) : (
    <div className={rowClass}>{content}</div>
  );
}
