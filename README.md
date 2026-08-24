# CTRL — landing page & waitlist

Marketing site for CTRL, a technical assessment platform where applicants solve
realistic scenarios based on the work a company actually does. React + TypeScript
+ Tailwind v4 on Vite.

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
│   ├── HowItWorks.tsx  # four-step assessment flow + interactive demo
│   ├── Why.tsx         # three differentiator blocks
│   ├── Ladder.tsx      # blocks / plain steps / code assessment formats
│   ├── Simulations.tsx # example and custom assessment scenarios
│   ├── WhoItsFor.tsx   # ways CTRL fits into a company's hiring process
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

The "move the otherwise rule to the top" toggle in the demo is a genuine break,
not a scripted animation — that ordering makes rule 3 match every tick and prevent
the two below it from running, so the agent never leaves its first cell. Both
outcomes are verified against the engine.

## Waitlist submissions

Signups are stored in a **Google Sheet** via a Google Apps Script web app — free,
with effectively no cap on how many emails you collect.

The deployment URL is hardcoded as `DEFAULT_ENDPOINT` in
[`src/components/WaitlistForm.tsx`](src/components/WaitlistForm.tsx), and it lives in
the client on purpose: `import.meta.env.VITE_*` is inlined at *build* time, so an
endpoint kept only in `.env.local` is absent from any bundle a host builds without
that variable — which is why the form worked on localhost but did nothing once
deployed. The `/exec` URL is public anyway (access = *Anyone* can POST), so shipping
it is safe. `VITE_WAITLIST_ENDPOINT` still overrides it when set.

**One-time setup** (full steps are in [`scripts/waitlist.gs`](scripts/waitlist.gs)):

1. Create a Google Sheet with headers `timestamp | email | company | role | source` in row 1.
2. In that sheet: **Extensions → Apps Script**, paste `scripts/waitlist.gs`, and
   set `SHEET_ID` to the id from the sheet's URL.
3. **Deploy → New deployment → Web app**, execute as *Me*, access *Anyone*.
4. Put the `/exec` URL in `DEFAULT_ENDPOINT` in `WaitlistForm.tsx`, then rebuild.
   Re-deploying a *new version* keeps the same URL; a brand-new deployment mints a
   new one — update `DEFAULT_ENDPOINT` if it ever changes.

The script appends a timestamped row for every submission (duplicates included), so repeat sign-ups are all captured; dedupe in the sheet later if you need a unique list.
Because Apps Script responses carry no CORS headers, the form posts as a simple
`text/plain` request with `mode: "no-cors"`; the row is written server-side even
though the browser sees an opaque response, so a resolved request is treated as
success.

Both localhost and the deployed site post to the same endpoint, so you can verify a
real signup end to end before shipping. Because the Apps Script response is opaque
(no CORS headers), the form treats any completed request as success — check the
Sheet, or the script's **Executions** log, to confirm a row actually landed.
