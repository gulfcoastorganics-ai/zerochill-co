export default function TerminalLine({ label, value }) {
  return (
    <div className="flex items-start gap-3 border-b border-[color:var(--line-soft)] py-3 last:border-b-0">
      <span className="min-w-28 text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
        {label}
      </span>
      <span className="text-sm leading-6 text-[color:var(--text)]">{value}</span>
    </div>
  );
}
