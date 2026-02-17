import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { verifyAdminTokenFromRequest } from "@/lib/auth";

export async function POST(request: NextRequest) {
	try {
		if (!verifyAdminTokenFromRequest(request)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await connectDB();

		const body = await request.json();
		const { category, title, price, specs, image } = body;

		if (!category || !title || !price || !specs || !image) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		if (!Array.isArray(specs) || specs.length === 0) {
			return NextResponse.json(
				{ error: "Specs must be a non-empty array" },
				{ status: 400 },
			);
		}

		for (const spec of specs) {
			if (!spec.type) {
				return NextResponse.json(
					{ error: "Each spec must have a type" },
					{ status: 400 },
				);
			}

			if (!["cpu", "gpu", "memory", "ssd", "color"].includes(spec.type)) {
				return NextResponse.json(
					{
						error: "Invalid spec type. Must be cpu, gpu, memory, ssd, or color",
					},
					{ status: 400 },
				);
			}

			if (spec.type === "cpu" || spec.type === "gpu") {
				if (!spec.value) {
					return NextResponse.json(
						{ error: `${spec.type} must have a value` },
						{ status: 400 },
					);
				}
				if (spec.options) {
					return NextResponse.json(
						{ error: `${spec.type} should not have options array` },
						{ status: 400 },
					);
				}
			}

			if (spec.type === "memory" || spec.type === "ssd") {
				if (spec.value) {
					return NextResponse.json(
						{ error: `${spec.type} should not have a single value` },
						{ status: 400 },
					);
				}
				if (
					!spec.options ||
					!Array.isArray(spec.options) ||
					spec.options.length === 0
				) {
					return NextResponse.json(
						{ error: `${spec.type} must have at least one option` },
						{ status: 400 },
					);
				}

				for (const option of spec.options) {
					if (!option.value || typeof option.price !== "number") {
						return NextResponse.json(
							{
								error: `Each ${spec.type} option must have value and price`,
							},
							{ status: 400 },
						);
					}
				}
			}

			if (spec.type === "color") {
				if (spec.value || spec.options) {
					return NextResponse.json(
						{ error: "color should not have value or options" },
						{ status: 400 },
					);
				}
				if (
					!spec.colorOptions ||
					!Array.isArray(spec.colorOptions) ||
					spec.colorOptions.length === 0
				) {
					return NextResponse.json(
						{ error: "color must have at least one colorOption" },
						{ status: 400 },
					);
				}

				for (const colorOption of spec.colorOptions) {
					if (
						!colorOption.color ||
						!["black", "white"].includes(colorOption.color) ||
						typeof colorOption.price !== "number"
					) {
						return NextResponse.json(
							{
								error:
									"Each color option must have color (black or white) and price",
							},
							{ status: 400 },
						);
					}
				}
			}
		}

		const product = await Product.create({
			category,
			title,
			price,
			specs,
			image,
		});

		revalidatePath("/");

		return NextResponse.json(
			{
				success: true,
				product,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category");

		let query = {};
		if (category) {
			query = { category };
		}

		const products = await Product.find(query);

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

		return NextResponse.json(
			{
				success: true,
				count: sortedProducts.length,
				products: sortedProducts,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error fetching products:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function PATCH(request: NextRequest) {
	try {
		if (!verifyAdminTokenFromRequest(request)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await connectDB();

		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Product ID is required" },
				{ status: 400 },
			);
		}

		const existingProduct = await Product.findById(id);
		if (!existingProduct) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		const body = await request.json();
		const { category, title, price, specs, image } = body;

		const updates: Record<string, unknown> = {};
		if (category !== undefined) updates.category = category;
		if (title !== undefined) updates.title = title;
		if (price !== undefined) updates.price = price;
		if (image !== undefined) updates.image = image;

		if (specs !== undefined) {
			if (!Array.isArray(specs) || specs.length === 0) {
				return NextResponse.json(
					{ error: "Specs must be a non-empty array" },
					{ status: 400 },
				);
			}

			for (const spec of specs) {
				if (!spec.type) {
					return NextResponse.json(
						{ error: "Each spec must have a type" },
						{ status: 400 },
					);
				}

				if (!["cpu", "gpu", "memory", "ssd", "color"].includes(spec.type)) {
					return NextResponse.json(
						{
							error: "Invalid spec type. Must be cpu, gpu, memory, ssd, or color",
						},
						{ status: 400 },
					);
				}

				if (spec.type === "cpu" || spec.type === "gpu") {
					if (!spec.value) {
						return NextResponse.json(
							{ error: `${spec.type} must have a value` },
							{ status: 400 },
						);
					}
					if (spec.options) {
						return NextResponse.json(
							{ error: `${spec.type} should not have options array` },
							{ status: 400 },
						);
					}
				}

				if (spec.type === "memory" || spec.type === "ssd") {
					if (spec.value) {
						return NextResponse.json(
							{ error: `${spec.type} should not have a single value` },
							{ status: 400 },
						);
					}
					if (
						!spec.options ||
						!Array.isArray(spec.options) ||
						spec.options.length === 0
					) {
						return NextResponse.json(
							{ error: `${spec.type} must have at least one option` },
							{ status: 400 },
						);
					}

					for (const option of spec.options) {
						if (!option.value || typeof option.price !== "number") {
							return NextResponse.json(
								{
									error: `Each ${spec.type} option must have value and price`,
								},
								{ status: 400 },
							);
						}
					}
				}

				if (spec.type === "color") {
					if (spec.value || spec.options) {
						return NextResponse.json(
							{ error: "color should not have value or options" },
							{ status: 400 },
						);
					}
					if (
						!spec.colorOptions ||
						!Array.isArray(spec.colorOptions) ||
						spec.colorOptions.length === 0
					) {
						return NextResponse.json(
							{ error: "color must have at least one colorOption" },
							{ status: 400 },
						);
					}

					for (const colorOption of spec.colorOptions) {
						if (
							!colorOption.color ||
							!["black", "white"].includes(colorOption.color) ||
							typeof colorOption.price !== "number"
						) {
							return NextResponse.json(
								{
									error:
										"Each color option must have color (black or white) and price",
								},
								{ status: 400 },
							);
						}
					}
				}
			}

			updates.specs = specs;
		}

		// If image changed, delete the old one from disk
		if (
			image !== undefined &&
			existingProduct.image !== image &&
			existingProduct.image &&
			existingProduct.image.startsWith("/uploads/")
		) {
			try {
				const filename = existingProduct.image.replace("/uploads/", "");
				const filepath = join(process.cwd(), "public", "uploads", filename);

				if (existsSync(filepath)) {
					await unlink(filepath);
				}
			} catch (fileError) {
				console.error("Error deleting old image file:", fileError);
			}
		}

		const product = await Product.findByIdAndUpdate(id, updates, { new: true });

		revalidatePath("/");

		return NextResponse.json(
			{
				success: true,
				product,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error updating product:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		if (!verifyAdminTokenFromRequest(request)) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		await connectDB();

		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Product ID is required" },
				{ status: 400 },
			);
		}

		const product = await Product.findById(id);

		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		if (product.image && product.image.startsWith("/uploads/")) {
			try {
				const filename = product.image.replace("/uploads/", "");
				const filepath = join(process.cwd(), "public", "uploads", filename);

				if (existsSync(filepath)) {
					await unlink(filepath);
				}
			} catch (fileError) {
				console.error("Error deleting image file:", fileError);
			}
		}

		await Product.findByIdAndDelete(id);

		revalidatePath("/");

		return NextResponse.json(
			{
				success: true,
				message: "Product and image deleted successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error deleting product:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
