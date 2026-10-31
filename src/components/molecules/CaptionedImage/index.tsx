import { Pending, shouldRender } from '@/components/atoms/Pending';
import { ResponsiveImage } from '@/components/atoms/ResponsiveImage';

interface CaptionedImageProps {
  src?: string;
  alt?: string;
  caption?: string;
  credit?: string;
}

export function CaptionedImage({ src, alt, caption, credit }: CaptionedImageProps) {
  return (
    <figure>
      <ResponsiveImage src={src} alt={alt} sizes="(min-width: 1024px) 61.25rem, 100vw" priority />
      {shouldRender(caption || credit) && (
        <figcaption className="mt-2 text-pie">
          {caption ?? <Pending field="heroCaption" />}{' '}
          <span className="text-tinta-suave">{credit ?? <Pending field="heroCredit" />}</span>
        </figcaption>
      )}
    </figure>
  );
}
