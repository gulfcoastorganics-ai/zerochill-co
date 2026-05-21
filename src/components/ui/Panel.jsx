export default function Panel({ children, className = '' }) {
  return (
    <div
      className={`zc-panel zc-glass ${className}`}
    >
      {children}
    </div>
  );
}
