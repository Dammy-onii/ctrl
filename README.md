# CTRL — landing page & waitlist

Marketing site for CTRL, a simulation platform where people build the intelligence
behind real operational systems. React + TypeScript + Tailwind v4 on Vite.

```bash
npm run dev     # http://localhost:5173
npm run build   # type-check + production build
npm run lint
```

## Structure

```
src/
├── lib/sim.ts          # the mini simulation engine driving the hero demo
├── components/
│   ├── Hero.tsx        # grainy mesh hero + waitlist capture
│   ├── LiveSim.tsx     # the live maze demo and its rule panel
│   ├── HowItWorks.tsx  # "the engine executes intelligence" + observe/decide/act/update
│   ├── Why.tsx         # three differentiator blocks
│   ├── Ladder.tsx      # blocks / pseudocode / code, three views of one policy
│   ├── Simulations.tsx # the environment gallery
│   ├── WhoItsFor.tsx   # learners, educators, hiring teams, competitors
│   ├── Waitlist.tsx    # closing CTA
│   └── Faq.tsx
└── index.css           # Tailwind theme tokens, mesh gradient, grain, animations
```

## Layout

Content is full-bleed — no max-width container anywhere. Horizontal breathing room
comes from one repeated utility set on the five top-level containers (Nav, Hero,
`Section`, Waitlist, Footer):

```
px-5 sm:px-10 lg:px-16 2xl:px-22
```

Text blocks keep their own measure via `max-w-*`, so lines stay readable on
ultrawide screens while grids and cards span the full width. Keep the four values
in sync across those five files if you change them — `Section` covers most of the
page, so in practice it's usually the only one that needs editing.

## The hero gradient

Editor-theme palette — keyword violet, function cyan, string green, error red —
one per corner, over an editor-background base. Two rules keep it clean: each blob
fades to *its own colour at zero alpha* rather than `transparent` (which is
transparent *black*, and drags every fade through grey), and the colour layers
composite with `screen` so overlaps add light instead of stacking alpha. Red and
green are complements, so they're pinned to opposite corners — let them meet at
strength anywhere and the overlap turns brown. A centre scrim plus an edge
vignette sit on top with normal compositing to hold white-text contrast.

## The live demo

`src/lib/sim.ts` is a real (small) version of the product's loop: the engine
observes, executes, and updates, while a plain-data rule list decides. The shipped
policy is a right-hand wall follower that solves the maze in 69 ticks.

The "move the catch-all rule to the top" toggle in the demo is a genuine break, not
a scripted animation — that ordering makes rule 3 match every tick and starve the
two below it, so the agent never leaves its first cell. Both outcomes are verified
against the engine.

## Waitlist submissions

`WaitlistForm` posts to `VITE_WAITLIST_ENDPOINT` when it is set:

```bash
# .env.local
VITE_WAITLIST_ENDPOINT=https://your-endpoint.example.com/waitlist
```

It sends `{ email, source: "landing" }`. With no endpoint configured, signups are
kept in `localStorage` under `ctrl:waitlist` so the flow stays clickable in
development. **Wire up the endpoint before launch** — otherwise real signups are
only stored in the visitor's own browser.
