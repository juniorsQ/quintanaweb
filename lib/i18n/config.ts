import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import es from "@/lib/i18n/locales/es.json";
import en from "@/lib/i18n/locales/en.json";
import pt from "@/lib/i18n/locales/pt.json";

export const LOCALES = ["es", "en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

const SPANISH_TZ =
  /America\/(Argentina|Bogota|Caracas|Mexico|Lima|Santiago|Havana|Guayaquil|La_Paz|Asuncion|Montevideo|Panama|Costa_Rica|Guatemala|El_Salvador|Managua|Tegucigalpa|Santo_Domingo|Puerto_Rico)|Europe\/Madrid|Africa\/Ceuta|Atlantic\/Canary/;
const PORTUGUESE_TZ =
  /America\/(Sao_Paulo|Fortaleza|Recife|Bahia|Belem|Manaus|Cuiaba|Noronha)|Europe\/Lisbon|Atlantic\/(Azores|Madeira)/;

export function localeFromRegion(): Locale {
  if (typeof navigator !== "undefined") {
    const stack = [...(navigator.languages ?? []), navigator.language].filter(
      Boolean
    );
    for (const raw of stack) {
      const code = raw.toLowerCase();
      if (code.startsWith("es")) return "es";
      if (code.startsWith("pt")) return "pt";
      if (code.startsWith("en")) return "en";
    }
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (PORTUGUESE_TZ.test(tz)) return "pt";
    if (SPANISH_TZ.test(tz)) return "es";
  } catch {
    /* ignore */
  }
  return "es";
}

const regionDetector = {
  name: "region",
  lookup() {
    return localeFromRegion();
  },
};

const detector = new LanguageDetector();
detector.addDetector(regionDetector);

if (!i18n.isInitialized) {
  void i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources: {
        es: { translation: es },
        en: { translation: en },
        pt: { translation: pt },
      },
      fallbackLng: "es",
      supportedLngs: [...LOCALES],
      nonExplicitSupportedLngs: true,
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "region", "navigator"],
        lookupLocalStorage: "qd-lang",
        caches: ["localStorage"],
      },
    });
}

export default i18n;
