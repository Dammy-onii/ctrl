import { Eyebrow, Reveal, Section } from "./primitives";
import { LiveSim } from "./LiveSim";

const LOOP = [
  { step: "Observe", body: "The engine hands your agent only what it is allowed to know." },
  { step: "Decide", body: "Your logic reads that observation and picks exactly one action." },
  { step: "Act", body: "The engine executes it. It never second-guesses the choice." },
  { step: "Update", body: "The world moves on — new tasks, new constraints, new state." },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="blueprint">
      <Reveal>
        <Eyebrow>What CTRL is</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-[44px]">
          The engine executes intelligence.
          <br />
          <span className="text-ink-40">It never creates it.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base text-ink-60 sm:text-lg">
          Every simulation runs the same loop, forever, until the objective is met. The engine
          understands the world and carries out actions. What happens next is entirely your
          design — and you watch it happen, decision by decision.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-14">
        <LiveSim />
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {LOOP.map((l, i) => (
          <Reveal key={l.step} delay={i * 60} className="h-full">
            <div className="h-full bg-paper p-6">
              <p className="font-mono text-[11px] text-ink-40">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-medium">{l.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-60">{l.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
