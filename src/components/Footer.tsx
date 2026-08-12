export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="flex flex-col gap-8 px-5 py-12 sm:px-10 md:flex-row md:items-end md:justify-between lg:px-16 2xl:px-22">
        <div>
          <a
            href="#top"
            className="font-mono text-[24px] leading-none font-medium tracking-[-0.06em]"
            aria-label="ctrl home"
          >
            ctrl
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-60">
            Technical assessments built around realistic problems from your company and industry.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "How it works", href: "#how-it-works" },
              { label: "Scenarios", href: "#simulations" },
              { label: "Where it fits", href: "#who-its-for" },
              { label: "FAQ", href: "#faq" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-ink-60 transition hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="font-mono text-[11px] tracking-wide text-ink-40">
            © {new Date().getFullYear()} CTRL — assess candidates through real work.
          </p>
        </div>
      </div>
    </footer>
  );
}
