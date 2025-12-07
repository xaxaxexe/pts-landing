import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	size?: "sm" | "md" | "lg";
	fullWidth?: boolean;
	isLoading?: boolean;
	loadingText?: string;
}

export default function Button({
	variant = "primary",
	size = "md",
	fullWidth = false,
	isLoading = false,
	loadingText = "Загрузка...",
	children,
	className = "",
	disabled,
	...props
}: ButtonProps) {
	const baseClasses =
		"cursor-pointer font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

	const variantClasses = {
		primary:
			"bg-hero-gradient text-white hover:shadow-lg hover:shadow-azure/30",
		secondary: "bg-carbon text-white",
	};

	const sizeClasses = {
		sm: "rounded-lg px-3 py-1 text-xs sm:text-sm",
		md: "rounded-xl px-4 py-3 text-base sm:px-6 sm:py-3 sm:text-lg",
		lg: "rounded-xl sm:rounded-2xl p-3 sm:p-5 xl:p-7 text-base sm:text-xl xl:text-2xl",
	};

	const widthClass = fullWidth ? "w-full" : "";

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? loadingText : children}
		</button>
	);
}
