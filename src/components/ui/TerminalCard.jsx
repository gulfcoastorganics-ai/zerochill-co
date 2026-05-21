import Panel from './Panel';

export default function TerminalCard({ label, title, command, body, children, className = '' }) {
  return (
    <Panel className={`zc-interactive zc-reveal p-6 ${className}`}>
      {label ? (
        <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
          {label}
        </div>
      ) : null}
      {title ? (
        <h3 className="mt-4 text-xl font-bold uppercase tracking-[-0.03em] text-[color:var(--text)] sm:text-2xl">
          {title}
        </h3>
      ) : null}
      {command ? (
        <pre className="mt-4 overflow-x-auto border border-[color:var(--line-soft)] bg-black/40 p-3 font-mono text-[0.68rem] leading-6 text-[color:var(--accent-strong)] sm:p-4 sm:text-xs sm:leading-7">
          {command}
        </pre>
      ) : null}
      {body ? <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{body}</p> : null}
      {children}
    </Panel>
  );
}
