import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

function DiagramShell({ title, copy, children }) {
  return (
    <Panel className="shadow-telemetry overflow-hidden p-5 sm:p-6">
      <div className="border-b border-[color:var(--line-soft)] pb-4">
        <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
          {title}
        </div>
        <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{copy}</p>
      </div>
      {children}
    </Panel>
  );
}

export default function InfrastructureVisuals({ id }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Visual systems"
        title="Topology, flow, and workstation schematics."
        copy="These diagrams keep the platform readable as an infrastructure product: where it lands, how the edge moves, and what the operator actually sits in front of."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        <DiagramShell
          title="Infrastructure topology"
          copy="A simple picture of the node, relay, and workstation relationship."
        >
          <svg viewBox="0 0 360 300" className="mt-4 h-auto w-full" role="img" aria-label="Infrastructure topology diagram">
            <rect width="360" height="300" fill="#050505" />
            <g stroke="#2c2c2f" strokeWidth="1">
              {Array.from({ length: 6 }).map((_, index) => (
                <line key={`h-${index}`} x1="0" y1={32 + index * 40} x2="360" y2={32 + index * 40} />
              ))}
            </g>
            <g fill="#0c0c0d" stroke="#b11226" strokeWidth="2">
              <rect x="24" y="120" width="92" height="58" />
              <rect x="136" y="76" width="90" height="58" />
              <rect x="136" y="160" width="90" height="58" />
              <rect x="248" y="120" width="88" height="58" />
            </g>
            <g stroke="#f14b5f" strokeWidth="3" fill="none">
              <path d="M116 149H136" />
              <path d="M226 105H248" />
              <path d="M226 189H248" />
            </g>
            <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontSize="13" fontWeight="700" letterSpacing="1.1">
              <text x="70" y="152" textAnchor="middle">NODE</text>
              <text x="181" y="108" textAnchor="middle">RELAY</text>
              <text x="181" y="192" textAnchor="middle">WORKSTATION</text>
              <text x="292" y="152" textAnchor="middle">EDGE</text>
            </g>
          </svg>
        </DiagramShell>

        <DiagramShell
          title="Edge compute flow"
          copy="The flow keeps prompts, policies, and local output inside the operator perimeter."
        >
          <svg viewBox="0 0 360 300" className="mt-4 h-auto w-full" role="img" aria-label="Edge compute flow diagram">
            <rect width="360" height="300" fill="#050505" />
            <g stroke="#2c2c2f" strokeWidth="1">
              {Array.from({ length: 6 }).map((_, index) => (
                <line key={`h-${index}`} x1="0" y1={28 + index * 42} x2="360" y2={28 + index * 42} />
              ))}
            </g>
            <g fill="#0c0c0d" stroke="#b11226" strokeWidth="2">
              <circle cx="72" cy="150" r="34" />
              <circle cx="180" cy="98" r="34" />
              <circle cx="180" cy="202" r="34" />
              <circle cx="288" cy="150" r="34" />
            </g>
            <g stroke="#f14b5f" strokeWidth="3" fill="none">
              <path d="M106 150H146" />
              <path d="M214 98H250" />
              <path d="M214 202H250" />
            </g>
            <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontSize="13" fontWeight="700" letterSpacing="1.1">
              <text x="72" y="154" textAnchor="middle">INPUT</text>
              <text x="180" y="102" textAnchor="middle">POLICY</text>
              <text x="180" y="206" textAnchor="middle">MODEL</text>
              <text x="288" y="154" textAnchor="middle">OUTPUT</text>
            </g>
          </svg>
        </DiagramShell>

        <DiagramShell
          title="Workstation stack"
          copy="A believable operator station with a visible control boundary and no ornamental excess."
        >
          <svg viewBox="0 0 360 300" className="mt-4 h-auto w-full" role="img" aria-label="Workstation stack schematic">
            <rect width="360" height="300" fill="#050505" />
            <g stroke="#2c2c2f" strokeWidth="1">
              {Array.from({ length: 6 }).map((_, index) => (
                <line key={`h-${index}`} x1="0" y1={28 + index * 42} x2="360" y2={28 + index * 42} />
              ))}
            </g>
            <g fill="#0c0c0d" stroke="#b11226" strokeWidth="2">
              <rect x="50" y="46" width="260" height="42" />
              <rect x="74" y="104" width="212" height="42" />
              <rect x="88" y="162" width="184" height="42" />
              <rect x="104" y="220" width="152" height="42" />
            </g>
            <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontSize="13" fontWeight="700" letterSpacing="1.1">
              <text x="180" y="72" textAnchor="middle">DISPLAY / OPS</text>
              <text x="180" y="130" textAnchor="middle">LOCAL MODEL</text>
              <text x="180" y="188" textAnchor="middle">POLICY LAYER</text>
              <text x="180" y="246" textAnchor="middle">STORAGE</text>
            </g>
          </svg>
        </DiagramShell>
      </div>
    </section>
  );
}
