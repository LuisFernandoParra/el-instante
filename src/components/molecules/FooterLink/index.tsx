import { Link } from 'react-router-dom';

interface FooterLinkProps {
  label: string;
  to?: string;
}

export function FooterLink({ label, to }: FooterLinkProps) {
  return to ? (
    <Link to={to} className="hover:text-acento-fuerte hover:underline">
      {label}
    </Link>
  ) : (
    <span>{label}</span>
  );
}
