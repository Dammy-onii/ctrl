import { Eyebrow, Reveal, Section } from "./primitives";

const FAQS = [
  {
    q: "Do I need to know how to code?",
    a: "No. You can author a working policy by arranging blocks — conditions, rules, and reusable behaviours — without writing a line of syntax. As you get more confident, the same policy opens as pseudocode and then as real TypeScript, one piece at a time.",
  },
  {
    q: "How is this different from LeetCode or Codewars?",
    a: "Those ask for a function that returns the right answer to a fixed input. CTRL gives you an environment that keeps changing while you're in it — new tasks arrive, resources run out, priorities shift — and asks for logic that keeps making good decisions. Correctness is the floor, not the score.",
  },
  {
    q: "Is it a game?",
    a: "It's a simulation platform that happens to be fun to watch. Every environment is drawn from a real operational problem: warehouse coordination, payment routing, dispatch, parking capacity. The thinking transfers because the problems are the real ones.",
  },
  {
    q: "How is a run scored?",
    a: "Reaching the objective is the baseline. Beyond that, runs are measured on efficiency (ticks, moves, path quality), economy (energy and cost), simplicity (how many rules it took), and robustness — whether the same policy still works when the scenario changes.",
  },
  {
    q: "Can I reuse work between challenges?",
    a: "That's the intent. Conditions and behaviours you build become named, reusable assets in your own library — a dead-end detector, a wall follower, a route planner — that you carry forward and improve, the way you'd build up a codebase rather than restart each time.",
  },
  {
    q: "Can my team run its own simulation?",
    a: "Yes, that's on the roadmap for teams. Because each environment is content on a shared engine, we can model an operational problem specific to your domain for onboarding, internal training, or technical evaluation. Join the waitlist and tell us what you'd want simulated.",
  },
  {
    q: "When does access open?",
    a: "We're opening in cohorts, smallest first, so we can watch real sessions closely and fix what's confusing before widening. Join the waitlist and we'll reach out when your seat is ready.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-5 text-3xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-[40px]">
            Questions,
            <br />
            <span className="text-ink-40">answered.</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium marker:content-none">
                  {f.q}
                  <span className="mt-1 shrink-0 text-ink-40 transition-transform duration-200 group-open:rotate-45">
                    <svg viewBox="0 0 14 14" className="size-3.5" aria-hidden="true">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl pr-10 text-sm leading-relaxed text-ink-60">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
