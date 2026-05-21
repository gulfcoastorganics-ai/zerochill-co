import Panel from './Panel';

export default function TerminalCard({ label, title, command, body, children, className = '' }) {
  return (
    <Panel className={`zc-interactive zc-reveal p-6 ${className}`}>
      {label ? (
        <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
          {label}
        </div>
      ) : null}
      {title ? (
        <h3 className="mt-4 text-[1.15rem] font-bold uppercase leading-[1.05] tracking-[-0.04em] text-[color:var(--text)] sm:text-[1.35rem]">
          {title}
        </h3>
      ) : null}
      {command ? (
        <pre className="zc-surface-low mt-4 overflow-x-auto p-3 font-mono text-[0.68rem] leading-6 text-[color:var(--accent-strong)] sm:p-4 sm:text-xs sm:leading-7">
          {command}
        </pre>
      ) : null}
      {body ? <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{body}</p> : null}
      {children}
    </Panel>
  );
}
