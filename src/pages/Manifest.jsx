import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import { manifestPoints } from '../data/site';

const doctrineRows = [
  {
    title: 'Sovereignty',
    copy: 'Operator-owned compute is the default posture. If it is not controlled, it is not critical.',
  },
  {
    title: 'Locality',
    copy: 'The best system is the one that still works when the network is degraded or gone.',
  },
  {
    title: 'Discipline',
    copy: 'The interface should narrow attention, reduce noise, and expose only what matters.',
  },
  {
    title: 'Clarity',
    copy: 'Industrial systems earn trust by being legible under pressure, not by looking polished.',
  },
];

export default function Manifest() {
  return (
    <>
      <Seo
        title="Manifest"
        description="ZeroChill Co's operating doctrine is built around sovereignty, locality, discipline, and clarity."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeader
          eyebrow="Doctrine"
          title="Manifest"
          copy="This is the operating code behind the brand: hardened, anti-corporate, and designed for the long run."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {doctrineRows.map((row) => (
            <TerminalCard key={row.title} label={row.title} body={row.copy} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Operating statements"
          title="What we will not build."
          copy="ZeroChill rejects surveillance-first defaults, cloud dependency theater, and abstract systems that hide the operator from the machine."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {manifestPoints.map((point, index) => (
            <TerminalCard
              key={point}
              label={`0${index + 1}`}
              body={point}
              className="h-full"
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
