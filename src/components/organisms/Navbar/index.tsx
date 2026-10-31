import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { NavbarItem } from '@/components/molecules/NavbarItem';
import { sectionPath, sections, ui, type Section } from '@/data';
import { useCurrentSection } from '@/hooks/useCurrentSection';

function renderItem(section: Section, currentSection?: string) {
  return (
    <li key={section.slug} className="shrink-0">
      <NavbarItem
        name={section.name}
        to={sectionPath(section)}
        isCurrent={section.slug === currentSection}
      />
    </li>
  );
}

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const secondaryId = useId();
  const currentSection = useCurrentSection();

  return (
    <nav aria-label={ui.a11y.mainNav} className="border-b border-linea">
      <div className="mx-auto flex max-w-portada items-center gap-4 px-4 lg:justify-center">
        <ul className="scrollbar-none flex min-w-0 gap-4 overflow-x-auto py-2 lg:gap-6">
          {sections.primary.map((section) => renderItem(section, currentSection))}
        </ul>
        <Button
          aria-expanded={isExpanded}
          aria-controls={secondaryId}
          onClick={() => setIsExpanded((value) => !value)}
          className="flex shrink-0 items-center gap-1 border-b-2 border-transparent py-1 text-menu font-medium"
        >
          {ui.moreLabel}
          <Icon
            icon={ChevronDown}
            size={14}
            className={`motion-safe:transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>
      <div id={secondaryId} hidden={!isExpanded} className="border-t border-linea">
        <ul className="mx-auto flex max-w-portada flex-wrap gap-x-4 gap-y-1 px-4 py-2 lg:justify-center lg:gap-x-6">
          {sections.secondary.map((section) => renderItem(section, currentSection))}
        </ul>
      </div>
    </nav>
  );
}
