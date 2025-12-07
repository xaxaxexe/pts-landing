"use client";

import type { ReactNode } from "react";
import Select, { type SelectOption } from "@/components/ui/Select";
import type { SpecOption } from "@/types/product";

interface SpecSelectProps {
	icon: ReactNode;
	label: string;
	value: string;
	options?: SpecOption[];
	onChange?: (value: string, price: number) => void;
}

export default function SpecSelect({
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
