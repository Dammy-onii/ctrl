import { useEffect, useState } from "react";
import { Eyebrow } from "./primitives";
import { WaitlistForm } from "./WaitlistForm";

const DOMAINS = [
  "route a warehouse",
  "dispatch a delivery fleet",
  "settle a payment",
  "run a parking garage",
  "restock a supermarket",
];

const STRIP = [
  "Warehouse automation",
  "Payment routing",
  "Delivery dispatch",
  "Smart parking",
  "Retail operations",
];

export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % DOMAINS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="top" className="px-5 pb-6 sm:px-10 lg:px-16 2xl:px-22">
      <div className="mesh grain relative overflow-hidden rounded-[28px]">
        <div className="relative z-10 flex flex-col items-center px-5 py-20 text-center sm:px-10 md:py-28">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/12 px-4 py-1.5 text-sm text-white/85 ring-1 ring-white/20 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-volt" />
            Private beta — cohorts opening soon
          </div>

          <h1 className="mt-8 max-w-[20ch] text-[34px] leading-[1.08] font-medium tracking-[-0.03em] text-white sm:max-w-[22ch] sm:text-5xl lg:text-[58px]">
            <span className="block">Anyone can solve the puzzle.</span>
            Can you write the logic that{" "}
            <span key={i} className="animate-rise inline-block font-serif italic whitespace-nowrap text-white/90">
              {DOMAINS[i]}?
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base text-white/70 sm:text-lg">
            CTRL drops you inside a living system and asks for the intelligence that runs it.
            The engine observes, executes, and updates the world — every decision in between is
            yours.
          </p>

          <div className="mt-9 flex justify-center">
            <WaitlistForm tone="light" />
          </div>

          <div className="mt-16 w-full">
            <Eyebrow tone="light">Simulations on the engine</Eyebrow>
            <div className="mt-5 flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
                {[...STRIP, ...STRIP].map((s, n) => (
                  <span
                    key={`${s}-${n}`}
                    className="font-mono text-sm whitespace-nowrap text-white/55"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
