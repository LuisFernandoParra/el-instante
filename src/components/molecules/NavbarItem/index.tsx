import { Link } from 'react-router-dom';

interface NavbarItemProps {
  name: string;
  to?: string;
  isCurrent?: boolean;
}

const baseClass = 'inline-block whitespace-nowrap border-b-2 py-1 text-menu font-medium';

/** Las secciones de relleno se ven igual, pero sin enlace, foco ni hover. */
export function NavbarItem({ name, to, isCurrent = false }: NavbarItemProps) {
  if (!to) return <span className={`${baseClass} border-transparent`}>{name}</span>;

  return (
    <Link
      to={to}
      aria-current={isCurrent ? 'true' : undefined}
      className={`${baseClass} hover:border-acento ${isCurrent ? 'border-acento' : 'border-transparent'}`}
    >
      {name}
    </Link>
  );
}
