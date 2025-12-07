"use client";

import { useState, useEffect, useRef, useId, useCallback } from "react";
import type { ReactNode } from "react";
import { useSelectedProduct } from "@/contexts/SelectedProductContext";
import Portal from "@/components/Portal";
import Button from "@/components/ui/Button";
import Select, { type SelectOption } from "@/components/ui/Select";
import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import SsdIcon from "@/components/icons/SsdIcon";
import { handleEscape } from "@/lib/keyboard";
import type {
	Product,
	SpecOption,
	ColorOption,
	ColorValue,
} from "@/types/product";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	productData: Product;
}

const getFocusableElements = (container: HTMLElement | null) => {
	if (!container) return [] as HTMLElement[];
	return Array.from(
		container.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
	).filter(
		(el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
	);
};

// Internal components used only in Modal
interface SpecSelectProps {
	icon: ReactNode;
	label: string;
	value: string;
	options?: SpecOption[];
	onChange?: (value: string, price: number) => void;
}

function SpecSelect({
	icon,
	label,
	value,
	options = [],
	onChange,
}: SpecSelectProps) {
	const selectOptions: SelectOption[] = options.map((option) => ({
		value: option.value,
		label: option.value,
		price: option.price,
		renderIcon: icon,
	}));

	return (
		<Select
			label={label}
			options={selectOptions}
			value={value}
			onChange={(val, price) => onChange?.(val, price ?? 0)}
		/>
	);
}

interface ColorSelectProps {
	label: string;
	colorOptions: ColorOption[];
	onChange?: (color: string, price: number) => void;
}

function ColorSelect({ label, colorOptions, onChange }: ColorSelectProps) {
	const selectOptions: SelectOption[] = colorOptions.map((option) => {
		const isBlack = option.color === "black";

		return {
			value: option.color,
			label: isBlack ? "Черный" : "Белый",
			price: option.price,
			renderLabel: (
				<div className="flex gap-2 items-center">
					<div
						className={`w-5 h-5 rounded-full ${
							isBlack ? "bg-black" : "bg-white"
						}`}
					/>
					<span className="text-base">{isBlack ? "Черный" : "Белый"}</span>
				</div>
			),
		};
	});

	const selectedColor =
		selectOptions.find((opt) => opt.value)?.value || "black";

	return (
		<Select
			label={label}
			options={selectOptions}
			value={selectedColor}
			onChange={(val, price) => onChange?.(val as ColorValue, price ?? 0)}
		/>
	);
}

export default function Modal({ isOpen, onClose, productData }: ModalProps) {
	const { setSelectedProduct, focusForm } = useSelectedProduct();
	const [selectedOptions, setSelectedOptions] = useState<
		Record<string, { value: string; price: number }>
	>({});
	const [isClosing, setIsClosing] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const dialogRef = useRef<HTMLDivElement>(null);
	const previouslyFocusedElement = useRef<HTMLElement | null>(null);
	const titleId = useId();

	const memorySpec = productData.specs.find((spec) => spec.type === "memory");
	const ssdSpec = productData.specs.find((spec) => spec.type === "ssd");
	const colorSpec = productData.specs.find((spec) => spec.type === "color");

	const handleClose = useCallback(() => {
		if (isClosing) return;
		setIsClosing(true);
		setTimeout(() => {
			setIsClosing(false);
			onClose();
		}, 300);
	}, [isClosing, onClose]);

	useEffect(() => {
		if (isOpen) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
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

			requestAnimationFrame(() => {
				setIsAnimating(true);
			});
		}
	}, [isOpen, memorySpec, ssdSpec, colorSpec]);

	useEffect(() => {
		if (!isOpen) return;

		previouslyFocusedElement.current =
			(document.activeElement as HTMLElement | null) || null;

		const focusable = getFocusableElements(dialogRef.current);
		if (focusable.length > 0) {
			focusable[0].focus();
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (handleEscape(event, handleClose, { preventDefault: true })) {
				return;
			}

			if (event.key === "Tab") {
				const focusables = getFocusableElements(dialogRef.current);
				if (focusables.length === 0) return;
				const currentIndex = focusables.indexOf(
					document.activeElement as HTMLElement
				);
				const lastIndex = focusables.length - 1;

				if (event.shiftKey) {
					if (currentIndex === -1 || currentIndex === 0) {
						focusables[lastIndex].focus();
						event.preventDefault();
					}
				} else {
					if (currentIndex === lastIndex || currentIndex === -1) {
						focusables[0].focus();
						event.preventDefault();
					}
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			previouslyFocusedElement.current?.focus();
		};
	}, [handleClose, isOpen]);

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
					role="dialog"
					aria-modal="true"
					aria-labelledby={titleId}
					className={`relative z-10 w-full max-w-md mx-4 transition-all duration-300 ${
						isClosing
							? "opacity-0 scale-95 translate-y-4"
							: isAnimating
							? "opacity-100 scale-100 translate-y-0"
							: "opacity-0 scale-95 translate-y-4"
					}`}
					ref={dialogRef}
				>
					<div className="flex flex-col justify-between bg-carbon rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl min-h-128">
						<div>
							<h2
								id={titleId}
								className="text-xl lg:text-2xl font-bold text-start text-white mb-5"
							>
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
						<Button onClick={handleBuyClick} fullWidth size="md">
							Купить
						</Button>
					</div>
				</div>
			</div>
		</Portal>
	);
}
