# Production Readiness

ZeroChill Co. is deployed through Vercel as a Next.js App Router application with Supabase-backed Academy access, Payhip purchase webhooks, and optional Resend email delivery.

## Current production architecture

- Vercel hosts the Next.js application and API routes.
- Supabase stores Academy profiles, purchase records, progress, and webhook-event audit records.
- Payhip purchase events are accepted by `/api/payhip-webhook` only after signature verification unless the explicit development escape hatch is enabled.
- Only `paid` events can provision Academy access.
- Academy provisioning is restricted to product keys configured in `PAYHIP_ACADEMY_PRODUCT_KEYS`.
- Duplicate webhook deliveries are recorded/idempotently rejected through the webhook-event store.
- Resend remains optional for email delivery paths that use it.

## Required production configuration

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYHIP_API_KEY`
- `PAYHIP_ACADEMY_PRODUCT_KEYS`
- `NEXT_PUBLIC_SITE_URL`

Where email delivery is enabled, also configure:

- `RESEND_API_KEY`
- `ACADEMY_FROM_EMAIL`

`ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS` must remain `false` in production. `PAYHIP_WEBHOOK_SECRET` is retained only as a legacy configuration fallback; new deployments should use `PAYHIP_API_KEY`.

## Automated release checks

GitHub Actions now installs the locked dependency set and runs:

```bash
npm run lint
npm test
npm run build
```

A green workflow is required before promotion.

## External launch gates

Source code alone cannot prove the external commerce path. Before calling the current release fully verified:

1. deploy the latest `main` commit to Vercel;
2. confirm the production Payhip API key and Academy product key allowlist are configured;
3. send a real Payhip test/controlled purchase event and confirm Academy access is provisioned exactly once;
4. send or simulate a non-paid event and confirm it does not provision access;
5. confirm an unrelated Payhip product cannot provision Academy access;
6. review the resulting Vercel/Supabase event records for expected verification and processing state.

The previously documented claim that this project did not use a database or auth/access layer is obsolete and should not be used for release decisions.
