"use client";

import { useTranslation } from "react-i18next";
import { LOCALES, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "es").slice(
    0,
    2
  ) as Locale;

  return (
    <div
      className="flex items-center gap-1"
      role="group"
      aria-label={t("lang.label")}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => {
            void i18n.changeLanguage(code);
          }}
          aria-pressed={current === code}
          title={t(`lang.${code}`)}
          className={`border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest transition ${
            current === code
              ? "border-phosphor bg-phosphor/10 text-phosphor"
              : "border-crt-border text-phosphor-dim hover:border-phosphor/40 hover:text-phosphor"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
