import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import type { Product as ProductType } from "@/types/product";

export async function getProducts(): Promise<ProductType[]> {
	try {
		await connectDB();

		const products = await Product.find({}).lean();

		const categoryOrder = ["PTS LOW", "PTS MEDIUM", "PTS PRO"];
		const sortedProducts = products.sort((a, b) => {
			const indexA = categoryOrder.indexOf(a.category);
			const indexB = categoryOrder.indexOf(b.category);

			const bothKnown = indexA !== -1 && indexB !== -1;
			if (bothKnown) {
				if (indexA === indexB) {
					return a.price - b.price;
				}
				return indexA - indexB;
			}

			return a.price - b.price;
		});

		return sortedProducts.map((product) => ({
			_id: product._id.toString(),
			category: product.category,
			title: product.title,
			price: product.price,
			specs: product.specs,
			image: product.image,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
		}));
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}
