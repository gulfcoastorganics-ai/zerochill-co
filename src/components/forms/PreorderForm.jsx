import { useEffect, useState } from 'react';
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
    errors.intendedUse = 'Describe the intended deployment.';
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
    return 'Notification email is not configured yet, so this record stayed local only.';
  }

  if (data?.emailConfigured && data?.emailSent) {
    return 'Notification email was sent and the submission was stored locally.';
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

function Field({ label, help, error, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
        {label}
      </span>
      {children}
      {help ? <span className="text-xs leading-6 text-[color:var(--text-faint)]">{help}</span> : null}
      {error ? <span className="text-xs leading-6 text-[color:var(--accent-soft)]">{error}</span> : null}
    </label>
  );
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

  const latestSubmission = submissions.at(-1);

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
        detail: 'Basic validation runs locally before the request is sent.',
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
            detail: 'The local record stays in this browser until the request path returns.',
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
    <div className="grid gap-5">
      <Panel className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="status-pill">Email notifications preserved</span>
          <span className="status-pill">Local fallback remains</span>
        </div>

        {status.phase !== 'idle' ? (
          <div
            role="status"
            aria-live="polite"
            className={[
              'mt-5 rounded-2xl border p-5',
              status.phase === 'success'
                ? 'border-[color:var(--line)] bg-white/[0.03]'
                : status.phase === 'fallback'
                  ? 'border-[color:var(--line-soft)] bg-white/[0.02]'
                  : 'border-[color:var(--accent)] bg-[rgba(179,58,68,0.08)]',
            ].join(' ')}
          >
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              {status.phase === 'success'
                ? 'Submission received'
                : status.phase === 'fallback'
                  ? 'Local fallback active'
                  : 'Submission blocked'}
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{status.message}</p>
            {status.detail ? (
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-dim)]">{status.detail}</p>
            ) : null}
            {status.notification ? (
              <p className="mt-3 border-t border-[color:var(--line-soft)] pt-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                Email note: <span className="text-[color:var(--text)]">{status.notification}</span>
              </p>
            ) : null}
          </div>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Full name"
              help="Use the contact name that should appear in review notes."
              error={fieldErrors.name}
            >
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.name)}
                className="zc-field px-4 py-3 text-sm outline-none placeholder:text-[color:var(--text-faint)]"
                placeholder="Name for the preorder record"
              />
            </Field>

            <Field
              label="Email address"
              help="Used for notification delivery only."
              error={fieldErrors.email}
            >
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                aria-invalid={Boolean(fieldErrors.email)}
                className="zc-field px-4 py-3 text-sm outline-none placeholder:text-[color:var(--text-faint)]"
                placeholder="name@domain.com"
              />
            </Field>
          </div>

          <Field
            label="Intended deployment"
            help="Tell us where the system will live and how it needs to behave."
            error={fieldErrors.intendedUse}
          >
            <textarea
              name="intendedUse"
              required
              value={form.intendedUse}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.intendedUse)}
              className="zc-field min-h-32 px-4 py-3 text-sm outline-none placeholder:text-[color:var(--text-faint)]"
              placeholder="Describe the environment, team size, and whether the node needs offline operation."
            />
          </Field>

          <Field
            label="Preferred tier"
            help="Pick the closest fit. Review can refine the final deployment later."
            error={fieldErrors.preferredTier}
          >
            <select
              name="preferredTier"
              value={form.preferredTier}
              onChange={handleChange}
              aria-invalid={Boolean(fieldErrors.preferredTier)}
              className="zc-field px-4 py-3 text-sm outline-none"
            >
              {productTiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name}
                </option>
              ))}
            </select>
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="zc-button-primary mt-1 w-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Store interest'}
          </button>
        </form>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <TerminalCard
          label="Submission state"
          title="Browser records"
          body="Entries remain in localStorage when the network path fails or a fallback is required."
        >
          <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
            Saved records: <span className="font-mono text-[color:var(--text)]">{submissions.length}</span>
          </div>
        </TerminalCard>

        <TerminalCard
          label="Latest packet"
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
                <span className="text-[color:var(--text-faint)]">Intent:</span> {latestSubmission.intendedUse}
              </div>
              <div className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                Transport: {latestSubmission.transport || 'api'}
              </div>
            </div>
          ) : null}
        </TerminalCard>
      </div>
    </div>
  );
}
