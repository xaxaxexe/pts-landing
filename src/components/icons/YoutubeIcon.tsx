import type { SVGProps } from "react";

export default function YoutubeIcon({
	width = 54,
	height = 54,
	className,
	...props
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 54 54"
			width={width}
			height={height}
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M23.3948 32.1145L32.2297 26.9274L23.3948 21.7403V32.1145Z"
				fill="currentColor"
			/>
			<path
				d="M27 0C12.0867 0 0 12.0867 0 27C0 41.9133 12.0867 54 27 54C41.9133 54 54 41.9133 54 27C54 12.0867 41.9133 0 27 0ZM40.5 31.8305C40.5 36.4816 35.8488 36.4816 35.8488 36.4816H18.1512C13.5 36.4816 13.5 31.8305 13.5 31.8305V22.1801C13.5 17.5289 18.1512 17.5289 18.1512 17.5289H35.8488C40.5 17.5289 40.5 22.1801 40.5 22.1801V31.8305Z"
				fill="currentColor"
			/>
		</svg>
	);
}
