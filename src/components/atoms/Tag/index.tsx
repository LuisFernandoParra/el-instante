interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="inline-block rounded-full border border-linea px-3 py-1 text-rotulo">
      {label}
    </span>
  );
}
