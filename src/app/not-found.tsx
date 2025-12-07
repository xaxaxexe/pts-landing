import Link from "next/link";
import BackgroundGlow from "@/components/BackgroundGlow";

export default function NotFound() {
	return (
		<div className=" min-h-screen text-foreground flex flex-col items-center justify-center px-5 overflow-hidden">
			<BackgroundGlow />
			<main className=" flex flex-col items-center gap-6 text-center max-w-lg">
				<p className="text-xs font-semibold uppercase tracking-[0.3em] text-ash">
					404
				</p>
				<h1 className="text-3xl sm:text-4xl font-bold text-white">
					Страница не найдена
				</h1>
				<p className="text-silver sm:text-lg">
					Кажется, вы попали не туда. Вернёмся к сборкам или свяжемся?
				</p>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
					<Link
						href="/"
						className="flex-1 sm:flex-none rounded-2xl bg-hero-gradient px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-azure/30 active:scale-[0.98] text-center"
					>
						На главную
					</Link>
				</div>
			</main>
		</div>
	);
}
