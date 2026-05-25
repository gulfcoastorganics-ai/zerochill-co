import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InquiryForm from "@/components/InquiryForm";

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
}

describe("InquiryForm", () => {
  it("shows validation errors when submitted empty", () => {
    render(<InquiryForm />);

    fireEvent.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Organization is required.")).toBeInTheDocument();
    expect(screen.getByText("Choose a deployment interest.")).toBeInTheDocument();
    expect(screen.getByText("Choose a project type.")).toBeInTheDocument();
    expect(screen.getByText("Choose a budget range.")).toBeInTheDocument();
    expect(screen.getByText("Choose a timeline.")).toBeInTheDocument();
    expect(
      screen.getByText("Add at least 24 characters describing the deployment."),
    ).toBeInTheDocument();
  });

  it("exposes the sovereign project type options", () => {
    render(<InquiryForm />);

    const projectTypeSelect = screen.getByRole("combobox", { name: /project type/i });
    const deploymentInterestSelect = screen.getByRole("combobox", {
      name: /deployment interest/i,
    });

    expect(projectTypeSelect).toBeInTheDocument();
    expect(deploymentInterestSelect).toBeInTheDocument();
    expect(within(projectTypeSelect).getByRole("option", { name: "Sovereign Node Stack" })).toBeInTheDocument();
    expect(within(projectTypeSelect).getByRole("option", { name: "Telemetry Isolation" })).toBeInTheDocument();
    expect(
      within(projectTypeSelect).getByRole("option", { name: "Edge Inference Workflow" }),
    ).toBeInTheDocument();
    expect(
      within(projectTypeSelect).getByRole("option", { name: "Operator Command Console" }),
    ).toBeInTheDocument();
    expect(within(projectTypeSelect).getByRole("option", { name: "Zero-State Matrix UI" })).toBeInTheDocument();

    expect(within(deploymentInterestSelect).getByRole("option", { name: "Edge Inference" })).toBeInTheDocument();
    expect(
      within(deploymentInterestSelect).getByRole("option", { name: "Telemetry Isolation" }),
    ).toBeInTheDocument();
    expect(
      within(deploymentInterestSelect).getByRole("option", { name: "Private Deployment" }),
    ).toBeInTheDocument();
    expect(within(deploymentInterestSelect).getByRole("option", { name: "Launch Queue" })).toBeInTheDocument();
    expect(
      within(deploymentInterestSelect).getByRole("option", { name: "Zero-State Matrix Access" }),
    ).toBeInTheDocument();
  });

  it("prevents duplicate submits while loading and shows the success state", async () => {
    const deferred = createDeferred<Response>();
    const fetchMock = vi.fn(() => deferred.promise);

    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(<InquiryForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "ada@zerochill.co" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /organization/i }), {
      target: { value: "ZeroChill Co." },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /deployment interest/i }), {
      target: { value: "edge-inference" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /project type/i }), {
      target: { value: "inference" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /budget range/i }), {
      target: { value: "1k-3k" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /timeline/i }), {
      target: { value: "2-4-weeks" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
      target: {
        value: "Need a localized inference deployment with isolated telemetry and operator control.",
      },
    });

    const form = container.querySelector("form");
    expect(form).not.toBeNull();

    fireEvent.submit(form as HTMLFormElement);
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();

    deferred.resolve(
      new Response(
        JSON.stringify({
          ok: true,
          message: "Intake captured. We will follow up with next steps.",
          delivered: true,
          deliveryMode: "email",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );

    await waitFor(() =>
      expect(screen.getByText(/intake captured\. we will follow up with next steps\./i)).toBeInTheDocument(),
    );
    expect(screen.getByText(/email delivery confirmed\./i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send inquiry/i })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /send inquiry/i })).toBeInTheDocument();
  });

  it("shows the log-mode success copy when email delivery is unavailable", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          ok: true,
          message: "Intake captured. We will follow up with next steps.",
          delivered: false,
          deliveryMode: "log",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<InquiryForm />);

    fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
      target: { value: "Ada Lovelace" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "ada@zerochill.co" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /organization/i }), {
      target: { value: "ZeroChill Co." },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /deployment interest/i }), {
      target: { value: "edge-inference" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /project type/i }), {
      target: { value: "inference" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /budget range/i }), {
      target: { value: "1k-3k" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /timeline/i }), {
      target: { value: "2-4-weeks" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
      target: {
        value: "Need a localized inference deployment with isolated telemetry and operator control.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(screen.getByText(/delivery fell back to log mode/i)).toBeInTheDocument(),
    );
  });
});
