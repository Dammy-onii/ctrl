import { Logo } from "./Logo";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Simulations", href: "#simulations" },
  { label: "Who it's for", href: "#who-its-for" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-10 lg:px-16 2xl:px-22">
        <a href="#top" className="flex items-center gap-3">
          <Logo className="size-8" />
          <span className="leading-tight">
            <span className="block font-mono text-[19px] font-medium tracking-[0.06em]">CTRL</span>
            <span className="hidden font-mono text-[10px] tracking-[0.12em] text-ink-40 sm:block">
              Build the intelligence.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-60 transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#waitlist"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ink/85"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
