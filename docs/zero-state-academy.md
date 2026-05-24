# Zero-State Academy MVP

Zero-State Academy is the gated operator layer for the ZeroChill / Sovereign Zero build. The MVP is intentionally constrained to one production loop:

`commerce → provisioning → magic-link access → intake → local runtime validation → operator deployment profile → gate completion → Tier 2 unlock`

## Product Loop

1. **Commerce**: Payhip purchase initiates the operator entry path.
2. **Provisioning**: The webhook creates or updates the academy profile and access record.
3. **Magic-link access**: The operator authenticates through Supabase Auth, not passwords.
4. **Intake**: `/academy/intake` prepares the local node and explains the runtime requirements.
5. **Local runtime validation**: `/academy` probes the local Ollama node and requires a real `ZERO_STATE_OK` inference response.
6. **Operator deployment profile**: The validation layer records the runtime proof, latency, browser capability, and proof hash.
7. **Gate completion**: Tier 1 writes a reusable `gate_completions` record tied to `academy_gates`.
8. **Tier 2 unlock**: The orchestration scaffold becomes available once Tier 1 is complete.

## Environment Variables

### Public

These are exposed to the browser and must be prefixed with `NEXT_PUBLIC_`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

### Server-only

These must remain server-side:

- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYHIP_WEBHOOK_SECRET`
- `ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS`
- `RESEND_API_KEY`
- `ACADEMY_FROM_EMAIL`

## Supabase Setup

1. Apply [`supabase/schema.sql`](../supabase/schema.sql).
2. Enable Supabase Auth magic links.
3. Add the redirect URLs:
   - Local: `http://localhost:3000/auth/callback`
   - Production: `https://YOUR_DOMAIN/auth/callback`
4. Confirm RLS is enabled on all academy tables.
5. Keep server writes on the service role key only.

## Payhip Setup

1. Configure the Payhip webhook POST URL:
   - Local tunnel: `https://YOUR_TUNNEL/api/payhip-webhook`
   - Production: `https://YOUR_DOMAIN/api/payhip-webhook`
2. Keep webhook signature verification on the TODO list if it is not yet implemented.
3. Production should set `ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS=false` or remove it once signature verification is finalized.
4. A successful purchase provisions the academy profile, access key, and purchase record.

## Local Ollama Validation

Run the local node:

```bash
ollama serve
ollama pull mistral
curl http://localhost:11434/api/tags
```

Tier 1 validation sends a generation challenge to:

```txt
POST http://localhost:11434/api/generate
```

The prompt requires:

```txt
Return only the string ZERO_STATE_OK
```

Validation passes only when the runtime returns `ZERO_STATE_OK`. That unlocks Tier 2.

## Routes

- `/login`
- `/auth/callback`
- `/academy`
- `/academy/intake`
- `/academy/orchestration`
- `/academy/system-status`
- `/api/payhip-webhook`
- `/api/verify-runtime`
- `/api/academy-health`

## Database Tables

- `academy_profiles`: operator identity, tier state, academy access, and access key.
- `purchases`: Payhip purchase records and normalized order data.
- `deployments`: validated runtime proofs, operator profile, proof hash, and runtime telemetry.
- `tier_progress`: Tier 1 / Tier 2 / Tier 3 completion state.
- `academy_gates`: reusable gate definitions and unlock targets.
- `gate_completions`: immutable gate completion ledger for proof tracking.
- `webhook_events`: Payhip event log with replay protection, verification state, and processed state.
- `runtime_events`: operational telemetry for runtime validation and unlock events.

## Academy Health

The academy health probe at `/api/academy-health` returns:

- `supabaseReachable`
- `academyTables`
- `env`
- `readiness`
- `recommendedActions`
- `warnings`

Use `/academy/system-status` for the internal operator-facing summary of launch readiness, session state, and read-only runtime commands.

## QA Checklist

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- Login redirect to `/login` for unauthenticated academy requests
- Magic-link callback returns the operator to `/academy`
- Academy gate requires a valid session
- `/academy/intake` is reachable and protected
- Ollama validation succeeds against the local node
- Tier 2 unlock appears after successful validation
- `gate_completions` receives a database insert
- `/api/academy-health` returns table reachability and env health without exposing secrets
- `/academy/system-status` renders the internal readiness overview for authenticated operators

## Remaining Production Risks

- Payhip webhook signature verification is still a TODO if not yet implemented.
- Supabase auth redirect URLs must match the deployed domain exactly.
- Vercel env changes require a redeploy to reach the running build.
- The local Ollama validation flow depends on the operator machine running the model endpoint.
