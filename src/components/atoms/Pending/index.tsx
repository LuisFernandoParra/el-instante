interface PendingProps {
  field: string;
}

/** En producción, el contenedor de un campo ausente tampoco debe pintarse. */
export const shouldRender = (value: unknown): boolean => Boolean(value) || import.meta.env.DEV;

/** Marca un campo ausente en content/. Solo existe en desarrollo; en producción no pinta nada. */
export function Pending({ field }: PendingProps) {
  if (!import.meta.env.DEV) return null;
  return (
    <mark title={`Falta en content/: ${field}`} className="bg-acento-tenue px-1 text-acento-fuerte">
      [PENDIENTE]
    </mark>
  );
}
