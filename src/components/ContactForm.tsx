"use client";

import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { useSelectedProduct } from "@/contexts/SelectedProductContext";
import { useCreateOrderMutation } from "@/store/api/ordersApi";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";
import RadioButton from "@/components/ui/RadioButton";
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
	const { selectedProduct, clearSelectedProduct, registerFormFocus } =
		useSelectedProduct();
	const [createOrder, { isLoading }] = useCreateOrderMutation();
	const [message, setMessage] = useState<{
		text: string;
		type: "success" | "error";
	} | null>(null);
	const nameInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		registerFormFocus(() => {
			nameInputRef.current?.focus({ preventScroll: true });
		});
		return () => registerFormFocus(null);
	}, [registerFormFocus]);

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
			} catch (error: unknown) {
				console.error("Error submitting form:", error);
				const err = error as { data?: { message?: string } };
				setMessage({
					text: err.data?.message || "Произошла ошибка при отправке формы",
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
				<FormInput
					icon={<UserIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
					id="name"
					name="name"
					placeholder="Имя"
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					touched={formik.touched.name}
					error={formik.errors.name}
					inputRef={nameInputRef}
				/>

				<FormInput
					icon={<SendIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
					id="telegram"
					name="telegram"
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
					touched={formik.touched.telegram}
					error={formik.errors.telegram}
				/>

				<FormInput
					icon={<PhoneIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
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
					touched={formik.touched.phone}
					error={formik.errors.phone}
				/>

				<FormInput
					icon={<ChatBubbleIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
					id="email"
					name="email"
					type="email"
					placeholder="Электронная почта (не обязательно)"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					touched={formik.touched.email}
					error={formik.errors.email}
				/>

				<FormInput
					icon={<CityIcon className="h-6 w-6 sm:h-8 sm:w-8" />}
					id="city"
					name="city"
					placeholder="Город"
					value={formik.values.city}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					touched={formik.touched.city}
					error={formik.errors.city}
				/>

				<div className="mt-2 sm:mt-6 flex w-full flex-col items-center justify-center gap-3">
					<RadioButton
						id="consent"
						name="consent"
						type="checkbox"
						checked={formik.values.consent}
						onChange={() =>
							formik.setFieldValue("consent", !formik.values.consent)
						}
					>
						Я согласен на обработку персональных данных
					</RadioButton>
					<Button
						type="submit"
						disabled={!formik.isValid}
						fullWidth
						size="lg"
						isLoading={isLoading}
						loadingText="Отправка..."
					>
						Отправить форму
					</Button>

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
