import { SectionHeading } from '@/components/atoms/SectionHeading';
import { TeaserCard } from '@/components/molecules/TeaserCard';
import type { Teaser } from '@/data';

interface LatestListProps {
  title: string;
  teasers: Teaser[];
}

export function LatestList({ title, teasers }: LatestListProps) {
  return (
    <section>
      <SectionHeading>{title}</SectionHeading>
      <ul className="divide-y divide-linea">
        {teasers.map((teaser) => (
          <li key={teaser.id} className="py-3 first:pt-0">
            <TeaserCard teaser={teaser} variant="category" />
          </li>
        ))}
      </ul>
    </section>
  );
}
