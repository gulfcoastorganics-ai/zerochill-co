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
  detail: '',
  notification: '',
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

function validateForm(form) {
  const payload = sanitizeForm(form);
  const errors = {};

  if (!payload.name) {
    errors.name = 'Enter the contact name for this preorder review.';
  } else if (payload.name.length < 2 || payload.name.length > 80) {
    errors.name = 'Use 2 to 80 characters for the name field.';
  }

  if (!payload.email) {
    errors.email = 'Enter the email address for preorder updates.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = 'Enter a valid email address, such as name@domain.com.';
  }

  if (!payload.intendedUse) {
    errors.intendedUse = 'Describe where the system will be used and by whom.';
  } else if (payload.intendedUse.length < 10 || payload.intendedUse.length > 500) {
    errors.intendedUse = 'Use 10 to 500 characters for the intended use field.';
  }

  if (!payload.preferredTier) {
    errors.preferredTier = 'Choose the closest product tier.';
  }

  return { payload, errors };
}

function formatNotification(data) {
  if (data?.emailConfigured === false) {
    return 'No notification email is configured yet, so the submission was stored locally only.';
  }

  if (data?.emailConfigured && data?.emailSent) {
    return 'A notification email was sent to the preorder inbox and the submission was stored locally.';
  }

  if (data?.emailConfigured && data?.emailSent === false) {
    return 'The submission was accepted, but the notification email could not be delivered.';
  }

  return 'The submission was accepted and stored locally.';
}

function mapServerErrors(details = []) {
  const next = {};
  for (const detail of details) {
    const message = String(detail || '');
    if (message.startsWith('name ')) {
      next.name = message;
    } else if (message.startsWith('email ')) {
      next.email = message;
    } else if (message.startsWith('intended use ')) {
      next.intendedUse = message;
    } else if (message.startsWith('preferred product tier ')) {
      next.preferredTier = message;
    }
  }

  return next;
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    setSubmissions(readSubmissions());
  }, []);

  const latestSubmission = useMemo(() => submissions.at(-1), [submissions]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (submitAttempted) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);
    setSubmitAttempted(true);

    const { payload, errors } = validateForm(form);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatus({
        phase: 'error',
        message: 'Fix the highlighted fields before submitting again.',
        detail: 'The browser can catch basic validation before the request is sent.',
      });
      setIsSubmitting(false);
      return;
    }

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
            detail: 'You can refresh later; the local record stays in this browser.',
            notification: 'No email notification was sent because the API could not complete the request.',
          });
          setForm(initialForm);
          return;
        }

        setStatus({
          phase: 'error',
          message: data?.error
            ? `${data.error}${Array.isArray(data.details) && data.details.length ? `: ${data.details.join('; ')}` : ''}`
            : 'Submission was rejected by the API.',
          detail: 'Check the field values and try again.',
        });
        if (Array.isArray(data?.details)) {
          setFieldErrors(mapServerErrors(data.details));
        }
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
        message: 'Preorder interest accepted and stored locally for review.',
        detail: data?.message || 'The API confirmed the submission and returned the created preorder record.',
        notification: formatNotification(data),
      });
      setForm(initialForm);
      setFieldErrors({});
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
        detail: 'This browser copy is enough for review until the network path returns.',
        notification: 'No email notification was sent because the request never reached the API.',
      });
      setForm(initialForm);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Panel className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="status-pill">Notification only</span>
          <span className="status-pill">No durable database yet</span>
        </div>
        {status.phase !== 'idle' ? (
          <div
            role="status"
            aria-live="polite"
            className={[
              'zc-glass mt-5 border p-5',
              status.phase === 'success'
                ? 'border-[color:var(--accent)]'
                : status.phase === 'fallback'
                  ? 'border-[color:var(--line)]'
                  : 'border-[color:var(--accent-strong)]',
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
            {status.detail ? (
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-dim)]">{status.detail}</p>
            ) : null}
            {status.notification ? (
              <div className="mt-4 border-t border-[color:var(--line-soft)] pt-4 text-xs uppercase tracking-[0.26em] text-[color:var(--text-dim)]">
                Email note: <span className="text-[color:var(--text)]">{status.notification}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Full name
            </span>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby="preorder-name-help preorder-name-error"
              className="zc-field px-4 py-3 text-sm text-[color:var(--text)] outline-none placeholder:text-[color:var(--text-faint)]"
              placeholder="Name for the preorder record"
            />
            <span id="preorder-name-help" className="text-xs leading-6 text-[color:var(--text-faint)]">
              Use the contact name that should appear in review notes.
            </span>
            {fieldErrors.name ? (
              <span id="preorder-name-error" className="text-xs leading-6 text-[color:var(--accent-strong)]">
                {fieldErrors.name}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Email address
            </span>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby="preorder-email-help preorder-email-error"
              className="zc-field px-4 py-3 text-sm text-[color:var(--text)] outline-none placeholder:text-[color:var(--text-faint)]"
              placeholder="name@domain.com"
            />
            <span id="preorder-email-help" className="text-xs leading-6 text-[color:var(--text-faint)]">
              Used for notification delivery only. This site does not promise durable storage yet.
            </span>
            {fieldErrors.email ? (
              <span id="preorder-email-error" className="text-xs leading-6 text-[color:var(--accent-strong)]">
                {fieldErrors.email}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Intended deployment
            </span>
            <textarea
              name="intendedUse"
              required
              value={form.intendedUse}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.intendedUse)}
              aria-describedby="preorder-use-help preorder-use-error"
              className="zc-field min-h-32 px-4 py-3 text-sm text-[color:var(--text)] outline-none placeholder:text-[color:var(--text-faint)]"
              placeholder="Describe the environment, team size, and whether the node needs offline operation."
            />
            <span id="preorder-use-help" className="text-xs leading-6 text-[color:var(--text-faint)]">
              Give enough detail to match the preorder to the right tier and review path.
            </span>
            {fieldErrors.intendedUse ? (
              <span id="preorder-use-error" className="text-xs leading-6 text-[color:var(--accent-strong)]">
                {fieldErrors.intendedUse}
              </span>
            ) : null}
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
              Preferred tier
            </span>
            <select
              name="preferredTier"
              value={form.preferredTier}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.preferredTier)}
              aria-describedby="preorder-tier-help preorder-tier-error"
              className="zc-field px-4 py-3 text-sm text-[color:var(--text)] outline-none"
            >
              {productTiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name}
                </option>
              ))}
            </select>
            <span id="preorder-tier-help" className="text-xs leading-6 text-[color:var(--text-faint)]">
              Pick the closest fit. The preorder review can refine the exact deployment later.
            </span>
            {fieldErrors.preferredTier ? (
              <span id="preorder-tier-error" className="text-xs leading-6 text-[color:var(--accent-strong)]">
                {fieldErrors.preferredTier}
              </span>
            ) : null}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="zc-button-primary mt-2 border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Store Interest'}
          </button>
        </form>
      </Panel>

      <div className="grid gap-6">
        <TerminalCard
          label="local storage"
          title="Submission state"
          body="Entries are preserved in the browser when the network path fails or a client-side fallback is required. Email is notification-only, not storage."
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
        >
          {latestSubmission ? (
            <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              <div>
                <span className="text-[color:var(--text-dim)]">Intent:</span> {latestSubmission.intendedUse}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                Transport: {latestSubmission.transport || 'api'}
              </div>
            </div>
          ) : null}
        </TerminalCard>
      </div>
    </div>
  );
}
