import Seo from '../components/Seo';
import LaunchBroadcast from '../components/sections/LaunchBroadcast';
import Blueprint from '../components/sections/Blueprint';
import TierGrid from '../components/sections/TierGrid';
import DocsPreview from '../components/sections/DocsPreview';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';

export default function Home() {
  return (
    <>
      <Seo
        title="YOUR AI. UNPLUGGED."
        description="ZeroChill Co builds sovereign local AI infrastructure, hardened product tiers, and terminal-first operator tooling."
      />
      <LaunchBroadcast />
      <Blueprint />
      <TierGrid />
      <DocsPreview />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Launch stance"
          title="Built for the first production wave."
          copy="The site is intentionally stripped down. It should feel like a system under command, not a campaign landing page."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <TerminalCard
            label="No cloud leash"
            body="All core messaging points back to local-first execution and operator-owned infrastructure."
          />
          <TerminalCard
            label="Industrial grid"
            body="Panels, edges, and command-line framing replace generic SaaS scaffolding."
          />
          <TerminalCard
            label="Launch-ready"
            body="The preorder path is live in-browser and the routes are direct, stable, and readable."
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
