import { useId, useState, type FormEvent } from "react";

/**
 * Posts each signup to a Google Apps Script web app, which appends a row to a
 * Google Sheet (free, effectively unlimited storage). Set VITE_WAITLIST_ENDPOINT
 * to the script's deployment URL — see README, "Waitlist submissions".
 *
 * Apps Script responses carry no CORS headers, so we send the request as a
 * "simple" POST (text/plain, no preflight) with mode: "no-cors". The row is
 * written server-side even though the browser hands us an opaque response, so a
 * request that resolves is treated as success. Development builds with no
 * endpoint keep submissions in localStorage so the flow stays testable.
 */
const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

type Status = "idle" | "loading" | "done" | "error";

export function WaitlistForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onDark = tone === "light"; // form sits on the dark hero

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    const payload = {
      email: email.trim().toLowerCase(),
      company: company.trim(),
      role: role.trim(),
      source: "landing",
    };

    try {
      if (ENDPOINT) {
        await fetch(ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        // Opaque response by design (Apps Script sends no CORS headers); the row
        // is written regardless, so a resolved request means the signup landed.
      } else if (import.meta.env.DEV) {
        const saved: unknown[] = JSON.parse(localStorage.getItem("ctrl:waitlist") ?? "[]");
        localStorage.setItem("ctrl:waitlist", JSON.stringify([...saved, payload]));
        await new Promise((r) => setTimeout(r, 450));
      } else {
        throw new Error("VITE_WAITLIST_ENDPOINT is not configured");
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm ${
          onDark ? "bg-white/15 text-white backdrop-blur" : "bg-ink text-white"
        }`}
      >
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-volt text-ink">
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
        You're on the list. We'll be in touch when your cohort opens.
      </div>
    );
  }

  const field = onDark
    ? "bg-white/5 text-white placeholder:text-white/45 focus:bg-white/10"
    : "bg-black/[0.04] text-ink placeholder:text-ink-40 focus:bg-black/[0.07]";

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <div
        className={`flex flex-col gap-2 rounded-2xl border p-2 transition-colors duration-300 ${
          onDark
            ? "border-transparent bg-white/10 backdrop-blur-sm hover:border-volt/60 focus-within:border-volt"
            : "border-transparent bg-paper/90 hover:border-signal/50 focus-within:border-signal"
        }`}
      >
        <label htmlFor={`${uid}-email`} className="sr-only">
          Work email
        </label>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition ${field}`}
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label htmlFor={`${uid}-company`} className="sr-only">
            Company
          </label>
          <input
            id={`${uid}-company`}
            type="text"
            name="company"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition ${field}`}
          />
          <label htmlFor={`${uid}-role`} className="sr-only">
            Roles you hire for
          </label>
          <input
            id={`${uid}-role`}
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Roles you hire for"
            className={`w-full rounded-xl px-4 py-2.5 text-sm outline-none transition ${field}`}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full rounded-xl px-5 py-2.5 text-sm font-medium transition disabled:opacity-60 ${
            onDark ? "bg-white text-ink hover:bg-volt" : "bg-ink text-white hover:bg-ink/85"
          }`}
        >
          {status === "loading" ? "Requesting…" : "Request early access"}
        </button>
      </div>
      <p
        className={`mt-3 font-mono text-[11px] tracking-wide ${
          onDark ? "text-white/50" : "text-ink-40"
        }`}
      >
        {status === "error"
          ? ENDPOINT
            ? "Something went wrong — try again in a moment."
            : "Early access signups are not configured yet."
          : "Company and role are optional. No spam, ever."}
      </p>
    </form>
  );
}
