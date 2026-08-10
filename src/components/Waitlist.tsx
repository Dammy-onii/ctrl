import { Eyebrow } from "./primitives";
import { WaitlistForm } from "./WaitlistForm";

export function Waitlist() {
  return (
    <section id="waitlist" className="border-t border-line">
      <div className="px-5 py-16 sm:px-10 lg:px-16 2xl:px-22">
        <div className="mesh grain relative overflow-hidden rounded-[28px]">
          <div className="relative z-10 flex flex-col items-center px-6 py-20 text-center sm:px-10">
            <Eyebrow tone="light">Private beta</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-3xl leading-[1.08] font-medium tracking-[-0.03em] text-white sm:text-[52px]">
              Stop solving puzzles.
              <br />
              <span className="font-serif italic text-white/80">Start building intelligence.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-white/70">
              Cohorts open in small batches. Tell us where to reach you and what you'd want to
              simulate.
            </p>
            <div className="mt-9 flex justify-center">
              <WaitlistForm tone="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
