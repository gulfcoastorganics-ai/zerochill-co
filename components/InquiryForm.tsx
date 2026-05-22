"use client";

import type { FormEvent } from "react";
import { useState } from "react";
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
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof InquiryValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Check the highlighted fields and submit again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; fieldErrors?: Partial<Record<keyof InquiryValues, string>> }
        | null;

      if (!response.ok || !data?.ok) {
        if (data?.fieldErrors) {
          setErrors(data.fieldErrors);
        }

        setStatus(data?.message ?? "Intake submission failed. Try again.");
        return;
      }

      setStatus(data.message ?? "Intake captured. We will follow up with next steps.");
      setErrors({});
      setValues(initialValues);
    } catch {
      setStatus("Intake submission is temporarily unavailable. Try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[color:var(--accent)]/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
      aria-busy={isSubmitting}
      noValidate
    >
      <div className="border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
        Project inquiry
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">Name</span>
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">Email</span>
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">Timeline</span>
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">Message</span>
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
          Submissions are validated locally and sent to the sovereign intake route. If mail delivery is not
          configured, the server logs the intake and returns a stable success state.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
      </div>

      {status ? (
        <div
          className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4 text-sm leading-7 text-white/70"
          role="status"
          aria-live="polite"
        >
          {status}
        </div>
      ) : null}
    </form>
  );
}
