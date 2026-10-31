import { articles, getArticle, home, sectionOf, site, type Article } from './index';

export { articles };

export interface HeadTag {
  tag: 'meta' | 'link';
  attrs: Record<string, string>;
}

export interface PageMeta {
  title: string;
  tags: HeadTag[];
  jsonLd?: string;
}

const siteUrl = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, '');

export const hasSiteUrl = (): boolean => siteUrl !== '';

export const absoluteUrl = (path: string): string =>
  `${siteUrl}${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function metaTag(key: 'name' | 'property', id: string, content?: string): HeadTag[] {
  return content ? [{ tag: 'meta', attrs: { [key]: id, content } }] : [];
}

interface SharedTagsInput {
  title: string;
  type: 'website' | 'article';
  path: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

function sharedTags({ title, type, path, description, image, imageAlt }: SharedTagsInput) {
  const url = hasSiteUrl() ? absoluteUrl(path) : undefined;
  const imageUrl = hasSiteUrl() && image ? absoluteUrl(image) : undefined;
  const canonical: HeadTag[] = url ? [{ tag: 'link', attrs: { rel: 'canonical', href: url } }] : [];

  return [
    ...canonical,
    ...metaTag('name', 'description', description),
    ...metaTag('property', 'og:site_name', site.name),
    ...metaTag('property', 'og:type', type),
    ...metaTag('property', 'og:title', title),
    ...metaTag('property', 'og:description', description),
    ...metaTag('property', 'og:url', url),
    ...metaTag('property', 'og:image', imageUrl),
    ...metaTag('property', 'og:image:alt', imageUrl && imageAlt),
    ...metaTag('name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary'),
    ...metaTag('name', 'twitter:title', title),
    ...metaTag('name', 'twitter:description', description),
    ...metaTag('name', 'twitter:image', imageUrl),
    ...metaTag('name', 'twitter:image:alt', imageUrl && imageAlt),
  ];
}

export function homeMeta(): PageMeta {
  const feature = getArticle(home.feature);
  return {
    title: site.name,
    tags: sharedTags({
      title: site.name,
      type: 'website',
      path: '/',
      description: site.description,
      image: feature?.heroImage,
      imageAlt: feature?.heroAlt,
    }),
  };
}

function articleJsonLd(article: Article): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.dek,
    datePublished: article.publishedAt,
    inLanguage: site.lang,
    articleSection: sectionOf(article)?.name,
    author: article.author && { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: site.name },
    image: hasSiteUrl() && article.heroImage ? [absoluteUrl(article.heroImage)] : undefined,
    mainEntityOfPage: hasSiteUrl() ? absoluteUrl(`/nota/${article.slug}/`) : undefined,
  });
}

export function articleMeta(article: Article): PageMeta {
  const title = `${article.headline} | ${site.name}`;
  return {
    title,
    jsonLd: articleJsonLd(article),
    tags: [
      ...sharedTags({
        title,
        type: 'article',
        path: `/nota/${article.slug}/`,
        description: article.dek,
        image: article.heroImage,
        imageAlt: article.heroAlt,
      }),
      ...metaTag('property', 'article:published_time', article.publishedAt),
    ],
  };
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** HTML del <head> para las páginas estáticas que escribe scripts/postbuild.mjs. */
export function renderHead(meta: PageMeta): string {
  const tags = meta.tags.map(({ tag, attrs }) => {
    const rendered = Object.entries(attrs).map(([key, value]) => `${key}="${escapeHtml(value)}"`);
    return `<${tag} ${rendered.join(' ')} data-head />`;
  });
  const jsonLd = meta.jsonLd
    ? [
        `<script type="application/ld+json" data-head>${meta.jsonLd.replace(/</g, '\\u003c')}</script>`,
      ]
    : [];
  return [`<title>${escapeHtml(meta.title)}</title>`, ...tags, ...jsonLd].join('\n    ');
}
