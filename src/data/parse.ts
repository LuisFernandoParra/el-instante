import type {
  Article,
  ArticleLayout,
  BodyBlock,
  FillerBlock,
  FillerItem,
  HomeContent,
  OpinionBlock,
  OpinionItem,
  Section,
  Sections,
  Site,
  UiLabels,
} from './types';

type Raw = Record<string, unknown>;

export class ContentError extends Error {
  constructor(context: string, detail: string) {
    super(`Contenido inválido en ${context}: ${detail}`);
    this.name = 'ContentError';
  }
}

export function asRecord(value: unknown, context: string): Raw {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new ContentError(context, 'se esperaba un objeto');
  }
  return value as Raw;
}

export function reqString(raw: Raw, key: string, context: string): string {
  const value = raw[key];
  if (typeof value !== 'string' || value === '') {
    throw new ContentError(context, `"${key}" debe ser un texto no vacío`);
  }
  return value;
}

export function optString(raw: Raw, key: string, context: string): string | undefined {
  const value = raw[key];
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') {
    throw new ContentError(context, `"${key}" debe ser un texto`);
  }
  return value;
}

function reqNumber(raw: Raw, key: string, context: string): number {
  const value = raw[key];
  if (typeof value !== 'number') {
    throw new ContentError(context, `"${key}" debe ser un número`);
  }
  return value;
}

function reqBoolean(raw: Raw, key: string, context: string): boolean {
  const value = raw[key];
  if (typeof value !== 'boolean') {
    throw new ContentError(context, `"${key}" debe ser verdadero o falso`);
  }
  return value;
}

export function reqArray(raw: Raw, key: string, context: string): unknown[] {
  const value = raw[key];
  if (!Array.isArray(value)) {
    throw new ContentError(context, `"${key}" debe ser una lista`);
  }
  return value;
}

export function reqStrings(raw: Raw, key: string, context: string): string[] {
  return reqArray(raw, key, context).map((item, index) => {
    if (typeof item !== 'string' || item === '') {
      throw new ContentError(context, `"${key}[${index}]" debe ser un texto no vacío`);
    }
    return item;
  });
}

export function parseSite(value: unknown): Site {
  const context = 'site.json';
  const raw = asRecord(value, context);
  return {
    name: reqString(raw, 'name', context),
    lang: reqString(raw, 'lang', context),
    description: optString(raw, 'description', context),
    coreWorkUrl: optString(raw, 'coreWorkUrl', context),
    coreWorkFooterText: optString(raw, 'coreWorkFooterText', context),
  };
}

export function parseUi(value: unknown): UiLabels {
  const context = 'ui.json';
  const raw = asRecord(value, context);
  const a11y = asRecord(raw.a11y, `${context} (a11y)`);
  return {
    latestTitle: reqString(raw, 'latestTitle', context),
    moreLabel: reqString(raw, 'moreLabel', context),
    a11y: {
      skipToContent: reqString(a11y, 'skipToContent', context),
      mainNav: reqString(a11y, 'mainNav', context),
      breadcrumb: reqString(a11y, 'breadcrumb', context),
      related: reqString(a11y, 'related', context),
      footerNav: reqString(a11y, 'footerNav', context),
      social: reqString(a11y, 'social', context),
    },
  };
}

function parseSection(value: unknown, context: string): Section {
  const raw = asRecord(value, context);
  return {
    slug: reqString(raw, 'slug', context),
    name: reqString(raw, 'name', context),
    real: reqBoolean(raw, 'real', context),
  };
}

export function parseSections(value: unknown): Sections {
  const context = 'sections.json';
  const raw = asRecord(value, context);
  return {
    primary: reqArray(raw, 'primary', context).map((item) => parseSection(item, context)),
    secondary: reqArray(raw, 'secondary', context).map((item) => parseSection(item, context)),
  };
}

