"use client";

import { useState } from "react";
import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import GpuCardIcon from "@/components/icons/GpuCardIcon";
import ProcessorIcon from "@/components/icons/ProcessorIcon";
import SsdIcon from "@/components/icons/SsdIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import type { ReactNode } from "react";
import Modal from "@/components/Modal";
import type { Product, SpecIcon, SpecForCard } from "@/types/product";

type ProductCardProps = {
	title: string;
	price: number;
	specs: SpecForCard[];
	image: string;
	productData: Product;
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
	productData,
}: ProductCardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div className="flex flex-col gap-3 rounded-2xl bg-carbon p-3 sm:rounded-3xl sm:p-4 md:p-5">
				<img
					src={image}
					alt={title}
					className="aspect-4/3 object-cover rounded-xl  sm:rounded-2xl"
				/>

				<div className="flex sm:items-center justify-between text-base sm:text-lg lg:text-xl">
					<span className="font-bold leading-tight">{title}</span>
					<span className="font-semibold leading-tight">{price} р.</span>
				</div>
				<ul className="flex flex-col gap-2">
					{specs.map((spec, index) => (
						<li
							key={`${title}-${spec.label}-${index}`}
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
					<button
						onClick={() => setIsModalOpen(true)}
						className="cursor-pointer rounded-2xl bg-slate-24 px-6 h-full text-sm font-semibold sm:text-base"
					>
						<SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6" />
					</button>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				productData={productData}
			/>
		</>
	);
}
