import Seo from '../components/Seo';
import CinematicIntro from '../components/sections/CinematicIntro';
import HardwareConceptPanels from '../components/sections/HardwareConceptPanels';
import MissionControl from '../components/sections/MissionControl';
import DeploymentArchitecture from '../components/sections/DeploymentArchitecture';
import WhyLocalAI from '../components/sections/WhyLocalAI';
import UseCaseDoctrine from '../components/sections/UseCaseDoctrine';
import OperationalPhilosophy from '../components/sections/OperationalPhilosophy';
import DeploymentTopologySet from '../components/sections/DeploymentTopologySet';
import InfrastructureVisuals from '../components/sections/InfrastructureVisuals';
import SovereignPositioning from '../components/sections/SovereignPositioning';
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
      <div className="space-y-8 lg:space-y-14">
        <CinematicIntro />
        <MissionControl />
        <HardwareConceptPanels />
        <DeploymentArchitecture />
        <InfrastructureVisuals />
        <DeploymentTopologySet />
        <UseCaseDoctrine />
        <WhyLocalAI />
        <SovereignPositioning />
        <OperationalPhilosophy />
        <Blueprint />
        <TierGrid />
        <DocsPreview />
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <SectionHeader
            eyebrow="Launch stance"
            title="Built for the first production wave."
            copy="The site now reads more like an infrastructure presentation: heavier visual depth, clearer signal, and more believable systems language."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <TerminalCard
              label="No cloud leash"
              body="All core messaging points back to local-first execution and operator-owned infrastructure."
            />
            <TerminalCard
              label="Industrial grid"
              body="Panels, separators, and command-line framing replace generic SaaS scaffolding."
            />
            <TerminalCard
              label="Launch-ready"
              body="The site stays fast, mobile responsive, and readable under low-resource conditions."
            />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
