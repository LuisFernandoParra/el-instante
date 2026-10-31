import { Reveal } from '@/components/atoms/Reveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { TeaserCard } from '@/components/molecules/TeaserCard';
import type { Teaser } from '@/data';

interface MoreStoriesGridProps {
  title: string;
  teasers: Teaser[];
}

export function MoreStoriesGrid({ title, teasers }: MoreStoriesGridProps) {
  return (
    <Reveal>
      <section>
        <SectionHeading>{title}</SectionHeading>
        <ul className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {teasers.map((teaser) => (
            <li key={teaser.id} className="border-t border-linea py-4">
              <TeaserCard teaser={teaser} variant="title" />
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
