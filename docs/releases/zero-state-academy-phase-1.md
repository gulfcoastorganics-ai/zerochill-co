# Zero-State Academy Phase 1

## Release Purpose

Zero-State Academy Phase 1 is the controlled launch checkpoint for the sovereign operator training loop. The release is intentionally constrained to the first production path:

`commerce → provisioning → magic-link access → intake → local runtime validation → operator deployment profile → gate completion → Tier 2 unlock`

This phase exists to validate the production loop, operational telemetry, and deployment readiness without expanding into enterprise tooling, subscriptions, forums, or orchestration execution.

## Completed Product Loop

1. **Commerce** - Payhip initiates the operator entry path.
2. **Provisioning** - the webhook provisions academy access and purchase records.
3. **Magic-link access** - operators authenticate through Supabase Auth without passwords.
4. **Intake** - `/academy/intake` prepares the local node and launch checklist.
5. **Local runtime validation** - `/academy` probes local Ollama and requires a real `ZERO_STATE_OK` inference.
6. **Operator deployment profile** - the verification step records runtime telemetry, proof hash, and deployment metadata.
7. **Gate completion** - Tier 1 completion is written to the reusable gate ledger.
8. **Tier 2 unlock** - the orchestration scaffold unlocks after Tier 1 validation.

## Implemented Routes

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

## Implemented Database Tables

- `academy_profiles`
- `purchases`
- `deployments`
- `tier_progress`
- `academy_gates`
- `gate_completions`
- `webhook_events`
- `runtime_events`

## Implemented APIs

- `POST /api/payhip-webhook`
  - provisions academy access from Payhip purchase events
  - logs webhook events before processing
  - applies replay protection
  - supports signature verification scaffolding
- `POST /api/verify-runtime`
  - validates local Ollama inference
  - stores the deployment profile
  - completes Tier 1
  - unlocks Tier 2
- `GET /api/academy-session`
  - returns lightweight operator session visibility
- `GET /api/academy-health`
  - returns production readiness and table/env visibility
- `POST /api/runtime-events`
  - records minimal operational runtime telemetry

## Operational Hardening Added

- Supabase magic-link auth with session gating
- `/academy` route protection via middleware
- raw-body webhook handling for future signature verification
- webhook event logging before provisioning
- duplicate webhook replay protection using provider/event and provider/order keys
- runtime failure classification
- operator deployment profile storage
- gate-driven tier completion records
- minimal academy health diagnostics
- session visibility across academy pages
- read-only internal system status surface

## Known Limitations

- Payhip signature verification remains scaffolded and must be finalized before removing the unverified webhook allowance.
- Local runtime validation still depends on an operator-controlled Ollama endpoint on the local machine.
- Tier 2 remains a scaffold; no real orchestration execution is implemented.
- The Next.js middleware deprecation warning remains present in this workspace, but it does not block the build.

## Launch Checklist

- Verify production environment variables are configured.
- Apply `supabase/schema.sql` in Supabase.
- Confirm Supabase Auth magic-link redirect URLs are configured.
- Set the Payhip webhook endpoint to `/api/payhip-webhook`.
- Keep `ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS=false` in production.
- Confirm `/api/academy-health` returns `academyOperational=true`.
- Validate `/login` magic-link access.
- Validate `/academy` protection and Tier 1 runtime validation.
- Confirm `/academy/intake` and `/academy/orchestration` are reachable as expected.
- Confirm `gate_completions` inserts after successful validation.
- Run the final QA commands before launch.

## Rollback Notes

- If launch validation fails, revert to the last known good deployment and preserve the database schema.
- Disable the Payhip webhook endpoint if provisioning is causing duplicate or unsafe writes.
- Keep the launch docs and schema changes intact unless a rollback requires a database migration reversal.
- Use the release checkpoint commit to restore the codebase to the pre-launch state if needed.

