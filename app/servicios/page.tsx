import type { Metadata } from "next";
import { ServiciosView } from "@/app/servicios/servicios-view";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios fullstack y mobile senior",
  description:
    "Servicios QuintanaDev: apps Flutter, desarrollo fullstack, APIs, webs y productos digitales de punta a punta en Venezuela.",
  alternates: {
    canonical: `${SITE_URL}/servicios/`,
  },
  openGraph: {
    url: `${SITE_URL}/servicios/`,
    title: `Servicios fullstack y mobile | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

export default function ServiciosPage() {
  return <ServiciosView />;
}
