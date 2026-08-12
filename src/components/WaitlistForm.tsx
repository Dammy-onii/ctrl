import { useId, useState, type FormEvent } from "react";

/**
 * Posts to Web3Forms when VITE_WEB3FORMS_ACCESS_KEY is configured. Development builds
 * keep submissions locally so the interaction can be tested without a service.
 * Production builds fail visibly when the access key is missing.
 */
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "loading" | "done" | "error";

export function WaitlistForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onDark = tone === "light"; // form sits on the dark hero

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (ACCESS_KEY) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            email: normalizedEmail,
            subject: "New CTRL early access request",
            from_name: "CTRL website",
            source: "landing",
          }),
        });
        const result = (await res.json()) as { success?: boolean };
        if (!res.ok || !result.success) throw new Error(String(res.status));
      } else if (import.meta.env.DEV) {
        const saved: string[] = JSON.parse(localStorage.getItem("ctrl:waitlist") ?? "[]");
        localStorage.setItem(
          "ctrl:waitlist",
          JSON.stringify([...new Set([...saved, normalizedEmail])]),
        );
        await new Promise((r) => setTimeout(r, 450));
      } else {
        throw new Error("VITE_WEB3FORMS_ACCESS_KEY is not configured");
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
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md transition-[max-width] duration-300 ease-out focus-within:max-w-xl"
    >
      <div
        className={`flex flex-col gap-2 rounded-2xl p-2 ring-1 transition-[background-color,box-shadow] duration-300 sm:flex-row sm:items-center sm:rounded-full ${
          onDark
            ? "bg-white/12 ring-white/20 backdrop-blur-sm focus-within:bg-white/16 focus-within:ring-2 focus-within:ring-volt/80 focus-within:shadow-[0_0_0_5px_rgba(200,255,61,0.12)]"
            : "bg-white ring-line focus-within:ring-2 focus-within:ring-signal/70 focus-within:shadow-[0_0_0_5px_rgba(79,70,229,0.1)]"
        }`}
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
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
          {status === "loading" ? "Requesting…" : "Request early access"}
        </button>
      </div>
      <p
        className={`mt-3 font-mono text-[11px] tracking-wide ${
          onDark ? "text-white/50" : "text-ink-40"
        }`}
      >
        {status === "error"
          ? ACCESS_KEY
            ? "Something went wrong — try again in a moment."
            : "Early access signups are not configured yet."
          : "Private beta for hiring teams. No spam, ever."}
      </p>
    </form>
  );
}
