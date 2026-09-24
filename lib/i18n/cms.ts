import { DEFAULT_BIO, DEFAULT_TAGLINE, FAQS, SERVICES } from "@/lib/seo";

const SERVICE_KEYS: Record<string, "mobile" | "fullstack" | "product"> = {
  [SERVICES[0].title]: "mobile",
  [SERVICES[1].title]: "fullstack",
  [SERVICES[2].title]: "product",
};

const FAQ_KEYS: Record<string, "1" | "2" | "3"> = {
  [FAQS[0].question]: "1",
  [FAQS[1].question]: "2",
  [FAQS[2].question]: "3",
};

const WORKFLOW_KEYS: Record<string, string> = {
  "Diseño responsivo": "responsive",
  "Pruebas y depuración entre navegadores": "testing",
  "Equipos multifuncionales": "teams",
  "Desarrollo ágil y Scrum": "agile",
};

const LEGACY_PAYMENT_MARKERS = [
  "ISO8583",
  "terminales de pago",
  "payment-terminal",
  "PAYMENT SYSTEMS",
  "sistemas de pago EMV",
  "kernels EMV",
];

type TFn = (key: string) => string;

function looksLikeLegacyPaymentCopy(text: string) {
  return LEGACY_PAYMENT_MARKERS.some((marker) => text.includes(marker));
}

export function localizeBio(bio: string | null | undefined, t: TFn) {
  if (!bio || bio === DEFAULT_BIO || looksLikeLegacyPaymentCopy(bio)) {
    return t("content.bio");
  }
  return bio;
}

export function localizeTagline(tagline: string | null | undefined, t: TFn) {
  if (
    !tagline ||
    tagline === DEFAULT_TAGLINE ||
    looksLikeLegacyPaymentCopy(tagline)
  ) {
    return t("content.tagline");
  }
  return tagline;
}

export function localizeService(
  title: string,
  text: string,
  t: TFn
): { title: string; text: string } {
  const key = SERVICE_KEYS[title];
  if (!key) return { title, text };
  return {
    title: t(`services.${key}Title`),
    text: t(`services.${key}Text`),
  };
}

export function localizeFaq(
  question: string,
  answer: string,
  t: TFn
): { question: string; answer: string } {
  const key = FAQ_KEYS[question];
  if (!key) {
    if (answer.includes("@gmail.com") || answer.includes("quintanajuniors")) {
      return { question, answer: t("faq.a3") };
    }
    return { question, answer };
  }
  return {
    question: t(`faq.q${key}`),
    answer: t(`faq.a${key}`),
  };
}

export function localizeWorkflow(label: string, t: TFn) {
  const key = WORKFLOW_KEYS[label];
  return key ? t(`workflow.${key}`) : label;
}
