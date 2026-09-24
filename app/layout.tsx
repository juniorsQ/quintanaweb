import type { Metadata, Viewport } from "next";
import { Orbitron, Share_Tech_Mono, VT323 } from "next/font/google";
import "./globals.css";
import {
  LOGO_URL,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  jsonLd,
} from "@/lib/seo";
import { I18nProvider } from "@/app/components/i18n-provider";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "700", "800"],
});

const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-share-tech",
  weight: "400",
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
});

export const viewport: Viewport = {
  themeColor: "#04140c",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "QuintanaDev",
    "Juniors Quintana",
    "desarrollador fullstack",
    "desarrollador mobile",
    "Flutter",
    "Dart",
    "Next.js",
    "Supabase",
    "Firebase",
    "apps Android",
    "TypeScript",
    "software Venezuela",
    "TerraLiam",
    "App MiDoc",
  ],
  authors: [{ name: "Juniors Quintana", url: SITE_URL }],
  creator: "Juniors Quintana",
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-VE": SITE_URL,
      es: SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon-48.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "QuintanaDev — desarrollador fullstack y mobile senior",
      },
      {
        url: LOGO_URL,
        width: 368,
        height: 292,
        alt: "Logo QuintanaDev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  other: {
    "og:logo": LOGO_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-VE">
      <body
        className={`${orbitron.variable} ${shareTech.variable} ${vt323.variable} font-mono antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
