export const navItems = [
  { label: 'Products', to: '/products' },
  { label: 'Sovereign Zero', to: '/sovereign-zero' },
  { label: 'Zero State Matrix', to: '/zero-state-matrix' },
  { label: 'Manifest', to: '/manifest' },
  { label: 'Docs', to: '/docs' },
  { label: 'Review', to: '/review' },
  { label: 'Preorder', to: '/preorder' },
];

export const workspaceNavSections = [
  {
    title: 'Overview',
    items: [{ label: 'Overview', to: '/' }],
  },
  {
    title: 'Products',
    items: [
      { label: 'Products', to: '/products' },
      { label: 'Lite', to: '/sovereign-zero-lite' },
      { label: 'Core', to: '/sovereign-zero-core' },
      { label: 'Blacksite', to: '/sovereign-zero-blacksite' },
      { label: 'DevKit', to: '/zero-state-matrix-devkit' },
    ],
  },
  {
    title: 'Mission Control',
    items: [{ label: 'Mission Control', to: '/zero-state-matrix' }],
  },
  {
    title: 'Docs',
    items: [{ label: 'Docs', to: '/docs' }],
  },
  {
    title: 'Preorder',
    items: [{ label: 'Preorder', to: '/preorder' }],
  },
  {
    title: 'Review',
    items: [{ label: 'Review', to: '/review' }],
  },
];

export const workspaceStatus = [
  { label: 'SYSTEM', value: 'LOCAL-FIRST / STABLE' },
  { label: 'SURFACE', value: 'MATTE / MINIMAL / QUIET' },
  { label: 'MODE', value: 'APP SHELL / OPERATIONS VIEW' },
  { label: 'CTA', value: 'PREORDER / REVIEW READY' },
];

export const overviewCards = [
  {
    label: 'PROJECT',
    title: 'Serious infrastructure, not launch theater.',
    body:
      'ZeroChill is now framed as a product workspace: a dark shell, disciplined navigation, and a reading experience that feels closer to an internal operating system than a landing page.',
  },
  {
    label: 'SYSTEM STATE',
    title: 'Operator-owned surface, narrow visual vocabulary.',
    body:
      'The interface keeps the signal tight: graphite surfaces, restrained accents, and a layout that favors hierarchy over spectacle.',
  },
  {
    label: 'MISSION',
    title: 'Your AI. Unplugged.',
    body:
      'The brand statement stays intact, but the presentation is calmer, more editorial, and easier to scan under review.',
  },
];

export const productHierarchy = [
  {
    name: 'Lite',
    detail: 'Entry node for portable local AI and quiet field work.',
    to: '/sovereign-zero-lite',
  },
  {
    name: 'Core',
    detail: 'Default production node for private AI operations.',
    to: '/sovereign-zero-core',
  },
  {
    name: 'Blacksite',
    detail: 'Restricted deployment for controlled environments.',
    to: '/sovereign-zero-blacksite',
  },
  {
    name: 'DevKit',
    detail: 'Developer control surface for workflow validation.',
    to: '/zero-state-matrix-devkit',
  },
];

export const overviewHighlights = [
  'Fixed left navigation and a centered reading column create an app-like cadence.',
  'The right rail carries status, routing context, and the preorder CTA without fighting the main content.',
  'Crimson is reduced to a signal color rather than a full visual theme.',
];

export const missionControlSignals = [
  { label: 'RENDER', value: 'CLEAN / LOW-NOISE / STABLE' },
  { label: 'QUEUE', value: 'SHORT / REVIEWABLE' },
  { label: 'AUTHORITY', value: 'OPERATOR OWNED' },
  { label: 'SYNC', value: 'LOCAL FIRST' },
];

export const docsGatewayCards = [
  {
    title: 'Zero-State Architecture',
    href: '#zero-state-architecture',
    summary: 'Local nodes, relay lanes, and operator-owned inference boundaries.',
  },
  {
    title: 'Offline Inference Doctrine',
    href: '#offline-inference-doctrine',
    summary: 'How the system behaves when transport is absent or restricted.',
  },
  {
    title: 'Edge Sovereignty Model',
    href: '#edge-sovereignty-model',
    summary: 'Where authority lives when compute is pushed closer to the mission point.',
  },
  {
    title: 'Deployment Topology',
    href: '#deployment-topology',
    summary: 'How the workstation, relay, node, and secure edge connect.',
  },
];

