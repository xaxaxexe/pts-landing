import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import GpuCardIcon from "@/components/icons/GpuCardIcon";
import ProcessorIcon from "@/components/icons/ProcessorIcon";
import SsdIcon from "@/components/icons/SsdIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import type { ReactNode } from "react";

type SpecIcon = "memory" | "gpu" | "cpu" | "ssd";

type Spec = {
	icon: SpecIcon;
	label: string;
};

type ProductCardProps = {
	title: string;
	price: string;
	specs: Spec[];
	image?: ReactNode;
};

const iconMap: Record<SpecIcon, ReactNode> = {
	memory: <MemoryCardIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
	gpu: <GpuCardIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
	cpu: <ProcessorIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
	ssd: <SsdIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
};

export default function ProductCard({
	title,
	price,
	specs,
	image,
}: ProductCardProps) {
	return (
		<div className="flex flex-col gap-3 rounded-2xl bg-carbon p-3 sm:rounded-3xl sm:p-4 md:p-5">
			<div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-100 sm:rounded-2xl">
				{image}
			</div>
			<div className="flex sm:items-center justify-between text-base sm:text-lg lg:text-xl">
				<span className="font-bold leading-tight">{title}</span>
				<span className="font-semibold leading-tight">{price}</span>
			</div>
			<ul className="flex flex-col gap-2">
				{specs.map((spec) => (
					<li
						key={`${title}-${spec.label}`}
						className="flex items-center justify-start gap-2 text-xs text-graphite sm:text-sm"
					>
						{iconMap[spec.icon]}
						<span className="text-sm font-medium">{spec.label}</span>
					</li>
				))}
			</ul>
			<div className="mt-2 flex w-full gap-2  items-center">
				<button className="flex-1 cursor-pointer rounded-2xl bg-hero-gradient p-3 text-sm font-semibold sm:p-4 sm:text-base">
					Купить
				</button>
				<button className="cursor-pointer rounded-2xl bg-slate-24 px-4 py-3 text-sm font-semibold sm:text-base">
					<SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6" />
				</button>
			</div>
		</div>
	);
}
