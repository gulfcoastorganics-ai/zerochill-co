import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import Panel from '../components/ui/Panel';
import {
  reviewSnapshot,
  reviewCompletedWork,
  reviewBrandInventory,
  reviewRoutes,
  reviewChecklist,
  reviewMilestones,
  reviewLimitations,
  reviewHandoff,
} from '../data/site';

const liveDeployment = 'TBD - insert production URL before client delivery';
const repoReference = 'TBD - insert GitHub repository URL';

export default function Review() {
  return (
    <>
      <Seo
        title="Client Review"
        description="Client-facing project status overview for Danny Ford and ZeroChill Co."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow="Client review"
          title="Project status overview"
          copy="A concise review page for Danny Ford with no repo deep-dive required."
        />

        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          <a href="#review-status" className="zc-nav-link">Status</a>
          <a href="#review-work" className="zc-nav-link">Completed work</a>
          <a href="#review-checklist" className="zc-nav-link">Checklist</a>
          <a href="#review-handoff" className="zc-nav-link">Handoff</a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-18">
        <div className="grid gap-5 lg:grid-cols-4">
          {reviewSnapshot.map((item, index) => (
            <TerminalCard
              key={item.label}
              label={item.label}
              body={item.value}
              className="border border-[color:var(--line-soft)]"
            >
              <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                0{index + 1}
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section id="review-status" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <TerminalCard
            label="Live deployment"
            title="Deployment reference"
            body="The public site is built and ready for a production URL to be confirmed."
          >
            <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                  Live URL
                </div>
                <div className="mt-2 font-mono text-xs leading-6 text-[color:var(--accent-strong)]">
                  {liveDeployment}
                </div>
              </div>
              <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                  GitHub repo
                </div>
                <div className="mt-2 font-mono text-xs leading-6 text-[color:var(--accent-strong)]">
                  {repoReference}
                </div>
              </div>
            </div>
          </TerminalCard>

          <TerminalCard
            label="Brand system inventory"
            title="What is already in place"
            body="The visual and content system is aligned around the ZeroChill Co brand voice."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {reviewBrandInventory.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[color:var(--accent-strong)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalCard>
        </div>
      </section>

      <section id="review-work" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <SectionHeader
          eyebrow="Completed work"
          title="Built and ready for review."
          copy="The current site already includes the launch presentation, route structure, asset system, and support documentation."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {reviewCompletedWork.map((item, index) => (
            <TerminalCard key={item} label={`0${index + 1}`} body={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <SectionHeader
          eyebrow="Current website routes"
          title="Route map"
          copy="The public site exposes the launch and documentation surfaces below."
        />

        <Panel className="shadow-telemetry mt-8 p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reviewRoutes.map((route) => (
              <div key={route} className="border border-[color:var(--line-soft)] bg-black/25 p-4 font-mono text-sm uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                {route}
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section id="review-checklist" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <TerminalCard
            label="Approval checklist"
            title="What needs sign-off"
            body="These are the items Danny should review before the next milestone starts."
          >
            <ul className="mt-5 grid gap-3 border-t border-[color:var(--line-soft)] pt-4">
              {reviewChecklist.map((item) => (
                <li key={item} className="flex gap-3 border border-[color:var(--line-soft)] bg-black/25 p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[color:var(--accent-strong)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalCard>

          <TerminalCard
            label="Recommended next milestones"
            title="Best next steps"
            body="The project is ready for a focused decision on scope and deployment ownership."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {reviewMilestones.map((item) => (
                <li key={item} className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </TerminalCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <TerminalCard
            label="Known limitations"
            title="Current constraints"
            body="These are the gaps that remain before full launch integration."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {reviewLimitations.map((item) => (
                <li key={item} className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </TerminalCard>

          <TerminalCard
            label="Handoff notes"
            title="Builder / operator context"
            body="These notes frame the current state without exposing credentials or internal-only operator details."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {reviewHandoff.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[color:var(--accent-strong)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalCard>
        </div>
      </section>

      <section id="review-handoff" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <Panel className="shadow-telemetry border-[color:var(--line)] bg-black/35 p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Footer note
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
            This review page is intended to help Danny Ford review the project quickly without reading the repository documentation. The next handoff only needs the live URL, repo URL, and sign-off on the checklist above.
          </p>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
