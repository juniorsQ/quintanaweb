"use client";

import { useTranslation } from "react-i18next";
import type { Project } from "@/lib/types";
import { DEFAULT_PROJECTS } from "@/lib/seo";
import { SectionFrame } from "@/app/components/section-frame";

type Props = { items: Project[] };

export function ProjectsSection({ items }: Props) {
  const { t } = useTranslation();
  const projects = items.length > 0 ? items : [...DEFAULT_PROJECTS];

  return (
    <SectionFrame
      id="projects"
      code="MOD-06"
      title={t("sections.projects")}
      subtitle={t("sections.projectsSub")}
    >
      {projects.length === 0 ? (
        <p className="font-mono text-sm text-phosphor-dim">
          {t("sections.projectsEmpty")}
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const techs = project.technologies
              .split(",")
              .map((tech) => tech.trim())
              .filter(Boolean);

            return (
              <li
                key={project.id}
                className="panel overflow-hidden transition hover:border-phosphor/45"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-crt-border bg-crt-raised">
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-pixel text-3xl text-phosphor-dim">
                      NO IMG
                    </div>
                  )}
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold tracking-wide text-phosphor">
                      {project.title}
                    </h3>
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-cyan-telemetry hover:underline"
                      >
                        OPEN
                      </a>
                    )}
                  </div>
                  <p className="font-mono text-sm leading-6 text-[#9ad4b0]">
                    {project.summary}
                  </p>
                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="border border-phosphor/30 bg-phosphor-mute px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-phosphor"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </SectionFrame>
  );
}
