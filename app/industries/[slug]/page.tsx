import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { IndustryDetailPage } from "@/components/industries/industry-detail-page"
import { PageShell } from "@/components/layout/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { getIndustry, industrySlugs } from "@/lib/content/industries"
import { siteUrl } from "@/lib/site"

type IndustryPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) return {}

  return {
    title: industry.metadata.title,
    description: industry.metadata.description,
    keywords: [
      industry.metadata.primaryKeyword,
      ...industry.metadata.secondaryKeywords,
    ],
    alternates: {
      canonical: industry.metadata.canonicalPath,
    },
    openGraph: {
      type: "website",
      url: industry.metadata.canonicalPath,
      title: industry.metadata.title,
      description: industry.metadata.description,
      images: [
        {
          url: industry.visual.imageUrl,
          alt: industry.visual.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metadata.title,
      description: industry.metadata.description,
      images: [industry.visual.imageUrl],
    },
  }
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) notFound()

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}${industry.href}#service`,
      name: industry.metadata.title.replace(" | ANU", ""),
      serviceType: industry.metadata.primaryKeyword,
      description: industry.metadata.description,
      url: `${siteUrl}${industry.href}`,
      areaServed: {
        "@type": "Country",
        name: "Iraq",
      },
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industries",
          item: `${siteUrl}/industries`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: industry.name,
          item: `${siteUrl}${industry.href}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: industry.buyerQuestions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ]

  return (
    <PageShell>
      <JsonLd data={schemas} />
      <IndustryDetailPage industry={industry} />
    </PageShell>
  )
}
