"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import type { SpecOption } from "@/types/product";

interface SpecSelectProps {
	icon: ReactNode;
	label: string;
	value: string;
	options?: SpecOption[];
}

export default function SpecSelect({
	icon,
	label,
	value,
	options = [],
}: SpecSelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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
		<div className="relative" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between border-2 border-border bg-ink py-3 px-4 rounded-xl cursor-pointer hover:border-graphite transition-colors"
				aria-label={label}
				aria-expanded={isOpen}
			>
				<div className="flex gap-2 items-center">
					{icon}
					<span className="text-base font-medium">{value}</span>
				</div>
				<ChevronDownIcon
					className={`w-4 h-4 text-graphite transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && options.length > 0 && (
				<ul className="absolute max-h-64 ld:max-h-52 overflow-y-auto top-full left-0 right-0 mt-2 bg-ink border-2 border-border rounded-xl p-4 shadow-xl z-50">
					{options.map((option, index) => (
						<li
							key={`${option.value}-${index}`}
							className={`flex justify-between ${
								index === 0
									? options.length > 1
										? "pb-3 border-b border-border"
										: ""
									: index === options.length - 1
									? "pt-3"
									: "py-3 border-b border-border"
							}`}
						>
							<div className="flex flex-col">
								<div className="flex gap-2">
									{icon} <span className="text-base">{option.value}</span>
								</div>
								{option.price > 0 && (
									<span className="text-sm text-ash font-medium">
										+{option.price.toLocaleString("ru-RU")} руб
									</span>
								)}
							</div>
							<label
								className="relative flex sm:inline-flex cursor-pointer items-center gap-2"
								htmlFor={`option-${index}`}
							>
								<input
									id={`option-${index}`}
									type="checkbox"
									defaultChecked={index === 0}
									className="peer sr-only"
								/>
								<span className="flex w-7 h-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-24 transition">
									<span className="w-3.5 h-3.5 sm:h-4 sm:w-4 rounded-full bg-azure transition peer-checked:bg-azure" />
								</span>
							</label>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
