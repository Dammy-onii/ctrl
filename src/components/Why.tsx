import { Eyebrow, Reveal, Section } from "./primitives";

const BLOCKS = [
  {
    tag: "Debugging",
    stat: "0",
    statNote: "logs to read to find the decision that broke the run",
    body: "When an algorithm fails you don't reconstruct it from console output. You rewind to the tick, see the observation it had, and see the rule it fired. Debugging becomes watching behaviour instead of interpreting logs.",
  },
  {
    tag: "Problems",
    stat: "Real",
    statNote: "operations problems, not sorted-array trivia",
    body: "Coordinate warehouse robots under changing workloads. Route transactions across providers during an outage. Dispatch riders through traffic. Each one teaches a different shape of algorithmic thinking on the same decision architecture.",
  },
  {
    tag: "Signal",
    stat: "Two",
    statNote: "people can both pass and think nothing alike",
    body: "Because every decision is observable, a run shows how someone decomposes a system, what they prioritise, and how they respond when conditions change. That's a far richer read than whether the tests went green.",
  },
];

export function Why() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>Why it's different</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-[44px]">
          Most platforms ask whether you got the answer.
          <br />
          <span className="text-ink-40">CTRL watches how you think.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <Reveal key={b.tag} delay={i * 70} className="h-full">
            <div className="flex h-full flex-col bg-paper p-7">
              <Eyebrow>{b.tag}</Eyebrow>
              <p className="mt-8 text-6xl font-medium tracking-[-0.04em]">{b.stat}</p>
              <p className="mt-3 max-w-[20rem] text-sm text-ink-40">{b.statNote}</p>
              <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-ink-60">
                {b.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
