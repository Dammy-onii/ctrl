import { Eyebrow, Reveal, Section } from "./primitives";

const SIMS = [
  {
    name: "Warehouse automation",
    teaches: "Task assignment · batching",
    body: "Robots pick, carry, and deliver inventory while orders keep arriving and batteries keep draining. Decide who does what, and in what order.",
    status: "Live",
  },
  {
    name: "Payment routing",
    teaches: "Cost / reliability trade-offs",
    body: "Every transaction needs a provider. Balance fee, speed, and success rate — and re-route the instant one of them starts failing.",
    status: "Live",
  },
  {
    name: "Smart parking",
    teaches: "Allocation · congestion",
    body: "Assign spaces, honour reservations, and keep the lanes moving as a facility fills toward capacity.",
    status: "Live",
  },
  {
    name: "Retail operations",
    teaches: "Scheduling under deadlines",
    body: "Departments drain at different rates and the store opens at a fixed hour. Restock in the order that actually matters.",
    status: "Live",
  },
  {
    name: "Delivery dispatch",
    teaches: "Routing · priorities",
    body: "Match riders to orders across a changing map, weighing customer promises against traffic and restaurant prep times.",
    status: "Soon",
  },
  {
    name: "Bring your own",
    teaches: "Custom domains",
    body: "Teams can model their own operational problem on the same engine — onboarding, internal training, or evaluation in your actual domain.",
    status: "Soon",
  },
];

export function Simulations() {
  return (
    <Section id="simulations">
      <Reveal>
        <Eyebrow>The simulations</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-[44px]">
          One engine.
          <br />
          <span className="text-ink-40">Entirely different problems.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base text-ink-60">
          These aren't separate products or harder mazes. Each defines its own world, rules, and
          scoring on top of the same decision pipeline — which is why new industries arrive as
          content, not rewrites.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {SIMS.map((s, i) => (
          <Reveal key={s.name} delay={i * 50} className="h-full">
            <div className="flex h-full flex-col bg-paper p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-medium">{s.name}</h3>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wide uppercase ${
                    s.status === "Live"
                      ? "bg-volt text-ink"
                      : "border border-line text-ink-40"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <p className="mt-2 font-mono text-[11px] text-ink-40">{s.teaches}</p>
              <p className="mt-5 text-sm leading-relaxed text-ink-60">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
