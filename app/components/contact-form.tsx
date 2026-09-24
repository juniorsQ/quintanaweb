"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { createClientBrowser } from "@/lib/supabase/client";
import { SectionFrame } from "@/app/components/section-frame";

export function ContactForm() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"ok" | "error" | "required" | null>(
    null
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim()) {
      setStatus("ok");
      return;
    }
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("required");
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const supabase = createClientBrowser();
      const { error } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        locale: (i18n.resolvedLanguage || i18n.language || "es").slice(0, 2),
      });
      if (error) throw error;
      setName("");
      setEmail("");
      setMessage("");
      setStatus("ok");
    } catch {
      setStatus("error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SectionFrame
      id="contacto"
      code="MOD-COM"
      title={t("contact.title")}
      subtitle={t("contact.subtitle")}
    >
      <p className="mb-5 max-w-2xl font-mono text-sm leading-6 text-[#9ad4b0]">
        {t("contact.intro")}
      </p>
      <form className="grid max-w-2xl gap-4" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="company">
          company
        </label>
        <input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <div>
          <label className="signal-label mb-1 block" htmlFor="contact-name">
            {t("contact.name")}
          </label>
          <input
            id="contact-name"
            className="input-crt"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signal-label mb-1 block" htmlFor="contact-email">
            {t("contact.email")}
          </label>
          <input
            id="contact-email"
            type="email"
            className="input-crt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="signal-label mb-1 block" htmlFor="contact-message">
            {t("contact.message")}
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className="input-crt"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        {status === "ok" && (
          <p className="font-mono text-xs text-phosphor">{t("contact.ok")}</p>
        )}
        {status === "error" && (
          <p className="font-mono text-xs text-amber-signal">
            {t("contact.error")}
          </p>
        )}
        {status === "required" && (
          <p className="font-mono text-xs text-amber-signal">
            {t("contact.required")}
          </p>
        )}
        <div>
          <button type="submit" className="btn-crt" disabled={busy}>
            {busy ? t("contact.sending") : t("contact.send")}
          </button>
        </div>
      </form>
    </SectionFrame>
  );
}
