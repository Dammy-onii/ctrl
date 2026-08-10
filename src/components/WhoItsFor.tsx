import { Eyebrow, Reveal, Section } from "./primitives";

const AUDIENCES = [
  {
    who: "Learners",
    line: "Understand an algorithm by watching it, not imagining it.",
    body: "Concepts land in order — sequencing, conditions, priority, functions, state, memory, optimisation — and each new challenge is one your current toolkit can't quite solve.",
  },
  {
    who: "Educators",
    line: "Teach computational thinking that students can see.",
    body: "Loops, state machines, search, and traversal stop being diagrams on a slide. Set challenges, watch where a class gets stuck, and grade on reasoning rather than syntax.",
  },
  {
    who: "Hiring teams",
    line: "Evaluate judgement, not recall.",
    body: "Candidates solve an operations problem shaped like your actual work. You see adaptability, prioritisation, and decision quality under changing conditions — with every decision on the record.",
  },
  {
    who: "Competitors",
    line: "Same simulation, best intelligence wins.",
    body: "Hidden scenarios and randomised environments mean robust algorithms beat solutions tuned to one predictable case. Spectators watch consequences, not code.",
  },
];

export function WhoItsFor() {
  return (
    <Section id="who-its-for" className="blueprint">
      <Reveal>
        <Eyebrow>Who it's for</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-[44px]">
          Everyone here is building the same thing:
          <br />
          <span className="text-ink-40">a system that decides well.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
        {AUDIENCES.map((a, i) => (
          <Reveal key={a.who} delay={i * 60} className="h-full">
            <div className="flex h-full flex-col bg-paper p-7">
              <Eyebrow>{a.who}</Eyebrow>
              <p className="mt-5 text-xl leading-snug font-medium tracking-[-0.01em]">
                {a.line}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-60">{a.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
