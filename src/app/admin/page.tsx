"use client";

import { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import OrderList from "@/components/admin/OrderList";

type Tab = "orders" | "products";

export default function AdminPage() {
	const [activeTab, setActiveTab] = useState<Tab>("orders");
	const [refreshKey, setRefreshKey] = useState(0);

	const handleProductAdded = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-2">
				<h1 className="mb-10 text-center text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
					Админ-панель
				</h1>

				<div className="mb-8 flex justify-center gap-4">
					<button
						onClick={() => setActiveTab("orders")}
						className={`rounded-xl px-6 py-3 text-lg font-semibold transition-all sm:px-8 sm:py-4 sm:text-xl ${
							activeTab === "orders"
								? "bg-hero-gradient shadow-lg shadow-azure/30"
								: "bg-carbon text-silver hover:bg-ink"
						}`}
					>
						Заявки
					</button>
					<button
						onClick={() => setActiveTab("products")}
						className={`rounded-xl px-6 py-3 text-lg font-semibold transition-all sm:px-8 sm:py-4 sm:text-xl ${
							activeTab === "products"
								? "bg-hero-gradient shadow-lg shadow-azure/30"
								: "bg-carbon text-silver hover:bg-ink"
						}`}
					>
						Товары
					</button>
				</div>

				{activeTab === "orders" && (
					<section className="rounded-3xl bg-carbon/30 p-4 sm:p-6 lg:p-8">
						<OrderList />
					</section>
				)}

				{activeTab === "products" && (
					<section className="w-full rounded-3xl bg-carbon/30 p-4 sm:p-6 lg:p-8">
						<div className="w-full flex flex-col gap-6">
							<div className="w-full">
								<ProductForm onProductAdded={handleProductAdded} />
							</div>
							<div className="w-full">
								<ProductList key={refreshKey} />
							</div>
						</div>
					</section>
				)}
			</div>
		</div>
	);
}
