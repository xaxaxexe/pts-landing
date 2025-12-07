"use client";

import { useState } from "react";
import type { Category, Spec, SpecOption, ColorOption } from "@/types/product";
import {
	useCreateProductMutation,
	useUploadImageMutation,
	useDeleteImageMutation,
} from "@/store/api/productsApi";

interface ProductFormProps {
	onProductAdded: () => void;
}

export default function ProductForm({ onProductAdded }: ProductFormProps) {
	const [category, setCategory] = useState<Category>("");
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const [cpu, setCpu] = useState("");
	const [gpu, setGpu] = useState("");
	const [memoryOptions, setMemoryOptions] = useState<SpecOption[]>([
		{ value: "", price: 0 },
	]);
	const [ssdOptions, setSsdOptions] = useState<SpecOption[]>([
		{ value: "", price: 0 },
	]);
	const [colorOptions, setColorOptions] = useState<ColorOption[]>([
		{ color: "black", price: 0 },
		{ color: "white", price: 0 },
	]);

	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const [createProduct, { isLoading }] = useCreateProductMutation();
	const [uploadImage] = useUploadImageMutation();
	const [deleteImage] = useDeleteImageMutation();

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setSelectedFile(file);
		setIsUploading(true);
		setMessage(null);

		try {
			const formData = new FormData();
			formData.append("file", file);

			const data = await uploadImage(formData).unwrap();

			setImage(data.url);
			setMessage({ type: "success", text: "Изображение загружено!" });
		} catch (error: any) {
			setMessage({
				type: "error",
				text: error?.data?.error || error?.message || "Ошибка загрузки",
			});
			setSelectedFile(null);
		} finally {
			setIsUploading(false);
		}
	};

	const handleDeleteImage = async () => {
		if (!image) return;

		try {
			await deleteImage({ url: image }).unwrap();

			setImage("");
			setSelectedFile(null);
			setMessage({ type: "success", text: "Изображение удалено!" });
		} catch (error: any) {
			setMessage({
				type: "error",
				text: error?.data?.error || error?.message || "Ошибка удаления",
			});
		}
	};

	const addMemoryOption = () => {
		setMemoryOptions([...memoryOptions, { value: "", price: 0 }]);
	};

	const removeMemoryOption = (index: number) => {
		if (memoryOptions.length > 1) {
			setMemoryOptions(memoryOptions.filter((_, i) => i !== index));
		}
	};

	const updateMemoryOption = (
		index: number,
		field: "value" | "price",
		value: string | number
	) => {
		const updated = [...memoryOptions];
		if (field === "value") {
			updated[index].value = value as string;
		} else {
			updated[index].price = Number(value);
		}
		setMemoryOptions(updated);
	};

	const addSsdOption = () => {
		setSsdOptions([...ssdOptions, { value: "", price: 0 }]);
	};

	const removeSsdOption = (index: number) => {
		if (ssdOptions.length > 1) {
			setSsdOptions(ssdOptions.filter((_, i) => i !== index));
		}
	};

	const updateSsdOption = (
		index: number,
		field: "value" | "price",
		value: string | number
	) => {
		const updated = [...ssdOptions];
		if (field === "value") {
			updated[index].value = value as string;
		} else {
			updated[index].price = Number(value);
		}
		setSsdOptions(updated);
	};

	const updateColorOption = (index: number, price: number) => {
		const updated = [...colorOptions];
		updated[index].price = price;
		setColorOptions(updated);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null);

		const filledMemoryOptions = memoryOptions.filter(
			(opt) => opt.value.trim() !== ""
		);
		const filledSsdOptions = ssdOptions.filter(
			(opt) => opt.value.trim() !== ""
		);

		if (
			!cpu.trim() ||
			!gpu.trim() ||
			filledMemoryOptions.length === 0 ||
			filledSsdOptions.length === 0 ||
			!category.trim() ||
			!title.trim() ||
			!price.trim() ||
			!image
		) {
			setMessage({
				type: "error",
				text: "Заполните все обязательные поля и добавьте изображение",
			});
			return;
		}

		try {
			const specs: Spec[] = [
				{ type: "cpu", value: cpu },
				{ type: "gpu", value: gpu },
				{ type: "memory", options: filledMemoryOptions },
				{ type: "ssd", options: filledSsdOptions },
				{ type: "color", colorOptions: colorOptions },
			];

			await createProduct({
				category,
				title,
				price: Number(price),
				specs,
				image,
			}).unwrap();

			setMessage({ type: "success", text: "Товар успешно добавлен!" });
			setCategory("");
			setTitle("");
			setPrice("");
			setImage("");
			setSelectedFile(null);
			setCpu("");
			setGpu("");
			setMemoryOptions([{ value: "", price: 0 }]);
			setSsdOptions([{ value: "", price: 0 }]);
			setColorOptions([
				{ color: "black", price: 0 },
				{ color: "white", price: 0 },
			]);
			onProductAdded();
		} catch (error: any) {
			setMessage({
				type: "error",
				text: error?.data?.error || error?.message || "Произошла ошибка",
			});
		}
	};

	return (
		<section className="w-full">
			<h2 className="mb-5 text-center text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
				Добавить товар
			</h2>

			<form
				onSubmit={handleSubmit}
				className="flex w-full flex-col items-center gap-4 rounded-2xl bg-carbon p-4 sm:rounded-3xl sm:p-8"
			>
				<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
					<div className="w-full">
						<label className="sr-only" htmlFor="category">
							Категория
						</label>
						<input
							id="category"
							type="text"
							placeholder="Категория (например: PTS LOW)"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
							className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-silver sm:text-xl xl:text-2xl"
						/>
					</div>
				</div>

				<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
					<div className="w-full">
						<label className="sr-only" htmlFor="title">
							Название
						</label>
						<input
							id="title"
							name="title"
							type="text"
							placeholder="Название (например: PTS PC #1)"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-silver sm:text-xl xl:text-2xl"
						/>
					</div>
				</div>

				<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6 xl:p-8">
					<div className="w-full">
						<label className="sr-only" htmlFor="price">
							Цена
						</label>
						<input
							id="price"
							name="price"
							type="number"
							placeholder="Цена (например: 133390)"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
							className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-silver sm:text-xl xl:text-2xl"
						/>
					</div>
				</div>

				<div className="w-full">
					<h3 className="mb-3 text-center text-lg font-semibold text-white sm:text-xl">
						Изображение товара
					</h3>
					<div className="flex w-full flex-col gap-3">
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6">
							<div className="w-full">
								<label
									htmlFor="file-upload"
									className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-slate-24 p-4 transition hover:bg-slate-24/80"
								>
									<span className="text-sm font-medium text-white sm:text-base">
										{selectedFile ? selectedFile.name : "Выберите изображение"}
									</span>
									{isUploading && (
										<span className="text-sm text-silver">Загрузка...</span>
									)}
								</label>
								<input
									id="file-upload"
									type="file"
									accept="image/jpeg,image/jpg,image/png,image/webp"
									onChange={handleFileChange}
									className="sr-only"
								/>
							</div>
						</div>
						{image && (
							<div className="flex w-full flex-col gap-2 rounded-2xl bg-ink p-4">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium text-silver">
										Превью:
									</span>
									<button
										type="button"
										onClick={handleDeleteImage}
										className="rounded-lg bg-red-500/20 px-3 py-1.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
									>
										✕ Удалить
									</button>
								</div>
								<img
									src={image}
									alt="Preview"
									className="h-40 w-full rounded-xl object-cover"
								/>
							</div>
						)}
					</div>
				</div>

				<div className="w-full">
					<h3 className="mb-3 text-center text-lg font-semibold text-white sm:text-xl">
						Характеристики
					</h3>
					<div className="flex flex-col gap-3">
						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6">
							<div className="w-full">
								<label className="sr-only" htmlFor="cpu">
									Процессор
								</label>
								<input
									id="cpu"
									type="text"
									placeholder="Процессор (например: Intel i7-12000k)"
									value={cpu}
									onChange={(e) => setCpu(e.target.value)}
									required
									className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-silver sm:text-lg"
								/>
							</div>
						</div>

						<div className="flex w-full items-center gap-5 rounded-2xl bg-ink p-4 sm:p-6">
							<div className="w-full">
								<label className="sr-only" htmlFor="gpu">
									Видеокарта
								</label>
								<input
									id="gpu"
									type="text"
									placeholder="Видеокарта (например: RTX 5090)"
									value={gpu}
									onChange={(e) => setGpu(e.target.value)}
									required
									className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder-silver sm:text-lg"
								/>
							</div>
						</div>

						<div className="w-full rounded-2xl bg-ink p-4">
							<div className="mb-3 flex items-center justify-between">
								<h4 className="text-sm font-semibold text-white sm:text-base">
									Оперативная память (опции)
								</h4>
								<button
									type="button"
									onClick={addMemoryOption}
									className="rounded-lg bg-hero-gradient px-3 py-1 text-xs font-semibold sm:text-sm"
								>
									+ Добавить опцию
								</button>
							</div>
							<div className="flex flex-col gap-2">
								{memoryOptions.map((option, index) => (
									<div key={index} className="flex gap-2">
										<input
											type="text"
											placeholder="Значение (например: 64 GB)"
											value={option.value}
											onChange={(e) =>
												updateMemoryOption(index, "value", e.target.value)
											}
											className="flex-1 rounded-lg bg-slate-24 p-2 text-sm text-white outline-none placeholder-silver"
										/>
										<input
											type="number"
											placeholder="Доп. цена"
											value={option.price}
											onChange={(e) =>
												updateMemoryOption(index, "price", e.target.value)
											}
											className="w-24 rounded-lg bg-slate-24 p-2 text-sm text-white outline-none placeholder-silver sm:w-32"
										/>
										{memoryOptions.length > 1 && (
											<button
												type="button"
												onClick={() => removeMemoryOption(index)}
												className="rounded-lg bg-red-500/20 px-3 text-red-500 hover:bg-red-500 hover:text-white"
											>
												✕
											</button>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="w-full rounded-2xl bg-ink p-4">
							<div className="mb-3 flex items-center justify-between">
								<h4 className="text-sm font-semibold text-white sm:text-base">
									SSD накопитель (опции)
								</h4>
								<button
									type="button"
									onClick={addSsdOption}
									className="rounded-lg bg-hero-gradient px-3 py-1 text-xs font-semibold sm:text-sm"
								>
									+ Добавить опцию
								</button>
							</div>
							<div className="flex flex-col gap-2">
								{ssdOptions.map((option, index) => (
									<div key={index} className="flex gap-2">
										<input
											type="text"
											placeholder="Значение (например: 1 TB SSD)"
											value={option.value}
											onChange={(e) =>
												updateSsdOption(index, "value", e.target.value)
											}
											className="flex-1 rounded-lg bg-slate-24 p-2 text-sm text-white outline-none placeholder-silver"
										/>
										<input
											type="number"
											placeholder="Доп. цена"
											value={option.price}
											onChange={(e) =>
												updateSsdOption(index, "price", e.target.value)
											}
											className="w-24 rounded-lg bg-slate-24 p-2 text-sm text-white outline-none placeholder-silver sm:w-32"
										/>
										{ssdOptions.length > 1 && (
											<button
												type="button"
												onClick={() => removeSsdOption(index)}
												className="rounded-lg bg-red-500/20 px-3 text-red-500 hover:bg-red-500 hover:text-white"
											>
												✕
											</button>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="w-full rounded-2xl bg-ink p-4">
							<div className="mb-3">
								<h4 className="text-sm font-semibold text-white sm:text-base">
									Цвет (опции)
								</h4>
							</div>
							<div className="flex flex-col gap-2">
								{colorOptions.map((option, index) => (
									<div key={index} className="flex gap-2 items-center">
										<div
											className={`w-8 h-8 rounded-full border-2 ${
												option.color === "black"
													? "bg-black border-white"
													: "bg-white border-black"
											}`}
										/>
										<span className="text-sm text-white font-medium flex-1">
											{option.color === "black" ? "Черный" : "Белый"}
										</span>
										<input
											type="number"
											placeholder="Доп. цена"
											value={option.price}
											onChange={(e) =>
												updateColorOption(index, Number(e.target.value))
											}
											className="w-24 rounded-lg bg-slate-24 p-2 text-sm text-white outline-none placeholder-silver sm:w-32"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{message && (
					<div
						className={`w-full rounded-xl p-4 text-center font-semibold ${
							message.type === "success"
								? "bg-green-500/20 text-green-400"
								: "bg-red-500/20 text-red-400"
						}`}
					>
						{message.text}
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className="mt-2 w-full cursor-pointer rounded-xl bg-hero-gradient p-3 text-base font-medium disabled:opacity-50 sm:rounded-2xl sm:p-5 sm:text-xl xl:p-7 xl:text-2xl"
				>
					{isLoading ? "Добавление..." : "Добавить товар"}
				</button>
			</form>
		</section>
	);
}
