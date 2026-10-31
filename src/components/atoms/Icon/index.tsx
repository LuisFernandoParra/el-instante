import type { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  /** Sin etiqueta el icono es decorativo y se oculta a los lectores de pantalla. */
  label?: string;
  className?: string;
}

export function Icon({ icon: LucideGlyph, size = 16, label, className }: IconProps) {
  return label ? (
    <LucideGlyph size={size} role="img" aria-label={label} className={className} />
  ) : (
    <LucideGlyph size={size} aria-hidden="true" className={className} />
  );
}
