import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import Panel from '../components/ui/Panel';
import {
  docsGatewayEntries,
  docsStatusPanel,
  docsRoadmap,
} from '../data/site';

const docSections = [
  {
    id: 'zero-state-architecture',
    title: 'Zero-State Architecture',
    label: 'ARCHITECTURE',
    summary:
      'A local-first operating structure built around edge nodes, offline inference clusters, relay topology, tactical workstations, and secure edge compute.',
    excerpt:
      '$ node local --role primary\n$ inference offline --policy strict\n$ relay sync --approved only',
  },
  {
    id: 'offline-inference-doctrine',
    title: 'Offline Inference Doctrine',
    label: 'DOCTRINE',
    summary:
      'Inference should remain functional in degraded networks, restricted facilities, and disconnected environments without changing the operator model.',
    excerpt:
      '$ doctrine apply --offline-first\n$ data boundary --retain local\n$ transport --optional true',
  },
  {
    id: 'edge-sovereignty-model',
    title: 'Edge Sovereignty Model',
    label: 'SOVEREIGNTY',
    summary:
      'Sovereignty at the edge means the operator owns the compute boundary, the governance lane, and the release cadence.',
    excerpt:
      '$ edge node --governance local\n$ authority --operator-owned\n$ autonomy --layered',
  },
  {
    id: 'deployment-topology',
    title: 'Deployment Topology',
    label: 'TOPOLOGY',
    summary:
      'A segmented deployment pattern that keeps the workstation, inference node, relay system, and secure edge compute in narrow, explicit roles.',
    excerpt:
      '$ topology render\n> workstation -> local node -> relay systems -> secure edge\n> all lanes explicit',
  },
];

export default function Docs() {
  return (
    <>
      <Seo
        title="Docs"
        description="ZeroChill Co documentation gateway for architecture, inference doctrine, edge sovereignty, and deployment topology."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Documentation"
          title="Docs Gateway"
          copy="ZeroChill Co technical references for operators, implementers, and deployment owners."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {docsGatewayEntries.map((entry) => (
            <TerminalCard
              key={entry.title}
              label="REFERENCE"
              title={entry.title}
              body={entry.summary}
            >
              <pre className="mt-5 overflow-x-auto border border-[color:var(--line-soft)] bg-black/40 p-4 font-mono text-xs leading-7 text-[color:var(--accent-strong)]">
                {entry.excerpt}
              </pre>
              <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4">
                <a
                  href={entry.href}
                  className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)] underline decoration-[color:var(--accent)] decoration-1 underline-offset-4 hover:text-[color:var(--text)]"
                >
                  Open section
                </a>
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Documentation status"
          title="Current state"
          copy="The documentation layer is static, readable, and aligned with the current build. It is ready to expand into deeper technical references."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel className="shadow-telemetry p-6">
            <div className="grid gap-3">
              {docsStatusPanel.map((signal) => (
                <div key={signal.label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                  <span className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                    {signal.label}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--text)]">
                    {signal.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[color:var(--text-muted)]">
              The docs are intentionally concise and infrastructure-oriented. They are written for review, implementation, and deployment ownership.
            </p>
          </Panel>

          <Panel className="shadow-telemetry p-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Implementation roadmap
            </div>
            <div className="mt-5 space-y-3">
              {docsRoadmap.map((item, index) => (
                <div key={item} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                  <div className="font-mono text-xs uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
                    0{index + 1}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{item}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Reference docs"
          title="Readable by operators."
          copy="Each document below provides a concise technical summary, terminal-style excerpt, and direct path into the framework."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {docSections.map((doc) => (
            <TerminalCard key={doc.id} label={doc.label} title={doc.title} body={doc.summary}>
              <pre
                id={doc.id}
                className="mt-5 overflow-x-auto border border-[color:var(--line-soft)] bg-black/40 p-4 font-mono text-xs leading-7 text-[color:var(--accent-strong)]"
              >
                {doc.excerpt}
              </pre>
            </TerminalCard>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
