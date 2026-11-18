import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { IndustryCards, Priorities } from "@/components/industries/industry-blocks"
import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/story/cta-band"
import { PageHero } from "@/components/story/page-hero"
import { getIndustries, industriesCopy } from "@/lib/content/industries"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { pageGraph } from "@/lib/seo"
import { siteUrl } from "@/lib/site"

export async function generateMetadata({ params }: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { meta } = industriesCopy[locale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: localizedPath(locale, "/industries"), languages: localizedAlternates("/industries") },
    openGraph: { url: localizedPath(locale, "/industries"), title: meta.title, description: meta.description },
  }
}

export default async function IndustriesPage({ params }: PageProps<"/[locale]/industries">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const copy = industriesCopy[locale]
  const industries = getIndustries(locale)
  const url = `${siteUrl}${localizedPath(locale, "/industries")}`

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path: "/industries",
          name: copy.meta.title,
          description: copy.meta.description,
          crumbs: [{ name: copy.crumbs, path: "/industries" }],
          about: [
            {
              "@type": "ItemList",
              "@id": `${url}#list`,
              itemListElement: industries.map((industry, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: industry.name,
                description: industry.cardDescription,
                url: `${siteUrl}${localizedPath(locale, industry.href)}`,
              })),
            },
          ],
        })}
      />

      <PageHero id="industries-title" kicker={copy.index.kicker} title={copy.index.title} lede={copy.index.lede}>
        <div className="anu-hero__actions">
          <Link href={localizedPath(locale, "/contact")} className="anu-action">
            {copy.assessment}
            <span className="anu-action__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </PageHero>

      <section className="anu-section" aria-labelledby="choose-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <h2 id="choose-title" className="anu-reveal">
              {copy.index.chooseTitle}
            </h2>
            <p className="anu-lede">{copy.index.chooseLede}</p>
          </div>
          <IndustryCards industries={industries} locale={locale} />
        </div>
      </section>

      <section className="anu-section anu-paper" aria-labelledby="fit-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{copy.index.fitKicker}</p>
            <h2 id="fit-title" className="anu-reveal">
              {copy.index.fitTitle}
            </h2>
            <p className="anu-lede">{copy.index.fitLede}</p>
          </div>
          <Priorities industries={industries} locale={locale} />
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  )
}
