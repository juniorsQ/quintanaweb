export const SITE_URL = "https://quintanadev.us";
export const OG_HOST = "https://og.quintanadev.us";
export const SITE_NAME = "QuintanaDev";
export const SITE_TITLE =
  "QuintanaDev | Juniors Quintana — Software senior y productos digitales";
export const SITE_DESCRIPTION =
  "Juniors Quintana, ingeniero de software senior en Caracas. Trayectoria en sistemas de pagos de alta exigencia y productos propios en producción: TerraLiam y App MiDoc.";

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
  "SOFTWARE SENIOR // SISTEMAS DE ALTA EXIGENCIA // PRODUCTOS EN PRODUCCIÓN";
export const DEFAULT_BIO =
  "Más de ocho años construyendo software en entornos de alta exigencia. Mi experiencia plena está en el mundo de los pagos: aplicativos para terminales POS, mensajería financiera ISO8583, criptografía y productos Android de misión crítica. Esa misma disciplina —arquitectura, seguridad, trazabilidad y salida a producción— la aplico como experto en cualquier tipo de aplicación. Lo demuestran productos propios en producción: TerraLiam, un juego familiar al aire libre con mapas, cámara e IA, web oficial y panel de operación; y App MiDoc, una plataforma clínica móvil para pacientes, médicos y administradores. Flutter, Dart, TypeScript, Next.js, Vue, Supabase y Firebase.";

export const SOCIAL_PROFILES = [
  "https://github.com/juniorsQ",
  "https://www.linkedin.com/in/juniors-quintana-11a90a182",
] as const;

export const SERVICES = [
  {
    title: "Aplicaciones móviles a producción",
    text: "Apps iOS y Android con Flutter: mapas, cámara, autenticación, notificaciones, multimedia y publicación en tiendas. El mismo rigor de un sistema de misión crítica, aplicado a tu producto.",
  },
  {
    title: "Web, CMS y backoffice",
    text: "Sitio oficial y panel para operar el producto: usuarios, contenidos, roles, métricas y publicación. Next.js o Vue, con Supabase o Firebase.",
  },
  {
    title: "Producto digital completo",
    text: "App + web + backend. Del concepto al release: arquitectura, UI, APIs, privacidad, CI/CD y operación real. TerraLiam y App MiDoc son el estándar que aplico.",
  },
] as const;

export const FAQS = [
  {
    question: "¿Qué es QuintanaDev?",
    answer:
      "QuintanaDev es el estudio de Juniors Quintana, ingeniero de software senior en Caracas. Trayectoria en sistemas de pagos de alta exigencia y desarrollo de productos digitales propios.",
  },
  {
    question: "¿Qué tipo de software construyes?",
    answer:
      "Cualquier producto que requiera app, web y backoffice. TerraLiam y App MiDoc están en producción: un juego familiar con mapas e IA, y una plataforma clínica móvil para pacientes, médicos y administradores.",
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
      jobTitle: "Ingeniero de software senior",
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
        "Desarrollo de aplicaciones móviles",
        "Productos digitales fullstack",
        "Web y CMS",
        "Backoffice y APIs",
        "Software senior a producción",
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
