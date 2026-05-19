import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import { docsPreviewBlocks, docsNotes } from '../data/site';

const routeNotes = [
  'All pages are client-side routes with a static fallback strategy for deploy targets.',
  'The visual system is driven from one Tailwind v4 entrypoint and a small CSS variable map.',
  'Reusable cards keep the branded terminal language consistent across launch and product pages.',
];

export default function Docs() {
  return (
    <>
      <Seo
        title="Docs"
        description="ZeroChill Co technical documentation preview blocks, implementation notes, and operator-oriented routing guidance."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Documentation"
          title="Docs"
          copy="Launch-ready documentation fragments, written like system output rather than marketing collateral."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {docsPreviewBlocks.map((block) => (
            <TerminalCard
              key={block.label}
              label={block.label}
              command={block.command}
              body={block.body}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Implementation notes"
          title="How this shell stays light."
          copy="The stack avoids heavy dependencies and keeps the runtime surface narrow."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <TerminalCard label="System notes" title="Frontend rules" body="Short, direct, and maintainable. Built to stay readable in a low-resource workspace.">
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {docsNotes.map((note) => (
                <li key={note} className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {note}
                </li>
              ))}
            </ul>
          </TerminalCard>

          <TerminalCard
            label="route map"
            title="Direct navigation"
            body="The router is client-side, with explicit page paths for each launch surface."
          >
            <div className="mt-5 grid gap-3">
              {routeNotes.map((note, index) => (
                <div key={note} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                  <div className="font-mono text-xs uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
                    Route 0{index + 1}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{note}</p>
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
