"use client";

import { useEffect, useState, useTransition } from "react";
import { createClientBrowser } from "@/lib/supabase/client";
import { fetchAdminData } from "@/lib/portfolio";
import { withBase } from "@/lib/paths";
import { UplinkDashboard } from "@/app/mcs-x7/uplink-dashboard";
import type { PortfolioData } from "@/lib/types";

type SessionState = "loading" | "guest" | "authed";

export default function UplinkPage() {
  const [session, setSession] = useState<SessionState>("loading");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const reload = async () => {
    const next = await fetchAdminData();
    setData(next);
  };

  useEffect(() => {
    const supabase = createClientBrowser();
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (s?.user) {
        setSession("authed");
        reload().catch(() => setError("Failed to load payload"));
      } else {
        setSession("guest");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s?.user ? "authed" : "guest");
      if (s?.user) reload().catch(() => setError("Failed to load payload"));
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === "loading") {
    return (
      <div className="crt-shell flex min-h-screen items-center justify-center">
        <p className="font-pixel text-2xl text-phosphor">
          HANDSHAKE
          <span className="ml-1 inline-block h-5 w-2 animate-blink bg-phosphor align-middle" />
        </p>
      </div>
    );
  }

  if (session === "guest") {
    return (
      <div className="crt-shell flex min-h-screen items-center justify-center px-4">
        <div className="panel w-full max-w-md overflow-hidden">
          <div className="panel-header">
            <span>CHANNEL · MCS-X7</span>
            <span className="text-amber-signal">LOCKED</span>
          </div>
          <div className="space-y-6 p-6">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-widest text-phosphor">
                UPLINK
              </h1>
              <p className="mt-2 font-mono text-xs text-phosphor-dim">
                Restricted telemetry channel.
              </p>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const email = String(fd.get("email") ?? "");
                const password = String(fd.get("password") ?? "");
                setError(null);
                startTransition(async () => {
                  const supabase = createClientBrowser();
                  const { error: authError } =
                    await supabase.auth.signInWithPassword({ email, password });
                  if (authError) setError(authError.message);
                });
              }}
            >
              <div>
                <label className="signal-label mb-2 block" htmlFor="email">
                  CALLSIGN
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-crt"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="signal-label mb-2 block" htmlFor="password">
                  CIPHER
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input-crt"
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <p className="border border-amber-signal/40 bg-amber-signal/10 px-3 py-2 font-mono text-xs text-amber-signal">
                  DENIED :: {error}
                </p>
              )}
              <button type="submit" className="btn-crt w-full" disabled={pending}>
                {pending ? "SYNC..." : "OPEN CHANNEL"}
              </button>
            </form>
            <a href={withBase("/")} className="nav-link inline-block">
              ← ABORT
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="crt-shell flex min-h-screen items-center justify-center">
        <p className="font-mono text-sm text-phosphor-dim">Loading payload...</p>
      </div>
    );
  }

  return (
    <UplinkDashboard
      data={data}
      onRefresh={reload}
      onLogout={async () => {
        await createClientBrowser().auth.signOut();
        setSession("guest");
        setData(null);
      }}
    />
  );
}
