import { useState, type FormEvent } from "react";

/**
 * Posts to VITE_WAITLIST_ENDPOINT when one is configured. Until then the signup
 * is kept locally so the flow is fully clickable in development.
 */
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

type Status = "idle" | "loading" | "done" | "error";

export function WaitlistForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onDark = tone === "light"; // form sits on the dark hero

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "landing" }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        const saved: string[] = JSON.parse(localStorage.getItem("ctrl:waitlist") ?? "[]");
        localStorage.setItem("ctrl:waitlist", JSON.stringify([...new Set([...saved, email])]));
        await new Promise((r) => setTimeout(r, 450));
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`flex items-center gap-3 rounded-full px-5 py-3 text-sm ${
          onDark ? "bg-white/15 text-white backdrop-blur" : "bg-ink text-white"
        }`}
      >
        <span className="grid size-5 place-items-center rounded-full bg-volt text-ink">
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
            <path
              d="M2 6.2 4.6 8.8 10 3.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        You're on the list. We'll be in touch when your seat opens.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div
        className={`flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center sm:rounded-full ${
          onDark ? "bg-white/12 backdrop-blur-sm ring-1 ring-white/20" : "bg-white ring-1 ring-line"
        }`}
      >
        <label htmlFor={`email-${tone}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${tone}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={`min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm outline-none ${
            onDark
              ? "text-white placeholder:text-white/50"
              : "text-ink placeholder:text-ink-40"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition disabled:opacity-60 ${
            onDark ? "bg-white text-ink hover:bg-volt" : "bg-ink text-white hover:bg-ink/85"
          }`}
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <p
        className={`mt-3 font-mono text-[11px] tracking-wide ${
          onDark ? "text-white/50" : "text-ink-40"
        }`}
      >
        {status === "error"
          ? "Something went wrong — try again in a moment."
          : "Early access is rolling out by cohort. No spam, ever."}
      </p>
    </form>
  );
}
