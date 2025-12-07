"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { useSelectedProduct } from "@/contexts/SelectedProductContext";
import { useCreateOrderMutation } from "@/store/api/ordersApi";
import ChatBubbleIcon from "@/components/icons/ChatBubbleIcon";
import CityIcon from "@/components/icons/CityIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import SendIcon from "@/components/icons/SendIcon";
import UserIcon from "@/components/icons/UserIcon";

const formatPhoneNumber = (value: string) => {
	const numbers = value.replace(/\D/g, "");
	if (numbers.length === 0) return "";
	if (numbers.length <= 1) return `+${numbers}`;
	if (numbers.length <= 4)
		return `+${numbers.slice(0, 1)} (${numbers.slice(1)}`;
	if (numbers.length <= 7)
		return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(
			4
		)}`;
	if (numbers.length <= 9)
		return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(
			4,
			7
		)}-${numbers.slice(7)}`;
	return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(
		4,
		7
	)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
};

const contactSchema = z.object({
	name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
	telegram: z
		.string()
		.refine(
			(val) => !val || /^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/.test(val),
			"Неверный формат Telegram"
		),
	phone: z
		.string()
		.min(1, "Телефон обязателен")
		.regex(
			/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
			"Введите полный номер телефона"
		),
	email: z
		.string()
		.refine(
			(val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
			"Неверный формат email"
		),
	city: z.string().min(2, "Город должен содержать минимум 2 символа"),
	consent: z.boolean().refine((val) => val === true, {
		message: "Необходимо согласие на обработку данных",
	}),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
	const { selectedProduct, clearSelectedProduct } = useSelectedProduct();
	const [createOrder, { isLoading }] = useCreateOrderMutation();
	const [message, setMessage] = useState<{
		text: string;
		type: "success" | "error";
	} | null>(null);

	const formik = useFormik<ContactFormValues>({
		initialValues: {
			name: "",
			telegram: "",
			phone: "",
			email: "",
			city: "",
			consent: false,
		},
		validate: (values) => {
			try {
				contactSchema.parse(values);
				return {};
			} catch (error) {
				if (error instanceof z.ZodError) {
					return error.issues.reduce((acc: Record<string, string>, curr) => {
						const path = curr.path.join(".");
						acc[path] = curr.message;
						return acc;
					}, {} as Record<string, string>);
				}
				return {};
			}
		},
		onSubmit: async (values, { resetForm }) => {
			setMessage(null);
			try {
				const orderData = {
					name: values.name,
					telegram: values.telegram,
					phone: values.phone,
					email: values.email,
					city: values.city,
					consent: values.consent,
					data: selectedProduct
						? {
								_id: selectedProduct._id,
								category: selectedProduct.category,
								title: selectedProduct.title,
								price: selectedProduct.price,
								image: selectedProduct.image,
								selectedOptions: selectedProduct.selectedOptions,
								totalPrice: selectedProduct.totalPrice,
						  }
						: null,
				};

				const result = await createOrder(orderData).unwrap();

				setMessage({
					text: result.message || "Заявка успешно отправлена!",
					type: "success",
				});
				resetForm();
				clearSelectedProduct();
			} catch (error: any) {
				console.error("Error submitting form:", error);
				setMessage({
					text: error.data?.message || "Произошла ошибка при отправке формы",
					type: "error",
				});
			}
		},
	});

	return (
		<section
			id="contact-form"
			className="w-full max-w-3xl flex flex-col gap-5 sm:gap-10 pt-10 mx-auto"
		>
			<h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-semibold text-white">
				Присмотрел что-то? <br /> заполни форму!
			</h2>
			<form
				onSubmit={formik.handleSubmit}
				className="flex w-full flex-col items-center gap-4 rounded-2xl sm:rounded-3xl bg-carbon p-4 sm:p-8"
			>
				<div
					className={`flex w-full items-center gap-4 sm:gap-5 rounded-xl sm:rounded-2xl bg-ink p-4 sm:p-6 xl:p-8 transition-all duration-300 ${
						formik.touched.name && formik.errors.name && formik.values.name
							? "ring-2 ring-red-500/50"
							: ""
					} ${
						formik.touched.name && !formik.errors.name && formik.values.name
							? "ring-2 ring-green-500/50"
							: ""
					}`}
				>
					<UserIcon
						className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
							formik.touched.name && formik.errors.name && formik.values.name
								? "text-red-500"
								: formik.touched.name &&
								  !formik.errors.name &&
								  formik.values.name
								? "text-green-500"
								: "text-silver"
						}`}
					/>
					<div className="w-full">
						<label className="sr-only" htmlFor="name">
							Имя
						</label>
						<input
							id="name"
							name="name"
							type="text"
							placeholder="Имя"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>

				<div
					className={`flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8 transition-all duration-300 ${
						formik.touched.telegram &&
						formik.errors.telegram &&
						formik.values.telegram
							? "ring-2 ring-red-500/50"
							: ""
					} ${
						formik.touched.telegram &&
						!formik.errors.telegram &&
						formik.values.telegram
							? "ring-2 ring-green-500/50"
							: ""
					}`}
				>
					<SendIcon
						className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
							formik.touched.telegram &&
							formik.errors.telegram &&
							formik.values.telegram
								? "text-red-500"
								: formik.touched.telegram &&
								  !formik.errors.telegram &&
								  formik.values.telegram
								? "text-green-500"
								: "text-silver"
						}`}
					/>
					<div className="w-full">
						<label className="sr-only" htmlFor="telegram">
							Ваш Telegram для связи
						</label>
						<input
							id="telegram"
							name="telegram"
							type="text"
							placeholder="Ваш Telegram для связи (не обязательно)"
							value={formik.values.telegram}
							onChange={(e) => {
								let value = e.target.value;
								if (value && !value.startsWith("@")) {
									value = "@" + value;
								}
								formik.setFieldValue("telegram", value);
							}}
							onBlur={formik.handleBlur}
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>

				<div
					className={`flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8 transition-all duration-300 ${
						formik.touched.phone && formik.errors.phone && formik.values.phone
							? "ring-2 ring-red-500/50"
							: ""
					} ${
						formik.touched.phone && !formik.errors.phone && formik.values.phone
							? "ring-2 ring-green-500/50"
							: ""
					}`}
				>
					<PhoneIcon
						className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
							formik.touched.phone && formik.errors.phone && formik.values.phone
								? "text-red-500"
								: formik.touched.phone &&
								  !formik.errors.phone &&
								  formik.values.phone
								? "text-green-500"
								: "text-silver"
						}`}
					/>
					<div className="w-full">
						<label className="sr-only" htmlFor="phone">
							Номер телефона
						</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							placeholder="Номер телефона"
							value={formik.values.phone}
							onChange={(e) => {
								const formatted = formatPhoneNumber(e.target.value);
								formik.setFieldValue("phone", formatted);
							}}
							onBlur={formik.handleBlur}
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>

				<div
					className={`flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8 transition-all duration-300 ${
						formik.touched.email && formik.errors.email && formik.values.email
							? "ring-2 ring-red-500/50"
							: ""
					} ${
						formik.touched.email && !formik.errors.email && formik.values.email
							? "ring-2 ring-green-500/50"
							: ""
					}`}
				>
					<ChatBubbleIcon
						className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
							formik.touched.email && formik.errors.email && formik.values.email
								? "text-red-500"
								: formik.touched.email &&
								  !formik.errors.email &&
								  formik.values.email
								? "text-green-500"
								: "text-silver"
						}`}
					/>
					<div className="w-full">
						<label className="sr-only" htmlFor="email">
							Электронная почта
						</label>
						<input
							id="email"
							name="email"
							type="email"
							placeholder="Электронная почта (не обязательно)"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>

				<div
					className={`flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8 transition-all duration-300 ${
						formik.touched.city && formik.errors.city && formik.values.city
							? "ring-2 ring-red-500/50"
							: ""
					} ${
						formik.touched.city && !formik.errors.city && formik.values.city
							? "ring-2 ring-green-500/50"
							: ""
					}`}
				>
					<CityIcon
						className={`h-6 w-6 sm:h-7 sm:w-7 transition-colors ${
							formik.touched.city && formik.errors.city && formik.values.city
								? "text-red-500"
								: formik.touched.city &&
								  !formik.errors.city &&
								  formik.values.city
								? "text-green-500"
								: "text-silver"
						}`}
					/>
					<div className="w-full">
						<label className="sr-only" htmlFor="city">
							Город
						</label>
						<input
							id="city"
							name="city"
							type="text"
							placeholder="Город"
							value={formik.values.city}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="w-full bg-transparent sm:text-xl xl:text-2xl font-medium text-white outline-none placeholder-silver"
						/>
					</div>
				</div>

				<div className="mt-2 sm:mt-6 flex w-full flex-col items-center justify-center gap-3">
					<label className="group relative flex sm:inline-flex cursor-pointer items-center gap-2">
						<input
							id="consent"
							name="consent"
							type="checkbox"
							checked={formik.values.consent}
							onChange={(e) =>
								formik.setFieldValue("consent", e.target.checked)
							}
							onBlur={formik.handleBlur}
							className="peer sr-only"
						/>
						<span className="flex w-4 h-4 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-ink transition group-hover:bg-border">
							<span
								className={`w-2 h-2 sm:h-4 sm:w-4 rounded-full transition ${
									formik.values.consent ? "bg-azure" : "bg-transparent"
								}`}
							/>
						</span>
						<span className="text-[0.65rem] sm:text-base font-semibold">
							Я согласен на обработку персональных данных
						</span>
					</label>
					<button
						type="submit"
						disabled={!formik.isValid || isLoading}
						className="w-full cursor-pointer rounded-xl sm:rounded-2xl bg-hero-gradient p-3 sm:p-5 xl:p-7 text-base sm:text-xl xl:text-2xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-azure/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
					>
						{isLoading ? "Отправка..." : "Отправить форму"}
					</button>

					{message && (
						<div
							className={`w-full rounded-xl p-4 text-center text-sm sm:text-base font-semibold ${
								message.type === "success"
									? "bg-green-500/20 text-green-400"
									: "bg-red-500/20 text-red-400"
							}`}
						>
							{message.text}
						</div>
					)}
				</div>
			</form>
		</section>
	);
}
