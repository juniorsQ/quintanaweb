"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/config";

function HtmlLangSync() {
  const { i18n: i18nInstance } = useTranslation();
  useEffect(() => {
    const lang = i18nInstance.resolvedLanguage || i18nInstance.language || "es";
    document.documentElement.lang = lang.startsWith("pt")
      ? "pt"
      : lang.startsWith("en")
        ? "en"
        : "es-VE";
  }, [i18nInstance.language, i18nInstance.resolvedLanguage]);
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <HtmlLangSync />
      {children}
    </I18nextProvider>
  );
}
