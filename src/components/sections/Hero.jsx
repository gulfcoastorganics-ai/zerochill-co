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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
        <div className="max-w-3xl">
          <Badge>Industrial AI sovereignty</Badge>
          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Command stack for edge deployments, local intelligence, and anti-cloud operations
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] text-[color:var(--text)] sm:text-7xl lg:text-[8rem]">
            YOUR AI.
            <span className="block text-[color:var(--accent)]">UNPLUGGED.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)] sm:text-base sm:leading-8">
            Localized intelligence infrastructure for operators who want hardened systems, not
            rented control. Built to stay dark, fast, and under your command.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
            >
              Explore products
            </Link>
            <Link
              to="/manifest"
              className="zc-button-secondary border border-[color:var(--line)] bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
            >
              Read manifest
            </Link>
          </div>
        </div>

        <Panel className="overflow-hidden p-0">
          <div className="border-b border-[color:var(--line-soft)] px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                  Tactical console
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                  Local inference status
                </div>
              </div>
              <span className="status-pill">Node online</span>
            </div>
          </div>
          <div className="p-5">
            <div className="command-ribbon">
              &gt; boot sequence armed / network dependency absent / sovereign runtime engaged
            </div>
            <div className="mt-5 space-y-3">
              {signalRows.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                  <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                    {label}
                  </span>
                  <span className="font-mono text-sm uppercase tracking-[0.18em] text-[color:var(--text)]">{value}</span>
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
