import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { articlePath, type BodyBlock } from '@/data';

interface ArticleBodyProps {
  blocks: BodyBlock[];
  /** Contenido a insertar después del bloque con ese número, contando desde 1. */
  inserts: Record<number, ReactNode>;
}

function Block({ block }: { block: BodyBlock }) {
  if (block.type === 'quote') {
    return (
      <blockquote className="flex flex-col gap-4">
        <p className="font-bold">{block.text}</p>
        {block.attribution && <p>{block.attribution}</p>}
      </blockquote>
    );
  }

  return (
    <p>
      {block.text}
      {block.link && (
        <>
          {' '}
          <Link to={articlePath(block.link.slug)} className="text-enlace underline">
            {block.link.label}
          </Link>
        </>
      )}
    </p>
  );
}

export function ArticleBody({ blocks, inserts }: ArticleBodyProps) {
  return (
    <div className="flex flex-col gap-4 text-cuerpo">
      {blocks.map((block, index) => (
        <Fragment key={index}>
          <Block block={block} />
          {inserts[index + 1]}
        </Fragment>
      ))}
    </div>
  );
}
