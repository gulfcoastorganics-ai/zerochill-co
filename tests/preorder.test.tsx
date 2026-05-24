import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Preorder page", () => {
  it("falls back to the local launch access anchor when Payhip URLs are missing", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL", "");
    vi.stubEnv("NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL", "");

    const { default: PreorderPage } = await import("@/app/preorder/page");
    render(<PreorderPage />);

    expect(screen.getByText(/queue fallback active/i)).toBeInTheDocument();
    expect(screen.getByText(/launch checkout opening soon/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /preorder zero/i }),
    ).toHaveAttribute("href", "/#launch-access");
    expect(screen.getByRole("link", { name: /launch access/i })).toHaveAttribute(
      "href",
      "/#launch-access",
    );
  });
});
