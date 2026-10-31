import { Logo } from '@/components/atoms/Logo';
import { FooterLink } from '@/components/molecules/FooterLink';
import { SocialIcons } from '@/components/molecules/SocialIcons';
import { footer, site, ui, type FooterColumn } from '@/data';

function Column({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h2 className="mb-3 border-b border-linea pb-2 text-menu font-bold">{column.title}</h2>
      {column.hours && <p className="mb-3 text-menu text-tinta-suave">{column.hours}</p>}
      <ul className="columns-2 gap-4 text-menu [&>li]:mb-3">
        {column.links.map((link) => (
          <li key={link.label} className="break-inside-avoid">
            <FooterLink label={link.label} to={link.to} />
          </li>
        ))}
      </ul>
      {column.badges.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-3">
          {column.badges.map((badge) => (
            <li key={badge} className="rounded border border-tinta-suave px-3 py-2 text-pie">
              {badge}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer aria-label={ui.a11y.footerNav} className="mt-16 border-t border-linea">
      <div className="mx-auto max-w-portada px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-[auto_1fr_1fr_1fr]">
          <div className="md:col-span-3 lg:col-span-1">
            <Logo name={site.name} className="text-3xl" />
          </div>
          {footer.columns.map((column) => (
            <Column key={column.title} column={column} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-linea pt-6 sm:flex-row sm:items-center sm:justify-between">
          <SocialIcons names={footer.social} label={ui.a11y.social} />
          {footer.privacyLabel && <span className="text-pie underline">{footer.privacyLabel}</span>}
        </div>
      </div>
    </footer>
  );
}
