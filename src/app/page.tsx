import BackgroundGlow from "@/components/BackgroundGlow";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

export default function Home() {
	return (
		<>
			<BackgroundGlow />
			<header className="w-full max-w-5xl pt-10 pb-15 mx-auto px-5 lg:px-2">
				<Navbar />
			</header>
			<main className="mx-auto w-full max-w-6xl pb-20 flex flex-col gap-14 px-5 lg:px-2 mt-4 lg:mt-10">
				<HeroSection />
				<CatalogSection />
				<AboutSection />
				<ContactForm />
				<MapSection />
			</main>

			<Footer />
		</>
	);
}
