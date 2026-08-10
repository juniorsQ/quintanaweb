"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/portfolio";
import type { PortfolioData } from "@/lib/types";
import { SiteShell } from "@/app/components/site-shell";
import { Hero } from "@/app/components/hero";
import { ExperienceSection } from "@/app/components/experience-section";
import { SkillsSection } from "@/app/components/skills-section";
import { EducationSection } from "@/app/components/education-section";
import { CertificationsSection } from "@/app/components/certifications-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { PixelSpaceScene } from "@/app/components/pixel-space-scene";

const empty: PortfolioData = {
  profile: null,
  socialLinks: [],
  experiences: [],
  education: [],
  skills: [],
  workflowItems: [],
  certifications: [],
  projects: [],
};

export default function Home() {
  const [data, setData] = useState<PortfolioData>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchPortfolioData()
      .then((res) => {
        if (alive) setData(res);
      })
      .catch((err: Error) => {
        if (alive) setError(err.message || "Uplink failed");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <SiteShell profile={data.profile} socialLinks={data.socialLinks}>
      <div className="relative isolate min-h-[70vh]">
        <PixelSpaceScene />
        {loading && (
          <p className="relative z-10 mb-6 font-pixel text-2xl text-phosphor-dim">
            ESTABLISHING UPLINK
            <span className="ml-1 inline-block h-5 w-2 animate-blink bg-phosphor align-middle" />
          </p>
        )}
        {error && (
          <p className="relative z-10 mb-6 border border-amber-signal/40 bg-amber-signal/10 px-3 py-2 font-mono text-xs text-amber-signal">
            SIGNAL LOSS :: {error}
          </p>
        )}
        <div className="relative z-10">
          <Hero profile={data.profile} socialLinks={data.socialLinks} />
          <ProjectsSection items={data.projects} />
          <ExperienceSection items={data.experiences} />
          <SkillsSection skills={data.skills} workflow={data.workflowItems} />
          <EducationSection items={data.education} />
          <CertificationsSection items={data.certifications} />
        </div>
      </div>
    </SiteShell>
  );
}
