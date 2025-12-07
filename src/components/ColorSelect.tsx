"use client";

import Select, { type SelectOption } from "@/components/ui/Select";
import type { ColorOption, ColorValue } from "@/types/product";

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
