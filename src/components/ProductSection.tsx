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
		<div className="flex w-full flex-col gap-5">
			<h3 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold">
				{title}
			</h3>
			<div className="grid w-full gap-4 sm:grid-cols-2">{children}</div>
		</div>
	);
}
