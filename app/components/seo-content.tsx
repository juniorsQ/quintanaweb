"use client";

import { useTranslation } from "react-i18next";
import { FAQS, SERVICES, faqJsonLd } from "@/lib/seo";
import type { Faq, Service } from "@/lib/types";
import { SectionFrame } from "@/app/components/section-frame";
import { localizeFaq, localizeService } from "@/lib/i18n/cms";

type Props = {
  faqs?: Faq[];
  services?: Service[];
};

export function SeoContent({ faqs = [], services = [] }: Props = {}) {
  const { t } = useTranslation();

  const serviceItems = (
    services.length
      ? services.map((item) => ({ title: item.title, text: item.description }))
      : SERVICES.map((item) => ({ title: item.title, text: item.text }))
  ).map((item) => localizeService(item.title, item.text, t));

  const faqItems = (
    faqs.length
      ? faqs.map((item) => ({ question: item.question, answer: item.answer }))
      : FAQS.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))
  ).map((item) => localizeFaq(item.question, item.answer, t));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqItems)) }}
      />
      <SectionFrame
        id="servicios"
        code="MOD-SVC"
        title={t("services.sectionTitle")}
        subtitle={t("services.sectionSubtitle")}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {serviceItems.map((service) => (
            <article
              key={service.title}
              className="panel px-4 py-4 transition hover:border-phosphor/50"
            >
              <h3 className="font-display text-lg font-bold tracking-wide text-phosphor">
                {service.title}
              </h3>
              <p className="mt-3 font-mono text-sm leading-6 text-[#9ad4b0]">
                {service.text}
              </p>
            </article>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame
        id="faq"
        code="MOD-FAQ"
        title={t("faq.sectionTitle")}
        subtitle={t("faq.sectionSubtitle")}
      >
        <dl className="space-y-5">
          {faqItems.map((item) => (
            <div key={item.question} className="panel px-4 py-4">
              <dt>
                <h3 className="font-display text-base font-bold tracking-wide text-phosphor">
                  {item.question}
                </h3>
              </dt>
              <dd className="mt-2 font-mono text-sm leading-6 text-[#9ad4b0]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </SectionFrame>
    </>
  );
}
