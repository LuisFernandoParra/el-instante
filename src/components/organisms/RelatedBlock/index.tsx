import { RelatedLink } from '@/components/molecules/RelatedLink';
import { TeaserCard } from '@/components/molecules/TeaserCard';
import { ui, type Teaser } from '@/data';

interface RelatedInlineProps {
  teasers: Teaser[];
}

/** Bloques A y B: una o dos notas intercaladas en el cuerpo, solo con el título. */
export function RelatedInline({ teasers }: RelatedInlineProps) {
  return (
    <aside aria-label={ui.a11y.related} className="my-2 border-y border-linea">
      <ul className="divide-y divide-linea">
        {teasers.map((teaser) => (
          <li key={teaser.id}>
            <RelatedLink teaser={teaser} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

interface RelatedListProps {
  separator: string;
  teasers: Teaser[];
}

/** Bloque C: lista con categoría y título tras el separador. */
export function RelatedList({ separator, teasers }: RelatedListProps) {
  return (
    <aside aria-label={ui.a11y.related} className="mt-8">
      <p aria-hidden="true" className="mb-8 text-center font-bold tracking-widest">
        {separator}
      </p>
      <ul className="flex flex-col gap-4">
        {teasers.map((teaser) => (
          <li key={teaser.id}>
            <TeaserCard teaser={teaser} variant="category" headingLevel="p" />
          </li>
        ))}
      </ul>
    </aside>
  );
}
