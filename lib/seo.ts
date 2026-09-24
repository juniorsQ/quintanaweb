export const SITE_URL = "https://quintanadev.us";
export const OG_HOST = "https://og.quintanadev.us";
export const SITE_NAME = "QuintanaDev";
export const SITE_TITLE =
  "QuintanaDev | Desarrollador Mobile Senior — apps, web y CMS";
export const SITE_DESCRIPTION =
  "QuintanaDev — Juniors Quintana. Desarrollo mobile senior: apps iOS/Android 100% funcionales con su web oficial, CMS y backoffice. Productos: TerraLiam y App MiDoc.";

export const OG_IMAGE = `${OG_HOST}/og.jpg`;
export const LOGO_URL = `${SITE_URL}/logo.png`;
export const LOGO_ICON_URL = `${SITE_URL}/icon-512.png`;
export const WALLPAPER_URL = `${OG_HOST}/wallpaper.jpg`;
export const LOGO_WIDTH = 368;
export const LOGO_HEIGHT = 292;

export const DEFAULT_FIRST_NAME = "Juniors";
export const DEFAULT_LAST_NAME = "Quintana";
export const DEFAULT_LOCATION = "Caracas, Venezuela";
export const DEFAULT_EMAIL = "quintanajuniors@gmail.com";
export const DEFAULT_TAGLINE =
  "MOBILE SENIOR // APPS COMPLETAS // WEB + CMS";
export const DEFAULT_BIO =
  "Desarrollador mobile senior. Diseño y entrego aplicaciones móviles 100% funcionales (iOS y Android) con su web oficial, CMS y backoffice. Productos propios: TerraLiam y App MiDoc. Stack: Flutter/Dart, TypeScript, Next.js/Vue, Supabase, Firebase, mapas, cámara, auth, notificaciones e IA aplicada.";

export const SOCIAL_PROFILES = ["https://github.com/juniorsQ"] as const;

export const SERVICES = [
  {
    title: "Apps móviles 100% funcionales",
    text: "Aplicaciones iOS/Android con Flutter: mapas, cámara, autenticación, notificaciones, multimedia y publicación en Play Store / App Store. Arquitectura limpia y UX lista para producción.",
  },
  {
    title: "Web oficial + CMS / backoffice",
    text: "La web del producto y el panel para operarlo: usuarios, contenidos, métricas, roles y publicación. Next.js/Vue, Supabase/Firebase, auth y storage.",
  },
  {
    title: "Sistema completo de punta a punta",
    text: "App + web + backend + CMS. Del concepto al release: discovery, UI, APIs, privacidad, CI/CD y tiendas. Un senior que cierra el ciclo sin fragmentar el equipo.",
  },
] as const;

export const FAQS = [
  {
    question: "¿Qué es QuintanaDev?",
    answer:
      "QuintanaDev es el estudio de software de Juniors Quintana en Caracas, Venezuela. Desarrollo mobile senior: apps iOS/Android 100% funcionales con su web oficial, CMS y backoffice.",
  },
  {
    question: "¿Qué tipo de productos construyes?",
    answer:
      "Sistemas completos. TerraLiam: juego familiar con mapas, cámara e IA, web oficial y panel Ops. App MiDoc: gestión clínica móvil para pacientes, médicos y administradores, con su web. También landings y CMS a medida.",
  },
  {
    question: "¿Cómo contactar a QuintanaDev?",
    answer:
      "Usa el formulario de contacto en esta página. El equipo opera en horario UTC-4 (Caracas).",
  },
] as const;

export const DEFAULT_PROJECTS = [
  {
    id: "default-terraliam",
    title: "TerraLiam",
    summary:
      "Juego familiar al aire libre: mapas, cámara, brújula, coleccionables, mini-juegos y premios de video con IA. Stack Flutter + Supabase + web oficial + Ops.",
    image_url: "https://terraliam.vercel.app/og-image.svg",
    technologies:
      "Flutter, Dart, Supabase, Edge Functions, Google Maps, Vue, IA",
    project_url: "https://terraliam.vercel.app",
    sort_order: 1,
    is_visible: true,
  },
  {
    id: "default-midoc",
    title: "App MiDoc",
    summary:
      "Ecosistema médico móvil: pacientes, médicos y administradores. Citas, historias clínicas, roles seguros y sincronización en tiempo real.",
    image_url: "",
    technologies: "Flutter, Firebase, Auth, Notificaciones, iOS, Android",
    project_url: "https://appmidoc.vercel.app",
    sort_order: 2,
    is_visible: true,
  },
] as const;

export function faqJsonLd(
  items: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Quintana Dev",
      legalName: "QuintanaDev",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: LOGO_URL,
        contentUrl: LOGO_URL,
        width: LOGO_WIDTH,
        height: LOGO_HEIGHT,
        caption: "Logo QuintanaDev",
        encodingFormat: "image/png",
      },
      image: [LOGO_URL, OG_IMAGE],
      sameAs: [...SOCIAL_PROFILES],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Caracas",
        addressCountry: "VE",
      },
      areaServed: { "@type": "Country", name: "Venezuela" },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Juniors Quintana",
      jobTitle: "Desarrollador Mobile Senior",
      url: SITE_URL,
      worksFor: { "@id": `${SITE_URL}/#organization` },
      image: LOGO_URL,
      sameAs: [...SOCIAL_PROFILES],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Caracas",
        addressCountry: "VE",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: SITE_NAME,
      url: SITE_URL,
      image: LOGO_URL,
      logo: { "@id": `${SITE_URL}/#logo` },
      description: SITE_DESCRIPTION,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: "VE",
      serviceType: [
        "Desarrollo mobile Flutter",
        "Apps Android e iOS",
        "Web oficial y CMS",
        "Backoffice y APIs",
        "Productos digitales completos",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "Quintana Dev",
      description: SITE_DESCRIPTION,
      inLanguage: "es-VE",
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: LOGO_URL,
    },
  ],
};
