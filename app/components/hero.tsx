"use client";

import { useTranslation } from "react-i18next";
import type { SiteProfile, SocialLink } from "@/lib/types";
import {
  DEFAULT_FIRST_NAME,
  DEFAULT_LAST_NAME,
  SOCIAL_PROFILES,
} from "@/lib/seo";
import { localizeBio, localizeTagline } from "@/lib/i18n/cms";

type Props = {
  profile: SiteProfile | null;
  socialLinks: SocialLink[];
};

export function Hero({ profile, socialLinks }: Props) {
  const { t } = useTranslation();
  const first = profile?.first_name || DEFAULT_FIRST_NAME;
  const last = profile?.last_name || DEFAULT_LAST_NAME;
  const tagline = localizeTagline(profile?.tagline, t);
  const bio = localizeBio(profile?.bio, t);
  const location = profile?.location || t("content.location");

  return (
    <section
      id="about"
      className="relative mb-16 min-h-[calc(100vh-5.5rem)] scroll-mt-24 overflow-hidden"
    >
      <div className="flex min-h-[calc(100vh-5.5rem)] flex-col justify-center py-8 md:max-w-[58%]">
        <p className="signal-label mb-4 animate-fade-up">
          {t("hero.station")}
        </p>

        <h1 className="animate-fade-up font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-phosphor sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block text-phosphor-glow drop-shadow-[0_0_24px_rgba(61,255,122,0.35)]">
            QUINTANA
          </span>
          <span className="mt-1 block font-pixel text-6xl text-amber-signal sm:text-7xl md:text-8xl">
            {first.toUpperCase()}
          </span>
        </h1>

        <p className="mt-6 max-w-xl animate-fade-up font-mono text-sm leading-relaxed text-phosphor-dim md:text-base [animation-delay:120ms]">
          <span className="text-cyan-telemetry">{">_"}</span> {tagline}
        </p>

        <p className="mt-6 max-w-2xl animate-fade-up font-mono text-sm leading-7 text-[#9ad4b0] [animation-delay:200ms]">
          {bio}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:280ms]">
          <a href="#servicios" className="btn-crt">
            {t("hero.viewServices")}
          </a>
          <a href="#contacto" className="btn-amber">
            {t("hero.contact")}
          </a>
        </div>

        <div className="mt-10 grid max-w-2xl gap-3 animate-fade-up font-mono text-xs text-phosphor-dim sm:grid-cols-2 [animation-delay:360ms]">
          <MetaCell label={t("hero.loc")} value={location} />
          <MetaCell label={t("hero.comms")} value={profile?.phone || "UTC-4"} />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 animate-fade-up [animation-delay:420ms]">
          {(socialLinks.length
            ? socialLinks.map((link) => ({
                id: link.id,
                platform: link.platform,
                url: link.url,
              }))
            : SOCIAL_PROFILES.map((url) => ({
                id: url,
                platform: "github",
                url,
              }))
          ).map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-telemetry/80 underline-offset-4 hover:text-cyan-telemetry hover:underline"
            >
              [{link.platform}]
            </a>
          ))}
        </div>

        <p className="mt-12 font-pixel text-2xl text-phosphor-dim">
          {last.toUpperCase()}.{first.toUpperCase()}
          <span className="ml-1 inline-block h-5 w-2 animate-blink bg-phosphor align-middle" />
        </p>
      </div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel px-3 py-2">
      <p className="signal-label mb-1">{label}</p>
      <p className="truncate text-phosphor">{value}</p>
    </div>
  );
}
