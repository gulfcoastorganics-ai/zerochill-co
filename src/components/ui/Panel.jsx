export default function Panel({ children, className = '', ...props }) {
  return (
    <div className={`zc-panel bg-[color:var(--panel)] ${className}`} {...props}>
      {children}
    </div>
  );
}
