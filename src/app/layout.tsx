import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Landing Starter | Next.js + Tailwind",
	description:
		"A clean starter layout for a Next.js + TypeScript + Tailwind landing page.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body
				className={`${inter.variable} ${geistMono.variable} antialiased overflow-x-clip relative bg-[#060606] text-slate-100`}
			>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
