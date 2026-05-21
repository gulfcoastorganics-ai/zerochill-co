export default function Badge({ children }) {
  return (
    <span className="zc-surface-low inline-flex items-center gap-2 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[color:var(--text-dim)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_var(--accent)]" />
      {children}
    </span>
  );
}
