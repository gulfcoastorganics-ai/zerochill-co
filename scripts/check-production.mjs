const baseUrl = (process.env.ZEROCHILL_SITE_URL || "https://zerochill-co.vercel.app").trim().replace(/\/+$/, "");

const checks = [
  { path: "/", method: "GET" },
  { path: "/preorder", method: "GET" },
  { path: "/success", method: "GET" },
  { path: "/api/inquiry", method: "OPTIONS" },
];

function isSuccessStatus(status) {
  return status >= 200 && status < 300;
}

async function runCheck({ path, method }) {
  const url = new URL(path, `${baseUrl}/`);
  const response = await fetch(url, {
    method,
    redirect: "manual",
  });

  const ok = isSuccessStatus(response.status);
  const statusLabel = ok ? "OK" : "FAIL";
  console.log(`${method} ${url.pathname}: ${response.status} ${statusLabel}`);

  return ok;
}

async function main() {
  console.log(`Checking production URL: ${baseUrl}`);

  let allPassed = true;

  for (const check of checks) {
    try {
      const ok = await runCheck(check);
      if (!ok) {
        allPassed = false;
      }
    } catch {
      allPassed = false;
      console.log(`${check.method} ${check.path}: ERROR FAIL`);
    }
  }

  if (!allPassed) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.error("Production check failed unexpectedly.");
  process.exitCode = 1;
});
