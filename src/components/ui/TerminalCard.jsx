import Panel from './Panel';

export default function TerminalCard({ label, title, command, body, children, className = '' }) {
  return (
    <Panel className={`p-6 ${className}`}>
      {label ? (
        <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
          {label}
        </div>
      ) : null}
      {title ? (
        <h3 className="mt-4 text-2xl font-bold uppercase tracking-[-0.03em] text-[color:var(--text)]">
          {title}
        </h3>
      ) : null}
      {command ? (
        <pre className="mt-4 overflow-x-auto border border-[color:var(--line-soft)] bg-black/40 p-4 font-mono text-xs leading-7 text-[color:var(--accent-strong)]">
          {command}
        </pre>
      ) : null}
      {body ? <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{body}</p> : null}
      {children}
    </Panel>
  );
}
