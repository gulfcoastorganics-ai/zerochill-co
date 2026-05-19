import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Panel from '../ui/Panel';
import TerminalCard from '../ui/TerminalCard';
import { launchPhases } from '../../data/site';

export default function LaunchBroadcast() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="max-w-3xl">
          <Badge>Industrial AI sovereignty</Badge>
          <p className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-[color:var(--text-dim)]">
            Local compute, sovereign control, black-metal system design
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] text-[color:var(--text)] sm:text-7xl lg:text-[8rem]">
            YOUR AI.
            <span className="block text-[color:var(--accent)]">UNPLUGGED.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">
            ZeroChill Co builds localized intelligence infrastructure for operators who want the
            machine to stay inside their perimeter. No cloud dependency. No surveillance drift.
            No compromise.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/preorder"
              className="border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
            >
              Request Access
            </Link>
            <Link
              to="/manifest"
              className="border border-[color:var(--line)] bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
            >
              Read Manifest
            </Link>
          </div>
        </div>

        <Panel className="overflow-hidden">
          <div className="border-b border-[color:var(--line-soft)] px-5 py-4">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Launch broadcast
            </div>
            <div className="mt-2 text-lg font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
              Phase sequence armed
            </div>
          </div>
          <div className="space-y-3 p-5">
            <div className="font-mono text-sm leading-7 text-[color:var(--text-muted)]">
              &gt; system signature locked
              <br />
              &gt; local runtime prioritized
              <br />
              &gt; control plane under operator command
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-[color:var(--line-soft)] bg-black/20 p-3">
                <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                  Signal
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                  Tactical / Local / Hardened
                </div>
              </div>
              <div className="border border-[color:var(--line-soft)] bg-black/20 p-3">
                <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                  Surface
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-[color:var(--accent-strong)]">
                  Minimal / Explicit / Readable
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {launchPhases.map((phase) => (
          <TerminalCard
            key={phase.title}
            label={phase.title}
            title={phase.lead}
            body={phase.copy}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
}
