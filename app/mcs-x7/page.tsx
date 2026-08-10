"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import {
  createClientBrowser,
  getSupabasePublicConfig,
} from "@/lib/supabase/client";
import { fetchAdminData } from "@/lib/portfolio";
import { withBase } from "@/lib/paths";
import { UplinkDashboard } from "@/app/mcs-x7/uplink-dashboard";
import type { PortfolioData } from "@/lib/types";

type SessionState = "loading" | "guest" | "authed" | "config_error";

export default function UplinkPage() {
  const [session, setSession] = useState<SessionState>("loading");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const reload = useCallback(async () => {
    const next = await fetchAdminData();
    setData(next);
  }, []);

  useEffect(() => {
    let alive = true;
    let subscription: { unsubscribe: () => void } | null = null;

    const boot = async () => {
      try {
        if (!getSupabasePublicConfig().ok) {
          if (alive) {
            setError("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
            setSession("config_error");
          }
          return;
        }

        const supabase = createClientBrowser();
        const {
          data: { session: s },
        } = await supabase.auth.getSession();
        if (!alive) return;

        if (s?.user) {
          setSession("authed");
          try {
            await reload();
          } catch {
            if (alive) setError("Failed to load payload");
          }
        } else {
          setSession("guest");
        }

        const { data: auth } = supabase.auth.onAuthStateChange((event, next) => {
          // Avoid TOKEN_REFRESHED reloads — they remount forms and block editing.
          if (event === "SIGNED_OUT") {
            setSession("guest");
            setData(null);
            return;
          }
          if (event === "SIGNED_IN" && next?.user) {
            setSession("authed");
            reload().catch(() => setError("Failed to load payload"));
          }
        });
        subscription = auth.subscription;
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Uplink handshake failed");
        setSession("config_error");
      }
    };

    void boot();

    return () => {
      alive = false;
      subscription?.unsubscribe();
    };
  }, [reload]);

  if (session === "loading") {
    return (
      <div className="min-h-screen bg-crt-bg flex items-center justify-center">
        <p className="font-pixel text-2xl text-phosphor">HANDSHAKE...</p>
      </div>
    );
  }

  if (session === "config_error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-crt-bg px-4">
        <div className="panel w-full max-w-md overflow-hidden">
          <div className="panel-header">
            <span>CHANNEL · MCS-X7</span>
            <span className="text-amber-signal">FAULT</span>
          </div>
          <div className="space-y-4 p-6">
            <p className="font-mono text-sm text-amber-signal">
              SIGNAL LOSS :: {error ?? "config fault"}
            </p>
            <a href={withBase("/")} className="nav-link inline-block">
              ← ABORT
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (session === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-crt-bg px-4">
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
      <div className="flex min-h-screen items-center justify-center bg-crt-bg">
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
