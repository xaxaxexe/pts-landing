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
						<VkIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
						<TelegramIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
						<YoutubeIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
						<AvitoIcon className="w-10 h-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
					</div>
					<span className="text-xl sm:text-3xl font-semibold">
						+7 (917) 354 43-34
					</span>
				</div>
				<button className="cursor-pointer rounded-xl sm:rounded-3xl bg-white px-6 sm:px-8 xl:px-10 py-3 sm:py-6 text-base sm:text-2xl font-semibold text-azure">
					Написать нам
				</button>
			</div>
		</footer>
	);
}
