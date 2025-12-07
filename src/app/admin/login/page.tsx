"use client";

import BackgroundGlow from "@/components/BackgroundGlow";
import Button from "@/components/ui/Button";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "@/store/api/authApi";

export default function AdminLoginPage() {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const [loginMutation, { isLoading }] = useLoginMutation();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			await loginMutation({ login, password }).unwrap();
			window.location.replace("/admin");
		} catch (error: any) {
			console.error("Login error:", error);
			setError(error?.data?.message || "Произошла ошибка при входе");
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
					<Button
						type="submit"
						fullWidth
						size="md"
						isLoading={isLoading}
						loadingText="Вход..."
					>
						Войти
					</Button>
				</form>
			</div>
		</div>
	);
}
