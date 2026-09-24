"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SiteProfile, SocialLink } from "@/lib/types";
import { UPLINK_PATH, withBase } from "@/lib/paths";
import { LanguageSwitcher } from "@/app/components/language-switcher";

type Props = {
  profile: SiteProfile | null;
  socialLinks: SocialLink[];
  children: React.ReactNode;
};

export function SiteShell({ profile, socialLinks, children }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "America/Caracas",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const brand = profile
    ? `${profile.last_name}${profile.first_name}`.toUpperCase()
    : "QUINTANADEV";

  const nav = [
    { href: "/#about", label: t("nav.about") },
    { href: "/servicios/", label: t("nav.services") },
    { href: "/#faq", label: t("nav.faq") },
    { href: "/#projects", label: t("nav.projects") },
    { href: "/#experience", label: t("nav.experience") },
    { href: "/#skills", label: t("nav.skills") },
    { href: "/#contacto", label: t("nav.contact") },
  ];

  return (
    <div className="crt-shell min-h-screen">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px animate-boot-line bg-gradient-to-r from-transparent via-phosphor to-transparent" />

      <header className="sticky top-0 z-40 border-b border-crt-border bg-crt-bg/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-8 lg:px-12">
          <a href={withBase("/")} className="group flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase("/logo.png")}
              alt="QuintanaDev"
              width={40}
              height={40}
              className="h-9 w-9 object-contain md:h-10 md:w-10"
            />
            <div>
              <p className="font-display text-sm font-bold tracking-[0.18em] text-phosphor md:text-base">
                QUINTANA<span className="text-amber-signal">DEV</span>
              </p>
              <p className="hidden font-mono text-[10px] tracking-[0.3em] text-phosphor-dim sm:block">
                SYS //{brand.slice(0, 12)}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={withBase(item.href)}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
            <a
              href={withBase(UPLINK_PATH)}
              className="ml-1 inline-flex h-3 w-3 items-center justify-center rounded-sm border border-phosphor/20 bg-phosphor-mute opacity-40 transition hover:opacity-100 hover:shadow-phosphor"
              title="sys.chk"
              aria-label="sys"
            >
              <span className="h-1 w-1 bg-phosphor/70" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="hidden text-right sm:block">
              <p className="signal-label">UTC-4 // CCS</p>
              <p className="font-pixel text-lg leading-none text-cyan-telemetry">
                {clock}
              </p>
            </div>
            <button
              type="button"
              className="btn-crt lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle navigation"
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-crt-border bg-crt-panel px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={withBase(item.href)}
                  className="nav-link"
                  onClick={() => setOpen(false)}
                >
                  ▸ {item.label}
                </a>
              ))}
              <a
                href={withBase(UPLINK_PATH)}
                className="nav-link text-[10px] text-phosphor-dim/50"
                onClick={() => setOpen(false)}
              >
                ▸ sys.chk
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative mx-auto w-full max-w-[1600px] px-4 pb-20 pt-6 md:px-8 md:pt-10 lg:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-40" />
        {children}
      </main>

      <footer className="border-t border-crt-border bg-crt-panel/80">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-6 font-mono text-[11px] text-phosphor-dim md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
          <p className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase("/logo.png")}
              alt="QuintanaDev"
              width={18}
              height={18}
              className="h-4 w-4 object-contain"
            />
            © {new Date().getFullYear()} QUINTANADEV · {t("footer")}
            <span className="ml-2 inline-block h-2 w-2 animate-pulse bg-phosphor align-middle shadow-phosphor" />
          </p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-phosphor"
              >
                {link.platform.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
