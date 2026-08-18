import type { Metadata } from "next"
import { Inter_Tight, Roboto_Mono, Noto_Sans_Arabic } from "next/font/google"

import "./globals.css"
import { JsonLd } from "@/components/seo/json-ld"
import { anuContact } from "@/lib/contact"
import { defaultLocale, getLocaleAttributes } from "@/lib/i18n"
import { siteUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
})

const fontMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["400"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ANU Software Solutions | Odoo ERP in Iraq",
  description:
    "ERP implementation and business process improvement for companies in Iraq.",
  openGraph: {
    type: "website",
    locale: "en_IQ",
    url: siteUrl,
    siteName: "ANU Software Solutions",
    title: "ANU Software Solutions | Odoo ERP in Iraq",
    description:
      "ERP implementation and business process improvement for companies in Iraq.",
  },
  twitter: {
    card: "summary",
    title: "ANU Software Solutions | Odoo ERP in Iraq",
    description:
      "ERP implementation and business process improvement for companies in Iraq.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const localeAttributes = getLocaleAttributes(defaultLocale)
  const siteSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ANU Software Solutions",
      alternateName: "ANU",
      url: siteUrl,
      email: anuContact.email,
      telephone: anuContact.phoneInternational,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Baghdad",
        addressCountry: "IQ",
      },
      areaServed: {
        "@type": "Country",
        name: "Iraq",
      },
      knowsAbout: [
        "Odoo ERP implementation",
        "Business process design",
        "Inventory management",
        "Operational reporting",
        "Financial controls",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ANU Software Solutions",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en",
    },
  ]

  return (
    <html
      lang={localeAttributes.lang}
      dir={localeAttributes.dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        fontDisplay.variable,
        fontMono.variable,
        fontArabic.variable
      )}
    >
      <body>
        <JsonLd data={siteSchemas} />
        {children}
      </body>
    </html>
  )
}
