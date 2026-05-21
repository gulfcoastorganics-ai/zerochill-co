import Panel from './Panel';

export default function TerminalCard({ label, title, command, body, children, className = '' }) {
  return (
    <Panel className={`zc-interactive p-6 ${className}`}>
      {label ? (
        <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
          {label}
        </div>
      ) : null}
      {title ? (
        <h3 className="mt-3 text-[1.05rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[color:var(--text)] sm:text-[1.2rem]">
          {title}
        </h3>
      ) : null}
      {command ? (
        <pre className="mt-4 overflow-x-auto rounded-xl border border-[color:var(--line-soft)] bg-black/20 p-3 font-mono text-[0.68rem] leading-6 text-[color:var(--accent-soft)] sm:p-4 sm:text-xs sm:leading-7">
          {command}
        </pre>
      ) : null}
      {body ? <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{body}</p> : null}
      {children}
    </Panel>
  );
}
