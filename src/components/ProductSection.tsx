import type { ReactNode } from "react";

type ProductSectionProps = {
  title: string;
  children: ReactNode;
};

export default function ProductSection({
  title,
  children,
}: ProductSectionProps) {
  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-center text-4xl font-semibold">{title}</h2>
      <div className="grid w-full gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
