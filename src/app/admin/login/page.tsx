"use client";

import BackgroundGlow from "@/components/BackgroundGlow";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ login, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || "Ошибка входа");
				return;
			}

			window.location.replace("/admin");
		} catch (error) {
			console.error("Login error:", error);
			setError("Произошла ошибка при входе");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-5">
			<BackgroundGlow />
			<div className="w-full max-w-md">
				<h1 className="mb-3 text-center  text-2xl lg:text-4xl font-bold text-white sm:text-5xl">
					Вход
				</h1>
				<form
					onSubmit={handleSubmit}
					className="rounded-3xl bg-carbon p-6 sm:p-8 flex flex-col gap-5"
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="login" className="text-sm font-medium text-silver">
							Логин
						</label>
						<input
							id="login"
							type="text"
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							className="rounded-xl bg-ink px-4 py-3 text-white outline-none focus:ring-2 focus:ring-azure/50"
							required
							autoComplete="username"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							htmlFor="password"
							className="text-sm font-medium text-silver"
						>
							Пароль
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="rounded-xl bg-ink px-4 py-3 text-white outline-none focus:ring-2 focus:ring-azure/50"
							required
							autoComplete="current-password"
						/>
					</div>
					{error && (
						<div className="rounded-xl bg-red-500/20 p-3 text-center text-sm font-semibold text-red-400">
							{error}
						</div>
					)}
					<button
						type="submit"
						disabled={isLoading}
						className="rounded-xl bg-hero-gradient px-6 py-3 text-lg font-semibold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-azure/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
					>
						{isLoading ? "Вход..." : "Войти"}
					</button>
				</form>
			</div>
		</div>
	);
}
