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

const PAGE_CONTAINER = "mx-auto w-full max-w-6xl px-5 lg:px-2";

export default function Home() {
	return (
		<>
			<BackgroundGlow />
			<header className={`w-full max-w-3xl pt-10 pb-15 mx-auto px-5 lg:px-2`}>
				<Navbar />
			</header>
			<main
				className={`${PAGE_CONTAINER} pb-20 flex flex-col gap-14 px-5 lg:px-2 mt-4 lg:mt-10`}
			>
				<section className="flex w-full flex-col items-center justify-center gap-4 sm:gap-10 sm:flex-row sm:items-start">
					<div className="w-full h-54 lg:h-76 lg:w-82 rounded-4xl lg:rounded-[20%] bg-gray-300" />
					<div className="flex flex-col gap-2 sm:gap-5 text-center sm:text-left">
						<h1 className="text-3xl sm:text-5xl font-bold">
							Сборка <br className="hidden sm:block" />
							компьютеров
						</h1>
						<span className="text-sm sm:text-base font-medium text-silver">
							Выжимай все соки со своего нового{" "}
							<br className="hidden sm:block" /> зверя и наслаждайся каждый день
						</span>
						<button className="cursor-pointer rounded-xl sm:rounded-3xl bg-hero-gradient p-5 sm:p-6 text-base sm:text-xl font-semibold mt-3 sm:mt-0">
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
					className="flex w-full flex-col items-center gap-6 sm:gap-9 lg:gap-15 pt-10"
				>
					<h2 className="text-center text-4xl sm:text-5xl lg:text-7xl font-bold">
						О НАС
					</h2>
					<p className="text-center text-md sm:text-2xl lg:text-3xl font-medium text-silver">
						<span className="font-bold text-white">POWERTECHSTORE</span> — это
						прекрасное решение для сборки компьютера именно мы можем в короткий
						срок собрать и доставить вам вашего железного зверя
					</p>
					<dl className="w-full flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between pt-5 sm:pt-20">
						<div className="flex flex-col justify-center items-center gap-1">
							<dt className="font-semibold text-5xl sm:text-7xl">1000+</dt>
							<dd className="text-md sm:text-2xl text-silver font-medium">
								Клиентов
							</dd>
						</div>
						<div className="flex flex-col justify-center items-center gap-1">
							<dt className="font-semibold text-5xl sm:text-7xl">1000+</dt>
							<dd className="text-md sm:text-2xl text-silver font-medium">
								Компьютеров собрано
							</dd>
						</div>
						<div className="flex flex-col justify-center items-center gap-1">
							<dt className="font-semibold text-5xl sm:text-7xl">6</dt>
							<dd className="text-md sm:text-2xl text-silver font-medium">
								Лет на рынке
							</dd>
						</div>
					</dl>

					<dl className="grid w-full gap-10 pt-5 sm:pt-12 text-center sm:grid-cols-2">
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
				<section className="w-full max-w-3xl flex flex-col gap-5 sm:gap-10 pt-10 mx-auto">
					<h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-semibold">
						Присмотрел что-то? <br /> заполни форму!
					</h2>
					<form className="flex w-full flex-col items-center gap-4 rounded-2xl sm:rounded-3xl bg-carbon p-4 sm:p-8">
						<div className="flex w-full items-center gap-4 sm:gap-5 rounded-xl sm:rounded-2xl bg-ink p-4 sm:p-8">
							<UserIcon className="h-6 w-6 sm:h-7 sm:w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="name">
									Имя
								</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder="Имя"
									className="w-full bg-transparent text-md sm:text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-8">
							<SendIcon className="h-6 w-6 sm:h-7 sm:w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="telegram">
									Ваш Telegram для связи
								</label>
								<input
									id="telegram"
									name="telegram"
									type="text"
									placeholder="Ваш Telegram для связи"
									className="w-full bg-transparent text-md sm:text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-8">
							<PhoneIcon className="h-6 w-6 sm:h-7 sm:w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="phone">
									Номер телефона
								</label>
								<input
									id="phone"
									name="phone"
									type="text"
									placeholder="Номер телефона"
									className="w-full bg-transparent text-md sm:text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-8">
							<ChatBubbleIcon className="h-6 w-6 sm:h-7 sm:w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="email">
									Электронная почта
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="Электронная почта"
									className="w-full bg-transparent text-md sm:text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-8">
							<CityIcon className="h-6 w-6 sm:h-7 sm:w-7 text-silver" />
							<div className="w-full">
								<label className="sr-only" htmlFor="city">
									Город
								</label>
								<input
									id="city"
									name="city"
									type="text"
									placeholder="Город"
									className="w-full bg-transparent text-md sm:text-2xl font-medium text-white outline-none placeholder-silver"
								/>
							</div>
						</div>

						<div className="mt-2 sm:mt-6 flex w-full flex-col items-center justify-center gap-3">
							<label
								className="relative flex sm:inline-flex cursor-pointer items-center gap-2"
								htmlFor="consent"
							>
								<input
									id="consent"
									type="checkbox"
									defaultChecked
									className="peer sr-only"
								/>
								<span className="flex w-4 h-4 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-ink transition">
									<span className="w-2 h-2 sm:h-4 sm:w-4 rounded-full bg-azure transition peer-checked:bg-azure" />
								</span>
								<span className="text-[0.65rem] sm:text-base font-semibold">
									Я согласен на обработку персональных данных
								</span>
							</label>
							<button
								type="submit"
								className="w-full cursor-pointer rounded-xl sm:rounded-2xl bg-hero-gradient p-3 sm:p-7 text-base sm:text-2xl font-medium"
							>
								Отправить форму
							</button>
						</div>
					</form>
				</section>
				<section className="flex w-full flex-col gap-5 py-10">
					<h2 className="text-center text-3xl sm:text-5xl font-semibold">
						Мы на карте
					</h2>
					<div className="h-72 sm:h-134 w-full rounded-[3rem] bg-gray-300"></div>
				</section>
			</main>

			<footer className="bg-hero-gradient py-8 sm:py-16">
				<div
					className={`${PAGE_CONTAINER} flex flex-col gap-3 sm:flex-row items-center sm:gap-0 sm:justify-between`}
				>
					<div className="flex flex-col gap-1 sm:gap-4">
						<div className="flex justify-between">
							<VkIcon className="w-10 h-10 lg:h-14 lg:w-14" />
							<TelegramIcon className="w-10 h-10  lg:h-14 lg:w-14" />
							<YoutubeIcon className="w-10 h-10 lg:h-14 lg:w-14" />
							<AvitoIcon className="w-10 h-10 lg:h-14 lg:w-14" />
						</div>
						<span className="text-xl sm:text-3xl font-semibold">
							+7 (917) 354 43-34
						</span>
					</div>
					<button className="cursor-pointer rounded-xl sm:rounded-3xl bg-white px-6 sm:px-10 py-3 sm:py-6 text-base sm:text-2xl font-semibold text-azure">
						Написать нам
					</button>
				</div>
			</footer>
		</>
	);
}
