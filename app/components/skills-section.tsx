"use client";

import { useTranslation } from "react-i18next";
import type { Skill, WorkflowItem } from "@/lib/types";
import { SectionFrame } from "@/app/components/section-frame";
import { localizeWorkflow } from "@/lib/i18n/cms";

type Props = {
  skills: Skill[];
  workflow: WorkflowItem[];
};

export function SkillsSection({ skills, workflow }: Props) {
  const { t } = useTranslation();
  return (
    <SectionFrame
      id="skills"
      code="MOD-03"
      title={t("sections.skills")}
      subtitle={t("sections.skillsSub")}
    >
      <p className="signal-label mb-4">{t("sections.languages")}</p>
      <ul className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="panel flex items-center gap-3 px-3 py-3 transition hover:border-phosphor/50 hover:shadow-phosphor"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-phosphor/30 bg-phosphor-mute font-pixel text-lg text-phosphor">
              {skill.name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <p className="font-mono text-sm text-phosphor">{skill.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-phosphor-dim">
                {skill.icon}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="signal-label mb-4">{t("sections.workflow")}</p>
      <ul className="space-y-2">
        {workflow.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-3 font-mono text-sm text-[#9ad4b0]"
          >
            <span className="mt-0.5 text-amber-signal">▶</span>
            {localizeWorkflow(item.label, t)}
          </li>
        ))}
      </ul>
    </SectionFrame>
  );
}
