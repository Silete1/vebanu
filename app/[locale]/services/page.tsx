import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/story/cta-band"
import { Features } from "@/components/story/lists"
import { PageHero } from "@/components/story/page-hero"
import { Road } from "@/components/story/road"
import { servicesCopy } from "@/lib/content/pages"
import { storyCopy } from "@/lib/content/story-copy"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { orgId, pageGraph } from "@/lib/seo"
import { siteUrl } from "@/lib/site"

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { meta } = servicesCopy[locale]
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: localizedPath(locale, "/services"), languages: localizedAlternates("/services") },
  }
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = servicesCopy[locale]
  const url = `${siteUrl}${localizedPath(locale, "/services")}`

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path: "/services",
          name: copy.meta.title,
          description: copy.meta.description,
          crumbs: [{ name: copy.kicker, path: "/services" }],
          about: copy.groups.flatMap((group, g) =>
            group.items.map((item, i) => ({
              "@type": "Service",
              "@id": `${url}#service-${g}-${i}`,
              name: item.title,
              description: item.body,
              provider: { "@id": orgId },
              areaServed: { "@type": "Country", name: "Iraq" },
            }))
          ),
        })}
      />
      <PageHero id="services-title" kicker={copy.kicker} title={copy.title} lede={copy.lede} />
      {copy.groups.map((group, index) => (
        <section key={group.title} className={`anu-section ${index % 2 ? "anu-paper" : ""}`} aria-labelledby={`services-${index}`}>
          <div className="anu-wrap">
            <div className="anu-section-head">
              <p className="anu-kicker anu-num">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`services-${index}`} className="anu-reveal">
                {group.title}
              </h2>
              <p className="anu-lede">{group.lede}</p>
            </div>
            <Features items={group.items.map((item) => ({ label: item.title, body: item.body }))} />
          </div>
        </section>
      ))}
      <section className="anu-section anu-paper" aria-labelledby="packages-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{copy.packages.kicker}</p>
            <h2 id="packages-title" className="anu-reveal">
              {copy.packages.title}
            </h2>
            <p className="anu-lede">{copy.packages.lede}</p>
          </div>
          <Road steps={copy.packages.items} stepLabel={storyCopy[locale].step} />
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  )
}
