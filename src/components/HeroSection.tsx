export default function HeroSection() {
	return (
		<section className="flex w-full flex-col items-center justify-center gap-4 sm:gap-10 sm:flex-row sm:items-start">
			<div className="w-full h-54 lg:h-76 lg:w-82 rounded-4xl lg:rounded-[20%] bg-gray-300" />
			<div className="flex flex-col gap-2 sm:gap-5 text-center sm:text-left">
				<h1 className="text-3xl sm:text-5xl font-bold">
					Сборка <br className="hidden sm:block" />
					компьютеров
				</h1>
				<span className="text-sm sm:text-base font-medium text-silver">
					Выжимай все соки со своего нового <br className="hidden sm:block" />{" "}
					зверя и наслаждайся каждый день
				</span>
				<button className="cursor-pointer rounded-xl sm:rounded-3xl bg-hero-gradient p-5 sm:p-6 text-base sm:text-xl font-semibold mt-3 sm:mt-0">
					Выбрать зверя
				</button>
			</div>
		</section>
	);
}
