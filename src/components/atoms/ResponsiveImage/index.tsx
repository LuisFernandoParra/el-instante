import { useState } from 'react';
import { getImageSources } from '@/data/images';

interface ResponsiveImageProps {
  src?: string;
  /** Vacío si el texto de al lado ya describe el elemento, como en las tarjetas de relleno. */
  alt?: string;
  sizes: string;
  /** Para la imagen principal de la página: se carga de inmediato en lugar de en diferido. */
  priority?: boolean;
  className?: string;
}

/** Bloque 16:9. Si la imagen falta o no carga queda el fondo gris con la misma proporción. */
export function ResponsiveImage({
  src,
  alt = '',
  sizes,
  priority = false,
  className = '',
}: ResponsiveImageProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const sources = src && src !== failedSrc ? getImageSources(src) : undefined;

  return (
    <div className={`aspect-video overflow-hidden rounded-lg bg-bloque ${className}`}>
      {sources && (
        <picture>
          {sources.avif && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
          {sources.webp && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
          <img
            src={sources.fallback}
            alt={alt}
            width={1600}
            height={900}
            loading={priority ? 'eager' : 'lazy'}
            {...(priority && { fetchpriority: 'high' })}
            decoding={priority ? 'sync' : 'async'}
            onError={() => setFailedSrc(src)}
            className="h-full w-full object-cover"
          />
        </picture>
      )}
    </div>
  );
}
