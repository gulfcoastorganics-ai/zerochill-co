export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 border border-[color:var(--line-soft)] bg-white/5 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_20px_var(--accent)]" />
      {children}
    </span>
  );
}
