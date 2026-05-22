import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the ZeroChill sovereign infrastructure messaging", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /sovereign ai infrastructure for localized deployment/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/zerochill co\. \/ sovereign zero/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /sovereign command language/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view launch access/i })).toBeInTheDocument();
    expect(container.querySelector("#launch-access")).toBeInTheDocument();
  });
});
