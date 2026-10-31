# El Instante

Sitio del periódico digital ficticio de "Instantánea". Vite, React 18, TypeScript, React Router y Tailwind CSS.

## Comandos

```bash
npm install
npm run dev      # desarrollo; muestra [PENDIENTE] donde falte un campo
npm run build    # valida tipos y contenido, y genera dist/
npm run preview  # sirve dist/ en local
npm run lint
npm run format
npm run images   # regenera las variantes AVIF/WebP (dev y build ya lo ejecutan)
```

## Estructura

```
content/            Todo el texto del sitio (JSON)
  articles/         Una nota por archivo
public/images/      JPG de origen; opt/ se genera y no se versiona
scripts/
  generate-images.mjs   Variantes responsive y manifiesto
  postbuild.mjs         <head> estático por nota, 404.html, sitemap.xml, robots.txt
src/
  components/
    atoms/ molecules/ organisms/ templates/
  pages/            HomePage, ArticlePage
  hooks/            useInViewReveal, useDocumentMeta, useRouteFocus, useCurrentSection
  data/             Tipos, loader con validación, SEO e imágenes
  styles/           Base de Tailwind (los tokens están en tailwind.config.js)
```

## Agregar una nota

1. Crea `content/articles/<slug>.json`. El nombre del archivo debe coincidir con `slug`. Copia una nota existente como plantilla.
2. Pon la imagen en `public/images/` en JPG, 16:9, y apúntala en `heroImage`.
3. Usa en `section` el `slug` de una sección de `content/sections.json` con `real: true`.
4. Para enlazarla desde otras notas o desde la portada, usa su slug en `related.A`, `related.B` o `content/home.json`. Los ids con forma `f01` son relleno; cualquier otro es el slug de una nota.

La ruta `/nota/<slug>` y su entrada en el sitemap se crean solas. Si una referencia apunta a algo inexistente o falta un campo obligatorio, `npm run build` falla con un mensaje que indica el archivo.

Son obligatorios `slug`, `section`, `headline`, `body`, `tags` y `related`. Los demás campos pueden faltar: en desarrollo se ve `[PENDIENTE]` y en producción se omite el elemento.

## Despliegue en GitHub Pages

```bash
npm run deploy
```

Compila y publica `dist/` en la rama `gh-pages`. La subruta y el dominio están en `.env.production`; cámbialos ahí si cambia el repositorio. Por eso `npm run preview` sirve el sitio en `http://localhost:4173/el-instante/`.

`dist/` es estático. Las rutas usan `BrowserRouter`: cada nota tiene su propio `index.html` con sus metadatos, y `404.html` recoge cualquier otra ruta.

Sin `VITE_SITE_URL` el build avisa y omite `sitemap.xml`, `canonical`, `og:url` y `og:image`, porque exigen una URL absoluta.
