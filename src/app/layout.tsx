import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "Logotipo de PLENAMENTE, Dra. Natalia Barriere",
};

// El favicon y los iconos se toman de src/app/favicon.ico, icon.png y apple-icon.png.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.doctor }],
  keywords: [
    "psiquiatra en El Salvador",
    "psiquiatría",
    "salud mental",
    "consulta psiquiátrica",
    "Dra. Natalia Barriere",
    "PLENAMENTE",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_SV",
    url: "/",
    siteName: `${site.name} — ${site.doctor}`,
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F4EF",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: `${site.name} — ${site.doctor}`,
  description: site.description,
  medicalSpecialty: "Psychiatric",
  url: site.url,
  image: `${site.url}/og.jpg`,
  areaServed: { "@type": "Country", name: "El Salvador" },
  telephone: `+${site.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Col. Campestre, Calle A No. 13-76, Ent. Av. Juan Ramón Molina",
    addressLocality: "San Salvador",
    addressCountry: "SV",
  },
  openingHours: ["Tu 07:00-09:00", "Th 07:00-09:00", "Sa 07:00-15:00"],
  sameAs: [site.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
