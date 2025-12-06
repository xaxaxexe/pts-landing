export default function MapSection() {
	return (
		<section className="flex w-full flex-col gap-5 py-10">
			<h2 className="text-center text-3xl sm:text-5xl font-semibold">
				Мы на карте
			</h2>
			<div className="relative h-[clamp(340px,35vw,640px)] w-full overflow-hidden rounded-3xl lg:rounded-4xl">
				<iframe
					title="Карта: Уфа, улица Карла Маркса, 60/2"
					src="https://yandex.ru/map-widget/v1/-/CLg0REo8"
					className="absolute inset-0 h-full w-full border-0"
					allowFullScreen
					referrerPolicy="no-referrer-when-downgrade"
				/>
			</div>
		</section>
	);
}
