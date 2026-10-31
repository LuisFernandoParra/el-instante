import { Facebook, Instagram, Music2, Search, X, Youtube, type LucideIcon } from 'lucide-react';
import { Icon } from '@/components/atoms/Icon';

interface SocialIconsProps {
  names: string[];
  label: string;
}

// lucide no incluye TikTok ni Google: Music2 y Search son sus equivalentes más cercanos.
const ICONS: Record<string, LucideIcon> = {
  Facebook,
  X,
  Instagram,
  TikTok: Music2,
  YouTube: Youtube,
  Google: Search,
};

export function SocialIcons({ names, label }: SocialIconsProps) {
  return (
    <ul aria-label={label} className="flex flex-wrap items-center gap-4">
      {names.map((name) => {
        const icon = ICONS[name];
        return icon ? (
          <li key={name}>
            <Icon icon={icon} size={20} label={name} />
          </li>
        ) : null;
      })}
    </ul>
  );
}
