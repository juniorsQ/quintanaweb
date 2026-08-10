import type { Experience } from "@/lib/types";
import { SectionFrame } from "@/app/components/section-frame";

type Props = { items: Experience[] };

export function ExperienceSection({ items }: Props) {
  return (
    <SectionFrame
      id="experience"
      code="MOD-02"
      title="EXPERIENCIA LABORAL"
      subtitle="Flight log · employment telemetry"
    >
      <div className="space-y-6">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="panel relative overflow-hidden p-5 transition hover:border-phosphor/40 hover:shadow-phosphor"
          >
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="signal-label mb-1">
                  LOG #{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-lg font-bold tracking-wide text-phosphor md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-amber-signal">
                  {item.company}
                </p>
              </div>
              <span className="border border-cyan-telemetry/30 bg-cyan-telemetry/5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-cyan-telemetry">
                {item.date_label}
              </span>
            </div>
            <p className="font-mono text-sm leading-7 text-[#9ad4b0]">
              {item.description}
            </p>
          </article>
        ))}
        {items.length === 0 && <EmptyState />}
      </div>
    </SectionFrame>
  );
}

function EmptyState() {
  return (
    <p className="font-mono text-sm text-phosphor-dim">
      {"// no flight logs found — update from backoffice"}
    </p>
  );
}
