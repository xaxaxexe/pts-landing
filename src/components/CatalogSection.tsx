"use client";

import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import { useGetProductsQuery } from "@/store/api/productsApi";
import type { Spec, SpecType } from "@/types/product";

const iconMap: Record<SpecType, SpecType> = {
	memory: "memory",
	gpu: "gpu",
	cpu: "cpu",
	ssd: "ssd",
};

const formatSpecsForCard = (specs: Spec[]) => {
	return specs.map((spec) => ({
		icon: iconMap[spec.type],
		label:
			spec.type === "cpu" || spec.type === "gpu"
				? spec.value || ""
				: spec.options?.[0]?.value || "",
	}));
};

export default function CatalogSection() {
	const { data, isLoading, isError } = useGetProductsQuery();

	const groupedProducts =
		data?.products.reduce((acc, product) => {
			if (!acc[product.category]) {
				acc[product.category] = [];
			}
			acc[product.category].push(product);
			return acc;
		}, {} as Record<string, typeof data.products>) || {};

	const categories = Object.keys(groupedProducts);

	return (
		<section
			id="catalog"
			className="w-full max-w-3xl flex flex-col justify-center items-center gap-15 pt-10 mx-auto px-2 sm:px-0 text-white"
		>
			{isLoading && (
				<div className="text-xl font-semibold text-silver">Загрузка...</div>
			)}

			{isError && (
				<div className="text-xl font-semibold text-red-400">
					Ошибка загрузки товаров
				</div>
			)}

			{!isLoading && !isError && data?.products.length === 0 && (
				<div className="text-xl font-semibold text-silver">
					Товары не найдены
				</div>
			)}

			{!isLoading &&
				!isError &&
				data?.products &&
				categories.map((category) => {
					const categoryProducts = groupedProducts[category];

					if (!categoryProducts || categoryProducts.length === 0) {
						return null;
					}

					return (
						<ProductSection key={category} title={category}>
							{categoryProducts.map((product) => (
								<ProductCard
									key={product._id}
									title={product.title}
									price={product.price}
									specs={formatSpecsForCard(product.specs)}
									image={product.image}
								/>
							))}
						</ProductSection>
					);
				})}
		</section>
	);
}
