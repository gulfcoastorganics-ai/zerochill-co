"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type InquiryValues = {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  projectNotes: string;
};

type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

const initialValues: InquiryValues = {
  name: "",
  email: "",
  projectType: "",
  budgetRange: "",
  timeline: "",
  projectNotes: "",
};

function validate(values: InquiryValues) {
  const errors: InquiryErrors = {};

  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.projectType) errors.projectType = "Choose a project type.";
  if (!values.budgetRange) errors.budgetRange = "Choose a budget range.";
  if (!values.timeline) errors.timeline = "Choose a timeline.";
  if (values.projectNotes.trim().length < 20) {
    errors.projectNotes = "Add at least 20 characters describing the project.";
  }

  return errors;
}

export default function InquiryForm() {
  const [values, setValues] = useState<InquiryValues>(initialValues);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState("");

  function updateField(field: keyof InquiryValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("Check the highlighted fields and submit again.");
      return;
    }

    console.info("GulfCoast Labs inquiry", values);
    setStatus("Inquiry captured. We will follow up with next steps.");
    setErrors({});
    setValues(initialValues);
  }

  const fieldClass =
    "w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[color:var(--accent)]/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
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
            Project type
          </span>
          <select
            className={fieldClass}
            value={values.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            aria-invalid={Boolean(errors.projectType)}
          >
            <option value="">Select one</option>
            <option value="appsec">AppSec / Operator Dashboard</option>
            <option value="infra">Startup Infrastructure</option>
            <option value="api">Backend / API Workflow</option>
            <option value="ux">Mobile-First UX</option>
            <option value="branding">Infrastructure Branding</option>
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
          <span className="text-[0.64rem] uppercase tracking-[0.36em] text-[color:var(--steel)]">
            Project notes
          </span>
          <textarea
            className={`${fieldClass} min-h-[140px]`}
            value={values.projectNotes}
            onChange={(event) => updateField("projectNotes", event.target.value)}
            placeholder="Describe what you need, what exists today, and what the first win should be."
            aria-invalid={Boolean(errors.projectNotes)}
          />
          {errors.projectNotes ? (
            <span className="text-xs text-[color:var(--accent)]">{errors.projectNotes}</span>
          ) : null}
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-white/50">
          Frontend-only validation is active. Submissions are logged locally until a backend or mail flow is wired.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition-transform hover:-translate-y-0.5"
        >
          Send Inquiry
        </button>
      </div>

      {status ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4 text-sm leading-7 text-white/70">
          {status}
        </div>
      ) : null}
    </form>
  );
}
