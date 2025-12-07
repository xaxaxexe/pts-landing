import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { SelectedProductProvider } from "@/contexts/SelectedProductContext";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "pts - title",
	description: "pts - description",
	icons: {
		icon: "/favicon.ico",
	},
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
				<StoreProvider>
					<SelectedProductProvider>{children}</SelectedProductProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
