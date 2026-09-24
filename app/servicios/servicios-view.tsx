"use client";

import { useTranslation } from "react-i18next";
import { SiteShell } from "@/app/components/site-shell";
import { CmsSeoContent } from "@/app/components/cms-seo-content";
import { ContactForm } from "@/app/components/contact-form";
import { localizeBio } from "@/lib/i18n/cms";

export function ServiciosView() {
  const { t } = useTranslation();

  return (
    <SiteShell profile={null} socialLinks={[]}>
      <section className="mb-12 max-w-3xl">
        <p className="signal-label mb-4">{t("services.pageKicker")}</p>
        <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-phosphor md:text-6xl">
          {t("services.pageTitle")}
        </h1>
        <p className="mt-6 font-mono text-sm leading-7 text-[#9ad4b0] md:text-base">
          {localizeBio(null, t)}
        </p>
      </section>
      <CmsSeoContent />
      <ContactForm />
    </SiteShell>
  );
}
