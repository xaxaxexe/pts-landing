import DeliveryIcon from "@/components/icons/DeliveryIcon";
import HeartIcon from "@/components/icons/HeartIcon";

export default function AboutSection() {
	return (
		<section
			id="about"
			className="flex w-full flex-col items-center gap-4 sm:gap-9 lg:gap-10 pt-10 text-white"
		>
			<h2 className="text-center text-4xl sm:text-5xl lg:text-7xl font-bold">
				О НАС
			</h2>
			<p className="text-center text-md sm:text-2xl lg:text-3xl font-medium text-silver">
				<span className="font-bold text-white">POWERTECHSTORE</span> — это
				прекрасное решение для сборки компьютера именно мы можем в короткий срок
				собрать и доставить вам вашего железного зверя
			</p>
			<dl className="w-full flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between pt-5 sm:pt-20">
				<div className="flex flex-col justify-center items-center gap-1">
					<dt className="font-semibold text-5xl sm:text-6xl lg:text-7xl">
						1000+
					</dt>
					<dd className="text-md sm:text-xl lg:text-2xl text-silver font-medium">
						Клиентов
					</dd>
				</div>
				<div className="flex flex-col justify-center items-center gap-1">
					<dt className="font-semibold text-5xl sm:text-6xl lg:text-7xl">
						1000+
					</dt>
					<dd className="text-md sm:text-xl lg:text-2xl text-silver font-medium">
						Компьютеров собрано
					</dd>
				</div>
				<div className="flex flex-col justify-center items-center gap-1">
					<dt className="font-semibold text-5xl sm:text-6xl lg:text-7xl">6</dt>
					<dd className="text-md sm:text-xl lg:text-2xl text-silver font-medium">
						Лет на рынке
					</dd>
				</div>
			</dl>

			<dl className="grid w-full gap-10 pt-5 sm:pt-12 text-center sm:grid-cols-2">
				<div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center gap-2 lg:gap-4 font-semibold">
						<HeartIcon className="w-10 h-10 lg:h-14 lg:w-14" />
						<dt className="text-4xl lg:text-3xl font-semibold">Гарантия</dt>
					</div>
					<dd className="text-xl lg:text-2xl font-medium text-silver">1 год</dd>
				</div>
				<div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center gap-2 lg:gap-4  font-semibold">
						<DeliveryIcon className="w-10 h-10 lg:h-14 lg:w-14" />
						<dt className="text-4xl lg:text-3xl font-semibold">Доставка</dt>
					</div>
					<dd className="text-xl lg:text-2xl font-medium text-silver">
						по всей РФ и РБ
					</dd>
				</div>
			</dl>
		</section>
	);
}
