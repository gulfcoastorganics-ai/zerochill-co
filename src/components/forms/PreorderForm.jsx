import { useEffect, useMemo, useState } from 'react';
import Panel from '../ui/Panel';
import TerminalCard from '../ui/TerminalCard';
import { productTiers } from '../../data/site';

const STORAGE_KEY = 'zerochill-preorder-submissions';

const initialForm = {
  name: '',
  email: '',
  intendedUse: '',
  preferredTier: productTiers[1].name,
};

function readSubmissions() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function PreorderForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setSubmissions(readSubmissions());
  }, []);

  const latestSubmission = useMemo(() => submissions.at(-1), [submissions]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const entry = {
      ...form,
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const next = [...readSubmissions(), entry];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSubmissions(next);
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Panel className="p-6 sm:p-8">
        {submitted ? (
          <div className="border border-[color:var(--accent)] bg-[rgba(177,18,38,0.08)] p-5">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
              Submission received
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
              Your preorder interest has been stored locally. We&apos;ll use the selected tier and
              intended use to shape the next contact step.
            </p>
          </div>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Name
            </span>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="border border-[color:var(--line)] bg-black/30 px-4 py-3 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
              placeholder="Your name"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="border border-[color:var(--line)] bg-black/30 px-4 py-3 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
              placeholder="name@domain.com"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Intended use
            </span>
            <textarea
              name="intendedUse"
              required
              value={form.intendedUse}
              onChange={handleChange}
              className="min-h-32 border border-[color:var(--line)] bg-black/30 px-4 py-3 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
              placeholder="Private lab, field ops, internal model work, or other sovereign deployment"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Preferred product tier
            </span>
            <select
              name="preferredTier"
              value={form.preferredTier}
              onChange={handleChange}
              className="border border-[color:var(--line)] bg-black/30 px-4 py-3 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--accent)]"
            >
              {productTiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="mt-2 border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
          >
            Store Interest
          </button>
        </form>
      </Panel>

      <div className="grid gap-6">
        <TerminalCard
          label="local storage"
          title="Submission state"
          body="Entries are preserved in the browser until you clear site data. No backend exists yet, by design."
        >
          <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
            saved records: {submissions.length}
          </div>
        </TerminalCard>

        <TerminalCard
          label="latest packet"
          title={latestSubmission ? latestSubmission.name : 'No submissions yet'}
          body={
            latestSubmission
              ? `${latestSubmission.email} // ${latestSubmission.preferredTier}`
              : 'Use the form to stage the first preorder interest packet.'
          }
        />
      </div>
    </div>
  );
}
