import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { AssessmentCtaSection } from "@/components/home/assessment-cta-section"
import { IndustriesAccordionShowcase } from "@/components/industries/industries-accordion-showcase"
import { Container } from "@/components/layout/container"
import { PageShell } from "@/components/layout/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { industries } from "@/lib/content/industries"
import { siteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Industries | Odoo ERP Solutions in Iraq | ANU",
  description:
    "Explore how ANU designs operating control and implements Odoo ERP for distribution, manufacturing, retail, logistics, and healthcare groups in Iraq.",
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    type: "website",
    url: "/industries",
    title: "Industries | Odoo ERP Solutions in Iraq | ANU",
    description:
      "Industry-specific operating control and Odoo ERP implementation for companies in Iraq.",
  },
  twitter: {
    card: "summary",
    title: "Industries | Odoo ERP Solutions in Iraq | ANU",
    description:
      "Industry-specific operating control and Odoo ERP implementation for companies in Iraq.",
  },
}

export default function IndustriesPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteUrl}/industries#page`,
      name: "Industries served by ANU Software Solutions",
      description: metadata.description,
      url: `${siteUrl}/industries`,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: industries.map((industry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: industry.name,
          url: `${siteUrl}${industry.href}`,
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
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industries",
          item: `${siteUrl}/industries`,
        },
      ],
    },
  ]

  return (
    <PageShell>
      <JsonLd data={schemas} />
      <div className="bg-[var(--color-bone-white)]">
        <header
          className="bg-[var(--color-abyssal-ink)] pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-24"
          data-header-theme="dark"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.64fr_0.36fr] lg:items-end lg:gap-16">
              <div>
                <p className="mono-label text-blue-300">Industries</p>
                <h1 className="mt-6 max-w-[11ch] text-[clamp(3.35rem,7.5vw,6rem)] leading-[0.94] tracking-[-0.04em]">
                  Odoo ERP for your industry.
                </h1>
              </div>
              <div className="border-t border-white/22 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.42] text-white/70">
                  ANU maps the decisions, evidence and handoffs that matter in
                  your sector, then implements them in Odoo.
                </p>
                <Link
                  href="/?request=industries#assessment"
                  className="mono-label mt-7 inline-flex min-h-11 items-center gap-3 rounded-lg bg-blue-600 px-4 text-white transition-colors outline-none hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-abyssal-ink)]"
                >
                  Start assessment
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Container>
        </header>

        <section className="py-16 sm:py-20 lg:py-24" data-header-theme="light">
          <Container>
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2.7rem,5vw,5rem)] leading-[0.98] tracking-[-0.04em]">
                Choose your industry.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-7 text-[var(--color-graphite)]">
                Each page explains the operational risks, workflow and Odoo
                capabilities relevant to that industry.
              </p>
            </div>

            <IndustriesAccordionShowcase compactMobile className="mt-10" />
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
              <div>
                <p className="mono-label text-blue-700">Industry fit</p>
                <h2 className="mt-5 text-[clamp(2.7rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.04em]">
                  One method. Different control priorities.
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-graphite)]">
                  ANU keeps one implementation discipline while changing the
                  operating model, evidence and management questions for each
                  sector.
                </p>
              </div>

              <div className="border-t border-[var(--color-abyssal-ink)]">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={industry.href}
                    className="group grid gap-4 border-b border-[var(--color-lichen)] py-7 transition-colors outline-none hover:bg-[var(--color-bone-white)] focus-visible:bg-[var(--color-bone-white)] sm:grid-cols-[0.38fr_0.62fr] sm:gap-8 sm:px-4"
                  >
                    <h3 className="text-[clamp(1.45rem,2vw,1.9rem)] leading-[1.08] tracking-[-0.025em]">
                      {industry.name}
                    </h3>
                    <span className="flex items-start justify-between gap-6">
                      <span className="max-w-[52ch] text-base leading-7 text-[var(--color-graphite)]">
                        {industry.cardDescription}
                      </span>
                      <ArrowUpRightIcon
                        className="mt-1 size-4 shrink-0 text-blue-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <AssessmentCtaSection />
      </div>
    </PageShell>
  )
}
