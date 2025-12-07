"use client";

import { useState, useEffect } from "react";
import { useSelectedProduct } from "@/contexts/SelectedProductContext";
import Portal from "@/components/Portal";
import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import SsdIcon from "@/components/icons/SsdIcon";
import SpecSelect from "./SpecSelect";
import ColorSelect from "./ColorSelect";
import type { Product } from "@/types/product";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	productData: Product;
}

export default function Modal({ isOpen, onClose, productData }: ModalProps) {
	const { setSelectedProduct } = useSelectedProduct();
	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, { value: string; price: number }>
	>({});

	const memorySpec = productData.specs.find((spec) => spec.type === "memory");
	const ssdSpec = productData.specs.find((spec) => spec.type === "ssd");
	const colorSpec = productData.specs.find((spec) => spec.type === "color");

	useEffect(() => {
		if (isOpen) {
			const initial: Record<string, { value: string; price: number }> = {};
			if (memorySpec?.options?.[0]) {
				initial.memory = memorySpec.options[0];
			}
			if (ssdSpec?.options?.[0]) {
				initial.ssd = ssdSpec.options[0];
			}
			if (colorSpec?.colorOptions?.[0]) {
				initial.color = {
					value: colorSpec.colorOptions[0].color,
					price: colorSpec.colorOptions[0].price,
				};
			}
			setSelectedOptions(initial);
		}
	}, [isOpen, memorySpec, ssdSpec, colorSpec]);

	const scrollToForm = () => {
		const formElement = document.getElementById("contact-form");
		if (formElement) {
			formElement.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const handleBuyClick = () => {
		const totalPrice =
			productData.price +
			Object.values(selectedOptions).reduce((sum, opt) => sum + opt.price, 0);

		setSelectedProduct({
			_id: productData._id,
			category: productData.category,
			title: productData.title,
			price: productData.price,
			specs: productData.specs,
			image: productData.image,
			selectedOptions,
			totalPrice,
		});

		onClose();
		scrollToForm();
	};

	if (!isOpen) return null;

	return (
		<Portal lockScroll>
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div
					className="absolute inset-0 bg-black/60 backdrop-blur-sm"
					onClick={onClose}
				/>

				<div className="relative z-10 w-full max-w-md mx-4">
					<div className="flex flex-col justify-between bg-carbon rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl min-h-128">
						<div>
							<h2 className="text-xl lg:text-2xl font-bold text-start text-white mb-5">
								Редактирование
							</h2>
							<div className="flex flex-col gap-4">
								{memorySpec && memorySpec.options && (
									<SpecSelect
										icon={<MemoryCardIcon className="w-5 h-5 text-white" />}
										label="Оперативная память"
										value={memorySpec.options[0]?.value}
										options={memorySpec.options}
										onChange={(value, price) =>
											setSelectedOptions((prev) => ({
												...prev,
												memory: { value, price },
											}))
										}
									/>
								)}
								{ssdSpec && ssdSpec.options && (
									<SpecSelect
										icon={<SsdIcon className="w-5 h-5 text-white" />}
										label="SSD"
										value={ssdSpec.options[0]?.value}
										options={ssdSpec.options}
										onChange={(value, price) =>
											setSelectedOptions((prev) => ({
												...prev,
												ssd: { value, price },
											}))
										}
									/>
								)}
								{colorSpec && colorSpec.colorOptions && (
									<ColorSelect
										label="Цвет"
										colorOptions={colorSpec.colorOptions}
										onChange={(value, price) =>
											setSelectedOptions((prev) => ({
												...prev,
												color: { value, price },
											}))
										}
									/>
								)}
							</div>
						</div>
						<button
							onClick={handleBuyClick}
							className="w-full cursor-pointer rounded-xl bg-hero-gradient p-3 text-base font-semibold"
						>
							Купить
						</button>
					</div>
				</div>
			</div>
		</Portal>
	);
}
