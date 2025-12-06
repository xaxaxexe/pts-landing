export default function Navbar() {
	return (
		<nav className="flex w-full items-center justify-around py-10 text-base font-semibold text-slate-100">
			<a className="transition hover:opacity-100" href="#">
				Главная
			</a>
			<a className="opacity-50 transition hover:opacity-100" href="#">
				Каталог
			</a>
			<a className="opacity-50 transition hover:opacity-100" href="#">
				О нас
			</a>
		</nav>
	);
}
