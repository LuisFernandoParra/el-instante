import { Link } from 'react-router-dom';

interface LogoProps {
  name: string;
  isPageHeading?: boolean;
  className?: string;
}

/** Es el h1 solo en la portada; en las notas ese papel lo tiene el titular. */
export function Logo({ name, isPageHeading = false, className = '' }: LogoProps) {
  const link = (
    <Link to="/" className={`font-logo font-bold tracking-tight text-acento ${className}`}>
      {name}
    </Link>
  );
  return isPageHeading ? <h1>{link}</h1> : link;
}
