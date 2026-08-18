import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IndustriesIndexPage } from "@/components/industries/industries-index-page"
import { PageShell } from "@/components/layout/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { getIndustries } from "@/lib/content/industries"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { siteUrl } from "@/lib/site"

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const title =
    locale === "ar"
      ? "القطاعات | ANU للحلول البرمجية"
      : "Industries | ANU Software Solutions"
  const description =
    locale === "ar"
      ? "حلول رقابة تشغيلية وتطبيق Odoo ERP لشركات التوزيع والتصنيع والتجزئة والخدمات اللوجستية والرعاية الصحية في العراق."
      : "Explore how ANU designs operating control and implements Odoo ERP for distribution, manufacturing, retail, logistics, and healthcare groups in Iraq."

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(locale, "/industries"),
      languages: localizedAlternates("/industries"),
    },
    openGraph: {
      type: "website",
      url: localizedPath(locale, "/industries"),
      title,
      description,
    },
  }
}

export default async function IndustriesRoute({
  params,
}: PageProps<"/[locale]/industries">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const industries = getIndustries(locale)
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteUrl}/${locale}/industries#page`,
      name:
        locale === "ar"
          ? "القطاعات التي تخدمها ANU للحلول البرمجية"
          : "Industries served by ANU Software Solutions",
      url: `${siteUrl}/${locale}/industries`,
      inLanguage: locale === "ar" ? "ar-IQ" : "en-IQ",
      isPartOf: { "@id": `${siteUrl}/#website-${locale}` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: industries.map((industry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: industry.name,
          url: `${siteUrl}${localizedPath(locale, industry.href)}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "ar" ? "الرئيسية" : "Home",
          item: `${siteUrl}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "ar" ? "القطاعات" : "Industries",
          item: `${siteUrl}/${locale}/industries`,
        },
      ],
    },
  ]

  return (
    <PageShell locale={locale}>
      <JsonLd data={schemas} />
      <IndustriesIndexPage locale={locale} />
    </PageShell>
  )
}
