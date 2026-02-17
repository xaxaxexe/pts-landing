import Image from "next/image";

export default function HeroSection() {
	return (
		<section className="flex w-full flex-col items-center justify-center gap-4 sm:gap-10 sm:flex-row sm:items-start">
			<Image
				src="/hero-banner.jpg"
				alt="Сборка компьютеров"
				width={288}
				height={288}
				className="max-w-72 h-64 sm:h-auto sm:w-72 aspect-square rounded-4xl lg:rounded-[20%] object-cover"
			/>
			<div className="flex flex-col gap-2 sm:gap-5 text-center sm:text-left">
				<h1 className="text-3xl sm:text-5xl font-bold">Без компромиссов</h1>
				<span className="text-sm sm:text-base font-medium text-silver">
					Собираем, тестируем и <br className="hidden sm:block" /> настраиваем
					ПК — вы сразу получаете <br className="hidden sm:block" /> максимум
					мощности и гарантию.
				</span>
				<a
					href="#catalog"
					className="cursor-pointer rounded-xl sm:rounded-3xl bg-hero-gradient p-5 sm:p-6 text-base sm:text-xl font-semibold mt-3 sm:mt-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-azure/30 active:scale-[0.98] inline-block text-center"
				>
					Смотреть сборки
				</a>
			</div>
		</section>
	);
}
