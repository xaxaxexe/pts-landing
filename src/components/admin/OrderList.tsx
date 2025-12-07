"use client";

import { useState } from "react";
import { useGetOrdersQuery } from "@/store/api/ordersApi";
import type { Order } from "@/types/order";

export default function OrderList() {
	const [page, setPage] = useState(1);
	const limit = 20;

	const { data, isLoading, error } = useGetOrdersQuery({ page, limit });

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
					Ошибка при загрузке заявок
				</div>
			</div>
		);
	}

	if (!data || data.orders.length === 0) {
		return (
			<div className="flex w-full justify-center py-10">
				<div className="text-xl font-semibold text-silver">
					Заявки не найдены
				</div>
			</div>
		);
	}

	const { orders, pagination } = data;

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<section className="w-full">
			<h2 className="mb-5 text-center text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
				Заявки ({pagination.total})
			</h2>

			<div className="flex flex-col gap-4">
				{orders.map((order: Order) => (
					<div
						key={order._id}
						className="flex flex-col gap-3 rounded-2xl bg-carbon p-4 sm:rounded-3xl sm:p-6"
					>
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div className="flex flex-col gap-1">
								<span className="text-lg font-bold text-white sm:text-xl">
									{order.name}
								</span>
								<span className="text-sm text-graphite">
									{formatDate(order.createdAt)}
								</span>
							</div>
						</div>

						<div className="grid gap-2 sm:grid-cols-2">
							<div className="flex flex-col gap-1">
								<span className="text-xs text-graphite">Телефон:</span>
								<span className="text-sm font-medium text-white">
									{order.phone}
								</span>
							</div>

							{order.telegram && (
								<div className="flex flex-col gap-1">
									<span className="text-xs text-graphite">Telegram:</span>
									<span className="text-sm font-medium text-white">
										{order.telegram}
									</span>
								</div>
							)}

							{order.email && (
								<div className="flex flex-col gap-1">
									<span className="text-xs text-graphite">Email:</span>
									<span className="text-sm font-medium text-white">
										{order.email}
									</span>
								</div>
							)}

							<div className="flex flex-col gap-1">
								<span className="text-xs text-graphite">Город:</span>
								<span className="text-sm font-medium text-white">
									{order.city}
								</span>
							</div>
						</div>

						{order.data && (
							<div className="mt-2 flex flex-col gap-2 rounded-xl bg-ink p-3 sm:rounded-2xl sm:p-4">
								<div className="flex items-center justify-between gap-2">
									<div className="flex flex-col gap-1">
										<span className="text-xs text-graphite">Товар:</span>
										<span className="text-sm font-bold text-white">
											{order.data.title}
										</span>
										<span className="text-xs text-graphite">
											{order.data.category}
										</span>
									</div>
									<img
										src={order.data.image}
										alt={order.data.title}
										className="h-16 w-16 rounded-lg object-cover sm:h-20 sm:w-20"
									/>
								</div>

								{Object.keys(order.data.selectedOptions).length > 0 && (
									<div className="flex flex-col gap-1">
										<span className="text-xs text-graphite">Опции:</span>
										<div className="flex flex-wrap gap-2">
											{Object.entries(order.data.selectedOptions).map(
												([key, option]) => (
													<span
														key={key}
														className="rounded-lg bg-background px-2 py-1 text-xs font-medium text-white"
													>
														{option.value}
														{option.price > 0 &&
															` (+${option.price.toLocaleString("ru-RU")} р.)`}
													</span>
												)
											)}
										</div>
									</div>
								)}

								<div className="flex items-center justify-between border-t border-border pt-2">
									<span className="text-xs text-graphite">
										Базовая цена: {order.data.price.toLocaleString("ru-RU")} р.
									</span>
									<span className="text-base font-bold text-azure sm:text-lg">
										Итого: {order.data.totalPrice.toLocaleString("ru-RU")} р.
									</span>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Pagination */}
			{pagination.pages > 1 && (
				<div className="mt-6 flex items-center justify-center gap-2">
					<button
						onClick={() => setPage((prev) => Math.max(1, prev - 1))}
						disabled={page === 1}
						className="rounded-xl bg-carbon px-4 py-2 text-sm font-medium text-white transition hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Назад
					</button>

					<div className="flex gap-1">
						{Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
							(pageNum) => (
								<button
									key={pageNum}
									onClick={() => setPage(pageNum)}
									className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
										page === pageNum
											? "bg-azure text-white"
											: "bg-carbon text-white hover:bg-ink"
									}`}
								>
									{pageNum}
								</button>
							)
						)}
					</div>

					<button
						onClick={() =>
							setPage((prev) => Math.min(pagination.pages, prev + 1))
						}
						disabled={page === pagination.pages}
						className="rounded-xl bg-carbon px-4 py-2 text-sm font-medium text-white transition hover:bg-ink disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Вперед
					</button>
				</div>
			)}
		</section>
	);
}
