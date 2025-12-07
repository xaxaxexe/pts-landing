"use client";

import { useState, useRef, useEffect, useId } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import RadioButton from "@/components/ui/RadioButton";
import type { ColorOption } from "@/types/product";
import { handleEscape } from "@/lib/keyboard";

interface ColorSelectProps {
	label: string;
	colorOptions: ColorOption[];
	onChange?: (color: string, price: number) => void;
}

export default function ColorSelect({
	label,
	colorOptions,
	onChange,
}: ColorSelectProps) {
	const [selectedColor, setSelectedColor] = useState(
		colorOptions[0]?.color || "black"
	);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dropdownId = useId();
	const listboxId = `${dropdownId}-listbox`;

	const closeIfFocusLeaves = () => {
		setTimeout(() => {
			const activeElement = document.activeElement;
			if (
				dropdownRef.current &&
				activeElement &&
				dropdownRef.current.contains(activeElement)
			) {
				return;
			}
			setIsOpen(false);
		}, 0);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (!isOpen) return;
		handleEscape(event, () => setIsOpen(false), {
			stopPropagation: true,
		});
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div
			className="relative"
			ref={dropdownRef}
			onBlur={closeIfFocusLeaves}
			onKeyDown={handleKeyDown}
		>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between border-2 border-border bg-ink py-3 px-4 rounded-xl cursor-pointer hover:border-graphite transition-colors"
				aria-label={label}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-controls={listboxId}
			>
				<div className="flex gap-2 items-center">
					<div
						className={`w-5 h-5 rounded-full  ${
							selectedColor === "black" ? "bg-black " : "bg-white "
						}`}
					/>
					<span className="text-base font-medium">
						{selectedColor === "black" ? "Черный" : "Белый"}
					</span>
				</div>
				<ChevronDownIcon
					className={`w-4 h-4 text-graphite transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && colorOptions.length > 0 && (
				<ul
					id={listboxId}
					role="listbox"
					aria-label={label}
					aria-activedescendant={`${dropdownId}-option-${Math.max(
						0,
						colorOptions.findIndex((opt) => opt.color === selectedColor)
					)}`}
					className="absolute max-h-64 overflow-y-auto top-full left-0 right-0 mt-2 bg-ink border-2 border-border rounded-xl p-4 shadow-xl z-50"
				>
					{colorOptions.map((option, index) => (
						<li
							key={`${option.color}-${index}`}
							id={`${dropdownId}-option-${index}`}
							role="option"
							aria-selected={selectedColor === option.color}
							className={`group flex justify-between cursor-pointer ${
								index === 0
									? colorOptions.length > 1
										? "pb-3 border-b border-border"
										: ""
									: index === colorOptions.length - 1
									? "pt-3"
									: "py-3 border-b border-border"
							}`}
							onClick={() => {
								setSelectedColor(option.color);
								setIsOpen(false);
								onChange?.(option.color, option.price);
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									setSelectedColor(option.color);
									setIsOpen(false);
									onChange?.(option.color, option.price);
								}
							}}
							tabIndex={0}
							aria-label={`${option.color === "black" ? "Черный" : "Белый"}${
								option.price > 0
									? `, доплата ${option.price.toLocaleString("ru-RU")} руб`
									: option.price < 0
									? `, скидка ${Math.abs(option.price).toLocaleString(
											"ru-RU"
									  )} руб`
									: ""
							}`}
						>
							<div className="flex flex-col">
								<div className="flex gap-2 items-center">
									<div
										className={`w-4.5 h-4.5 rounded-full ${
											option.color === "black" ? "bg-black" : "bg-white"
										}`}
									/>
									<span className="text-base">
										{option.color === "black" ? "Черный" : "Белый"}
									</span>
								</div>
								{option.price >= 0 && (
									<span className="text-sm text-ash font-medium">
										+{option.price.toLocaleString("ru-RU")} руб
									</span>
								)}
							</div>
							<RadioButton
								id={`color-option-${index}`}
								name="color-select"
								checked={selectedColor === option.color}
								onChange={() => setSelectedColor(option.color)}
								focusable={false}
								ariaHidden
							/>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
