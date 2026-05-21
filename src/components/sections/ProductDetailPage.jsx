import { Link } from 'react-router-dom';
import Seo from '../Seo';
import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';
import TerminalCard from '../ui/TerminalCard';
import TerminalLine from '../ui/TerminalLine';
import InfrastructureVisuals from './InfrastructureVisuals';

function ProductStatus({ product }) {
  return (
    <Panel className="shadow-telemetry p-6">
      <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
        Operational posture
      </div>
      <div className="mt-4 space-y-3">
        <TerminalLine label="Deployment" value={product.eyebrow} />
        <TerminalLine label="Positioning" value={product.positioning} />
        <TerminalLine label="Offline" value="Local-first workflows / relay optional / export controlled" />
        <TerminalLine label="Operator fit" value={product.targetOperators.join(' / ')} />
      </div>
    </Panel>
  );
}

function ProductFlow({ product }) {
  return (
    <Panel className="shadow-telemetry overflow-hidden p-5 sm:p-6">
      <div className="border-b border-[color:var(--line-soft)] pb-4">
        <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
          Operational diagram
        </div>
        <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
          {product.operationalDiagrams[0]}
        </p>
      </div>
      <svg viewBox="0 0 780 280" className="mt-4 h-auto w-full" role="img" aria-label={`${product.title} operational diagram`}>
        <rect width="780" height="280" fill="#050505" />
        <g stroke="#2c2c2f" strokeWidth="1">
          {Array.from({ length: 5 }).map((_, index) => (
            <line key={`h-${index}`} x1="0" y1={28 + index * 44} x2="780" y2={28 + index * 44} />
          ))}
          {Array.from({ length: 9 }).map((_, index) => (
            <line key={`v-${index}`} x1={40 + index * 84} y1="0" x2={40 + index * 84} y2="280" />
          ))}
        </g>
        <g fill="#0c0c0d" stroke="#b11226" strokeWidth="2">
          <rect x="46" y="92" width="140" height="86" />
          <rect x="236" y="52" width="150" height="86" />
          <rect x="236" y="142" width="150" height="86" />
          <rect x="436" y="52" width="144" height="86" />
          <rect x="436" y="142" width="144" height="86" />
          <rect x="628" y="92" width="108" height="86" />
        </g>
        <g stroke="#f14b5f" strokeWidth="3" fill="none">
          <path d="M186 135H236" />
          <path d="M386 95H436" />
          <path d="M386 185H436" />
          <path d="M580 95H628" />
          <path d="M580 185H628" />
        </g>
        <g fill="#f5f3ef" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontSize="14" fontWeight="700" letterSpacing="1.1">
          <text x="116" y="138" textAnchor="middle">INTAKE</text>
          <text x="311" y="98" textAnchor="middle">POLICY</text>
          <text x="311" y="188" textAnchor="middle">MODEL</text>
          <text x="508" y="98" textAnchor="middle">EXPORT</text>
          <text x="508" y="188" textAnchor="middle">RELAY</text>
          <text x="682" y="138" textAnchor="middle">NODE</text>
        </g>
      </svg>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {product.operationalDiagrams.map((line) => (
          <div key={line} className="border border-[color:var(--line-soft)] bg-black/25 p-4 text-sm leading-7 text-[color:var(--text-muted)]">
            {line}
          </div>
        ))}
      </div>
    </Panel>
  );
}

export default function ProductDetailPage({ product }) {
  return (
    <>
      <Seo
        title={product.title}
        description={`${product.title} detail page for deployment scenarios, offline workflows, and sovereign infrastructure positioning.`}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow={product.eyebrow}
          title={product.title}
          copy={product.positioning}
        />

        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          <a href="#deployment-scenarios" className="zc-nav-link">Scenarios</a>
          <a href="#doctrine" className="zc-nav-link">Doctrine</a>
          <a href="#workstation" className="zc-nav-link">Workstation</a>
          <a href="#diagrams" className="zc-nav-link">Diagrams</a>
          <a href="#offline" className="zc-nav-link">Offline</a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-18">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <ProductFlow product={product} />
          <ProductStatus product={product} />
        </div>
      </section>

      <section id="deployment-scenarios" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <SectionHeader
          eyebrow="Deployment scenarios"
          title="Where the node fits."
          copy="The product is positioned as a real deployment class, not a speculative feature set."
        />
        <div className="mt-8 grid gap-5 xl:grid-cols-3">
          {product.deploymentScenarios.map((item, index) => (
            <TerminalCard key={item} label={`0${index + 1}`} body={item} />
          ))}
        </div>
      </section>

      <section id="doctrine" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <TerminalCard
            label="Use-case doctrine"
            title="Operating rules"
            body="Each product has a clear working doctrine that explains how it should be deployed and what it should not be asked to do."
          >
            <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {product.useCaseDoctrine.map((item) => (
                <div key={item} className="border border-[color:var(--line-soft)] bg-black/25 p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  {item}
                </div>
              ))}
            </div>
          </TerminalCard>

          <TerminalCard
            label="Target operator profiles"
            title="Who it is for"
            body="This keeps the positioning focused and believable for investor and client review."
          >
            <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {product.targetOperators.map((item) => (
                <div key={item} className="flex items-center justify-between border border-[color:var(--line-soft)] bg-black/25 px-4 py-3">
                  <span className="text-sm leading-7 text-[color:var(--text-muted)]">{item}</span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                    operator
                  </span>
                </div>
              ))}
            </div>
          </TerminalCard>
        </div>
      </section>

      <section id="workstation" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <SectionHeader
          eyebrow="Workstation and environment"
          title="How the system should be lived with."
          copy="The environment language should feel like actual equipment planning, not generic SaaS copy."
        />
        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {product.workstationConcepts.map((item, index) => (
            <TerminalCard
              key={item}
              label={`WORKSTATION 0${index + 1}`}
              body={item}
            />
          ))}
        </div>
      </section>

      <section id="offline" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <TerminalCard
            label="Offline and local AI workflows"
            title="What stays on-device"
            body="The key operations should survive disconnects, narrow bandwidth, and intentional air-gap conditions."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {product.offlineWorkflows.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </TerminalCard>

          <TerminalCard
            label="Product positioning"
            title="How it should be read"
            body="The positioning should tell a buyer what class of deployment they are considering."
          >
            <div className="mt-5 rounded-none border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              {product.positioning}
            </div>
          </TerminalCard>
        </div>
      </section>

      <InfrastructureVisuals id="diagrams" />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Panel className="shadow-telemetry p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Next step
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">
                Compare the product ladder or move directly into preorder review.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="zc-button-secondary border border-[color:var(--line)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
              >
                Compare products
              </Link>
              <Link
                to="/preorder"
                className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
              >
                Preorder access
              </Link>
            </div>
          </div>
        </Panel>
      </section>
    </>
  );
}
