import type { MouseEvent } from 'react';
import { Pending, shouldRender } from '@/components/atoms/Pending';
import { site } from '@/data';

const PLACEHOLDER_URL = '#';
const url = site.coreWorkUrl ?? PLACEHOLDER_URL;

function ignoreClick(event: MouseEvent) {
  event.preventDefault();
}

/** Barra pegada al borde inferior que termina como último elemento de la página. */
export function CoreWorkFooter() {
  if (!shouldRender(site.coreWorkFooterText)) return null;

  return (
    <div className="sticky bottom-0 z-10 bg-tinta py-2 text-center text-menu text-papel">
      {site.coreWorkFooterText ? (
        <a
          href={url}
          onClick={url === PLACEHOLDER_URL ? ignoreClick : undefined}
          className="underline focus-visible:outline-papel"
        >
          {site.coreWorkFooterText}
        </a>
      ) : (
        <Pending field="coreWorkFooterText" />
      )}
    </div>
  );
}
