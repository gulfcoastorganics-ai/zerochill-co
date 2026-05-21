import { Link } from 'react-router-dom';
import Seo from '../Seo';
import Panel from '../ui/Panel';
import TerminalCard from '../ui/TerminalCard';
import TerminalLine from '../ui/TerminalLine';

function ProductStatus({ product }) {
  return (
    <Panel className="p-6">
      <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
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

export default function ProductDetailPage({ product }) {
  return (
    <>
      <Seo
        title={product.title}
        description={`${product.title} detail page for deployment scenarios, offline workflows, and sovereign infrastructure positioning.`}
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                {product.eyebrow}
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
                {product.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                {product.positioning}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
              >
                Product index
              </Link>
              <Link
                to="/preorder"
                className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-black"
              >
                Preorder
              </Link>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <TerminalCard
            label="Deployment scenarios"
            title="Where the node fits"
            body="The product is positioned as a real deployment class, not a speculative feature set."
          >
            <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {product.deploymentScenarios.map((item, index) => (
                <div key={item} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  <span className="mr-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                    0{index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </TerminalCard>

          <ProductStatus product={product} />
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <TerminalCard
          label="Use-case doctrine"
          title="Operating rules"
          body="Each product has a clear working doctrine that explains how it should be deployed and what it should not be asked to do."
        >
          <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
            {product.useCaseDoctrine.map((item) => (
              <div key={item} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                {item}
              </div>
            ))}
          </div>
        </TerminalCard>

        <TerminalCard
          label="Offline workflow"
          title="What stays on-device"
          body="The key operations should survive disconnects, narrow bandwidth, and intentional air-gap conditions."
        >
          <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
            {product.offlineWorkflows.map((item) => (
              <div key={item} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                {item}
              </div>
            ))}
          </div>
        </TerminalCard>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <TerminalCard
          label="Workstation"
          title="How the system is lived with"
          body="The environment language is kept practical and equipment-like."
        >
          <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
            {product.workstationConcepts.map((item) => (
              <div key={item} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                {item}
              </div>
            ))}
          </div>
        </TerminalCard>

        <TerminalCard
          label="Topology"
          title="Operational diagram"
          body="A clean linear path is enough to explain the system without an animated diagram."
        >
          <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
            {product.operationalDiagrams.map((line) => (
              <div key={line} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                {line}
              </div>
            ))}
          </div>
        </TerminalCard>
      </section>

      <section className="mt-8">
        <Panel className="p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Next step
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
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
