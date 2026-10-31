import { Reveal } from '@/components/atoms/Reveal';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import { TeaserCard } from '@/components/molecules/TeaserCard';
import type { Teaser } from '@/data';

interface SectionBlockProps {
  title: string;
  teasers: Teaser[];
}

export function SectionBlock({ title, teasers }: SectionBlockProps) {
  return (
    <Reveal>
      <section>
        <SectionHeading>{title}</SectionHeading>
        <ul className="grid gap-6 sm:grid-cols-3">
          {teasers.map((teaser) => (
            <li key={teaser.id}>
              <TeaserCard teaser={teaser} variant="photo" />
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
