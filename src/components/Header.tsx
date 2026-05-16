export function Header() {
  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <div className="text-xl font-bold text-pine-green">Roam-Kumaon</div>
        <nav className="hidden gap-8 md:flex">
          {['Routes', 'Vehicles', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium transition-colors hover:text-pine-green/70">
              {item}
            </a>
          ))}
        </nav>
        <button onClick={scrollToForm} className="rounded-full bg-pine-green px-6 py-2 text-sm font-semibold text-white transition-transform active:scale-95">
          Book Now
        </button>
      </div>
    </header>
  );
}
