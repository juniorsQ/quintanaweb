import { FAQS, SERVICES } from "@/lib/seo";

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

const PAYMENT_OFFER_RE =
  /\b(pos|iso\s*8583|emv|dukpt|3des|mtip|payment|pagos?|pasarela|adquirente|acquirer|card-present|terminal(?:es)? de pago|sistemas? de pago|software de pago|mensajer[ií]a financiera|asesor[ií]as?)\b/i;

type TFn = (key: string) => string;

export function isPaymentOfferCopy(...parts: Array<string | null | undefined>) {
  return parts.some((part) => Boolean(part && PAYMENT_OFFER_RE.test(part)));
}

/** Public bio never comes from CMS. */
export function localizeBio(_bio: string | null | undefined, t: TFn) {
  return t("content.bio");
}

/** Public tagline never comes from CMS. */
export function localizeTagline(
  _tagline: string | null | undefined,
  t: TFn
) {
  return t("content.tagline");
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
    if (isPaymentOfferCopy(question, answer)) {
      return { question: t("faq.q1"), answer: t("faq.a1") };
    }
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
