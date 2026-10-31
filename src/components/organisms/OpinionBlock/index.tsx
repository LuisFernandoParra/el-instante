import { Pending, shouldRender } from '@/components/atoms/Pending';
import { SectionHeading } from '@/components/atoms/SectionHeading';
import type { OpinionItem } from '@/data';

interface OpinionBlockProps {
  title: string;
  items: OpinionItem[];
}

export function OpinionBlock({ title, items }: OpinionBlockProps) {
  return (
    <section>
      <SectionHeading>{title}</SectionHeading>
      <ul className="divide-y divide-linea">
        {items.map((item) => (
          <li key={item.id} className="py-3 first:pt-0">
            {shouldRender(item.author) && (
              <p className="mb-1 text-pie text-tinta-suave">
                {item.author ?? <Pending field="author" />}
              </p>
            )}
            <h3 className="text-tarjeta font-semibold">{item.title}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
