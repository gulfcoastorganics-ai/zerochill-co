"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

function resolveRedirectUrl() {
  if (typeof window === "undefined") {
    return "/auth/callback";
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const origin = siteUrl || window.location.origin;

  return `${origin}/auth/callback`;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("Request a magic link to enter the academy.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setStatus("Enter the operator email tied to your purchase.");
      return;
    }

    setIsSending(true);
    setStatus("Sending access link...");

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: {
          emailRedirectTo: resolveRedirectUrl(),
        },
      });

      if (error) {
        throw error;
      }

      setStatus("Access link sent. Check your inbox and open the academy link on this device.");
    } catch {
      setStatus("Magic-link delivery failed. Check the email address and try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
      <label className="grid gap-2">
        <span className="text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--steel)] sm:tracking-[0.3em]">
          Operator email
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="operator@company.com"
          className="glass-field w-full rounded-2xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSending}
          className="zerochill-action inline-flex w-full items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSending ? "Sending Link..." : "Send Magic Link"}
        </button>
        <a
          href="/academy"
          className="zerochill-action inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white sm:w-auto"
        >
          Academy Gate
        </a>
      </div>

      <div className="terminal-surface rounded-2xl p-4 text-sm leading-7 text-white/72" aria-live="polite">
        {status}
      </div>
    </form>
  );
}
