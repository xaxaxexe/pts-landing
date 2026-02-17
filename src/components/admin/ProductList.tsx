"use client";

import React from "react";
import MemoryCardIcon from "@/components/icons/MemoryCardIcon";
import GpuCardIcon from "@/components/icons/GpuCardIcon";
import ProcessorIcon from "@/components/icons/ProcessorIcon";
import SsdIcon from "@/components/icons/SsdIcon";
import type { Product, SpecType } from "@/types/product";
import {
	useGetProductsQuery,
	useDeleteProductMutation,
} from "@/store/api/productsApi";

const iconMap: Record<SpecType, React.ReactElement> = {
	memory: <MemoryCardIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
	gpu: <GpuCardIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
	cpu: <ProcessorIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
	ssd: <SsdIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
	color: (
		<div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-linear-to-r from-black to-white border border-white" />
	),
};

interface ProductListProps {
	onEditProduct?: (product: Product) => void;
}

export default function ProductList({ onEditProduct }: ProductListProps) {
	const { data, isLoading, error } = useGetProductsQuery();
	const [deleteProduct] = useDeleteProductMutation();

	const handleDelete = async (productId: string) => {
		if (!confirm("Вы уверены, что хотите удалить этот товар?")) {
			return;
		}

		try {
			await deleteProduct(productId).unwrap();
		} catch (error) {
			alert(
				error instanceof Error ? error.message : "Ошибка при удалении товара",
			);
		}
	};

	if (isLoading) {
		return (
			<div className="flex w-full justify-center py-10">
				<div className="text-xl font-semibold text-silver">Загрузка...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex w-full justify-center py-10">
				<div className="rounded-xl bg-red-500/20 p-4 text-center font-semibold text-red-400">
					Ошибка при загрузке товаров
				</div>
			</div>
		);
	}

	if (!data || data.products.length === 0) {
		return (
			<div className="flex w-full justify-center py-10">
				<div className="text-xl font-semibold text-silver">
					Товары не найдены. Добавьте первый товар!
				</div>
			</div>
		);
	}

	const { products } = data;

	const groupedProducts = products.reduce(
		(acc, product) => {
			if (!acc[product.category]) {
				acc[product.category] = [];
			}
			acc[product.category].push(product);
			return acc;
		},
		{} as Record<string, Product[]>,
	);

	return (
		<section className="w-full">
			<h2 className="mb-5 text-center text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
				Список товаров ({products.length})
			</h2>

			<div className="flex flex-col gap-10">
				{Object.entries(groupedProducts).map(([category, categoryProducts]) => (
					<div key={category} className="flex flex-col gap-5">
						<h3 className="text-center text-xl font-semibold text-white sm:text-2xl">
							{category}
						</h3>
						<div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{categoryProducts.map((product) => (
								<div
									key={product._id}
									className="relative flex flex-col gap-3 rounded-2xl bg-carbon p-3 sm:rounded-3xl sm:p-4 md:p-5"
								>
									<div className="absolute right-2 top-2 flex gap-1.5">
										{onEditProduct && (
											<button
												onClick={() => onEditProduct(product)}
												className="flex h-8 w-8 items-center justify-center rounded-full bg-azure/20 text-azure transition hover:bg-azure hover:text-white sm:h-10 sm:w-10"
												aria-label="Редактировать товар"
											>
												<svg
													className="h-4 w-4 sm:h-5 sm:w-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													/>
												</svg>
											</button>
										)}
										<button
											onClick={() => handleDelete(product._id)}
											className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-500 transition hover:bg-red-500 hover:text-white sm:h-10 sm:w-10"
											aria-label="Удалить товар"
										>
											<svg
												className="h-4 w-4 sm:h-5 sm:w-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>

									<img
										src={product.image}
										alt={product.title}
										className="aspect-4/3 rounded-xl object-cover sm:rounded-2xl"
									/>

									<div className="flex items-center justify-between text-base sm:text-lg lg:text-xl">
										<span className="font-bold leading-tight">
											{product.title}
										</span>
										<span className="font-semibold leading-tight">
											{product.price.toLocaleString("ru-RU")} ₽
										</span>
									</div>

									<ul className="flex flex-col gap-2">
										{product.specs.map((spec, index) => {
											if (spec.type === "cpu" || spec.type === "gpu") {
												return (
													<li
														key={`${product._id}-${spec.type}-${index}`}
														className="flex items-center justify-start gap-2 text-xs text-graphite sm:text-sm"
													>
														{iconMap[spec.type]}
														<span className="text-sm font-medium">
															{spec.value}
														</span>
													</li>
												);
											}

											if (spec.options && spec.options.length > 0) {
												const firstOption = spec.options[0];
												return (
													<li
														key={`${product._id}-${spec.type}-${index}`}
														className="flex items-center justify-start gap-2 text-xs text-graphite sm:text-sm"
													>
														{iconMap[spec.type]}
														<span className="text-sm font-medium">
															{firstOption.value}
															{firstOption.price > 0 &&
																` (+${firstOption.price.toLocaleString(
																	"ru-RU",
																)} р.)`}
														</span>
													</li>
												);
											}

											return null;
										})}
									</ul>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
