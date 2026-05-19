import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Panel from '../ui/Panel';

const signalRows = [
  ['MODE', 'LOCAL ONLY'],
  ['SURFACE', 'MINIMIZED'],
  ['STATE', 'CONTROLLED'],
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="max-w-3xl">
          <Badge>Industrial AI sovereignty</Badge>
          <p className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-[color:var(--text-dim)]">
            Command stack for edge deployments, local intelligence, and anti-cloud operations
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[color:var(--text)] sm:text-7xl lg:text-[8rem]">
            YOUR AI.
            <span className="block text-[color:var(--accent)]">UNPLUGGED.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">
            Localized intelligence infrastructure for operators who want hardened systems, not
            rented control. Built to stay dark, fast, and under your command.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/preorder"
              className="border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
            >
              Preorder Access
            </Link>
            <Link
              to="/manifest"
              className="border border-[color:var(--line)] bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
            >
              Read Manifest
            </Link>
          </div>
        </div>

        <Panel className="overflow-hidden">
          <div className="border-b border-[color:var(--line-soft)] px-5 py-4">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Tactical Console
            </div>
            <div className="mt-2 text-lg font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              Local inference status
            </div>
          </div>
          <div className="p-5">
            <div className="mb-5 font-mono text-sm leading-7 text-[color:var(--text-muted)]">
              &gt; boot sequence armed
              <br />
              &gt; network dependency absent
              <br />
              &gt; sovereign runtime engaged
            </div>
            <div className="space-y-3">
              {signalRows.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                  <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                    {label}
                  </span>
                  <span className="font-mono text-sm text-[color:var(--text)]">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs uppercase tracking-[0.24em]">
              <div className="border border-[color:var(--line-soft)] bg-black/20 p-3 text-[color:var(--text-dim)]">
                air-gap
              </div>
              <div className="border border-[color:var(--line-soft)] bg-black/20 p-3 text-[color:var(--text-dim)]">
                edge
              </div>
              <div className="border border-[color:var(--line-soft)] bg-black/20 p-3 text-[color:var(--text-dim)]">
                local
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
