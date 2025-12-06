import BackgroundGlow from "@/components/BackgroundGlow";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import AvitoIcon from "@/components/icons/AvitoIcon";
import ChatBubbleIcon from "@/components/icons/ChatBubbleIcon";
import CityIcon from "@/components/icons/CityIcon";
import DeliveryIcon from "@/components/icons/DeliveryIcon";

import HeartIcon from "@/components/icons/HeartIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import SendIcon from "@/components/icons/SendIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import UserIcon from "@/components/icons/UserIcon";
import VkIcon from "@/components/icons/VkIcon";
import YoutubeIcon from "@/components/icons/YoutubeIcon";

const PAGE_CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10";

export default function Home() {
	return (
		<>
			<header className={`w-full max-w-3xl relative z-10 pt-5 pb-15 mx-auto`}>
				<Navbar />
			</header>
			<main
				className={`${PAGE_CONTAINER} relative z-10 pb-20 flex flex-col gap-16`}
			>
				<section className="flex w-full flex-col items-center justify-center gap-10 sm:flex-row sm:items-start">
					<div className="h-76 w-82 rounded-[20%] bg-gray-300" />
					<div className="flex flex-col gap-5 text-center sm:text-left">
						<h1 className="text-5xl font-bold">
							Сборка <br /> компьютеров
						</h1>
						<span className="text-base font-medium text-silver">
							Выжимай все соки со своего нового <br /> зверя и наслаждайся
							каждый день
						</span>
						<button className="cursor-pointer rounded-3xl bg-hero-gradient p-6 text-xl font-semibold">
							Выбрать зверя
						</button>
					</div>
				</section>

				<section className="w-full max-w-3xl flex flex-col justify-center items-center gap-15 pt-10 mx-auto">
					<ProductSection title="PTS LOW">
						<ProductCard
							title="PTS PC #1"
							price="133 390 р."
							specs={[
								{ icon: "memory", label: "64 GB" },
								{ icon: "gpu", label: "RTX 5090" },
								{ icon: "cpu", label: "Intel i7-12000k" },
								{ icon: "ssd", label: "1 TB SSD" },
							]}
						/>
						<ProductCard
							title="PTS PC #2"
							price="142 990 р."
							specs={[
								{ icon: "memory", label: "32 GB" },
								{ icon: "gpu", label: "RTX 4080" },
								{ icon: "cpu", label: "Intel i5-13600K" },
								{ icon: "ssd", label: "1 TB SSD" },
							]}
						/>
					</ProductSection>
					<ProductSection title="PTS MEDIUM">
						<ProductCard
							title="PTS PC #1"
							price="133 390 р."
							specs={[
								{ icon: "memory", label: "64 GB" },
								{ icon: "gpu", label: "RTX 5090" },
								{ icon: "cpu", label: "Intel i7-12000k" },
								{ icon: "ssd", label: "1 TB SSD" },
							]}
						/>
						<ProductCard
							title="PTS PC #2"
							price="142 990 р."
							specs={[
								{ icon: "memory", label: "32 GB" },
								{ icon: "gpu", label: "RTX 4080" },
								{ icon: "cpu", label: "Intel i5-13600K" },
								{ icon: "ssd", label: "1 TB SSD" },
							]}
						/>
					</ProductSection>
					<ProductSection title="PTS PRO">
						<ProductCard
							title="PTS PRO"
							price="133 390 р."
							specs={[
								{ icon: "memory", label: "64 GB" },
								{ icon: "gpu", label: "RTX 5090" },
								{ icon: "cpu", label: "Intel i7-12000k" },
								{ icon: "ssd", label: "1 TB SSD" },
							]}
						/>
						<ProductCard
							title="PTS PC #2"
							price="142 990 р."
							specs={[
								{ icon: "memory", label: "32 GB" },
								{ icon: "gpu", label: "RTX 4080" },
								{ icon: "cpu", label: "Intel i5-13600K" },
								{ icon: "ssd", label: "1 TB SSD" },
							]}
						/>
					</ProductSection>
				</section>
				<section
					id="about"
					className="flex w-full flex-col items-center gap-15 pt-10"
				>
					<h2 className="text-center text-7xl font-bold">О НАС</h2>
					<p className="text-center text-3xl font-medium text-silver">
						<span className="font-bold text-white">POWERTECHSTORE</span> — это
						прекрасное решение для сборки компьютера именно мы можем в короткий
						срок собрать и доставить вам вашего железного зверя
					</p>
					<dl className="grid w-full gap-10 pt-12 text-center sm:grid-cols-3">
						<div className="flex flex-col items-center gap-1">
							<dt className="text-2xl font-medium text-silver">Клиентов</dt>
							<dd className="text-5xl font-semibold">1000+</dd>
						</div>
						<div className="flex flex-col items-center gap-1">
							<dt className="text-2xl font-medium text-silver">
								Компьютеров собрано
							</dt>
							<dd className="text-5xl font-semibold">1000+</dd>
						</div>
						<div className="flex flex-col items-center gap-1">
							<dt className="text-2xl font-medium text-silver">Лет на рынке</dt>
							<dd className="text-5xl font-semibold">6</dd>
						</div>
					</dl>

					<dl className="grid w-full gap-10 pt-12 text-center sm:grid-cols-2">
						<div className="flex flex-col items-center justify-center">
							<div className="flex items-center justify-center gap-4 font-semibold">
								<HeartIcon className="h-14 w-14" />
								<dt className="text-3xl font-semibold">Гарантия</dt>
							</div>
							<dd className="text-2xl font-medium text-silver">1 год</dd>
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="flex items-center justify-center gap-4 font-semibold">
								<DeliveryIcon className="h-14 w-14" />
								<dt className="text-3xl font-semibold">Доставка</dt>
							</div>
							<dd className="text-2xl font-medium text-silver">
								по всей РФ и РБ
							</dd>
						</div>
					</dl>
				</section>
				<section className="w-full max-w-3xl flex flex-col gap-10 pt-10 mx-auto">
					<h2 className="text-center text-5xl font-semibold">
						Присмотрел что-то? <br /> заполни форму!
					</h2>
					<form className="flex w-full flex-col items-center gap-4 rounded-3xl bg-carbon p-8">
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-8">
							<UserIcon className="h-7 w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="name">
									Имя
								</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder="Имя"
									className="w-full bg-transparent text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-8">
							<SendIcon className="h-7 w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="telegram">
									Ваш Telegram для связи
								</label>
								<input
									id="telegram"
									name="telegram"
									type="text"
									placeholder="Ваш Telegram для связи"
									className="w-full bg-transparent text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-8">
							<PhoneIcon className="h-7 w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="phone">
									Номер телефона
								</label>
								<input
									id="phone"
									name="phone"
									type="text"
									placeholder="Номер телефона"
									className="w-full bg-transparent text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-8">
							<ChatBubbleIcon className="h-7 w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="email">
									Электронная почта
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="Электронная почта"
									className="w-full bg-transparent text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-8">
							<CityIcon className="h-7 w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="city">
									Город
								</label>
								<input
									id="city"
									name="city"
									type="text"
									placeholder="Город"
									className="w-full bg-transparent text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>

						<div className="mt-6 flex w-full flex-col items-center justify-center gap-3">
							<label
								className="relative inline-flex cursor-pointer items-center gap-2"
								htmlFor="consent"
							>
								<input
									id="consent"
									type="checkbox"
									defaultChecked
									className="peer sr-only"
								/>
								<span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink transition">
									<span className="h-4 w-4 rounded-full bg-azure transition peer-checked:bg-azure" />
								</span>
								<span className="text-base font-semibold">
									Я согласен на обработку персональных данных
								</span>
							</label>
							<button
								type="submit"
								className="w-full cursor-pointer rounded-2xl bg-hero-gradient p-7 text-2xl font-medium"
							>
								Отправить форму
							</button>
						</div>
					</form>
				</section>
				<section className="flex w-full flex-col gap-5 py-10">
					<h2 className="text-center text-5xl font-semibold">Мы на карте</h2>
					<div className="h-134 w-full rounded-[3rem] bg-gray-300"></div>
				</section>
			</main>

			<footer className="bg-hero-gradient py-16">
				<div className={`${PAGE_CONTAINER} flex items-center justify-between`}>
					<div className="flex flex-col gap-4">
						<div className="flex justify-between">
							<VkIcon className="h-14 w-14" />
							<TelegramIcon className="h-14 w-14" />
							<YoutubeIcon className="h-14 w-14" />
							<AvitoIcon className="h-14 w-14" />
						</div>
						<span className="text-3xl font-semibold">+7 (917) 354 43-34</span>
					</div>
					<button className="cursor-pointer rounded-3xl bg-white px-10 py-6 text-2xl font-semibold text-azure">
						Написать нам
					</button>
				</div>
			</footer>
			<BackgroundGlow />
		</>
	);
}
