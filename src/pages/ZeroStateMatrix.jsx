import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import { matrixNotes, docsPreviewBlocks } from '../data/site';

const controlRows = [
  { k: 'EXECUTION', v: 'Task routing, local policy enforcement, and state clarity' },
  { k: 'VISIBILITY', v: 'Terminal-readable traces and operator-centered diagnostics' },
  { k: 'SURFACE', v: 'Minimal network touchpoints and narrow runtime exposure' },
];

export default function ZeroStateMatrix() {
  return (
    <>
      <Seo
        title="Zero State Matrix"
        description="Zero State Matrix is the command layer for local AI orchestration, state visibility, and operator control."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Operations"
          title="Zero State Matrix"
          copy="A control plane designed to compress complexity into a readable, industrial interface."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {controlRows.map((row) => (
            <TerminalCard key={row.k} label={row.k} body={row.v} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="System shape"
          title="Command-line by design."
          copy="The language of the interface follows the same discipline as the product: precise, sparse, and operational."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <TerminalCard
            label="State model"
            title="Local control loop"
            body="The Matrix is organized around observability, policy, and execution. It should feel like a console for real machines."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {matrixNotes.map((note) => (
                <li key={note} className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {note}
                </li>
              ))}
            </ul>
          </TerminalCard>

          <TerminalCard
            label="docs preview"
            title="Operational packets"
            body="The same documentation language appears here as a live preview of how the platform reports itself."
          >
            <div className="mt-5 space-y-4">
              {docsPreviewBlocks.slice(0, 2).map((block) => (
                <div key={block.label} className="border border-[color:var(--line-soft)] bg-black/30 p-4">
                  <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                    {block.label}
                  </div>
                  <pre className="mt-3 overflow-x-auto font-mono text-xs leading-7 text-[color:var(--accent-strong)]">
                    {block.command}
                  </pre>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </TerminalCard>
        </div>
      </section>

      <Footer />
    </>
  );
}
