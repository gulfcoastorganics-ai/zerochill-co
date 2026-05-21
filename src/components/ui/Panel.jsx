export default function Panel({ children, className = '' }) {
  return (
    <div className={`zc-panel bg-[color:var(--panel)] ${className}`}>
      {children}
    </div>
  );
}
