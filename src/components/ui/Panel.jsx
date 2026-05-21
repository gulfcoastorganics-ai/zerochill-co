export default function Panel({ children, className = '' }) {
  return (
    <div
      className={`zc-panel zc-surface-raised ${className}`}
    >
      {children}
    </div>
  );
}
