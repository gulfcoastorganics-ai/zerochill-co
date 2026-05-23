# Operator Runbook

## What This Site Is

ZeroChill Co. is a sovereign AI infrastructure site. It presents:

- Sovereign AI deployment systems
- Edge inference and local execution surfaces
- Telemetry-isolated operator tooling
- Private infrastructure and launch queue flows
- Hardened command-center branding

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Production Validation

```bash
ZEROCHILL_SITE_URL=https://zerochill-co.vercel.app npm run check:production
```

The checker verifies the live HTTP status codes for `/`, `/preorder`, `/success`, and a safe `OPTIONS` probe on `/api/inquiry`. It does not submit form data.

## Lint and Typecheck

```bash
npm run lint
npx tsc --noEmit
```

## Deploy

1. Set the required Payhip env vars in Vercel.
2. Set `RESEND_API_KEY` plus either the preferred intake env vars (`ZEROCHILL_INTAKE_FROM_EMAIL`, `ZEROCHILL_INTAKE_TO_EMAIL`) or the legacy Vercel aliases (`PREORDER_FROM_EMAIL`, `PREORDER_NOTIFY_TO`) if email delivery should be enabled for the intake pipeline.
3. Set the Payhip success redirect to `/success`.
4. Run `npm run build`.
5. Deploy to Vercel.
6. Verify `/`, `/preorder`, `/success`, and `/api/inquiry` in production.

## Update Homepage Content

- Edit the arrays and copy in [app/page.tsx](./app/page.tsx).
- Hero text, launch access, and the operational sections live near the top of the file.
- Section content is hardcoded in local arrays for now.

## Update Pricing and Offers

- Edit the `offers` array in [app/page.tsx](./app/page.tsx).
- Update the copy and starting prices together.
- Keep the disclaimer aligned with scope, integrations, and timeline.

## Update CTAs and Links

- Edit [lib/launchLinks.ts](./lib/launchLinks.ts) for Payhip URLs and fallback behavior.
- Keep homepage CTAs pointed at the centralized launch config.
- If env vars are missing, the site falls back to the local `#launch-access` panel.

## Update Intake Pipeline

- Edit [lib/inquiryIntake.ts](./lib/inquiryIntake.ts) for schema, rate limiting, and mail body formatting.
- Edit [app/api/inquiry/route.ts](./app/api/inquiry/route.ts) for the intake handler and delivery flow.
- If email delivery is not configured, the route logs intake locally and still returns a success response.

## Troubleshoot Common Issues

- Build fails on missing env vars:
  - Check `.env.local` or Vercel environment variables.
- CTA opens the fallback panel:
  - The Payhip URL is missing or blank.
- Form does not submit:
  - Check the browser network request to `/api/inquiry` and confirm the intake env vars if email delivery is expected.
- Layout looks cramped on mobile:
  - Check the section spacing and card grid classes in [app/page.tsx](./app/page.tsx) and [app/globals.css](./app/globals.css).

## Current Limitations

- Inquiry submissions can log locally or email an internal inbox, but they do not yet flow into a CRM.
- Case studies, screenshots, analytics, and CRM handoff are not wired yet.
- Launch checkout still depends on the Payhip environment variables being set.
