import { ChangeEvent, FocusEvent, RefObject } from "react";

interface FormInputProps {
	icon: React.ReactNode;
	id: string;
	name: string;
	type?: string;
	placeholder: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: FocusEvent<HTMLInputElement>) => void;
	touched?: boolean;
	error?: string;
	inputRef?: RefObject<HTMLInputElement | null>;
}

export default function FormInput({
	icon,
	id,
	name,
	type = "text",
	placeholder,
	value,
	onChange,
	onBlur,
	touched,
	error,
	inputRef,
}: FormInputProps) {
	const hasError = touched && error && value;
	const isValid = touched && !error && value;

	return (
		<div
			className={`flex w-full items-center gap-4 sm:gap-5 rounded-xl sm:rounded-2xl bg-ink p-4 sm:p-6 xl:p-8 transition-all duration-300 ${
				hasError ? "ring-2 ring-red-500/50" : ""
			} ${isValid ? "ring-2 ring-green-500/50" : ""}`}
		>
			<div
				className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
					hasError ? "text-red-500" : isValid ? "text-green-500" : "text-silver"
				}`}
			>
				{icon}
			</div>
			<div className="w-full">
				<label className="sr-only" htmlFor={id}>
					{placeholder}
				</label>
				<input
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
					ref={inputRef}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
				/>
			</div>
		</div>
	);
}
