import SectionHeader from '../ui/SectionHeader';
import Panel from '../ui/Panel';
import { deploymentNodes } from '../../data/site';

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 920 520" className="h-auto w-full" role="img" aria-label="Deployment architecture diagram">
      <defs>
        <linearGradient id="zc-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#f14b5f" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b11226" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="920" height="520" fill="#050505" />
      <g stroke="#2c2c2f" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, index) => (
          <line key={`h-${index}`} x1="0" y1={40 + index * 50} x2="920" y2={40 + index * 50} />
        ))}
        {Array.from({ length: 10 }).map((_, index) => (
          <line key={`v-${index}`} x1={40 + index * 84} y1="0" x2={40 + index * 84} y2="520" />
        ))}
      </g>
      <g fill="#0c0c0d" stroke="url(#zc-line)" strokeWidth="2">
        <rect x="70" y="180" width="160" height="96" />
        <rect x="286" y="80" width="180" height="96" />
        <rect x="286" y="240" width="180" height="96" />
        <rect x="542" y="80" width="170" height="96" />
        <rect x="542" y="240" width="170" height="96" />
        <rect x="742" y="160" width="120" height="112" />
      </g>
      <g stroke="url(#zc-line)" strokeWidth="4" fill="none">
        <path d="M230 228H286" />
        <path d="M466 128H542" />
        <path d="M466 288H542" />
        <path d="M712 128H742" />
        <path d="M712 288H742" />
      </g>
      <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="18" fontWeight="700" letterSpacing="2">
        <text x="92" y="222">LOCAL NODE</text>
        <text x="308" y="122">OFFLINE INFERENCE</text>
        <text x="308" y="282">TACTICAL WORKSTATION</text>
        <text x="564" y="122">RELAY SYSTEMS</text>
        <text x="564" y="282">SECURE EDGE</text>
        <text x="765" y="228">NODE</text>
      </g>
      <g fill="#8f8a81" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="13" letterSpacing="1.5">
        <text x="92" y="247">PRIMARY EXECUTION</text>
        <text x="308" y="147">LOCAL MODEL PATH</text>
        <text x="308" y="307">OPERATOR CONTROL</text>
        <text x="564" y="147">SYNC / UPDATE LANE</text>
        <text x="564" y="307">HARDENED COMPUTE</text>
        <text x="765" y="253">EDGE</text>
      </g>
    </svg>
  );
}

export default function DeploymentArchitecture() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Deployment architecture"
        title="Local systems, connected by design."
        copy="The architecture keeps compute local, uses relay lanes sparingly, and makes the workstation the control boundary."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="shadow-telemetry overflow-hidden p-4 sm:p-6">
          <ArchitectureDiagram />
        </Panel>

        <Panel className="shadow-telemetry p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            System path
          </div>
          <div className="mt-4 space-y-4">
            {deploymentNodes.map((node, index) => (
              <div key={node.title} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm uppercase tracking-[0.28em] text-[color:var(--text)]">
                    {node.title}
                  </h3>
                  <span className="font-mono text-xs text-[color:var(--accent-strong)]">0{index + 1}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{node.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
            local node // offline inference // relay systems // tactical workstation // secure edge compute
          </div>
        </Panel>
      </div>
    </section>
  );
}
