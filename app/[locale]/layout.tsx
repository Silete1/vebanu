import type { Metadata } from "next"
import { notFound } from "next/navigation"

import "../globals.css"
import { JsonLd } from "@/components/seo/json-ld"
import { anuContact } from "@/lib/contact"
import { fontVariables } from "@/lib/fonts"
import { getLocaleAttributes, isLocale, localeMeta, locales } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo/metadata"
import { getSiteContent, siteUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

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

  return { metadataBase: new URL(siteUrl), ...pageMetadata({ locale }) }
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
      name: site.name,
      alternateName: site.shortName,
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
      name: site.name,
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
      className={cn("scroll-smooth antialiased", fontVariables)}
    >
      <body>
        <JsonLd data={siteSchemas} />
        {children}
      </body>
    </html>
  )
}
