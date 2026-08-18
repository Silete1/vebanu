import type { Metadata } from "next"
import { Inter_Tight, Roboto_Mono, Tajawal } from "next/font/google"
import { notFound } from "next/navigation"

import "../globals.css"
import { JsonLd } from "@/components/seo/json-ld"
import { anuContact } from "@/lib/contact"
import { getLocaleAttributes, isLocale, localeMeta, locales } from "@/lib/i18n"
import { getSiteContent, siteUrl } from "@/lib/site"
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

const fontArabic = Tajawal({
  subsets: ["arabic"],
  variable: "--font-arabic",
  weight: ["300", "400", "500", "700", "800"],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const site = getSiteContent(locale)
  const defaultTitle =
    locale === "ar" ? "ANU للحلول البرمجية" : "ANU Software Solutions"

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template:
        locale === "ar"
          ? "%s | ANU للحلول البرمجية"
          : "%s | ANU Software Solutions",
    },
    description: site.description,
    icons: {
      icon: [
        { url: "/anulogopng-.png", type: "image/png" },
        { url: "/icon.png", type: "image/png" },
        { url: "/favicon.ico", type: "image/x-icon" },
      ],
      shortcut: ["/anulogopng-.png"],
      apple: [{ url: "/anulogopng-.png", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].ogLocale,
      alternateLocale: localeMeta[locale === "ar" ? "en" : "ar"].ogLocale,
      siteName:
        locale === "ar" ? "ANU للحلول البرمجية" : "ANU Software Solutions",
      title: defaultTitle,
      description: site.description,
      images: [{ url: "/anulogopng-.png", alt: defaultTitle }],
    },
    twitter: {
      card: "summary",
      title: defaultTitle,
      description: site.description,
      images: ["/anulogopng-.png"],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const localeAttributes = getLocaleAttributes(locale)
  const site = getSiteContent(locale)
  const siteSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: locale === "ar" ? "ANU للحلول البرمجية" : "ANU Software Solutions",
      alternateName: "ANU",
      url: siteUrl,
      logo: `${siteUrl}/anulogopng-.png`,
      description: site.description,
      email: anuContact.email,
      telephone: anuContact.phoneInternational,
      address: {
        "@type": "PostalAddress",
        addressLocality: locale === "ar" ? "بغداد" : "Baghdad",
        addressCountry: "IQ",
      },
      areaServed: {
        "@type": "Country",
        name: locale === "ar" ? "العراق" : "Iraq",
      },
      knowsAbout:
        locale === "ar"
          ? [
              "تطبيق نظام Odoo ERP",
              "تصميم العمليات",
              "إدارة المخزون",
              "التقارير التشغيلية",
              "الرقابة المالية",
            ]
          : [
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
      "@id": `${siteUrl}/#website-${locale}`,
      url: `${siteUrl}/${locale}`,
      name: locale === "ar" ? "ANU للحلول البرمجية" : "ANU Software Solutions",
      description: site.description,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: localeMeta[locale].htmlLang,
    },
  ]

  return (
    <html
      {...localeAttributes}
      data-locale={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth antialiased",
        fontDisplay.variable,
        fontMono.variable,
        fontArabic.variable
      )}
    >
      <head>
        <link rel="icon" type="image/png" href="/anulogopng-.png" />
        <link rel="apple-touch-icon" href="/anulogopng-.png" />
      </head>
      <body>
        <JsonLd data={siteSchemas} />
        {children}
      </body>
    </html>
  )
}
