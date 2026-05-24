import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import {
  ACADEMY_ACCESS_TOKEN_COOKIE,
  getUserFromAccessToken,
} from "@/lib/academyAuth";

export const metadata = {
  title: "Access Gate | ZeroChill Co.",
  description: "Operator magic-link access for the Zero-State Academy.",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACADEMY_ACCESS_TOKEN_COOKIE)?.value ?? null;

  if (accessToken) {
    const user = await getUserFromAccessToken(accessToken);

    if (user) {
      redirect("/academy");
    }
  }

  return (
    <main className="zerochill-shell min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-4xl items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="glass-panel-strong rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(220,38,38,0.45)]" />
            Access gate
          </div>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.08em]">
            Operator access by magic link.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            Request the access link tied to your purchase, then open the academy on the same device after
            authentication completes.
          </p>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
