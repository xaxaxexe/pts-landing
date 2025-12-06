interface ChevronDownIconProps {
	className?: string;
}

export default function ChevronDownIcon({ className }: ChevronDownIconProps) {
	return (
		<svg
			width="12"
			height="7"
			viewBox="0 0 12 7"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M1 1L6 6L11 1"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
