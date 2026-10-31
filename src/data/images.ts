const manifests = import.meta.glob<Record<string, number[]>>(
  '/src/data/generated/imageManifest.json',
  { eager: true, import: 'default' },
);
const manifest = Object.values(manifests)[0] ?? {};

export interface ImageSources {
  fallback: string;
  avif?: string;
  webp?: string;
}

const withBase = (path: string): string => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export function getImageSources(src: string): ImageSources {
  const fileName = src.split('/').pop() ?? src;
  const name = fileName.replace(/\.[^.]+$/, '');
  const widths = manifest[fileName] ?? [];
  const srcSet = (format: string) =>
    widths.map((width) => `${withBase(`images/opt/${name}-${width}.${format}`)} ${width}w`).join();

  return widths.length > 0
    ? { fallback: withBase(src), avif: srcSet('avif'), webp: srcSet('webp') }
    : { fallback: withBase(src) };
}
