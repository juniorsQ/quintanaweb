import type { SiteProfile, SocialLink } from "@/lib/types";

type Props = {
  profile: SiteProfile | null;
  socialLinks: SocialLink[];
};

export function Hero({ profile, socialLinks }: Props) {
  const first = profile?.first_name ?? "Juniors";
  const last = profile?.last_name ?? "Quintana";
  const tagline =
    profile?.tagline ?? "FULLSTACK // PAYMENT SYSTEMS // MISSION CONTROL";

  return (
    <section
      id="about"
      className="relative mb-16 min-h-[calc(100vh-5.5rem)] scroll-mt-24 overflow-hidden"
    >
      <div className="flex min-h-[calc(100vh-5.5rem)] flex-col justify-center py-8 md:max-w-[58%]">
        <p className="signal-label mb-4 animate-fade-up">
          STATION ID · QDV-01 · UPLINK ACTIVE
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
          {profile?.bio}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:280ms]">
          <a href="#experience" className="btn-crt">
            VER TELEMETRÍA
          </a>
          {profile?.email && (
            <a href={`mailto:${profile.email}`} className="btn-amber">
              CONTACTO
            </a>
          )}
        </div>

        <div className="mt-10 grid max-w-2xl gap-3 animate-fade-up font-mono text-xs text-phosphor-dim sm:grid-cols-3 [animation-delay:360ms]">
          <MetaCell label="LOC" value={profile?.location ?? "—"} />
          <MetaCell label="COMMS" value={profile?.phone ?? "—"} />
          <MetaCell label="MAIL" value={profile?.email ?? "—"} />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 animate-fade-up [animation-delay:420ms]">
          {socialLinks.map((link) => (
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
