import { useEffect, useId, useRef, useState, ReactNode } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import RadioButton from "@/components/ui/RadioButton";
import { handleEscape } from "@/lib/keyboard";

export interface SelectOption {
	label: string;
	value: string;
	price?: number;
	renderIcon?: ReactNode;
	renderLabel?: ReactNode;
}

interface SelectProps {
	label: string;
	options: SelectOption[];
	value: string;
	onChange?: (value: string, price?: number) => void;
	className?: string;
}

export default function Select({
	label,
	options,
	value,
	onChange,
	className = "",
}: SelectProps) {
	const [selectedValue, setSelectedValue] = useState(value);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dropdownId = useId();
	const listboxId = `${dropdownId}-listbox`;

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

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

		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			event.preventDefault();
			const currentIndex = options.findIndex(
				(opt) => opt.value === selectedValue
			);
			const delta = event.key === "ArrowDown" ? 1 : -1;
			let nextIndex = currentIndex + delta;

			if (nextIndex < 0) nextIndex = options.length - 1;
			if (nextIndex >= options.length) nextIndex = 0;

			const nextOption = options[nextIndex];
			if (nextOption) {
				setSelectedValue(nextOption.value);
				onChange?.(nextOption.value, nextOption.price);
			}
		}
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
			className={`relative ${className}`}
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
					{options.find((opt) => opt.value === selectedValue)?.renderIcon}
					<span className="text-base font-medium">
						{options.find((opt) => opt.value === selectedValue)?.label ||
							selectedValue}
					</span>
				</div>
				<ChevronDownIcon
					className={`w-4 h-4 text-graphite transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && options.length > 0 && (
				<ul
					id={listboxId}
					role="listbox"
					aria-label={label}
					aria-activedescendant={`${dropdownId}-option-${Math.max(
						0,
						options.findIndex((opt) => opt.value === selectedValue)
					)}`}
					className="absolute max-h-64 ld:max-h-52 overflow-y-auto top-full left-0 right-0 mt-2 bg-ink border-2 border-border rounded-xl p-4 shadow-xl z-50"
				>
					{options.map((option, index) => (
						<li
							key={`${option.value}-${index}`}
							id={`${dropdownId}-option-${index}`}
							role="option"
							aria-selected={selectedValue === option.value}
							className={`group flex justify-between cursor-pointer ${
								index === 0
									? options.length > 1
										? "pb-3 border-b border-border"
										: ""
									: index === options.length - 1
									? "pt-3"
									: "py-3 border-b border-border"
							}`}
							onClick={() => {
								setSelectedValue(option.value);
								setIsOpen(false);
								onChange?.(option.value, option.price);
							}}
							onKeyDown={(event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									setSelectedValue(option.value);
									setIsOpen(false);
									onChange?.(option.value, option.price);
								}
							}}
							tabIndex={0}
							aria-label={`${option.label}${
								option.price && option.price > 0
									? `, доплата ${option.price.toLocaleString("ru-RU")} руб`
									: option.price && option.price < 0
									? `, скидка ${Math.abs(option.price).toLocaleString(
											"ru-RU"
									  )} руб`
									: ""
							}`}
						>
							<div className="flex flex-col">
								<div className="flex gap-2 items-center">
									{option.renderIcon}
									{option.renderLabel ?? (
										<span className="text-base">{option.label}</span>
									)}
								</div>
								{typeof option.price === "number" && option.price >= 0 && (
									<span className="text-sm text-ash font-medium">
										+{option.price.toLocaleString("ru-RU")} руб
									</span>
								)}
								{typeof option.price === "number" && option.price < 0 && (
									<span className="text-sm text-ash font-medium">
										-{Math.abs(option.price).toLocaleString("ru-RU")} руб
									</span>
								)}
							</div>
							<RadioButton
								id={`option-${index}`}
								name={`select-${label}`}
								checked={selectedValue === option.value}
								onChange={() => setSelectedValue(option.value)}
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
