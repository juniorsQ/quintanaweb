import type { Certification } from "@/lib/types";
import { SectionFrame } from "@/app/components/section-frame";

type Props = { items: Certification[] };

export function CertificationsSection({ items }: Props) {
  return (
    <SectionFrame
      id="awards"
      code="MOD-05"
      title="CURSOS & CERTIFICACIONES"
      subtitle="Clearance badges · completed missions"
    >
      <ul className="grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="panel flex gap-3 p-4 transition hover:border-amber-signal/40"
          >
            <span className="font-pixel text-2xl leading-none text-amber-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-mono text-sm text-phosphor">{item.title}</p>
              {item.issuer && (
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-phosphor-dim">
                  {item.issuer}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
