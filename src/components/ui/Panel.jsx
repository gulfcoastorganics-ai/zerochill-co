export default function Panel({ children, className = '' }) {
  return (
    <div
      className={`zc-panel border border-[color:var(--line)] bg-[color:var(--panel)]/95 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_16px_50px_rgba(0,0,0,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}
