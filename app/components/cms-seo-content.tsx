"use client";

import { useEffect, useState } from "react";
import { fetchPortfolioData } from "@/lib/portfolio";
import type { Faq, Service } from "@/lib/types";
import { SeoContent } from "@/app/components/seo-content";

export function CmsSeoContent() {
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    let alive = true;
    fetchPortfolioData()
      .then((data) => {
        if (!alive) return;
        setServices(data.services);
        setFaqs(data.faqs);
      })
      .catch(() => {
        // Fallbacks in SeoContent cover a failed uplink.
      });
    return () => {
      alive = false;
    };
  }, []);

  return <SeoContent faqs={faqs} services={services} />;
}
