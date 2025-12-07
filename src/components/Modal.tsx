"use client";

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
	if (!isOpen) return null;

	const memorySpec = productData.specs.find((spec) => spec.type === "memory");
	const ssdSpec = productData.specs.find((spec) => spec.type === "ssd");
	const colorSpec = productData.specs.find((spec) => spec.type === "color");

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
									/>
								)}
								{ssdSpec && ssdSpec.options && (
									<SpecSelect
										icon={<SsdIcon className="w-5 h-5 text-white" />}
										label="SSD"
										value={ssdSpec.options[0]?.value}
										options={ssdSpec.options}
									/>
								)}
								{colorSpec && colorSpec.colorOptions && (
									<ColorSelect
										label="Цвет"
										colorOptions={colorSpec.colorOptions}
									/>
								)}
							</div>
						</div>
						<button className="w-full cursor-pointer rounded-xl bg-hero-gradient p-3 text-base font-semibold">
							Купить
						</button>
					</div>
				</div>
			</div>
		</Portal>
	);
}
