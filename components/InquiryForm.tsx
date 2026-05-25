"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import {
  deploymentInterestOptions,
  projectTypeOptions,
} from "@/lib/inquiryIntake";

type InquiryValues = {
  name: string;
  email: string;
  organization: string;
  deploymentInterest: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  honeypot: string;
};

type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;
type StatusTone = "idle" | "info" | "success" | "error";
type InquiryResponse = {
  ok?: boolean;
  message?: string;
  delivered?: boolean;
  deliveryMode?: string;
  fieldErrors?: Partial<Record<keyof InquiryValues, string>>;
};

type InquiryStatus = {
  tone: StatusTone;
  message: string;
};

const initialValues: InquiryValues = {
  name: "",
  email: "",
  organization: "",
  deploymentInterest: "",
  projectType: "",
  budgetRange: "",
  timeline: "",
  message: "",
  honeypot: "",
};

const initialStatus: InquiryStatus = {
  tone: "idle",
  message: "",
};

function validate(values: InquiryValues) {
  const errors: InquiryErrors = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.organization.trim()) errors.organization = "Organization is required.";
  if (!values.deploymentInterest) errors.deploymentInterest = "Choose a deployment interest.";
  if (!values.projectType) errors.projectType = "Choose a project type.";
  if (!values.budgetRange) errors.budgetRange = "Choose a budget range.";
  if (!values.timeline) errors.timeline = "Choose a timeline.";
  if (values.message.trim().length < 24) {
    errors.message = "Add at least 24 characters describing the deployment.";
  }

  return errors;
}

export default function InquiryForm() {
  const [values, setValues] = useState<InquiryValues>(initialValues);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<InquiryStatus>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  function updateField(field: keyof InquiryValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitLockRef.current) {
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        tone: "error",
        message: "Check the highlighted fields and submit again.",
      });
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    setStatus({
      tone: "info",
      message: "Sending inquiry...",
    });

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as InquiryResponse | null;

      if (!response.ok || !data?.ok) {
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
        }

        setStatus({
          tone: "error",
          message: data?.message ?? "Intake submission failed. Try again.",
        });
        return;
      }

      const deliveryMessage =
        data.deliveryMode === "email" && data.delivered
          ? "Email delivery confirmed."
          : "Delivery fell back to log mode, so the server recorded the intake locally.";

      setStatus({
        tone: "success",
        message: `${data.message ?? "Intake captured. We will follow up with next steps."} ${deliveryMessage}`,
      });
      setErrors({});
      setValues(initialValues);
    } catch {
      setStatus({
        tone: "error",
        message: "Intake submission is temporarily unavailable. Try again shortly.",
      });
    } finally {
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  }

  const fieldClass =
    "glass-field w-full rounded-2xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30";
  const statusClass =
    status.tone === "success"
      ? "border-[rgba(34,197,94,0.24)] bg-[rgba(3,13,8,0.72)] text-white/80"
      : status.tone === "error"
        ? "border-[rgba(220,38,38,0.28)] bg-[rgba(18,6,8,0.72)] text-white/82"
        : "border-[rgba(148,163,184,0.14)] bg-[rgba(2,6,12,0.66)] text-white/72";

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel-strong rounded-3xl p-6 sm:p-8"
      aria-busy={isSubmitting}
      noValidate
    >
      <div className="border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
        Project inquiry
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Name
          </span>
          <input
            className={fieldClass}
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <span className="text-xs text-[color:var(--accent)]">{errors.name}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Email
          </span>
          <input
            className={fieldClass}
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="text-xs text-[color:var(--accent)]">{errors.email}</span> : null}
        </label>

        <label className="grid gap-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Organization
          </span>
          <input
            className={fieldClass}
            value={values.organization}
            onChange={(event) => updateField("organization", event.target.value)}
            placeholder="Organization or team"
            aria-invalid={Boolean(errors.organization)}
          />
          {errors.organization ? (
            <span className="text-xs text-[color:var(--accent)]">{errors.organization}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Deployment interest
          </span>
          <select
            className={fieldClass}
            value={values.deploymentInterest}
            onChange={(event) => updateField("deploymentInterest", event.target.value)}
            aria-invalid={Boolean(errors.deploymentInterest)}
          >
            <option value="">Select one</option>
            {deploymentInterestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.deploymentInterest ? (
            <span className="text-xs text-[color:var(--accent)]">{errors.deploymentInterest}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Project type
          </span>
          <select
            className={fieldClass}
            value={values.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            aria-invalid={Boolean(errors.projectType)}
          >
            <option value="">Select one</option>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.projectType ? (
            <span className="text-xs text-[color:var(--accent)]">{errors.projectType}</span>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Budget range
          </span>
          <select
            className={fieldClass}
            value={values.budgetRange}
            onChange={(event) => updateField("budgetRange", event.target.value)}
            aria-invalid={Boolean(errors.budgetRange)}
          >
            <option value="">Select one</option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-3k">$1,000 - $3,000</option>
            <option value="3k-7k">$3,000 - $7,000</option>
            <option value="7k-plus">$7,000+</option>
          </select>
          {errors.budgetRange ? (
            <span className="text-xs text-[color:var(--accent)]">{errors.budgetRange}</span>
          ) : null}
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Timeline
          </span>
          <select
            className={fieldClass}
            value={values.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            aria-invalid={Boolean(errors.timeline)}
          >
            <option value="">Select one</option>
            <option value="asap">ASAP</option>
            <option value="2-4-weeks">2-4 weeks</option>
            <option value="1-2-months">1-2 months</option>
            <option value="planning">Planning only</option>
          </select>
          {errors.timeline ? <span className="text-xs text-[color:var(--accent)]">{errors.timeline}</span> : null}
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="block text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)] sm:tracking-[0.32em]">
            Message
          </span>
          <textarea
            className={`${fieldClass} min-h-[140px]`}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Describe the system, the deployment constraints, and what the first operational win should be."
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <span className="text-xs text-[color:var(--accent)]">{errors.message}</span>
          ) : null}
        </label>

        <input
          type="hidden"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          value={values.honeypot}
          onChange={(event) => updateField("honeypot", event.target.value)}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-white/50">
          Submissions validate locally and route to sovereign intake. If mail delivery is off, the server logs the
          intake and returns success.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="zerochill-button zerochill-action inline-flex w-full max-w-full items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] leading-tight text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto sm:min-w-[11.5rem] sm:tracking-[0.22em]"
        >
          <span className="inline-flex min-w-0 items-center justify-center gap-2 whitespace-nowrap">
            {isSubmitting ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-3 w-3 animate-spin rounded-full border border-current border-r-transparent"
                />
                Sending...
              </>
            ) : (
              "Send Inquiry"
            )}
          </span>
        </button>
      </div>

      {status.message ? (
        <div
          className={`terminal-surface mt-4 rounded-2xl p-4 text-sm leading-7 ${statusClass}`}
          role={status.tone === "error" ? "alert" : "status"}
          aria-atomic="true"
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}
