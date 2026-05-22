import { describe, expect, it, vi } from "vitest";

async function loadLaunchLinks(env: Record<string, string | undefined> = {}) {
  vi.resetModules();
  vi.stubEnv("PAYHIP_SOVEREIGN_ZERO_URL", env.PAYHIP_SOVEREIGN_ZERO_URL);
  vi.stubEnv("PAYHIP_MATRIX_ACCESS_URL", env.PAYHIP_MATRIX_ACCESS_URL);
  vi.stubEnv("NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL", env.NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL);
  vi.stubEnv("NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL", env.NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL);

  return import("@/lib/launchLinks");
}

describe("launchLinks", () => {
  it("falls back to the local launch access anchor when env vars are missing", async () => {
    const launchLinks = await loadLaunchLinks();

    expect(launchLinks.launchFallbackHref).toBe("/#launch-access");
    expect(launchLinks.getLaunchTarget("sovereignZero")).toMatchObject({
      label: "PRE-ORDER SOVEREIGN ZERO",
      status: "Opening Soon",
      href: "/#launch-access",
    });
    expect(launchLinks.getLaunchTarget("matrixAccess")).toMatchObject({
      label: "JOIN THE MATRIX",
      status: "Launch Queue",
      href: "/#launch-access",
    });
  });

  it("normalizes relative, bare, and trimmed Payhip URLs", async () => {
    const launchLinks = await loadLaunchLinks({
      NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL: "  payhip.com/sovereign-zero  ",
      NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL: "  /launch-access  ",
    });

    expect(launchLinks.getLaunchTarget("sovereignZero").href).toBe("https://payhip.com/sovereign-zero");
    expect(launchLinks.getLaunchTarget("matrixAccess").href).toBe("/launch-access");
  });

  it("preserves fully qualified external URLs and reports them as external", async () => {
    const launchLinks = await loadLaunchLinks({
      NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL: "https://payhip.com/sovereign-zero",
      NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL: "http://payhip.com/matrix-access",
    });

    expect(launchLinks.getLaunchTarget("sovereignZero").href).toBe("https://payhip.com/sovereign-zero");
    expect(launchLinks.getLaunchTarget("matrixAccess").href).toBe("http://payhip.com/matrix-access");
    expect(launchLinks.isExternalLaunchHref("https://payhip.com/sovereign-zero")).toBe(true);
    expect(launchLinks.isExternalLaunchHref("http://payhip.com/matrix-access")).toBe(true);
    expect(launchLinks.isExternalLaunchHref("/#launch-access")).toBe(false);
  });

  it("prefers server-side PAYHIP env vars when present", async () => {
    const launchLinks = await loadLaunchLinks({
      PAYHIP_SOVEREIGN_ZERO_URL: "payhip.com/server-sovereign-zero",
      PAYHIP_MATRIX_ACCESS_URL: "/server-matrix",
      NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL: "payhip.com/public-sovereign-zero",
      NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL: "payhip.com/public-matrix",
    });

    expect(launchLinks.getLaunchTarget("sovereignZero").href).toBe(
      "https://payhip.com/server-sovereign-zero",
    );
    expect(launchLinks.getLaunchTarget("matrixAccess").href).toBe("/server-matrix");
  });
});
