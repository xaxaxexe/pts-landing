import { ReactNode } from "react";

interface RadioButtonProps {
	id: string;
	name: string;
	checked: boolean;
	onChange: () => void;
	focusable?: boolean;
	ariaHidden?: boolean;
	type?: "radio" | "checkbox";
	children?: ReactNode;
	className?: string;
}

export default function RadioButton({
	id,
	name,
	checked,
	onChange,
	focusable = true,
	ariaHidden = false,
	type = "radio",
	children,
	className = "",
}: RadioButtonProps) {
	return (
		<label
			className={`group relative flex sm:inline-flex cursor-pointer items-center gap-2 ${className}`}
			htmlFor={id}
		>
			<input
				id={id}
				type={type}
				name={name}
				checked={checked}
				onChange={onChange}
				tabIndex={focusable ? 0 : -1}
				aria-hidden={ariaHidden}
				className="peer sr-only"
			/>
			<span className="flex w-4 h-4 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-ink transition group-hover:bg-border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-azure">
				<span
					className={`w-2 h-2 sm:h-4 sm:w-4 rounded-full transition ${
						checked ? "bg-azure" : "bg-transparent"
					}`}
				/>
			</span>
			{children && (
				<span className="text-[0.65rem] sm:text-base font-semibold">
					{children}
				</span>
			)}
		</label>
	);
}
