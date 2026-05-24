ZeroChill Co. is a production-live Next.js site for sovereign AI infrastructure, localized deployment systems, telemetry-isolated operator tools, and edge inference surfaces.

## Production Status

ZeroChill is live in production.

- GitHub, Vercel, Payhip, and Resend are connected and working.
- The live validation commands are `npm run check:production` and `npm run check:intake`.
- The site should be treated as production-first now, not launch-preview scaffolding.

## Main Files

- [app/page.tsx](./app/page.tsx)
- [components/InquiryForm.tsx](./components/InquiryForm.tsx)
- [lib/launchLinks.ts](./lib/launchLinks.ts)
- [lib/inquiryIntake.ts](./lib/inquiryIntake.ts)
- [app/api/inquiry/route.ts](./app/api/inquiry/route.ts)
- [app/globals.css](./app/globals.css)
- [app/preorder/page.tsx](./app/preorder/page.tsx)
- [app/success/page.tsx](./app/success/page.tsx)

## Local Checks

Run the standard local verification set before shipping changes:

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
npm test
```

For the exact launch validation flow, also run:

```bash
npm run check:production
npm run check:intake
```

## Live Production Checks

These commands validate the deployed site. They default to `https://zerochill-co.vercel.app`, and you can override that with `ZEROCHILL_SITE_URL`.

Production route check:

```bash
ZEROCHILL_SITE_URL=https://zerochill-co.vercel.app npm run check:production
```

What it checks:

- `GET /`
- `GET /preorder`
- `GET /success`
- `OPTIONS /api/inquiry`

Intake delivery diagnostic:

```bash
ZEROCHILL_SITE_URL=https://zerochill-co.vercel.app npm run check:intake
```

What it checks:

- Sends a controlled POST to `/api/inquiry`
- Reports HTTP status plus `ok`, `delivered`, `deliveryMode`, and `deliveryAttempted`
- Falls back once to schema-compatible intake fields if the live deployment is still on an older intake schema

## Payhip Env Vars

Payhip checkout links are centralized in [`lib/launchLinks.ts`](./lib/launchLinks.ts).

Use these environment variables for checkout URLs:

```bash
NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL
NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL
```

Server-side aliases are also supported:

```bash
PAYHIP_SOVEREIGN_ZERO_URL
PAYHIP_MATRIX_ACCESS_URL
```

Resolution order:

1. `PAYHIP_SOVEREIGN_ZERO_URL` or `PAYHIP_MATRIX_ACCESS_URL`
2. `NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL` or `NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL`
3. Local fallback to `/#launch-access`

Payhip success redirect:

```bash
/success
```

## Intake Email Env Vars

Inquiry intake validation, rate limiting, and mail formatting live in [`lib/inquiryIntake.ts`](./lib/inquiryIntake.ts) and [`app/api/inquiry/route.ts`](./app/api/inquiry/route.ts).

Required for email delivery:

```bash
RESEND_API_KEY
```

Recipient env vars:

```bash
ZEROCHILL_INTAKE_TO_EMAIL
PREORDER_NOTIFY_TO
```

`ZEROCHILL_INTAKE_TO_EMAIL` is preferred. `PREORDER_NOTIFY_TO` is the legacy recipient alias and is still supported.

Sender env vars are resolved in safe order:

1. `RESEND_FROM_EMAIL`
2. `ZEROCHILL_INTAKE_FROM_EMAIL` if it is safe
3. `PREORDER_FROM_EMAIL` if it is safe
4. `onboarding@resend.dev`

Safe means the sender is not a blocked consumer mailbox domain such as Gmail, Yahoo, Outlook, iCloud, AOL, or similar. If the sender is unsafe or missing, the route falls through to the next option instead of trying to use it.

## Legacy Env Aliases

The following legacy aliases are still supported:

```bash
PREORDER_FROM_EMAIL
PREORDER_NOTIFY_TO
```

Keep using the newer intake names where possible:

```bash
ZEROCHILL_INTAKE_FROM_EMAIL
ZEROCHILL_INTAKE_TO_EMAIL
```

## Deployment Notes

- Set the Payhip success redirect to `/success`.
- Make sure the Payhip env vars are present in Vercel production and preview environments.
- Set `RESEND_API_KEY` and, if you want email delivery, add a safe sender and recipient.
- If you change Vercel env vars, redeploy so the new values reach the running build.
- Verify the homepage, `/preorder`, `/success`, and `/api/inquiry` after deploy.

## Troubleshooting

- `delivered=false` with `deliveryMode=log`:
  - Intake was captured, but email delivery was not active or fell back to logging only.
  - Check `RESEND_API_KEY`, the sender, and the recipient env vars.
- `gmail.com` domain not verified:
  - Do not use Gmail as a Resend sender.
  - Use a verified sender such as `onboarding@resend.dev` until your domain is verified.
- Vercel env changes do not seem to apply:
  - Redeploy after changing env vars.
- Live URLs are failing when pasted into Bash:
  - Open URLs in a browser, or pass them to the relevant command as a URL value.
  - Do not type a raw production URL directly into Bash as if it were a shell command.

## Docs

- [Operator Runbook](./OPERATOR_RUNBOOK.md)
- [Developer Onboarding](./DEVELOPER_ONBOARDING.md)
- [Codebase Overview](./CODEBASE_OVERVIEW.md)
- [Architecture Notes](./ARCHITECTURE_NOTES.md)
- [Next Steps](./NEXT_STEPS.md)

## Getting Started

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

The project uses the App Router, local styling tokens, and the shared launch link config in [`lib/launchLinks.ts`](./lib/launchLinks.ts) to keep the deploy flow simple.

## Launch Commerce

Payhip checkout links are centralized in [`lib/launchLinks.ts`](./lib/launchLinks.ts).

Paste the live URLs into your local environment file with these keys:

```bash
NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL=https://your-payhip-link-for-sovereign-zero
NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL=https://your-payhip-link-for-matrix-access
```

If either value is missing, the CTA buttons fall back to the local `/#launch-access` section so the build still works before launch day.

## Deploy on Vercel

1. Connect the repository to Vercel.
2. Confirm framework detection resolves to Next.js.
3. Add the documented environment variables in the Vercel project settings.
4. Keep the default Node runtime for the intake route.
5. Set the Payhip success redirect to `/success`.
6. Deploy a preview build and verify `/`, `/preorder`, `/success`, and `/api/inquiry`.
7. Promote to production after a successful preview check.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
