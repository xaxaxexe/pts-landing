import AvitoIcon from "@/components/icons/AvitoIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import VkIcon from "@/components/icons/VkIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";

export default function Navbar() {
	return (
		<nav className="relative z-10 flex w-full flex-col gap-6 text-base font-semibold text-slate-100">
			<div className="flex w-full items-center justify-between lg:hidden">
				<img src="/logo.png" alt="POWERTECHSTORE" className="w-20 sm:w-24" />
				<div className="flex flex-col items-end gap-2">
					<div className="flex items-center gap-3">
						<VkIcon className="h-8 w-8" />
						<TelegramIcon className="h-8 w-8" />
						<YoutubeIcon className="h-8 w-8" />
						<AvitoIcon className="h-8 w-8" />
					</div>
					<span className="text-base font-semibold leading-tight">
						+7 (917) 354 43-34
					</span>
				</div>
			</div>

			<div className="hidden w-full items-center justify-around lg:flex">
				<a className="transition hover:opacity-100" href="#">
					Главная
				</a>
				<a className="opacity-50 transition hover:opacity-100" href="#">
					Каталог
				</a>
				<a className="opacity-50 transition hover:opacity-100" href="#about">
					О нас
				</a>
			</div>
		</nav>
	);
}
