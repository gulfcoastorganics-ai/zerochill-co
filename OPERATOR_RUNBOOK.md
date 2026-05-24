# Operator Runbook

## Current Status

ZeroChill is production-live.

- GitHub, Vercel, Payhip, and Resend are already working.
- Use `npm run check:production` and `npm run check:intake` for live validation.
- Treat this document as the operational guide for an active site, not a prelaunch checklist.

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

## Local Verification

```bash
npm run lint
npx tsc --noEmit
npm test
```

If you are changing intake or launch behavior, also run:

```bash
npm run build
npm run check:production
npm run check:intake
```

## Production Validation

```bash
ZEROCHILL_SITE_URL=https://zerochill-co.vercel.app npm run check:production
```

This checks live HTTP status codes for `/`, `/preorder`, `/success`, and a safe `OPTIONS` probe on `/api/inquiry`.

```bash
ZEROCHILL_SITE_URL=https://zerochill-co.vercel.app npm run check:intake
```

This sends a controlled production POST to `/api/inquiry` and reports `ok`, `delivered`, `deliveryMode`, and `deliveryAttempted`. It does not print secrets or raw payload content.

## Payhip Env Vars

Payhip checkout URLs are read from the launch helper in [`lib/launchLinks.ts`](./lib/launchLinks.ts).

Primary variables:

```bash
PAYHIP_SOVEREIGN_ZERO_URL
PAYHIP_MATRIX_ACCESS_URL
```

Public aliases:

```bash
NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL
NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL
```

Resolution order:

1. Server-side `PAYHIP_*`
2. Public `NEXT_PUBLIC_PAYHIP_*`
3. Local fallback to `/#launch-access`

Set the Payhip success redirect to:

```bash
/success
```

## Intake Email Env Vars

Intake email delivery is configured in [`lib/inquiryIntake.ts`](./lib/inquiryIntake.ts) and [`app/api/inquiry/route.ts`](./app/api/inquiry/route.ts).

Required for email delivery:

```bash
RESEND_API_KEY
```

Recipient env vars:

```bash
ZEROCHILL_INTAKE_TO_EMAIL
PREORDER_NOTIFY_TO
```

`ZEROCHILL_INTAKE_TO_EMAIL` is preferred. `PREORDER_NOTIFY_TO` is the legacy alias and remains supported.

Sender env vars are resolved safely in this order:

1. `RESEND_FROM_EMAIL`
2. `ZEROCHILL_INTAKE_FROM_EMAIL` if safe
3. `PREORDER_FROM_EMAIL` if safe
4. `onboarding@resend.dev`

Safe means the domain is not a blocked consumer mailbox domain such as Gmail, Yahoo, Outlook, iCloud, or AOL.

## Legacy Env Aliases

These older names are still honored by the runtime:

```bash
PREORDER_FROM_EMAIL
PREORDER_NOTIFY_TO
```

Use the newer intake names where possible:

```bash
ZEROCHILL_INTAKE_FROM_EMAIL
ZEROCHILL_INTAKE_TO_EMAIL
```

## Delivery Modes

- `deliveryMode=email` means Resend accepted the message.
- `deliveryMode=log` means the submission was captured, but the route fell back to logging instead of sending email.
- `delivered=false` with `deliveryMode=log` is expected when mail config is missing, invalid, or rejected by Resend.

## Troubleshooting

- `delivered=false deliveryMode=log`
  - Check `RESEND_API_KEY`.
  - Check `ZEROCHILL_INTAKE_TO_EMAIL` or `PREORDER_NOTIFY_TO`.
  - Check `RESEND_FROM_EMAIL`, then `ZEROCHILL_INTAKE_FROM_EMAIL`, then `PREORDER_FROM_EMAIL`.
- `gmail.com` domain not verified
  - Do not use Gmail as a Resend sender.
  - Use `onboarding@resend.dev` until a custom domain sender is verified.
- Vercel env changes require redeploy
  - Update the variable in Vercel.
  - Redeploy so the runtime picks up the new values.
- URLs should be opened in browser, not typed directly into Bash
  - Use the browser for live site inspection.
  - If you need a command, pass the URL as a parameter to the checker instead of executing the URL string itself.

## Deploy

1. Set the Payhip env vars in Vercel production and preview environments.
2. Set `RESEND_API_KEY`.
3. Add a safe sender and recipient for intake email if delivery should be active.
4. Set the Payhip success redirect to `/success`.
5. Run `npm run build`.
6. Deploy to Vercel.
7. Verify `/`, `/preorder`, `/success`, and `/api/inquiry` in production.

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
