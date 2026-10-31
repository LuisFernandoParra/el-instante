import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/atoms/Icon';

interface BreadcrumbProps {
  label: string;
  homeLabel: string;
  current?: string;
}

export function Breadcrumb({ label, homeLabel, current }: BreadcrumbProps) {
  return (
    <nav aria-label={label}>
      <ol className="flex items-center gap-2 text-menu text-tinta-suave">
        <li>
          <Link to="/" className="hover:text-tinta hover:underline">
            {homeLabel}
          </Link>
        </li>
        {current && (
          <li className="flex items-center gap-2" aria-current="location">
            <Icon icon={ChevronRight} size={14} />
            {current}
          </li>
        )}
      </ol>
    </nav>
  );
}