export function parseFiller(value: unknown): FillerItem[] {
  const context = 'filler.json';
  const raw = asRecord(value, context);
  return reqArray(raw, 'items', context).map((item) => {
    const entry = asRecord(item, context);
    return {
      id: reqString(entry, 'id', context),
      title: reqString(entry, 'title', context),
      category: optString(entry, 'category', context),
      image: optString(entry, 'image', context),
    };
  });
}

export function parseOpinion(value: unknown): OpinionItem[] {
  const context = 'opinion.json';
  const raw = asRecord(value, context);
  return reqArray(raw, 'items', context).map((item) => {
    const entry = asRecord(item, context);
    return {
      id: reqString(entry, 'id', context),
      title: reqString(entry, 'title', context),
      author: optString(entry, 'author', context),
    };
  });
}

function parseBodyBlock(value: unknown, context: string): BodyBlock {
  const raw = asRecord(value, context);
  const text = reqString(raw, 'text', context);

  if (raw.type === 'quote') {
    return { type: 'quote', text, attribution: optString(raw, 'attribution', context) };
  }
  if (raw.type !== 'p') {
    throw new ContentError(context, `tipo de bloque desconocido: ${String(raw.type)}`);
  }
  if (raw.link === undefined) return { type: 'p', text };

  const link = asRecord(raw.link, context);
  return {
    type: 'p',
    text,
    link: { slug: reqString(link, 'slug', context), label: reqString(link, 'label', context) },
  };
}

export function parseArticle(value: unknown, context: string): Article {
  const raw = asRecord(value, context);
  const related = asRecord(raw.related, context);
  return {
    slug: reqString(raw, 'slug', context),
    section: reqString(raw, 'section', context),
    headline: reqString(raw, 'headline', context),
    body: reqArray(raw, 'body', context).map((block) => parseBodyBlock(block, context)),
    tags: reqStrings(raw, 'tags', context),
    related: {
      A: reqStrings(related, 'A', context),
      B: reqStrings(related, 'B', context),
    },
    dek: optString(raw, 'dek', context),
    author: optString(raw, 'author', context),
    publishedAt: optString(raw, 'publishedAt', context),
    heroImage: optString(raw, 'heroImage', context),
    heroAlt: optString(raw, 'heroAlt', context),
    heroCaption: optString(raw, 'heroCaption', context),
    heroCredit: optString(raw, 'heroCredit', context),
  };
}

export function parseHome(value: unknown): HomeContent {
  const context = 'home.json';
  const raw = asRecord(value, context);
  const latest = asRecord(raw.latest, context);
  return {
    feature: reqString(raw, 'feature', context),
    latest: {
      real: reqStrings(latest, 'real', context),
      filler: reqStrings(latest, 'filler', context),
    },
    blocks: reqArray(raw, 'blocks', context).map((item): FillerBlock | OpinionBlock => {
      const block = asRecord(item, context);
      const title = reqString(block, 'title', context);
      return block.opinion !== undefined
        ? { title, opinion: reqStrings(block, 'opinion', context) }
        : { title, filler: reqStrings(block, 'filler', context) };
    }),
  };
}

export function parseArticleLayout(value: unknown): ArticleLayout {
  const context = 'article-page-layout.json';
  const raw = asRecord(value, context);
  const relatedA = asRecord(raw.relatedA, context);
  const relatedB = asRecord(raw.relatedB, context);
  const relatedC = asRecord(raw.relatedC, context);
  const moreStories = asRecord(raw.moreStories, context);
  return {
    relatedA: { afterParagraph: reqNumber(relatedA, 'afterParagraph', context) },
    relatedB: { afterParagraph: reqNumber(relatedB, 'afterParagraph', context) },
    relatedC: {
      separator: reqString(relatedC, 'separator', context),
      fillerIds: reqStrings(relatedC, 'fillerIds', context),
    },
    moreStories: {
      title: reqString(moreStories, 'title', context),
      fillerIds: reqStrings(moreStories, 'fillerIds', context),
    },
    tagsTitle: reqString(raw, 'tagsTitle', context),
    breadcrumb: reqStrings(raw, 'breadcrumb', context),
  };
}
