// Los campos opcionales son los que pueden faltar en content/: se muestran como [PENDIENTE]
// en desarrollo y se omiten en producción. Los obligatorios hacen fallar el loader.

export interface Site {
  name: string;
  lang: string;
  description?: string;
  coreWorkUrl?: string;
  coreWorkFooterText?: string;
}

export interface UiLabels {
  latestTitle: string;
  moreLabel: string;
  a11y: {
    skipToContent: string;
    mainNav: string;
    breadcrumb: string;
    related: string;
    footerNav: string;
    social: string;
  };
}

export interface Section {
  slug: string;
  name: string;
  real: boolean;
}

export interface Sections {
  primary: Section[];
  secondary: Section[];
}

export interface FillerItem {
  id: string;
  title: string;
  category?: string;
  image?: string;
}

export interface OpinionItem {
  id: string;
  title: string;
  author?: string;
}

export interface BodyLink {
  slug: string;
  label: string;
}

export interface ParagraphBlock {
  type: 'p';
  text: string;
  link?: BodyLink;
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
  attribution?: string;
}

export type BodyBlock = ParagraphBlock | QuoteBlock;

export interface Article {
  slug: string;
  section: string;
  headline: string;
  body: BodyBlock[];
  tags: string[];
  related: { A: string[]; B: string[] };
  dek?: string;
  author?: string;
  publishedAt?: string;
  heroImage?: string;
  heroAlt?: string;
  heroCaption?: string;
  heroCredit?: string;
}

export interface FillerBlock {
  title: string;
  filler: string[];
}

export interface OpinionBlock {
  title: string;
  opinion: string[];
}

export interface HomeContent {
  feature: string;
  latest: { real: string[]; filler: string[] };
  blocks: (FillerBlock | OpinionBlock)[];
}

export interface ArticleLayout {
  relatedA: { afterParagraph: number };
  relatedB: { afterParagraph: number };
  relatedC: { separator: string; fillerIds: string[] };
  moreStories: { title: string; fillerIds: string[] };
  tagsTitle: string;
  breadcrumb: string[];
}

export interface FooterLink {
  label: string;
  to?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
  badges: string[];
  hours?: string;
}

export interface Footer {
  columns: FooterColumn[];
  social: string[];
  privacyLabel?: string;
}

/** Elemento listable. Sin `to` es relleno: se pinta igual, pero nunca como enlace. */
export interface Teaser {
  id: string;
  title: string;
  to?: string;
  category?: string;
  image?: string;
  imageAlt?: string;
}
