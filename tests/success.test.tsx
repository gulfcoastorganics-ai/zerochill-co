import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SuccessPage from "@/app/success/page";

describe("Success page", () => {
  it("shows the checkout confirmation messaging", () => {
    render(<SuccessPage />);

    expect(
      screen.getByRole("heading", { name: /thanks for joining the queue/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/confirmation and access email pending delivery/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return to zerochill/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /review preorder/i })).toBeInTheDocument();
  });
});
