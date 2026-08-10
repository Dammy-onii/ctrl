/**
 * The mark: a decision node with three branches — the moment a rule chooses
 * one action out of several.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <g stroke="#fbfbf9" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <path d="M9 16h5" />
        <path d="M14 16 20 9.5" />
        <path d="M14 16h6" />
        <path d="M14 16 20 22.5" opacity="0.35" />
      </g>
      <circle cx="9" cy="16" r="2.4" fill="#c8ff3d" />
      <circle cx="21.5" cy="9.5" r="1.9" fill="#fbfbf9" />
      <circle cx="21.5" cy="16" r="1.9" fill="#fbfbf9" opacity="0.55" />
      <circle cx="21.5" cy="22.5" r="1.9" fill="#fbfbf9" opacity="0.3" />
    </svg>
  );
}
