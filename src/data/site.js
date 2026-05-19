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

export const docsGatewayEntries = [
  {
    title: 'Zero-State Architecture',
    href: '/docs#zero-state-architecture',
    summary: 'Architecture notes for local nodes, relay paths, and operator-owned inference boundaries.',
    excerpt: '> local node / offline inference / relay topology / operator control',
  },
  {
    title: 'Offline Inference Doctrine',
    href: '/docs#offline-inference-doctrine',
    summary: 'Operating doctrine for disconnected inference, data containment, and continuity under degraded networks.',
    excerpt: '> disconnected by default / deterministic behavior / reduced transport dependency',
  },
  {
    title: 'Edge Sovereignty Model',
    href: '/docs#edge-sovereignty-model',
    summary: 'A practical model for placing compute near the mission point while preserving local authority.',
    excerpt: '> edge nodes / local governance / autonomous compute layers',
  },
  {
    title: 'Deployment Topology',
    href: '/docs#deployment-topology',
    summary: 'A topology view of workstation, relay, node, and secure edge placements.',
    excerpt: '> tactical workstation / relay systems / secure edge compute',
  },
];

export const docsStatusPanel = [
  { label: 'STATUS', value: 'STRUCTURE LOCKED' },
  { label: 'SCOPE', value: 'STATIC CONTENT ONLY' },
  { label: 'DEPTH', value: 'GROWING / REVIEW READY' },
  { label: 'NEXT', value: 'BACKEND + API DOCS' },
];

export const docsRoadmap = [
  'Add backend integration notes once preorder infrastructure is finalized.',
  'Expand deployment topology with operational diagrams and host targets.',
  'Add API reference pages when the first internal services are stable.',
  'Create versioned release notes tied to changelog entries and deployment milestones.',
];

export const hardwareConcepts = [
  {
    name: 'Sovereign Zero Lite',
    badge: 'EDGE ENTRY',
    summary: 'Compact local inference for field operators and small teams.',
    specs: [
      'Processor: low-power local inference runtime',
      'Memory: tuned for lean workstation deployments',
      'Storage: encrypted local project cache',
      'Network: optional / default disconnected',
      'Positioning: starter node for sovereign compute',
    ],
  },
  {
    name: 'Sovereign Zero Core',
    badge: 'PRODUCTION',
    summary: 'Balanced deployment chassis for private AI workloads and command orchestration.',
    specs: [
      'Processor: multi-task inference and policy engine',
      'Memory: production-grade local model workspace',
      'Storage: mirrored local project vaults',
      'Network: filtered relay lanes only',
      'Positioning: standard infrastructure tier',
    ],
  },
  {
    name: 'Sovereign Zero Blacksite',
    badge: 'RESTRICTED',
    summary: 'Isolated configuration for controlled labs, secure rooms, and sensitive work.',
    specs: [
      'Processor: hardened edge compute stack',
      'Memory: segmented local state partitions',
      'Storage: offline encrypted volumes',
      'Network: air-gap ready with relay controls',
      'Positioning: highest-trust deployment lane',
    ],
  },
  {
    name: 'Zero-State Matrix DevKit',
    badge: 'DEVKIT',
    summary: 'Developer console bundle for building and testing sovereign AI workflows.',
    specs: [
      'Processor: diagnostics-first control surface',
      'Memory: scratch space for local workflow testing',
      'Storage: reusable development snapshots',
      'Network: simulator and relay-aware tooling',
      'Positioning: build system and operator sandbox',
    ],
  },
];

export const deploymentNodes = [
  {
    title: 'Local Node',
    detail: 'Primary compute and model execution inside the operator perimeter.',
  },
  {
    title: 'Offline Inference',
    detail: 'Direct model response path with no required cloud handshake.',
  },
  {
    title: 'Relay Systems',
    detail: 'Controlled synchronization lanes for updates, review, and package movement.',
  },
  {
    title: 'Tactical Workstation',
    detail: 'Operator console, diagnostics surface, and command interface.',
  },
  {
    title: 'Secure Edge Compute',
    detail: 'Distributed placement for hardened local workloads near the mission point.',
  },
];

export const localAiComparison = [
  {
    label: 'Cloud dependency',
    local: 'No hard dependency on external tenancy or vendor uptime.',
    cloud: 'Core behavior can be coupled to remote service availability.',
  },
  {
    label: 'Surveillance risk',
    local: 'Reduced exposure by keeping data and inference inside the perimeter.',
    cloud: 'Traffic, prompts, and logs can extend beyond operator control.',
  },
  {
    label: 'Uptime dependence',
    local: 'Works in disconnected, degraded, or restricted environments.',
    cloud: 'Service failure can become system failure.',
  },
  {
    label: 'Ownership',
    local: 'Operator owns the stack, policy, and runtime boundary.',
    cloud: 'Critical layers may belong to a third party.',
  },
  {
    label: 'Latency',
    local: 'Edge-close execution reduces response time and transport overhead.',
    cloud: 'Network distance and relay hops add delay.',
  },
  {
    label: 'Infrastructure control',
    local: 'Every moving part stays visible and tunable.',
    cloud: 'Control is shared with a platform that can change underneath you.',
  },
];

export const footerSignals = [
  { label: 'STATUS', value: 'DEPLOYMENT READY' },
  { label: 'UPTIME', value: 'LOCAL / STABLE / OBSIDIAN' },
  { label: 'NODE', value: 'ZC-01 // EDGE-PRIMARY' },
  { label: 'SIGNATURE', value: 'ZEROCHILL CO / NO CLOUD' },
];
