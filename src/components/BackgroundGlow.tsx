export default function BackgroundGlow() {
	return (
		<div
			className="fixed -z-10 pointer-events-none left-1/2 -top-40 -translate-x-1/2"
			aria-hidden
		>
			<div
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
				style={{
					width: "632px",
					height: "632px",
					background: "#0066FF",
					filter: "blur(600px)",
					opacity: 0.9,
				}}
			/>
			<div
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
				style={{
					width: "433px",
					height: "433px",
					background: "#82A9FF",
					filter: "blur(100px)",
					opacity: 0.85,
				}}
			/>
		</div>
	);
}
