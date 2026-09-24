import type { Metadata } from "next";
import { ServiciosView } from "@/app/servicios/servicios-view";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Servicios de software senior",
  description:
    "Apps móviles, web, CMS y productos digitales a producción. QuintanaDev — Juniors Quintana. Caracas, Venezuela.",
  alternates: {
    canonical: `${SITE_URL}/servicios/`,
  },
  openGraph: {
    url: `${SITE_URL}/servicios/`,
    title: `Servicios de software senior | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
};

export default function ServiciosPage() {
  return <ServiciosView />;
}
