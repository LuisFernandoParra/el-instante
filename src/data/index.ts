import footerJson from '@content/footer.json';
import articleLayoutJson from '@content/article-page-layout.json';
import fillerJson from '@content/filler.json';
import homeJson from '@content/home.json';
import opinionJson from '@content/opinion.json';
import sectionsJson from '@content/sections.json';
import siteJson from '@content/site.json';
import uiJson from '@content/ui.json';
import {
  asRecord,
  ContentError,
  optString,
  parseArticle,
  parseArticleLayout,
  parseFiller,
  parseHome,
  parseOpinion,
  parseSections,
  parseSite,
  parseUi,
  reqArray,
  reqString,
  reqStrings,
} from './parse';
import type { Article, Footer, FooterColumn, OpinionItem, Section, Teaser } from './types';

export * from './types';

const articleFiles = import.meta.glob<unknown>('/content/articles/*.json', {
  eager: true,
  import: 'default',
});

export const site = parseSite(siteJson);
export const ui = parseUi(uiJson);
export const sections = parseSections(sectionsJson);
export const home = parseHome(homeJson);
export const articleLayout = parseArticleLayout(articleLayoutJson);

const fillerItems = parseFiller(fillerJson);
const opinionItems = parseOpinion(opinionJson);

export const articles: Article[] = Object.entries(articleFiles)
  .map(([path, value]) => {
    const fileName = path.split('/').pop() ?? path;
    const article = parseArticle(value, fileName);
    if (`${article.slug}.json` !== fileName) {
      throw new ContentError(fileName, `el slug "${article.slug}" no coincide con el archivo`);
    }
    return article;
  })
  .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''));

const allSections = [...sections.primary, ...sections.secondary];

export const articlePath = (slug: string): string => `/nota/${slug}`;

export const getArticle = (slug: string): Article | undefined =>
  articles.find((article) => article.slug === slug);

export const sectionOf = (article: Article): Section | undefined =>
  allSections.find((section) => section.slug === article.section);

/** Una sección real no tiene portada propia: enlaza a su nota más reciente. */
export function sectionPath(section: Section): string | undefined {
  if (!section.real) return undefined;
  const article = articles.find((candidate) => candidate.section === section.slug);
  return article && articlePath(article.slug);
}

const isFillerId = (id: string): boolean => /^f\d+$/.test(id);

function articleToTeaser(article: Article): Teaser {
  const section = sectionOf(article);
  return {
    id: article.slug,
    title: article.headline,
    to: articlePath(article.slug),
    category: section?.name,
    image: article.heroImage,
    imageAlt: article.heroAlt,
  };
}

/** Resuelve un id de contenido: `f01` es relleno; cualquier otro es el slug de una nota. */
export function getTeaser(id: string): Teaser {
  if (isFillerId(id)) {
    const filler = fillerItems.find((item) => item.id === id);
    if (!filler) throw new ContentError('filler.json', `no existe el id "${id}"`);
    return filler;
  }
  const article = getArticle(id);
  if (!article) throw new ContentError('content/articles', `no existe la nota "${id}"`);
  return articleToTeaser(article);
}

export function getOpinion(id: string): OpinionItem {
  const item = opinionItems.find((opinion) => opinion.id === id);
  if (!item) throw new ContentError('opinion.json', `no existe el id "${id}"`);
  return item;
}

function parseFooterColumn(value: unknown): FooterColumn {
  const context = 'footer.json (columns)';
  const raw = asRecord(value, context);
  return {
    title: reqString(raw, 'title', context),
    hours: optString(raw, 'hours', context),
    badges: (Array.isArray(raw.badges) ? raw.badges : []).map((badge) =>
      reqString(asRecord(badge, context), 'label', context),
    ),
    links: reqArray(raw, 'links', context).map((item) => {
      const link = asRecord(item, context);
      const label = reqString(link, 'label', context);
      if (link.href === null) return { label };
      if (link.href !== 'section') {
        throw new ContentError(context, `"href" de "${label}" debe ser "section" o null`);
      }
      const section = allSections.find((candidate) => candidate.name === label);
      return { label, to: section && sectionPath(section) };
    }),
  };
}

function parseFooter(value: unknown): Footer {
  const context = 'footer.json';
  const raw = asRecord(value, context);
  return {
    columns: reqArray(raw, 'columns', context).map(parseFooterColumn),
    social: reqStrings(raw, 'social', context),
    privacyLabel: optString(asRecord(raw.privacyLink, context), 'label', context),
  };
}

export const footer = parseFooter(footerJson);

// Falla al cargar si alguna referencia cruzada apunta a contenido que no existe.
function assertReferences(): void {
  getTeaser(home.feature);
  [...home.latest.real, ...home.latest.filler].forEach(getTeaser);
  home.blocks.forEach((block) => {
    if ('filler' in block) block.filler.forEach(getTeaser);
    else block.opinion.forEach(getOpinion);
  });
  [...articleLayout.relatedC.fillerIds, ...articleLayout.moreStories.fillerIds].forEach(getTeaser);
  articles.forEach((article) => {
    if (!sectionOf(article)) {
      throw new ContentError(article.slug, `no existe la sección "${article.section}"`);
    }
    [...article.related.A, ...article.related.B].forEach(getTeaser);
    article.body.forEach((block) => {
      if (block.type === 'p' && block.link) getTeaser(block.link.slug);
    });
  });
}

assertReferences();
