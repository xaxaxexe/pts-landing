"use client";

import { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";

export default function AdminPage() {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleProductAdded = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-2">
				<h1 className="mb-10 text-center text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
					Админ-панель
				</h1>

				<div className="flex flex-col gap-10">
					<ProductForm onProductAdded={handleProductAdded} />
					<ProductList key={refreshKey} />
				</div>
			</div>
		</div>
	);
}
