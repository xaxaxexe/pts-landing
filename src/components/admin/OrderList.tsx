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
			<h2 className="mb-4 text-center text-xl font-semibold text-white sm:mb-5 sm:text-2xl lg:text-3xl">
				Заявки ({pagination.total})
			</h2>

			<div className="flex flex-col gap-3 sm:gap-4">
				{orders.map((order: Order) => (
					<div
						key={order._id}
						className="flex flex-col gap-2 rounded-xl bg-carbon p-3 sm:gap-3 sm:rounded-2xl sm:p-4 lg:rounded-3xl lg:p-6"
					>
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div className="flex flex-col gap-1">
								<span className="text-base font-bold text-white sm:text-lg lg:text-xl">
									{order.name}
								</span>
								<span className="text-xs text-graphite sm:text-sm">
									{formatDate(order.createdAt)}
								</span>
							</div>
						</div>

						<div className="grid gap-2 sm:grid-cols-2">
							<div className="flex flex-col gap-0.5">
								<span className="text-[0.65rem] text-graphite sm:text-xs">
									Телефон:
								</span>
								<a
									href={`tel:${order.phone}`}
									className="text-xs font-medium text-azure hover:underline sm:text-sm"
								>
									{order.phone}
								</a>
							</div>

							{order.telegram && (
								<div className="flex flex-col gap-0.5">
									<span className="text-[0.65rem] text-graphite sm:text-xs">
										Telegram:
									</span>
									<a
										href={`https://t.me/${order.telegram.replace("@", "")}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-xs font-medium text-azure hover:underline sm:text-sm"
									>
										{order.telegram}
									</a>
								</div>
							)}

							{order.email && (
								<div className="flex flex-col gap-0.5">
									<span className="text-[0.65rem] text-graphite sm:text-xs">
										Email:
									</span>
									<a
										href={`mailto:${order.email}`}
										className="break-all text-xs font-medium text-azure hover:underline sm:text-sm"
									>
										{order.email}
									</a>
								</div>
							)}

							<div className="flex flex-col gap-0.5">
								<span className="text-[0.65rem] text-graphite sm:text-xs">
									Город:
								</span>
								<span className="text-xs font-medium text-white sm:text-sm">
									{order.city}
								</span>
							</div>
						</div>

						{order.data && (
							<div className="mt-1 flex flex-col gap-2 rounded-lg bg-ink p-2.5 sm:mt-2 sm:rounded-xl sm:p-3 lg:rounded-2xl lg:p-4">
								<div className="flex items-center justify-between gap-2">
									<div className="flex flex-col gap-0.5">
										<span className="text-[0.65rem] text-graphite sm:text-xs">
											Товар:
										</span>
										<span className="text-xs font-bold text-white sm:text-sm">
											{order.data.title}
										</span>
										<span className="text-[0.65rem] text-graphite sm:text-xs">
											{order.data.category}
										</span>
									</div>
									<img
										src={order.data.image}
										alt={order.data.title}
										className="h-12 w-12 rounded-lg object-cover sm:h-16 sm:w-16 lg:h-20 lg:w-20"
									/>
								</div>

								{Object.keys(order.data.selectedOptions).length > 0 && (
									<div className="flex flex-col gap-1">
										<span className="text-[0.65rem] text-graphite sm:text-xs">
											Опции:
										</span>
										<div className="flex flex-wrap gap-1.5">
											{Object.entries(order.data.selectedOptions).map(
												([key, option]) => (
													<span
														key={key}
														className="rounded-md bg-background px-2 py-1 text-[0.65rem] font-medium text-white sm:text-xs"
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

								<div className="flex flex-col gap-1 border-t border-border pt-2 sm:flex-row sm:items-center sm:justify-between">
									<span className="text-[0.65rem] text-graphite sm:text-xs">
										Базовая: {order.data.price.toLocaleString("ru-RU")} р.
									</span>
									<span className="text-sm font-bold text-azure sm:text-base lg:text-lg">
										Итого: {order.data.totalPrice.toLocaleString("ru-RU")} р.
									</span>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			{pagination.pages > 1 && (
				<div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
					<button
						onClick={() => setPage((prev) => Math.max(1, prev - 1))}
						disabled={page === 1}
						className="w-full rounded-xl bg-carbon px-4 py-2 text-sm font-medium text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
					>
						Назад
					</button>

					<div className="flex flex-wrap justify-center gap-1">
						{Array.from({ length: pagination.pages }, (_, i) => i + 1)
							.filter((pageNum) => {
								if (pagination.pages <= 7) return true;
								if (pageNum === 1 || pageNum === pagination.pages) return true;
								if (Math.abs(pageNum - page) <= 1) return true;
								return false;
							})
							.map((pageNum, idx, arr) => {
								const showEllipsis = idx > 0 && pageNum - arr[idx - 1] > 1;
								return (
									<div key={pageNum} className="flex gap-1">
										{showEllipsis && (
											<span className="flex items-center px-2 text-graphite">
												...
											</span>
										)}
										<button
											onClick={() => setPage(pageNum)}
											className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
												page === pageNum
													? "bg-azure text-white"
													: "bg-carbon text-white hover:bg-ink"
											}`}
										>
											{pageNum}
										</button>
									</div>
								);
							})}
					</div>

					<button
						onClick={() =>
							setPage((prev) => Math.min(pagination.pages, prev + 1))
						}
						disabled={page === pagination.pages}
						className="w-full rounded-xl bg-carbon px-4 py-2 text-sm font-medium text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
					>
						Вперед
					</button>
				</div>
			)}
		</section>
	);
}
