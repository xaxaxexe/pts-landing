import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";

export default function CatalogSection() {
	return (
		<section
			id="catalog"
			className="w-full max-w-3xl flex flex-col justify-center items-center gap-15 pt-10 mx-auto px-2 sm:px-0 text-white"
		>
			<ProductSection title="PTS LOW">
				<ProductCard
					title="PTS PC #1"
					price="133 390 р."
					specs={[
						{ icon: "memory", label: "64 GB" },
						{ icon: "gpu", label: "RTX 5090" },
						{ icon: "cpu", label: "Intel i7-12000k" },
						{ icon: "ssd", label: "1 TB SSD" },
					]}
					image="/assets/card.png"
				/>
				<ProductCard
					title="PTS PC #2"
					price="142 990 р."
					specs={[
						{ icon: "memory", label: "32 GB" },
						{ icon: "gpu", label: "RTX 4080" },
						{ icon: "cpu", label: "Intel i5-13600K" },
						{ icon: "ssd", label: "1 TB SSD" },
					]}
					image="/assets/card.png"
				/>
			</ProductSection>
			<ProductSection title="PTS MEDIUM">
				<ProductCard
					title="PTS PC #1"
					price="133 390 р."
					specs={[
						{ icon: "memory", label: "64 GB" },
						{ icon: "gpu", label: "RTX 5090" },
						{ icon: "cpu", label: "Intel i7-12000k" },
						{ icon: "ssd", label: "1 TB SSD" },
					]}
					image="/assets/card.png"
				/>
				<ProductCard
					title="PTS PC #2"
					price="142 990 р."
					specs={[
						{ icon: "memory", label: "32 GB" },
						{ icon: "gpu", label: "RTX 4080" },
						{ icon: "cpu", label: "Intel i5-13600K" },
						{ icon: "ssd", label: "1 TB SSD" },
					]}
					image="/assets/card.png"
				/>
			</ProductSection>
			<ProductSection title="PTS PRO">
				<ProductCard
					title="PTS PRO"
					price="133 390 р."
					specs={[
						{ icon: "memory", label: "64 GB" },
						{ icon: "gpu", label: "RTX 5090" },
						{ icon: "cpu", label: "Intel i7-12000k" },
						{ icon: "ssd", label: "1 TB SSD" },
					]}
					image="/assets/card.png"
				/>
				<ProductCard
					title="PTS PC #2"
					price="142 990 р."
					specs={[
						{ icon: "memory", label: "32 GB" },
						{ icon: "gpu", label: "RTX 4080" },
						{ icon: "cpu", label: "Intel i5-13600K" },
						{ icon: "ssd", label: "1 TB SSD" },
					]}
					image="/assets/card.png"
				/>
			</ProductSection>
		</section>
	);
}
