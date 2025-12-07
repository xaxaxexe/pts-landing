"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";
import OrderList from "@/components/admin/OrderList";
import BackgroundGlow from "@/components/BackgroundGlow";

type Tab = "orders" | "products";

export default function AdminPage() {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState<Tab>("orders");
	const [refreshKey, setRefreshKey] = useState(0);

	const handleProductAdded = () => {
		setRefreshKey((prev) => prev + 1);
	};

	const handleLogout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			router.push("/admin/login");
			router.refresh();
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<div className="min-h-screen">
			<BackgroundGlow />
			<div className="mx-auto w-full max-w-7xl px-5 py-10 lg:px-2">
				<div className="mb-10 flex items-center justify-end">
					<button
						onClick={handleLogout}
						className="rounded-xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white sm:px-6 sm:py-3 sm:text-base"
					>
						Выйти
					</button>
				</div>

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
