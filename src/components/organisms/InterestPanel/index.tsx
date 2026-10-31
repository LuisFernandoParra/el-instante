import { TeaserCard } from '@/components/molecules/TeaserCard';
import type { Teaser } from '@/data';

interface InterestPanelProps {
  title: string;
  teasers: Teaser[];
}

/** "Le puede interesar" de la portada: panel con cabecera tintada y viñetas. */
export function InterestPanel({ title, teasers }: InterestPanelProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-linea">
      <h2 className="bg-acento-tenue px-4 py-2 font-bold text-acento-fuerte">{title}</h2>
      <ul className="flex flex-col gap-4 p-4">
        {teasers.map((teaser) => (
          <li key={teaser.id} className="flex gap-3">
            <span aria-hidden="true" className="mt-1 size-3 shrink-0 rounded-full bg-acento" />
            <TeaserCard teaser={teaser} variant="title" />
          </li>
        ))}
      </ul>
    </section>
  );
}
