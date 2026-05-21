const FALLBACK_HREF = "/#launch-access";
export const launchFallbackHref = FALLBACK_HREF;

function normalizeHref(value?: string) {
  const href = value?.trim();

  if (!href) {
    return FALLBACK_HREF;
  }

  if (href.startsWith("/") || href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }

  return `https://${href}`;
}

const launchTargets = {
  sovereignZero: {
    label: "PRE-ORDER SOVEREIGN ZERO",
    status: "Opening Soon",
    href: normalizeHref(process.env.NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL),
  },
  matrixAccess: {
    label: "JOIN THE MATRIX",
    status: "Launch Queue",
    href: normalizeHref(process.env.NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL),
  },
} as const;

export type LaunchTargetKey = keyof typeof launchTargets;

export function getLaunchTarget(key: LaunchTargetKey) {
  return launchTargets[key];
}

export function isExternalLaunchHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}
