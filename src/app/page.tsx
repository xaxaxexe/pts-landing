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

export default function Home() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-[#060606] text-slate-100">
			<BackgroundGlow />
			<Navbar />
			<main className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-14 px-6 py-10">
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

				<section className="w-full flex flex-col gap-15 px-12 pt-20">
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
				<section className="w-full flex flex-col justify-start items-center gap-15 px-4 pt-20">
					<h2 className="text-7xl text-center font-bold">О НАС</h2>
					<span className="text-3xl text-silver font-medium text-center">
						<span className="text-white font-bold">POWERTECHSTORE</span> — это
						прекрасное решение для сборки компьютера именно мы можем в короткий
						срок собрать и доставить вам вашего железного зверя
					</span>
					<ul className="w-full flex justify-between text-7xl pt-20">
						<li className="flex flex-col justify-center items-center gap-1">
							<span className="font-semibold">1000+</span>
							<span className="text-2xl text-silver font-medium">Клиентов</span>
						</li>
						<li className="flex flex-col justify-center items-center gap-1">
							<span className="font-semibold">1000+</span>
							<span className="text-2xl text-silver font-medium">
								Компьютеров собрано
							</span>
						</li>
						<li className="flex flex-col justify-center items-center gap-1">
							<span className="font-semibold">6</span>
							<span className="text-2xl text-silver font-medium">
								Лет на рынке
							</span>
						</li>
					</ul>

					<ul className="w-full flex justify-between pt-20 text-7xl">
						<li className="flex flex-col justify-center items-center">
							<div className="flex justify-center items-center gap-4 font-semibold">
								<HeartIcon className="w-14 h-14" />
								<span>Гарантия</span>
							</div>
							<span className="text-2xl text-silver font-medium">1 год</span>
						</li>
						<li className="flex flex-col justify-center items-center">
							<div className="flex justify-center items-center gap-4 font-semibold">
								<DeliveryIcon className="w-14 h-14" />
								<span>Доставка</span>
							</div>
							<span className="text-2xl text-silver font-medium">
								по всей РФ и РБ
							</span>
						</li>
					</ul>
				</section>
				<section className="w-full flex flex-col gap-15 px-12 pt-20">
					{" "}
					<h2 className="text-5xl text-center font-semibold">
						Присмотрел что-то? <br /> заполни форму!
					</h2>
					<div className="w-full flex flex-col justify-center items-center bg-carbon p-6 gap-4 rounded-3xl">
						<div className="w-full flex items-center gap-5 rounded-2xl bg-ink p-8">
							<UserIcon className="h-7 w-7 text-silver" />
							<input
								type="text"
								placeholder="Имя"
								className="w-full bg-transparent text-white text-2xl placeholder-silver
  outline-none font-medium"
							/>
						</div>
						<div className="w-full flex items-center gap-5 rounded-2xl bg-ink p-8">
							<SendIcon className="h-7 w-7 text-silver" />
							<input
								type="text"
								placeholder="Ваш Telegram для связи"
								className="w-full bg-transparent text-white text-2xl placeholder-silver
  outline-none font-medium"
							/>
						</div>
						<div className="w-full flex items-center gap-5 rounded-2xl bg-ink p-8">
							<PhoneIcon className="h-7 w-7 text-silver" />
							<input
								type="text"
								placeholder="Номер телефона"
								className="w-full bg-transparent text-white text-2xl placeholder-silver
  outline-none font-medium"
							/>
						</div>
						<div className="w-full flex items-center gap-5 rounded-2xl bg-ink p-8">
							<ChatBubbleIcon className="h-7 w-7 text-silver" />
							<input
								type="text"
								placeholder="Электронная почта"
								className="w-full bg-transparent text-white text-2xl placeholder-silver
  outline-none font-medium"
							/>
						</div>
						<div className="w-full flex items-center gap-5 rounded-2xl bg-ink p-8">
							<CityIcon className="h-7 w-7 text-silver" />
							<input
								type="text"
								placeholder="Город"
								className="w-full bg-transparent text-white text-2xl placeholder-silver
  outline-none font-medium"
							/>
						</div>

						<div className="w-full flex flex-col justify-center items-center mt-6 gap-3">
							<label className="relative inline-flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									defaultChecked
									className="peer sr-only"
								/>
								<span
									className="flex h-8 w-8 items-center justify-center
  rounded-full bg-ink transition"
								>
									<span
										className="h-4 w-4 rounded-full bg-azure
  transition peer-checked:bg-azure"
									/>
								</span>
								<span className="text-base font-semibold">
									Я согласен на обработку персональных данных
								</span>
							</label>
							<button className="w-full cursor-pointer rounded-xl bg-hero-gradient p-7 text-2xl font-medium">
								Отправить форму
							</button>
						</div>
					</div>
				</section>
				<section className="w-full flex flex-col gap-5 py-20">
					<h2 className="text-5xl text-center font-semibold">Мы на карте </h2>
					<div className="w-full bg-gray-300 rounded-[3rem] h-134"></div>
				</section>
			</main>

			<footer className="bg-hero-gradient py-16">
				<div className="flex justify-between items-center max-w-5xl mx-auto">
					<div className="flex flex-col gap-4">
						<div className="flex gap-3 ">
							<VkIcon className="h-14 w-14" />
							<TelegramIcon className="h-14 w-14" />
							<YoutubeIcon className="h-14 w-14" />
							<AvitoIcon className="h-14 w-14" />
						</div>
						<span className="text-3xl font-semibold">+7 (917) 354 43-34</span>
					</div>
					<button className="rounded-3xl bg-white text-azure py-6 px-10 text-2xl font-semibold cursor-pointer">
						Написать нам
					</button>
				</div>
			</footer>
		</div>
	);
}
