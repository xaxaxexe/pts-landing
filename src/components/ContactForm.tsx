import ChatBubbleIcon from "@/components/icons/ChatBubbleIcon";
import CityIcon from "@/components/icons/CityIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import SendIcon from "@/components/icons/SendIcon";
import UserIcon from "@/components/icons/UserIcon";

export default function ContactForm() {
	return (
		<section className="w-full max-w-3xl flex flex-col gap-5 sm:gap-10 pt-10 mx-auto">
			<h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-semibold text-white">
				Присмотрел что-то? <br /> заполни форму!
			</h2>
			<form className="flex w-full flex-col items-center gap-4 rounded-2xl sm:rounded-3xl bg-carbon p-4 sm:p-8">
				<div className="flex w-full items-center gap-4 sm:gap-5 rounded-xl sm:rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
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
							className="w-full bg-transparent text-sm sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>
				<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
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
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>
				<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
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
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>
				<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
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
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>
				<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
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
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
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
						className="w-full cursor-pointer rounded-xl sm:rounded-2xl bg-hero-gradient p-3 sm:p-5 xl:p-7 text-base sm:text-xl xl:text-2xl font-medium"
					>
						Отправить форму
					</button>
				</div>
			</form>
		</section>
	);
}
