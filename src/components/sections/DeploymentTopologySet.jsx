import SectionHeader from '../ui/SectionHeader';
import Panel from '../ui/Panel';

function DiagramFrame({ title, lines, labels }) {
  return (
    <Panel className="shadow-telemetry overflow-hidden p-4 sm:p-6">
      <div className="border-b border-[color:var(--line-soft)] pb-4 text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
        {title}
      </div>
      <svg viewBox="0 0 760 340" className="mt-4 h-auto w-full" role="img" aria-label={title}>
        <rect width="760" height="340" fill="#050505" />
        <g stroke="#2c2c2f" strokeWidth="1">
          {Array.from({ length: 7 }).map((_, index) => (
            <line key={`h-${index}`} x1="0" y1={30 + index * 46} x2="760" y2={30 + index * 46} />
          ))}
          {Array.from({ length: 9 }).map((_, index) => (
            <line key={`v-${index}`} x1={40 + index * 84} y1="0" x2={40 + index * 84} y2="340" />
          ))}
        </g>
        {lines}
        {labels}
      </svg>
    </Panel>
  );
}

export default function DeploymentTopologySet() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Deployment diagrams"
        title="Topology patterns"
        copy="SVG diagrams keep the system legible without adding weight to the build."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        <DiagramFrame
          title="Workstation topology"
          lines={
            <g stroke="#f14b5f" strokeWidth="3" fill="none">
              <path d="M160 180H280" />
              <path d="M360 180H500" />
              <path d="M580 180H660" />
            </g>
          }
          labels={
            <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="16" fontWeight="700" letterSpacing="1.5">
              <rect x="80" y="140" width="120" height="80" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <rect x="280" y="140" width="160" height="80" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <rect x="500" y="140" width="150" height="80" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <text x="140" y="184" textAnchor="middle">WORKSTATION</text>
              <text x="360" y="184" textAnchor="middle">LOCAL NODE</text>
              <text x="575" y="184" textAnchor="middle">DISPLAY / OPS</text>
            </g>
          }
        />

        <DiagramFrame
          title="Edge node cluster"
          lines={
            <g stroke="#f14b5f" strokeWidth="3" fill="none">
              <path d="M190 170H300" />
              <path d="M380 120V220" />
              <path d="M480 170H590" />
              <path d="M380 220H380" />
            </g>
          }
          labels={
            <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="15" fontWeight="700" letterSpacing="1.3">
              <circle cx="160" cy="170" r="34" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <circle cx="380" cy="170" r="42" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <circle cx="600" cy="170" r="34" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <text x="160" y="174" textAnchor="middle">NODE A</text>
              <text x="380" y="174" textAnchor="middle">NODE B</text>
              <text x="600" y="174" textAnchor="middle">NODE C</text>
            </g>
          }
        />

        <DiagramFrame
          title="Relay architecture"
          lines={
            <g stroke="#f14b5f" strokeWidth="3" fill="none">
              <path d="M150 210H260" />
              <path d="M360 210H470" />
              <path d="M570 210H680" />
            </g>
          }
          labels={
            <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="15" fontWeight="700" letterSpacing="1.3">
              <rect x="90" y="170" width="120" height="80" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <rect x="300" y="170" width="120" height="80" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <rect x="510" y="170" width="120" height="80" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <text x="150" y="214" textAnchor="middle">SYNC</text>
              <text x="360" y="214" textAnchor="middle">GATE</text>
              <text x="570" y="214" textAnchor="middle">RELAY</text>
            </g>
          }
        />

        <DiagramFrame
          title="Local inference mesh"
          lines={
            <g stroke="#f14b5f" strokeWidth="3" fill="none">
              <path d="M150 120L300 170L150 220L300 270" />
              <path d="M420 120L300 170L420 220L300 270" />
              <path d="M560 170H680" />
            </g>
          }
          labels={
            <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontSize="15" fontWeight="700" letterSpacing="1.3">
              <circle cx="150" cy="170" r="34" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <circle cx="420" cy="170" r="34" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <circle cx="300" cy="250" r="40" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <circle cx="660" cy="170" r="34" fill="#0c0c0d" stroke="#b11226" strokeWidth="2" />
              <text x="150" y="174" textAnchor="middle">EDGE 1</text>
              <text x="420" y="174" textAnchor="middle">EDGE 2</text>
              <text x="300" y="254" textAnchor="middle">LOCAL AI</text>
              <text x="660" y="174" textAnchor="middle">OPS</text>
            </g>
          }
        />
      </div>
    </section>
  );
}
