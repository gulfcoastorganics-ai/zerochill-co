import { z } from "zod";

export const projectTypeValues = [
  "node-stack",
  "telemetry",
  "inference",
  "console",
  "matrix",
] as const;

export const deploymentInterestValues = [
  "edge-inference",
  "telemetry-isolation",
  "private-deployment",
  "launch-queue",
  "matrix-access",
] as const;

export const projectTypeOptions = [
  { value: "node-stack", label: "Sovereign Node Stack" },
  { value: "telemetry", label: "Telemetry Isolation" },
  { value: "inference", label: "Edge Inference Workflow" },
  { value: "console", label: "Operator Command Console" },
  { value: "matrix", label: "Zero-State Matrix UI" },
] as const;

export const deploymentInterestOptions = [
  { value: "edge-inference", label: "Edge Inference" },
  { value: "telemetry-isolation", label: "Telemetry Isolation" },
  { value: "private-deployment", label: "Private Deployment" },
  { value: "launch-queue", label: "Launch Queue" },
  { value: "matrix-access", label: "Zero-State Matrix Access" },
] as const;

function requiredText(message: string, maxLength: number) {
  return z.preprocess(
    (value) => (typeof value === "string" ? value : ""),
    z.string().trim().min(1, message).max(maxLength),
  );
}

function enumText<const TValues extends readonly [string, ...string[]]>(values: TValues, message: string) {
  return z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : ""),
    z.string().refine((candidate) => values.includes(candidate as TValues[number]), message),
  );
}

export const inquirySubmissionSchema = z.object({
  name: requiredText("Name is required.", 120),
  email: z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : ""),
    z.string().min(1, "Email is required.").email("Enter a valid email address.").max(254),
  ),
  organization: requiredText("Organization is required.", 160),
  deploymentInterest: enumText(deploymentInterestValues, "Choose a deployment interest."),
  projectType: enumText(projectTypeValues, "Choose a project type."),
  message: z.preprocess(
    (value) => (typeof value === "string" ? value : ""),
    z.string().trim().min(24, "Message must be at least 24 characters.").max(4000),
  ),
  budgetRange: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(40)).optional().default(""),
  timeline: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string().max(40)).optional().default(""),
  honeypot: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.string()).optional().default(""),
});

export type InquirySubmission = z.infer<typeof inquirySubmissionSchema>;
export type InquiryLogSubmission = {
  name: string;
  email: string;
  organization: string;
  deploymentInterest: string;
  projectType: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
};

export type InquiryMailEnv = {
  apiKey?: string;
  to?: string;
  from?: string;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

declare global {
  var __zerochillInquiryRateLimitBuckets: Map<string, RateLimitBucket> | undefined;
}

function getRateLimitBuckets() {
  if (!globalThis.__zerochillInquiryRateLimitBuckets) {
    globalThis.__zerochillInquiryRateLimitBuckets = new Map();
  }

  return globalThis.__zerochillInquiryRateLimitBuckets;
}

export function resetInquiryRateLimitBuckets() {
  getRateLimitBuckets().clear();
}

export function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return realIp?.trim() || "unknown";
}

export function checkInquiryRateLimit(clientKey: string, now = Date.now()) {
  const buckets = getRateLimitBuckets();
  const bucket = buckets.get(clientKey);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true as const };
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true as const };
}

export function buildInquirySubject(submission: Pick<InquiryLogSubmission, "name" | "organization">) {
  return `ZeroChill intake: ${submission.name} / ${submission.organization}`;
}

export function buildInquiryBody(submission: InquiryLogSubmission) {
  return [
    "ZeroChill sovereign intake received.",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Organization: ${submission.organization}`,
    `Deployment interest: ${submission.deploymentInterest}`,
    `Project type: ${submission.projectType}`,
    `Budget range: ${submission.budgetRange || "not provided"}`,
    `Timeline: ${submission.timeline || "not provided"}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");
}

export function formatInquiryLog(submission: InquirySubmission) {
  return {
    name: submission.name,
    email: submission.email,
    organization: submission.organization,
    deploymentInterest: submission.deploymentInterest,
    projectType: submission.projectType,
    budgetRange: submission.budgetRange || undefined,
    timeline: submission.timeline || undefined,
    message: submission.message,
  } satisfies InquiryLogSubmission;
}

export function getInquiryFieldErrors(error: z.ZodError) {
  const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  const fieldErrors: Record<string, string> = {};

  for (const [field, messages] of Object.entries(flattened)) {
    const message = messages?.[0];
    if (message) {
      fieldErrors[field] = message;
    }
  }

  return fieldErrors;
}

export function resolveInquiryMailEnv(): InquiryMailEnv {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim(),
    to: process.env.ZEROCHILL_INTAKE_TO_EMAIL?.trim() || process.env.PREORDER_NOTIFY_TO?.trim(),
    from: process.env.ZEROCHILL_INTAKE_FROM_EMAIL?.trim() || process.env.PREORDER_FROM_EMAIL?.trim(),
  };
}
