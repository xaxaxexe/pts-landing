export default function Navbar() {
  return (
    <nav className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-around text-base font-semibold text-slate-100 px-20 py-14">
      <a className=" transition hover:opacity-100" href="#">
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
