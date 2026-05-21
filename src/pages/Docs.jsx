import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';
import { docsGatewayCards, docsStatusPanel, docsRoadmap } from '../data/site';

const docSections = [
  {
    id: 'zero-state-architecture',
    title: 'Zero-State Architecture',
    label: 'Architecture',
    summary:
      'A local-first operating structure built around edge nodes, offline inference, relay topology, and operator-owned controls.',
    excerpt:
      '$ node local --role primary\n$ inference offline --policy strict\n$ relay sync --approved only',
  },
  {
    id: 'offline-inference-doctrine',
    title: 'Offline Inference Doctrine',
    label: 'Doctrine',
    summary:
      'Inference should remain functional in degraded networks, restricted facilities, and disconnected environments.',
    excerpt:
      '$ doctrine apply --offline-first\n$ data boundary --retain local\n$ transport --optional true',
  },
  {
    id: 'edge-sovereignty-model',
    title: 'Edge Sovereignty Model',
    label: 'Sovereignty',
    summary:
      'Sovereignty at the edge means the operator owns the compute boundary, the governance lane, and the release cadence.',
    excerpt:
      '$ edge node --governance local\n$ authority --operator-owned\n$ autonomy --layered',
  },
  {
    id: 'deployment-topology',
    title: 'Deployment Topology',
    label: 'Topology',
    summary:
      'A segmented deployment pattern that keeps the workstation, inference node, relay system, and secure edge roles explicit.',
    excerpt:
      '$ topology render\n> workstation -> local node -> relay systems -> secure edge\n> all lanes explicit',
  },
];

export default function Docs() {
  return (
    <>
      <Seo
        title="Docs"
        description="ZeroChill documentation gateway with a Linear-inspired layout discipline and readable status surfaces."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Documentation gateway
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
                Workspace docs with cleaner rails.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                The docs page now feels like a product workspace: compact reference cards, a quiet status rail, and readable content blocks instead of a launch banner.
              </p>
            </div>
            <Panel className="p-4">
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Status rail
              </div>
              <div className="mt-4 space-y-3">
                {docsStatusPanel.map((signal) => (
                  <div key={signal.label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                    <span className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--text-dim)]">
                      {signal.label}
                    </span>
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text)]">
                      {signal.value}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-2">
          {docsGatewayCards.map((card) => (
            <TerminalCard
              key={card.title}
              label="Gateway"
              title={card.title}
              body={card.summary}
            >
              <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4">
                <a
                  href={card.href}
                  className="text-xs uppercase tracking-[0.26em] text-[color:var(--text-dim)] underline decoration-[color:var(--accent)] decoration-1 underline-offset-4"
                >
                  Open section
                </a>
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel className="p-6">
          <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
            Roadmap
          </div>
          <div className="mt-4 space-y-3">
            {docsRoadmap.map((item, index) => (
              <div key={item} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                  0{index + 1}
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{item}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
            Reference docs
          </div>
          <div className="mt-4 grid gap-4">
            {docSections.map((doc) => (
              <div key={doc.id} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-[color:var(--text)]">{doc.title}</div>
                    <div className="mt-1 text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                      {doc.label}
                    </div>
                  </div>
                  <a
                    href={`#${doc.id}`}
                    className="text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]"
                  >
                    Jump
                  </a>
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{doc.summary}</p>
                <pre
                  id={doc.id}
                  className="mt-4 overflow-x-auto rounded-xl border border-[color:var(--line-soft)] bg-black/20 p-4 font-mono text-xs leading-7 text-[color:var(--accent-soft)]"
                >
                  {doc.excerpt}
                </pre>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
