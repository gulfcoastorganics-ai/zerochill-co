# Zero-State Academy Deployment Checklist

Use this checklist for production readiness before promoting the release.

## Environment and Platform

- [ ] Vercel env vars are configured
- [ ] Supabase schema has been applied
- [ ] Supabase redirect URLs are configured
- [ ] Payhip webhook URL is configured
- [ ] `ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS=false`

## Academy Health

- [ ] `/api/academy-health` returns `academyOperational=true`
- [ ] `supabaseReachable` is true
- [ ] `academyTables` are present
- [ ] `recommendedActions[]` is empty or understood

## Auth and Access

- [ ] `/login` magic link works
- [ ] `/academy` protected route works
- [ ] `/academy/intake` is reachable
- [ ] `/academy/orchestration` locked/unlocked behavior works

## Runtime Validation

- [ ] Local Ollama validation works
- [ ] `curl http://localhost:11434/api/tags` returns a model list
- [ ] `POST /api/generate` returns `ZERO_STATE_OK`
- [ ] Tier 1 validation marks the operator as unlocked for Tier 2
- [ ] `gate_completions` insert is confirmed

## Webhook and Provisioning

- [ ] Payhip webhook reaches `/api/payhip-webhook`
- [ ] Purchase provisioning creates or updates academy access
- [ ] Replay protection behaves as expected
- [ ] Webhook event logging is present for live events

## Final QA Commands

Run the standard release checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

If the project scripts are present in the current workspace, also run the live checks:

```bash
npm run check:production
npm run check:intake
```

Recommended production override for the live checks:

```bash
ZEROCHILL_SITE_URL=https://zerochill-co.vercel.app npm run check:production
ZEROCHILL_SITE_URL=https://zerochill-co.vercel.app npm run check:intake
```

## Route Inventory

- `/`
- `/login`
- `/auth/callback`
- `/academy`
- `/academy/intake`
- `/academy/orchestration`
- `/academy/system-status`
- `/api/payhip-webhook`
- `/api/verify-runtime`
- `/api/runtime-events`
- `/api/academy-session`
- `/api/academy-health`

## Post-Deploy Verification

After the production deploy finishes, verify the live release with these checks:

- [ ] Visit `/api/academy-health`
- [ ] Confirm `academyOperational=true`
- [ ] Test `/login` magic link
- [ ] Test protected `/academy` redirect behavior
- [ ] Test `/academy/intake`
- [ ] Test local Ollama validation
- [ ] Confirm `deployments` insert
- [ ] Confirm `gate_completions` insert
- [ ] Confirm Tier 2 unlock at `/academy/orchestration`

## Vercel Deployment Notes

- Connect the GitHub repository to Vercel.
- Use `main` as the production branch.
- Keep the framework preset set to Next.js.
- Configure all production environment variables before deploying.
- Redeploy after any environment variable change.
- Configure the Supabase redirect URL to `https://YOUR_DOMAIN/auth/callback`.
- Configure the Payhip webhook URL to `https://YOUR_DOMAIN/api/payhip-webhook`.
