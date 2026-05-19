import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import TerminalLine from '../components/ui/TerminalLine';
import { sovereignZeroNotes, productTiers } from '../data/site';

export default function SovereignZero() {
  return (
    <>
      <Seo
        title="Sovereign Zero"
        description="Sovereign Zero is the local execution layer for isolated inference, hardened workflows, and operator-owned compute."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Platform"
          title="Sovereign Zero"
          copy="The first product line is not a demo. It is the production shape of a system that stays local, stays legible, and stays under operator control."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <TerminalCard
            label="Core properties"
            body="Sovereign Zero keeps inference, policy, and visibility inside a controlled perimeter."
          >
            <div className="mt-4">
              <TerminalLine label="Runtime" value="Local-only inference and orchestration" />
              <TerminalLine label="Dependency" value="No mandatory cloud services" />
              <TerminalLine label="Profile" value="Low-resource friendly, fast boot" />
              <TerminalLine label="Security" value="Reduced attack surface, operator-owned" />
            </div>
          </TerminalCard>

          <TerminalCard
            label="Deployment tone"
            title="Black steel, not soft chrome"
            body="The console is built to feel industrial and controlled. It should read like a tactical machine room, not a SaaS dashboard."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {sovereignZeroNotes.map((note) => (
                <li key={note} className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {note}
                </li>
              ))}
            </ul>
          </TerminalCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Product context"
          title="Staged for serious deployments."
          copy="The same platform can be shaped for light, standard, restricted, or developer-facing use cases."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {productTiers.slice(0, 3).map((tier) => (
            <TerminalCard key={tier.name} label={tier.badge} title={tier.name} body={tier.description}>
              <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                Tier / {tier.features.join(' // ')}
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
