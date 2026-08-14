import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Fingerprint, KeyRound, Loader2, Lock, ShieldCheck, UserCog } from "lucide-react";
import { toast } from "sonner";
import { BrandLogo } from "./primitives";
import { ThemeToggle } from "./theme";
import { EarthBackdrop } from "./earth-backdrop";

const TRUST = [
  {
    icon: <ShieldCheck className="size-4" />,
    title: "Enterprise Security",
    body: "SOC 2 Type II controls across every data pipeline.",
  },
  {
    icon: <Fingerprint className="size-4" />,
    title: "Trusted Intelligence",
    body: "Audited signal sources with full lineage.",
  },
  {
    icon: <UserCog className="size-4" />,
    title: "Role-based Access",
    body: "Granular permissions by market and brand.",
  },
  {
    icon: <Lock className="size-4" />,
    title: "Confidential by Design",
    body: "Your competitive intelligence stays yours.",
  },
];

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@marinkai.com");
  const [password, setPassword] = useState("demo");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const valid = /\S+@\S+\.\S+/.test(email) && password.length > 0;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!valid) {
      setError("Enter a valid email address and password.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (email.trim().toLowerCase() !== "demo@marinkai.com" || password !== "demo") {
      setLoading(false);
      setError("Those credentials don't match our records. Try demo@marinkai.com / demo.");
      return;
    }
    toast.success("Logged in successfully");
    setLoading(false);
    navigate({ to: "/landing" });
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <section className="hero-noise relative hidden flex-col justify-between overflow-hidden border-r border-border p-14 lg:flex lg:w-[62%] xl:w-[65%]">
        <EarthBackdrop />
        <div className="relative">
          <BrandLogo />
        </div>


        <div className="relative max-w-[620px]">
          <p className="label-caps mb-6">Enterprise Brand Intelligence</p>
          <h1 className="text-[clamp(44px,5vw,68px)] leading-[1.05]">
            Clarity in the <span className="text-gold">Noise.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[15px] leading-relaxed text-muted-foreground">
            Turn millions of digital signals into confident marketing decisions.
          </p>
        </div>

        <ul className="relative grid max-w-[720px] grid-cols-2 gap-3">
          {TRUST.map((t) => (
            <li key={t.title} className="glass rounded-[16px] p-4">
              <span className="flex items-center gap-2.5 text-gold">{t.icon}</span>
              <p className="mt-3 text-[13px] font-medium text-foreground">{t.title}</p>
              <p className="mt-1 text-[12px] leading-relaxed text-subtle">{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-14">
        <div className="mb-10 flex items-center justify-between lg:justify-end">
          <span className="lg:hidden">
            <BrandLogo />
          </span>
          <ThemeToggle />
        </div>

        <div className="mx-auto w-full max-w-[380px]">
          <h2 className="text-[28px] leading-tight">Welcome back</h2>
          <p className="mt-2 text-[13.5px] text-muted-foreground">
            Sign in to your intelligence workspace.
          </p>

          <form onSubmit={submit} className="mt-9 space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="label-caps mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(error)}
                className="control-base w-full px-3.5 outline-none focus:border-gold"
              />
            </div>

            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <label htmlFor="password" className="label-caps">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11.5px] text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(error)}
                  className="control-base w-full px-3.5 pr-11 outline-none focus:border-gold"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="size-4 rounded-[5px] border border-border-strong bg-surface-elevated accent-[var(--gold)]"
              />
              Remember me for 30 days
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-[12px] border px-3.5 py-2.5 text-[12.5px]"
                style={{
                  color: "var(--negative)",
                  borderColor: "color-mix(in srgb, var(--negative) 35%, transparent)",
                  background: "color-mix(in srgb, var(--negative) 8%, transparent)",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !valid}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-[14px] text-[13.5px] font-medium transition-opacity hover:opacity-90 disabled:opacity-45"
              style={{ background: "var(--gold)", color: "var(--gold-foreground)" }}
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Signing in…" : "Sign In"}
            </button>

            <div className="flex items-center gap-3 py-1">
              <span aria-hidden className="h-px flex-1 bg-border" />
              <span className="text-[11px] tracking-[0.1em] text-subtle uppercase">or</span>
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>

            <button
              type="button"
              className="control-base flex w-full items-center justify-center gap-2.5 !h-11 font-medium"
            >
              <KeyRound className="size-4 text-muted-foreground" />
              Continue with Microsoft
            </button>
          </form>

          <div className="mt-8 rounded-[14px] border border-border bg-surface p-4">
            <p className="label-caps mb-2">Demo access</p>
            <p className="num text-[12.5px] text-muted-foreground">demo@marinkai.com · demo</p>
          </div>
        </div>
      </section>
    </div>
  );
}
