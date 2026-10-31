interface SectionHeadingProps {
  children: string;
  id?: string;
}

export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="mb-4 text-lg font-semibold uppercase before:mb-2 before:block before:h-1 before:w-12 before:bg-acento"
    >
      {children}
    </h2>
  );
}