export const preorderSidebarNotes = [
  'Notifications still route through the existing API and email flow.',
  'Local browser storage remains the fallback if the request path fails.',
  'The form is intentionally quiet: clear labels, short helper copy, and stable spacing.',
];

export const reviewSignals = [
  { label: 'SITE', value: 'LIVE / ROUTED' },
  { label: 'PREORDER', value: 'NOTIFICATION READY' },
  { label: 'PRIVATE', value: 'CONTINUATION SUMMARY HIDDEN' },
  { label: 'NEXT', value: 'CONTINUATION APPROVAL' },
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
      'CPU tier: 8-core low-power local inference node',
      'GPU tier: integrated accelerator or entry-level mobile compute',
      'Inference positioning: lightweight local model execution and prompt routing',
      'Edge node role: starter node for field deployments and private workstations',
      'Workstation use case: quiet operator desk, mobile command kit, or lab bench',
      'Offline operation: designed to remain functional with no permanent network dependency',
      'Deployment environments: small offices, mobile rigs, secure home labs',
      'Thermals / acoustics: low fan curve, near-silent under normal load',
      'Ruggedization: transport-safe enclosure and shock-resistant storage profile',
    ],
  },
  {
    name: 'Sovereign Zero Core',
    badge: 'PRODUCTION',
    summary: 'Balanced deployment chassis for private AI workloads and command orchestration.',
    specs: [
      'CPU tier: 16-core production inference CPU class',
      'GPU tier: midrange workstation GPU for local model acceleration',
      'Inference positioning: sustained private model serving and orchestration',
      'Edge node role: primary site node for internal teams and private deployments',
      'Workstation use case: operator console, model review, and workflow execution',
      'Offline operation: local-first by default with controlled relay synchronization',
      'Deployment environments: office server room, secure studio, private lab',
      'Thermals / acoustics: tuned airflow path with stable mid-load acoustic profile',
      'Ruggedization: rackable chassis, serviceable panels, and filtered intake path',
    ],
  },
  {
    name: 'Sovereign Zero Blacksite',
    badge: 'RESTRICTED',
    summary: 'Isolated configuration for controlled labs, secure rooms, and sensitive work.',
    specs: [
      'CPU tier: hardened multi-socket class or isolated workstation-grade CPU',
      'GPU tier: professional compute card for secure local inference lanes',
      'Inference positioning: restricted model execution in controlled environments',
      'Edge node role: highest-trust node for classified or sensitive workflows',
      'Workstation use case: isolated operator room, private research suite, secure review desk',
      'Offline operation: air-gap ready with optional relay gating only',
      'Deployment environments: labs, secure rooms, private technical facilities',
      'Thermals / acoustics: damped airflow, restrained noise footprint, heat-aware layout',
      'Ruggedization: reinforced chassis, tamper-conscious design cues, service-lock access',
    ],
  },
  {
    name: 'Zero-State Matrix DevKit',
    badge: 'DEVKIT',
    summary: 'Developer console bundle for building and testing sovereign AI workflows.',
    specs: [
      'CPU tier: developer workstation class with balanced local throughput',
      'GPU tier: programmable compute option for local testing and diagnostics',
      'Inference positioning: build, test, and validate local workflow layers',
      'Edge node role: staging node for toolkit validation and release prep',
      'Workstation use case: engineering bench, operator sandbox, and control surface',
      'Offline operation: supports disconnected development and self-hosted testing',
      'Deployment environments: development desks, lab benches, and staging racks',
      'Thermals / acoustics: office-friendly acoustic tuning with sustained work loads',
      'Ruggedization: portable but precise, built for repeated deployment cycles',
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

export const useCaseDoctrine = [
  {
    title: 'Private AI Research',
    detail: 'Run local experiments, keep datasets controlled, and avoid unnecessary data exposure.',
  },
  {
    title: 'Offline Creative Pipelines',
    detail: 'Support design, writing, and synthesis workflows in environments with limited or no internet.',
  },
  {
    title: 'Tactical Edge Compute',
    detail: 'Place inference close to the mission point where latency, availability, and control matter.',
  },
  {
    title: 'Autonomous Local Inference',
    detail: 'Keep task execution and inference inside a predictable, operator-owned boundary.',
  },
  {
    title: 'Secure Developer Workstations',
    detail: 'Give engineers a controlled machine for building, testing, and validating local systems.',
  },
];

export const operationalPhilosophy = [
  {
    title: 'Ownership',
    detail: 'The operator owns the stack, the state, and the deployment decision.',
  },
  {
    title: 'Sovereignty',
    detail: 'Critical behavior remains under local governance rather than remote platform control.',
  },
  {
    title: 'Offline-first',
    detail: 'Connectivity is optional; local operation is the baseline.',
  },
  {
    title: 'Low-dependency infrastructure',
    detail: 'Keep the runtime surface narrow and the dependency chain short.',
  },
  {
    title: 'Privacy positioning',
    detail: 'Avoid unnecessary transport and reduce exposure by default.',
  },
  {
    title: 'Infrastructure resilience',
    detail: 'Prefer systems that remain useful in degraded, disconnected, or restricted conditions.',
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

export const reviewSnapshot = [
  { label: 'Client', value: 'Danny Ford' },
  { label: 'Builder / Operator', value: 'gulfcoastorganics-ai' },
  { label: 'Brand', value: 'ZeroChill Co.' },
  { label: 'Status', value: 'Frontend launch layer complete' },
];

export const reviewCompletedWork = [
  'Built the public site shell and routed pages.',
  'Added cinematic terminal presentation layers and CSS-only motion.',
  'Created SVG logo, banner, and social asset systems.',
  'Added docs, brand, deployment, and handoff documentation.',
  'Implemented preorder interest capture with localStorage fallback.',
];

export const reviewBrandInventory = [
  'Obsidian / charcoal / crimson palette',
  'Terminal-inspired typography and UI language',
  'SVG logo family and icon set',
  'Social banner and wallpaper assets',
  'Cinematic footer and boot-sequence presentation',
];

export const reviewRoutes = [
  '/',
  '/sovereign-zero',
  '/zero-state-matrix',
  '/sovereign-zero-lite',
  '/sovereign-zero-core',
  '/sovereign-zero-blacksite',
  '/zero-state-matrix-devkit',
  '/manifest',
  '/docs',
  '/preorder',
  '/review',
  '/admin',
];

export const reviewChecklist = [
  'Approve homepage direction and hero language.',
  'Approve product tier names and concept positioning.',
  'Approve preorder language and fallback behavior.',
  'Approve brand system and visual identity.',
  'Approve deployment ownership and next milestone direction.',
];

export const reviewMilestones = [
  'Connect preorder to a backend or CRM endpoint.',
  'Expand product pages into full launch detail pages.',
  'Add public launch copy and final domain handling.',
  'Prepare social release assets and deployment notes.',
];

export const reviewLimitations = [
  'Preorder submissions still store locally until a backend is connected.',
  'Some social assets remain SVG masters only.',
  'No analytics or CRM integration has been added yet.',
];

export const reviewHandoff = [
  'Public copy remains centered on ZeroChill Co.',
  'Internal notes remain in repo documentation.',
  'Live deployment and repo URLs should be filled before client delivery.',
];

export const productComparison = [
  {
    name: 'Sovereign Zero Lite',
    audience: 'Small teams, field operators, solo research desks',
    environment: 'Mobile rigs, compact offices, secure home labs',
    offline: 'Strong offline baseline; no permanent network requirement',
    inference: 'Light local inference and routing; fast response under modest load',
    compute: '8-core class CPU with entry or integrated GPU acceleration',
    fit: 'Choose when portability and quiet operation matter most',
  },
  {
    name: 'Sovereign Zero Core',
    audience: 'Production teams, internal platforms, private AI operations',
    environment: 'Office server rooms, secure studios, private labs',
    offline: 'Offline-first with controlled relay synchronization',
    inference: 'Balanced private serving and orchestration for sustained workloads',
    compute: '16-core class CPU with midrange workstation GPU acceleration',
    fit: 'Choose when you need the default production node',
  },
  {
    name: 'Sovereign Zero Blacksite',
    audience: 'Restricted rooms, sensitive research, high-trust facilities',
    environment: 'Labs, secure rooms, private technical facilities',
    offline: 'Air-gap ready with optional relay gating only',
    inference: 'Restricted model execution for controlled environments',
    compute: 'Hardened multi-socket or isolated workstation-grade CPU with pro GPU',
    fit: 'Choose when isolation and security posture matter most',
  },
  {
    name: 'Zero-State Matrix DevKit',
    audience: 'Engineers, builders, system integrators, operator sandbox users',
    environment: 'Development desks, lab benches, staging racks',
    offline: 'Supports disconnected development and self-hosted testing',
    inference: 'Build, validate, and test local workflow layers',
    compute: 'Balanced workstation CPU with programmable local compute option',
    fit: 'Choose when you need the control plane and developer toolkit',
  },
];

export const productComparisonColumns = [
  'Recommended buyer / use case',
  'Deployment environment fit',
  'Offline capability',
  'Compute / inference position',
];

export const productSummaryCards = [
  {
    title: 'Sovereign Zero Lite',
    body: 'Entry node for portable local AI and quiet field work.',
  },
  {
    title: 'Sovereign Zero Core',
    body: 'Balanced production node for private infrastructure teams.',
  },
  {
    title: 'Sovereign Zero Blacksite',
    body: 'Restricted deployment node for high-trust environments.',
  },
  {
    title: 'Zero-State Matrix DevKit',
    body: 'Developer control layer for testing and local workflow validation.',
  },
];

export const productDetailCatalog = [
  {
    slug: 'sovereign-zero-lite',
    title: 'Sovereign Zero Lite',
    eyebrow: 'Field node / entry deployment',
    positioning:
      'A compact sovereign workstation for small teams, mobile operators, and private labs that need local AI without a heavy footprint.',
    deploymentScenarios: [
      'Mobile command desks for traveling operators who need local inference and secure note handling.',
      'Small office deployments where the machine has to sit quietly and still carry the workflow.',
      'Private research benches that should remain useful even when the network is out of the picture.',
    ],
    useCaseDoctrine: [
      'Keep the critical loop local so the operator can continue work through degraded connectivity.',
      'Use the node as a compact trust boundary for prompts, notes, and small internal models.',
      'Prefer quiet, repeatable operation over a broad surface of features that need constant tuning.',
    ],
    workstationConcepts: [
      'Single-desk control station with a low-noise chassis, one primary display, and a minimal peripheral stack.',
      'Field-ready carry case for transport between sites without turning the machine into a fragile demo rig.',
      'Local admin seat for reviewing model output, SOPs, and intake forms without handing them to a cloud app.',
    ],
    operationalDiagrams: [
      'Operator desk -> local model -> local storage -> optional relay sync',
      'Task intake -> policy check -> local inference -> human review',
    ],
    offlineWorkflows: [
      'Prompt handling, note capture, and task draft generation stay on-device.',
      'Queue anything that needs sync until the relay is available again.',
      'Use local export bundles so the workstation keeps operating during outages.',
    ],
    targetOperators: [
      'Solo technical operators',
      'Small internal teams',
      'Private research desks',
    ],
  },
  {
    slug: 'sovereign-zero-core',
    title: 'Sovereign Zero Core',
    eyebrow: 'Production node / baseline deployment',
    positioning:
      'The default production shape for teams that need reliable local AI, stronger orchestration, and a more complete operator surface.',
    deploymentScenarios: [
      'Private office deployments with a central node for internal AI operations.',
      'Secure studios that need model routing, file handling, and repeatable review flows.',
      'Lab environments where multiple operators share the same controlled workstation stack.',
    ],
    useCaseDoctrine: [
      'Treat the node as the baseline production control plane for internal AI workflows.',
      'Keep storage, inference, and policy close to the operator and visible in one surface.',
      'Design for sustained work, not just a short demo session or a speculative prototype.',
    ],
    workstationConcepts: [
      'Rackable or desk-side workstation with a balanced compute profile and visible service access.',
      'Shared operator console for team review, export, and approval workflows.',
      'Durable production seat that feels like equipment, not a consumer laptop wrapped in marketing.',
    ],
    operationalDiagrams: [
      'Operator console -> policy layer -> local model pool -> reviewed export',
      'Inbound task -> routing -> inference -> status telemetry -> approval lane',
    ],
    offlineWorkflows: [
      'Local model serving stays available even when remote services are degraded.',
      'Exports can be batched for later sync instead of blocking the workflow.',
      'Telemetry stays narrow and readable so operators know what is running without dashboards taking over.',
    ],
    targetOperators: [
      'Internal platform teams',
      'Founders and operators',
      'Security-minded production teams',
    ],
  },
  {
    slug: 'sovereign-zero-blacksite',
    title: 'Sovereign Zero Blacksite',
    eyebrow: 'Restricted node / isolated deployment',
    positioning:
      'An isolated deployment profile for sensitive rooms, private labs, and environments where the system has to remain tightly controlled.',
    deploymentScenarios: [
      'Secure rooms where access, logging, and transport boundaries are managed carefully.',
      'Private R&D spaces that need a hardened node without broad connectivity assumptions.',
      'Controlled deployment areas where exports, updates, and review must be deliberate.',
    ],
    useCaseDoctrine: [
      'Use the system as a restricted execution surface, not a generic all-purpose platform.',
      'Treat air-gap readiness, access discipline, and export review as part of the product shape.',
      'Keep the operational model narrow so it can stay legible under scrutiny.',
    ],
    workstationConcepts: [
      'Isolated operator room with a secure console, locked storage, and limited peripheral exposure.',
      'Dampened workstation stack that favors controlled maintenance over casual access.',
      'High-trust seat for policy review, local inference, and tamper-conscious handling.',
    ],
    operationalDiagrams: [
      'Restricted workstation -> local model -> policy gate -> export review',
      'Secure intake -> isolated compute -> audit log -> gated relay',
    ],
    offlineWorkflows: [
      'Stay functional without a permanent network path.',
      'Cache review artifacts locally until an authorized sync path is opened.',
      'Keep inference and evidence handling inside the same controlled perimeter.',
    ],
    targetOperators: [
      'Security and compliance teams',
      'Research leads in controlled facilities',
      'Operators in restricted technical environments',
    ],
  },
  {
    slug: 'zero-state-matrix-devkit',
    title: 'Zero-State Matrix DevKit',
    eyebrow: 'Developer kit / control surface',
    positioning:
      'A developer-facing control layer for teams building sovereign workflows, validating integrations, and shaping the local AI stack before launch.',
    deploymentScenarios: [
      'Engineering desks that need a build-and-test surface for local AI tools.',
      'Staging benches where operators validate workflows before they reach production.',
      'Internal platform teams that need diagnostics, exports, and routing tools in one place.',
    ],
    useCaseDoctrine: [
      'Make the system readable enough that engineers can shape the workflow without guessing.',
      'Treat diagnostics, exports, and local inference as first-class developer objects.',
      'Use the kit to reduce integration drag before the production node goes live.',
    ],
    workstationConcepts: [
      'Developer bench with terminal-first tools, clear state panels, and modular controls.',
      'Portable validation station for staging and release review.',
      'Operator sandbox for policy checks, local inference tests, and packaging workflows.',
    ],
    operationalDiagrams: [
      'Build bench -> workflow config -> local model test -> export bundle',
      'Developer input -> state matrix -> diagnostics -> release candidate',
    ],
    offlineWorkflows: [
      'Disconnected development and self-hosted test loops stay available by default.',
      'Package updates locally before syncing to a larger deployment lane.',
      'Use the matrix to verify what happens when the relay is absent.',
    ],
    targetOperators: [
      'Software engineers',
      'Systems integrators',
      'Platform and tooling teams',
    ],
  },
];

export const missionControlCards = [
  { label: 'Deployment telemetry', value: 'SIMULATED / STABLE / FRONTEND ONLY' },
  { label: 'Node status', value: 'ZC-01 PRIMARY // ZC-02 EDGE // ZC-03 RESTRICTED' },
  { label: 'Inference state', value: 'LOCAL MODEL ACTIVE // QUEUE LIGHT // POLICY LOCKED' },
  { label: 'Relay lane', value: 'EDGE SYNC READY // OFFLINE BUFFER ARMED' },
];
