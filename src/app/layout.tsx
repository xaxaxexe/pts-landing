import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import { SelectedProductProvider } from "@/contexts/SelectedProductContext";

const ORG_JSON_LD = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "POWERTECHSTORE",
	url: "https://example.com",
	logo: "https://example.com/icon-512.png",
	sameAs: [
		"https://vk.com/powertechstore",
		"https://t.me/powertechstore",
		"https://www.youtube.com/@PowerTechStore1",
		"https://www.avito.ru/brands/powertechstore",
	],
};

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://example.com"),
	title: "POWERTECHSTORE — сборка компьютеров под ключ",
	description:
		"POWERTECHSTORE: профессиональная сборка ПК, подбор конфигураций, быстрая доставка по РФ и РБ.",
	manifest: "/site.webmanifest",
	themeColor: "#060606",
	icons: {
		icon: "/favicon.ico",
		apple: "/icon-192.png",
	},
	openGraph: {
		title: "POWERTECHSTORE — сборка компьютеров под ключ",
		description:
			"Подберём и соберём ПК под ваши задачи. Доставка по РФ и РБ. Каталог готовых конфигураций.",
		url: "https://example.com",
		siteName: "POWERTECHSTORE",
		locale: "ru_RU",
		type: "website",
		images: [
			{
				url: "/icon-512.png",
				width: 512,
				height: 512,
				alt: "POWERTECHSTORE",
			},
		],
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
				className={`${inter.variable} antialiased overflow-x-clip relative bg-[#060606] text-slate-100`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
				/>
				<StoreProvider>
					<SelectedProductProvider>{children}</SelectedProductProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
