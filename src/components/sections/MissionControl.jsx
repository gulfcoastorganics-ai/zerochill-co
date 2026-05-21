import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';
import { missionControlCards } from '../../data/site';

const nodeRows = [
  { name: 'ZC-01', role: 'Primary node', state: 'ONLINE', note: 'Local inference locked, relay optional' },
  { name: 'ZC-02', role: 'Edge relay', state: 'BUFFERED', note: 'Waiting on sync window' },
  { name: 'ZC-03', role: 'Restricted lane', state: 'SEALED', note: 'Access controlled, export reviewed' },
];

const relayBands = [
  { label: 'Intake', value: 78 },
  { label: 'Queue', value: 54 },
  { label: 'Inference', value: 91 },
  { label: 'Export', value: 33 },
];

export default function MissionControl() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Mission control"
        title="Simulated deployment visibility."
        copy="A lightweight frontend control room for telemetry, node states, and local inference posture. It is presentation only, but the structure reads like a real operations surface."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel className="shadow-telemetry overflow-hidden p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {missionControlCards.map((card) => (
              <div key={card.label} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                  {card.label}
                </div>
                <div className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
              <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Edge relay visuals
              </div>
              <svg viewBox="0 0 520 220" className="mt-4 h-auto w-full" role="img" aria-label="Edge relay visuals">
                <rect width="520" height="220" fill="#050505" />
                <g stroke="#2c2c2f" strokeWidth="1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <line key={`h-${index}`} x1="0" y1={36 + index * 34} x2="520" y2={36 + index * 34} />
                  ))}
                  {Array.from({ length: 8 }).map((_, index) => (
                    <line key={`v-${index}`} x1={24 + index * 62} y1="0" x2={24 + index * 62} y2="220" />
                  ))}
                </g>
                <g fill="#0c0c0d" stroke="#b11226" strokeWidth="2">
                  <rect x="26" y="74" width="96" height="64" />
                  <rect x="212" y="46" width="96" height="64" />
                  <rect x="212" y="122" width="96" height="64" />
                  <rect x="402" y="74" width="96" height="64" />
                </g>
                <g stroke="#f14b5f" strokeWidth="3" fill="none">
                  <path d="M122 106H212" />
                  <path d="M308 78H402" />
                  <path d="M308 154H402" />
                </g>
                <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontSize="14" fontWeight="700" letterSpacing="1.2">
                  <text x="74" y="111" textAnchor="middle">INTAKE</text>
                  <text x="260" y="83" textAnchor="middle">RELAY</text>
                  <text x="260" y="159" textAnchor="middle">QUEUE</text>
                  <text x="450" y="111" textAnchor="middle">EDGE</text>
                </g>
              </svg>
            </div>

            <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
              <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Local inference states
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ['Model', 'Loaded locally'],
                  ['Policy', 'Strict / operator-owned'],
                  ['Queue', 'Low / responsive'],
                  ['Sync', 'Deferred until relay'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-[color:var(--line-soft)] pb-3">
                    <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                      {label}
                    </span>
                    <span className="font-mono text-sm text-[color:var(--text)]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {relayBands.map((band) => (
                  <div key={band.label} className="flex h-24 items-end border border-[color:var(--line-soft)] bg-black/30 p-2">
                    <div
                      className="w-full bg-[linear-gradient(180deg,rgba(241,75,95,0.95),rgba(177,18,38,0.25))]"
                      style={{ height: `${band.value}%` }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                {relayBands.map((band) => (
                  <div key={band.label} className="text-center">
                    {band.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="shadow-telemetry p-5 sm:p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Node status indicators
          </div>
          <div className="mt-4 space-y-3">
            {nodeRows.map((node) => (
              <div key={node.name} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm uppercase tracking-[0.28em] text-[color:var(--text)]">
                      {node.name}
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                      {node.role}
                    </p>
                  </div>
                  <span className="border border-[color:var(--line-soft)] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                    {node.state}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{node.note}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}
