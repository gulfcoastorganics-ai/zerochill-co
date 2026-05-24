create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.academy_profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  tier integer not null default 1 check (tier between 1 and 3),
  academy_access boolean not null default false,
  access_key text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  academy_profile_id uuid references public.academy_profiles(id) on delete set null,
  payhip_order_id text not null unique,
  customer_email text not null,
  product_name text not null,
  amount numeric(12, 2) not null,
  currency text not null default 'usd',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deployments (
  id uuid primary key default gen_random_uuid(),
  academy_profile_id uuid not null references public.academy_profiles(id) on delete cascade,
  email text not null,
  model_name text not null,
  device_type text not null,
  runtime_endpoint text not null default 'http://localhost:11434',
  validation_prompt text not null,
  validation_response text not null,
  verified_at timestamptz not null default now(),
  inference_latency_ms integer not null,
  browser_user_agent text not null,
  webgpu_supported boolean not null default false,
  verification_hash text not null unique,
  operator_profile jsonb not null default '{}'::jsonb,
  proof_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tier_progress (
  profile_id uuid primary key references public.academy_profiles(id) on delete cascade,
  tier_1_complete boolean not null default false,
  tier_2_complete boolean not null default false,
  tier_3_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.academy_gates (
  id uuid primary key default uuid_generate_v4(),
  tier integer not null,
  gate_name text not null,
  required boolean not null default true,
  validation_type text not null unique,
  reward_unlock text,
  created_at timestamptz not null default now()
);

create table if not exists public.gate_completions (
  id uuid primary key default uuid_generate_v4(),
  email text not null,
  gate_id uuid references public.academy_gates(id) on delete set null,
  tier integer not null,
  validation_type text not null,
  proof_hash text,
  metadata jsonb,
  completed_at timestamptz not null default now()
);

create table if not exists public.webhook_events (
  id uuid primary key default uuid_generate_v4(),
  provider text not null,
  event_type text,
  event_id text,
  order_id text,
  email text,
  payload jsonb not null default '{}'::jsonb,
  verified boolean not null default false,
  processed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.runtime_events (
  id uuid primary key default uuid_generate_v4(),
  email text,
  event_type text not null,
  event_status text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.academy_profiles enable row level security;
alter table public.purchases enable row level security;
alter table public.deployments enable row level security;
alter table public.tier_progress enable row level security;
alter table public.academy_gates enable row level security;
alter table public.gate_completions enable row level security;
alter table public.webhook_events enable row level security;
alter table public.runtime_events enable row level security;

drop trigger if exists set_updated_at_academy_profiles on public.academy_profiles;
create trigger set_updated_at_academy_profiles
before update on public.academy_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_purchases on public.purchases;
create trigger set_updated_at_purchases
before update on public.purchases
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_deployments on public.deployments;
create trigger set_updated_at_deployments
before update on public.deployments
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_tier_progress on public.tier_progress;
create trigger set_updated_at_tier_progress
before update on public.tier_progress
for each row execute function public.set_updated_at();

insert into public.academy_gates (tier, gate_name, required, validation_type, reward_unlock)
values
  (1, 'Local Runtime Verification', true, 'OLLAMA_GENERATE_ZERO_STATE_OK', 'TIER_2_ORCHESTRATION'),
  (2, 'Agent Workflow Verification', true, 'AGENT_WORKFLOW_PROOF', 'TIER_3_SOVEREIGN_OPS'),
  (3, 'MVP Production Verification', true, 'LIVE_MVP_PAYMENT_PROOF', 'GRADUATION')
on conflict (validation_type) do nothing;

create index if not exists idx_runtime_events_email_event_type on public.runtime_events(email, event_type);
create unique index if not exists idx_webhook_events_provider_event_id_unique
  on public.webhook_events(provider, event_id)
  where event_id is not null;
create unique index if not exists idx_webhook_events_provider_order_id_unique
  on public.webhook_events(provider, order_id)
  where order_id is not null;

-- Conservative for the MVP:
-- No client policies are granted yet. Server-side writes use the service role.
