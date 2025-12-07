import Image from "next/image";
import AvitoIcon from "@/components/icons/AvitoIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import VkIcon from "@/components/icons/VkIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";

export default function Navbar() {
	return (
		<nav className="relative z-10 flex w-full flex-col gap-6 text-base font-semibold text-white">
			<div className="flex w-full items-center justify-between">
				<div className="relative h-14 w-24 sm:h-20 sm:w-36 lg:h-16 lg:w-28">
					<Image
						src="/logo.png"
						alt="POWERTECHSTORE_LOGO"
						fill
						sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 140px"
						className="object-contain"
						priority
					/>
				</div>
				<div className="hidden lg:flex w-full items-center justify-around ">
					<a className="transition hover:opacity-100" href="#">
						Главная
					</a>
					<a
						className="opacity-50 transition hover:opacity-100"
						href="#catalog"
					>
						Каталог
					</a>
					<a className="opacity-50 transition hover:opacity-100" href="#about">
						О нас
					</a>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center gap-1 sm:gap-3">
						<a
							href="https://vk.com/powertechstore"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<VkIcon className="w-7 h-7 sm:h-8 sm:w-8 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
						<a
							href="https://t.me/powertechstore"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<TelegramIcon className="w-7 h-7 sm:h-8 sm:w-8 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
						<a
							href="https://www.youtube.com/@PowerTechStore1"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<YoutubeIcon className="w-7 h-7 sm:h-8 sm:w-8 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
						<a
							href="https://www.avito.ru/brands/powertechstore"
							target="_blank"
							rel="noreferrer"
							className="inline-flex"
						>
							<AvitoIcon className="w-7 h-7 sm:h-8 sm:w-8 text-white transition duration-200 hover:scale-110 hover:drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] cursor-pointer" />
						</a>
					</div>

					<a
						href="https://wa.me/79173544334"
						target="_blank"
						rel="noreferrer"
						className="text-xs sm:text-base text-center font-semibold leading-tight text-white transition-colors duration-300 hover:text-azure hover:underline underline-offset-4 decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure"
					>
						+7 (917) 354 43-34
					</a>
				</div>
			</div>
		</nav>
	);
}
