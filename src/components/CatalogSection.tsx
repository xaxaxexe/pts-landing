import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/products";
import type { Spec } from "@/types/product";

const formatSpecsForCard = (specs: Spec[]) => {
	return specs
		.filter((spec) => spec.type !== "color")
		.map((spec) => ({
			icon: spec.type as "cpu" | "gpu" | "memory" | "ssd",
			label:
				spec.type === "cpu" || spec.type === "gpu"
					? spec.value || ""
					: spec.options?.[0]?.value || "",
		}));
};

export default async function CatalogSection() {
	const products = await getProducts();

	const groupedProducts = products.reduce((acc, product) => {
		if (!acc[product.category]) {
			acc[product.category] = [];
		}
		acc[product.category].push(product);
		return acc;
	}, {} as Record<string, typeof products>);

	const categories = Object.keys(groupedProducts);

	return (
		<section
			id="catalog"
			className="w-full max-w-3xl flex flex-col justify-center items-center gap-15 pt-10 mx-auto px-2 sm:px-0 text-white"
		>
			{products.length > 0 &&
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
									productData={product}
								/>
							))}
						</ProductSection>
					);
				})}
		</section>
	);
}
