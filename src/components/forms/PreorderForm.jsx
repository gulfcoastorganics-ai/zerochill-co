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

const initialStatus = {
  phase: 'idle',
  message: '',
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

function sanitizeForm(form) {
  return {
    name: String(form.name ?? '').replace(/\s+/g, ' ').trim(),
    email: String(form.email ?? '').replace(/\s+/g, ' ').trim(),
    intendedUse: String(form.intendedUse ?? '').replace(/\s+/g, ' ').trim(),
    preferredTier: String(form.preferredTier ?? '').trim(),
  };
}

function storeSubmission(entry) {
  const next = [...readSubmissions(), entry];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export default function PreorderForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(initialStatus);
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSubmissions(readSubmissions());
  }, []);

  const latestSubmission = useMemo(() => submissions.at(-1), [submissions]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);

    const payload = sanitizeForm(form);

    try {
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status >= 500 || response.status === 429) {
          const fallbackEntry = {
            ...payload,
            id: `${Date.now()}`,
            createdAt: new Date().toISOString(),
            transport: 'localStorage-fallback',
          };
          const next = storeSubmission(fallbackEntry);
          setSubmissions(next);
          setStatus({
            phase: 'fallback',
            message:
              data?.error === 'too many requests'
                ? 'Backend rate limit reached. Your submission was saved locally.'
                : 'Backend unavailable. Your submission was saved locally.',
          });
          setForm(initialForm);
          return;
        }

        setStatus({
          phase: 'error',
          message: data?.error
            ? `${data.error}${Array.isArray(data.details) && data.details.length ? `: ${data.details.join('; ')}` : ''}`
            : 'Submission was rejected by the API.',
        });
        return;
      }

      const successEntry = {
        ...data.submission,
        transport: 'api',
      };
      const next = storeSubmission(successEntry);
      setSubmissions(next);
      setStatus({
        phase: 'success',
        message: 'Preorder interest accepted by the API and stored locally for review.',
      });
      setForm(initialForm);
    } catch {
      const fallbackEntry = {
        ...payload,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        transport: 'localStorage-fallback',
      };
      const next = storeSubmission(fallbackEntry);
      setSubmissions(next);
      setStatus({
        phase: 'fallback',
        message: 'Network request failed. Your submission was saved locally.',
      });
      setForm(initialForm);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Panel className="p-6 sm:p-8">
        {status.phase !== 'idle' ? (
          <div
            className={[
              'border p-5',
              status.phase === 'success'
                ? 'border-[color:var(--accent)] bg-[rgba(177,18,38,0.08)]'
                : 'border-[color:var(--line)] bg-black/25',
            ].join(' ')}
          >
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
              {status.phase === 'success'
                ? 'Submission received'
                : status.phase === 'fallback'
                  ? 'Local fallback active'
                  : 'Submission blocked'}
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
              {status.message}
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
            disabled={isSubmitting}
            className="mt-2 border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Store Interest'}
          </button>
        </form>
      </Panel>

      <div className="grid gap-6">
        <TerminalCard
          label="local storage"
          title="Submission state"
          body="Entries are preserved in the browser when the network path fails or a client-side fallback is required."
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
