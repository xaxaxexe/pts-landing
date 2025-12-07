import AvitoIcon from "@/components/icons/AvitoIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import VkIcon from "@/components/icons/VkIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";

export default function Footer() {
	return (
		<footer className="bg-hero-gradient py-8 sm:py-16">
			<div className="mx-auto w-full max-w-6xl px-5 lg:px-2 flex flex-col gap-3 sm:flex-row items-center sm:gap-0 sm:justify-between">
				<div className="flex flex-col gap-1 sm:gap-4">
					<div className="flex justify-between">
						<a
							href="https://vk.com/powertechstore"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<VkIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
						<a
							href="https://t.me/powertechstore"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<TelegramIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
						<a
							href="https://www.youtube.com/@PowerTechStore1"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<YoutubeIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
						<a
							href="https://www.avito.ru/brands/powertechstore"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<AvitoIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
					</div>
					<a
						href="https://wa.me/79173544334"
						target="_blank"
						rel="noreferrer"
						className="text-xl sm:text-3xl font-semibold text-white text-center transition-colors hover:text-white/90 hover:underline underline-offset-4 decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
					>
						+7 (917) 354 43-34
					</a>
				</div>
				<a
					href="https://t.me/powertechstore102"
					target="_blank"
					rel="noreferrer"
					className="cursor-pointer rounded-xl sm:rounded-3xl bg-white px-6 sm:px-8 xl:px-10 py-3 sm:py-6 text-base sm:text-2xl font-semibold text-azure transition-all duration-300 hover:bg-gray-100 
  hover:scale-[1.02] active:scale-[0.98]"
				>
					Написать нам
				</a>
			</div>
		</footer>
	);
}
