import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono, VT323 } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "QuintanaDev — Mission Control",
  description:
    "QuintanaDev — Juniors Quintana — Desarrollador Fullstack · POS · Flutter · ISO8583 · EMV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${orbitron.variable} ${shareTech.variable} ${vt323.variable} font-mono antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
