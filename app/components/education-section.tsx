import type { Education } from "@/lib/types";
import { SectionFrame } from "@/app/components/section-frame";

type Props = { items: Education[] };

export function EducationSection({ items }: Props) {
  return (
    <SectionFrame
      id="education"
      code="MOD-04"
      title="EDUCACIÓN"
      subtitle="Academy uplink · training archive"
    >
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 border-l-2 border-phosphor/40 bg-crt-raised/60 px-4 py-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="font-display text-base font-bold tracking-wide text-phosphor md:text-lg">
                {item.institution}
              </h3>
              <p className="mt-1 font-mono text-sm text-cyan-telemetry">
                {item.degree}
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-wider text-amber-signal">
              {item.date_label}
            </span>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
