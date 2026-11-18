import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IndustryDetailPage } from "@/components/industries/industry-detail-page"
import { PageShell } from "@/components/layout/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { getIndustry, industrySlugs } from "@/lib/content/industries"
import { isLocale, localizedPath } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo/metadata"
import { siteUrl } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/industries/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const industry = getIndustry(slug, locale)
  if (!industry) return {}

  return pageMetadata({
    locale,
    path: `/industries/${industry.slug}`,
    title: industry.metadata.title,
    description: industry.metadata.description,
    keywords: [
      industry.metadata.primaryKeyword,
      ...industry.metadata.secondaryKeywords,
    ],
    images: [{ url: industry.visual.imageUrl, alt: industry.visual.alt }],
  })
}

export default async function IndustryRoute({
  params,
}: PageProps<"/[locale]/industries/[slug]">) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const industry = getIndustry(slug, locale)
  if (!industry) notFound()

  const url = `${siteUrl}${localizedPath(locale, industry.href)}`
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: industry.metadata.title,
      serviceType: industry.metadata.primaryKeyword,
      description: industry.metadata.description,
      url,
      inLanguage: locale === "ar" ? "ar-IQ" : "en-IQ",
      areaServed: {
        "@type": "Country",
        name: locale === "ar" ? "العراق" : "Iraq",
      },
      provider: { "@id": `${siteUrl}/#organization` },
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
        {
          "@type": "ListItem",
          position: 3,
          name: industry.name,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale === "ar" ? "ar-IQ" : "en-IQ",
      mainEntity: industry.buyerQuestions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ]

  return (
    <PageShell locale={locale}>
      <JsonLd data={schemas} />
      <IndustryDetailPage industry={industry} locale={locale} />
    </PageShell>
  )
}
