export const navItems = [
  { label: 'Sovereign Zero', to: '/sovereign-zero' },
  { label: 'Zero State Matrix', to: '/zero-state-matrix' },
  { label: 'Manifest', to: '/manifest' },
  { label: 'Docs', to: '/docs' },
  { label: 'Preorder', to: '/preorder' },
];

export const launchPhases = [
  {
    title: 'Phase 01: The Declaration',
    lead: 'ZeroChill Co enters as a refusal, not a trend.',
    copy:
      'We declare the operating position plainly: local intelligence, sovereign control, and no dependency on cloud tenancy for core systems.',
  },
  {
    title: 'Phase 02: The Hierarchy',
    lead: 'Operators first. Systems second. Noise last.',
    copy:
      'The hierarchy is built around command clarity, narrow trust boundaries, and a UI that makes the machine legible under pressure.',
  },
  {
    title: 'Phase 03: The Hardware Reveal',
    lead: 'Steel chassis, edge runtime, tactical clarity.',
    copy:
      'The first hardware stack is designed to be quiet, durable, and local by default. No spectacle. No cloud leash. No compromise.',
  },
];

export const productTiers = [
  {
    name: 'Sovereign Zero Lite',
    badge: 'ENTRY',
    description:
      'A compact local intelligence package for small teams, field workstations, and proof-of-control deployments.',
    features: ['Single-node deploy', 'Local inference', 'Minimal operator surface'],
  },
  {
    name: 'Sovereign Zero Core',
    badge: 'STANDARD',
    description:
      'The production baseline for organizations that need hardened compute without handing state to a vendor.',
    features: ['Multi-workflow routing', 'Policy guardrails', 'Edge-first telemetry'],
  },
  {
    name: 'Sovereign Zero Blacksite',
    badge: 'SECURE',
    description:
      'An isolated configuration for restricted environments, private labs, and high-trust operational domains.',
    features: ['Air-gap ready', 'Restricted access lanes', 'Audit-friendly controls'],
  },
  {
    name: 'Zero-State Matrix DevKit',
    badge: 'DEVKIT',
    description:
      'A developer-facing console and tooling bundle for teams prototyping local AI infrastructure.',
    features: ['Terminal UI tools', 'System diagnostics', 'Workflow scaffolding'],
  },
];

export const problemBlueprint = [
  {
    title: 'They Watch',
    copy:
      'Cloud systems observe everything and give you only a partial mirror of your own infrastructure.',
  },
  {
    title: 'They Switch',
    copy:
      'Vendor policy shifts can change pricing, access, and runtime behavior without operator consent.',
  },
  {
    title: 'They Fail',
    copy:
      'When the connection breaks, the stack breaks with it. Sovereign systems keep moving when the network does not.',
  },
];

export const docsPreviewBlocks = [
  {
    label: 'BOOT PATH',
    command: '$ zerochill boot --local --policy strict',
    body: 'Locks inference to the local perimeter and brings up the operator console without cloud dependencies.',
  },
  {
    label: 'TRUST LANE',
    command: '$ zerochill policy trace --surface minimal',
    body: 'Surfaces only the controls required to monitor state, containment, and runtime pressure.',
  },
  {
    label: 'DEPLOYMENT',
    command: '$ zerochill deploy --target edge --watch disabled',
    body: 'Optimized for low-resource machines, field hardware, and detached environments.',
  },
];

export const manifestPoints = [
  'Compute should stay where the operator controls it.',
  'Data sovereignty is not a feature flag.',
  'Observability should expose the machine, not exploit the user.',
  'Infrastructure should be sharp, quiet, and hard to move.',
];

export const sovereignZeroNotes = [
  'Local-only execution, tuned for small hardware footprints.',
  'Hardened perimeter controls for private inference workflows.',
  'Designed for teams that need control more than convenience.',
];

export const matrixNotes = [
  'Command-line orchestration for local AI state and task flow.',
  'Built to compress complexity into an operator-readable surface.',
  'Fits the same language as security consoles and industrial HMIs.',
];

export const docsNotes = [
  'No heavy runtime, no animated excess, no hidden transport layers.',
  'Tailwind v4 handles the visual system with a single CSS entrypoint.',
  'React Router keeps the pages readable and the SPA routes direct.',
];
