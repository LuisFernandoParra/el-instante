// Escribe el <head> de cada página en HTML estático, 404.html de respaldo, sitemap.xml y robots.txt.
// Carga src/data con Vite para reutilizar el loader: un contenido inválido hace fallar el build.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const vite = await createServer({
  root,
  appType: 'custom',
  mode: 'production',
  logLevel: 'error',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const { articles, homeMeta, articleMeta, absoluteUrl, hasSiteUrl, renderHead } =
    await vite.ssrLoadModule('/src/data/seo.ts');

  const template = await readFile(join(dist, 'index.html'), 'utf8');
  const withHead = (meta) =>
    template.replace(/\s*<title>.*?<\/title>/s, '').replace('<!--app-head-->', renderHead(meta));

  const home = withHead(homeMeta());
  await writeFile(join(dist, 'index.html'), home);
  await writeFile(join(dist, '404.html'), home);

  for (const article of articles) {
    const directory = join(dist, 'nota', article.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'index.html'), withHead(articleMeta(article)));
  }

  const robots = ['User-agent: *', 'Allow: /'];

  if (hasSiteUrl()) {
    const urls = [
      { loc: absoluteUrl('/') },
      ...articles.map((article) => ({
        loc: absoluteUrl(`/nota/${article.slug}/`),
        lastmod: article.publishedAt,
      })),
    ];
    const entries = urls.map(({ loc, lastmod }) => {
      const date = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
      return `  <url><loc>${encodeURI(loc)}</loc>${date}</url>`;
    });
    await writeFile(
      join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`,
    );
    robots.push(`Sitemap: ${absoluteUrl('/sitemap.xml')}`);
  } else {
    console.warn(
      'AVISO: falta VITE_SITE_URL. Se omiten sitemap.xml, canonical, og:url y og:image.',
    );
  }

  await writeFile(join(dist, 'robots.txt'), `${robots.join('\n')}\n`);
} finally {
  await vite.close();
}
