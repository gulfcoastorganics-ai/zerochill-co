import Panel from '../ui/Panel';
import { Link } from 'react-router-dom';

const bootLines = [
  '> zerochill.boot --local --strict',
  '> scan telemetry // local node online',
  '> offline inference // ready',
  '> operator boundary // engaged',
];

export default function CinematicIntro() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:items-stretch">
        <Panel className="telemetry-scan tactical-grid shadow-telemetry overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="status-pill">Local node online</span>
              <span className="status-pill">Operator owned</span>
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Boot sequence
            </div>
            <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl lg:text-[7.8rem]">
              YOUR AI.
              <span className="block text-[color:var(--accent)]">UNPLUGGED.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)] sm:text-base sm:leading-8">
              Sovereign infrastructure for operators who need local control, readable systems,
              and a deployment posture that holds up when the network does not.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="command-ribbon">
                command path: `zerochill boot --local --strict` / terminal authority engaged
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="zc-button-secondary border border-[color:var(--line)] bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
                >
                  View products
                </Link>
                <Link
                  to="/manifest"
                  className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
                >
                  Read manifest
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ['Mode', 'Local only'],
                ['State', 'Controlled'],
                ['Surface', 'Minimized'],
              ].map(([label, value]) => (
                <div key={label} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                  <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                    {label}
                  </div>
                  <div className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-[color:var(--text)]">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[color:var(--line-soft)] pt-5">
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Boot stream
              </div>
              <div className="mt-4 grid gap-2 font-mono text-sm leading-7 text-[color:var(--text)]">
                {bootLines.map((line, index) => (
                  <div key={line} className="boot-line flex items-center gap-3">
                    <span className="text-[color:var(--accent-strong)]">{String(index + 1).padStart(2, '0')}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 font-mono text-sm text-[color:var(--accent-strong)]">
                <span className="blink-cursor">system ready</span>
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5">
          <Panel className="shadow-telemetry p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Node telemetry
              </div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                live motif
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ['LOCAL NODE', 'ZC-01'],
                ['STATE', 'ONLINE'],
                ['POLICY', 'STRICT'],
                ['MODE', 'OFFLINE FIRST'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                  <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">{label}</span>
                  <span className="font-mono text-sm uppercase tracking-[0.18em] text-[color:var(--text)]">{value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="shadow-telemetry p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Signal summary
              </div>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                operator view
              </span>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-3">
              {['A', 'B', 'C', 'D'].map((bar, index) => (
                <div key={bar} className="flex h-28 items-end border border-[color:var(--line-soft)] bg-black/25 p-2">
                  <div
                    className="w-full bg-[linear-gradient(180deg,rgba(241,75,95,0.95),rgba(177,18,38,0.4))]"
                    style={{ height: `${45 + index * 12}%` }}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              Continuous but low-noise telemetry. Enough visibility to trust the machine without
              dragging the operator into dashboard clutter.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
