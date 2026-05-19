import Panel from '../ui/Panel';

const bootLines = [
  '> zerochill.boot --local --strict',
  '> scan telemetry // node locked',
  '> offline inference // ready',
  '> terminal authority // engaged',
];

export default function CinematicIntro() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <Panel className="telemetry-scan tactical-grid shadow-telemetry overflow-hidden p-6 sm:p-8">
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-[0.38em] text-[color:var(--text-dim)]">
              Boot sequence
            </div>
            <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-[7.5rem]">
              YOUR AI.
              <span className="block text-[color:var(--accent)]">UNPLUGGED.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">
              Localized intelligence infrastructure for teams that need command, continuity, and
              ownership. No cloud leash. No surveillance drift. No compromise.
            </p>

            <div className="mt-8 border border-[color:var(--line-soft)] bg-black/30 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_18px_var(--accent)]" />
                Boot stream
              </div>
              <div className="mt-4 space-y-2 font-mono text-sm leading-7 text-[color:var(--text)]">
                {bootLines.map((line, index) => (
                  <div key={line} className="boot-line">
                    <span className="text-[color:var(--accent-strong)]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="ml-3">{line}</span>
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
          <Panel className="shadow-telemetry p-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Telemetry
            </div>
            <div className="mt-4 grid gap-3">
              {[
                ['LOCAL NODE', 'ZC-01'],
                ['STATE', 'CONNECTED'],
                ['POLICY', 'STRICT'],
                ['MODE', 'OFFLINE FIRST'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                  <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">{label}</span>
                  <span className="font-mono text-sm text-[color:var(--text)]">{value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="shadow-telemetry p-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Signal summary
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {['A', 'B', 'C', 'D'].map((bar, index) => (
                <div key={bar} className="flex h-28 items-end border border-[color:var(--line-soft)] bg-black/25 p-2">
                  <div
                    className="w-full bg-[linear-gradient(180deg,rgba(241,75,95,0.95),rgba(177,18,38,0.4))]"
                    style={{ height: `${45 + index * 12}%` }}
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
