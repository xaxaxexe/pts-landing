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
		<section className="flex w-full flex-col gap-5">
			<h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
				{title}
			</h2>
			<div className="grid w-full gap-4 sm:grid-cols-2">{children}</div>
		</section>
	);
}
