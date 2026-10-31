import { useEffect } from 'react';
import type { PageMeta } from '@/data/seo';

export function useDocumentMeta(meta: PageMeta): void {
  useEffect(() => {
    document.title = meta.title;
    document.head.querySelectorAll('[data-head]').forEach((element) => element.remove());

    meta.tags.forEach(({ tag, attrs }) => {
      const element = document.createElement(tag);
      Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
      element.setAttribute('data-head', '');
      document.head.append(element);
    });

    if (meta.jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = meta.jsonLd;
      script.setAttribute('data-head', '');
      document.head.append(script);
    }
  }, [meta]);
}
