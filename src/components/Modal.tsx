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
	const [isClosing, setIsClosing] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const memorySpec = productData.specs.find((spec) => spec.type === "memory");
	const ssdSpec = productData.specs.find((spec) => spec.type === "ssd");
	const colorSpec = productData.specs.find((spec) => spec.type === "color");

	useEffect(() => {
		if (isOpen) {
			setIsAnimating(false);
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

			// Запускаем анимацию появления
			requestAnimationFrame(() => {
				setIsAnimating(true);
			});
		}
	}, [isOpen, memorySpec, ssdSpec, colorSpec]);

	const scrollToForm = () => {
		const formElement = document.getElementById("contact-form");
		if (formElement) {
			formElement.scrollIntoView({ block: "start" });
		}
	};

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsClosing(false);
			onClose();
		}, 300);
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

		handleClose();
		setTimeout(() => {
			scrollToForm();
		}, 300);
	};

	if (!isOpen && !isClosing) return null;

	return (
		<Portal lockScroll>
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div
					className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
						isClosing ? "opacity-0" : isAnimating ? "opacity-100" : "opacity-0"
					}`}
					onClick={handleClose}
				/>

				<div
					className={`relative z-10 w-full max-w-md mx-4 transition-all duration-300 ${
						isClosing
							? "opacity-0 scale-95 translate-y-4"
							: isAnimating
							? "opacity-100 scale-100 translate-y-0"
							: "opacity-0 scale-95 translate-y-4"
					}`}
				>
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
							className="w-full cursor-pointer rounded-xl bg-hero-gradient p-3 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-azure/30 active:scale-[0.98]"
						>
							Купить
						</button>
					</div>
				</div>
			</div>
		</Portal>
	);
}
