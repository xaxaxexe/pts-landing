interface RadioButtonProps {
	id: string;
	name: string;
	checked: boolean;
	onChange: () => void;
	focusable?: boolean;
	ariaHidden?: boolean;
}

export default function RadioButton({
	id,
	name,
	checked,
	onChange,
	focusable = true,
	ariaHidden = false,
}: RadioButtonProps) {
	return (
		<label
			className="relative flex sm:inline-flex cursor-pointer items-center gap-2"
			htmlFor={id}
		>
			<input
				id={id}
				type="radio"
				name={name}
				checked={checked}
				onChange={onChange}
				tabIndex={focusable ? 0 : -1}
				aria-hidden={ariaHidden}
				className="peer sr-only"
			/>
			<span className="flex w-7 h-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-slate-24 transition group-hover:bg-border">
				<span
					className={`w-3.5 h-3.5 sm:h-4 sm:w-4 rounded-full transition ${
						checked ? "bg-azure" : "bg-transparent"
					}`}
				/>
			</span>
		</label>
	);
}
