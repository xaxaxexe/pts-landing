"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelectedProduct } from "@/contexts/SelectedProductContext";
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
	const { setSelectedProduct, focusForm } = useSelectedProduct();

	const scrollToForm = () => {
		const formElement = document.getElementById("contact-form");
		if (formElement) {
			formElement.scrollIntoView({ behavior: "smooth", block: "start" });
			requestAnimationFrame(() => {
				setTimeout(() => {
					focusForm();
				}, 250);
			});
		} else {
			focusForm();
		}
	};

	const hasOptions = productData.specs.some(
		(spec) =>
			(spec.options && spec.options.length > 0) ||
			(spec.colorOptions && spec.colorOptions.length > 0)
	);

	const handleBuyClick = () => {
		const defaultOptions: Record<string, { value: string; price: number }> = {};
		let totalPrice = productData.price;

		productData.specs.forEach((spec) => {
			if (spec.options && spec.options.length > 0) {
				defaultOptions[spec.type] = spec.options[0];
				totalPrice += spec.options[0].price;
			}
			if (spec.colorOptions && spec.colorOptions.length > 0) {
				defaultOptions[spec.type] = {
					value: spec.colorOptions[0].color,
					price: spec.colorOptions[0].price,
				};
				totalPrice += spec.colorOptions[0].price;
			}
		});

		setSelectedProduct({
			_id: productData._id,
			category: productData.category,
			title: productData.title,
			price: productData.price,
			specs: productData.specs,
			image: productData.image,
			selectedOptions: defaultOptions,
			totalPrice,
		});
		scrollToForm();
	};

	return (
		<>
			<div className="flex flex-col gap-3 rounded-2xl bg-carbon p-3 sm:rounded-3xl sm:p-4 md:p-5">
				<div className="relative aspect-4/3 overflow-hidden rounded-xl sm:rounded-2xl">
					<Image
						src={image}
						alt={title}
						fill
						className="object-cover"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						priority={false}
					/>
				</div>

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
					<button
						onClick={handleBuyClick}
						className="flex-1 cursor-pointer rounded-2xl bg-hero-gradient p-3 text-sm font-semibold sm:p-4 sm:text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-azure/30 active:scale-[0.98]"
					>
						Купить
					</button>
					{hasOptions && (
						<button
							onClick={() => setIsModalOpen(true)}
							className="cursor-pointer rounded-2xl bg-slate-24 hover:bg-border px-6 h-full text-sm font-semibold sm:text-base  transition-all duration-300 hover:scale-[1.02]  active:scale-[0.98]"
						>
							<SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					)}
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
