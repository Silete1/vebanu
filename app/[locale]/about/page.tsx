import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Dingir } from "@/components/brand/dingir"
import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/story/cta-band"
import { Facts, Features } from "@/components/story/lists"
import { PageHero } from "@/components/story/page-hero"
import { aboutCopy } from "@/lib/content/pages"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { orgId, pageGraph } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { meta } = aboutCopy[locale]
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: localizedPath(locale, "/about"), languages: localizedAlternates("/about") },
  }
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = aboutCopy[locale]

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path: "/about",
          name: copy.meta.title,
          description: copy.meta.description,
          crumbs: [{ name: copy.kicker, path: "/about" }],
          about: [{ "@type": "AboutPage", "@id": `${orgId}-about`, mainEntity: { "@id": orgId } }],
        })}
      />
      <PageHero id="about-title" kicker={copy.kicker} title={copy.title} lede={copy.lede} />
      <section className="anu-section anu-paper anu-about-name" aria-labelledby="name-title">
        <div className="anu-wrap">
          <Dingir className="anu-dingir anu-draw" />
          <h2 id="name-title" className="anu-reveal">
            {copy.name.title}
          </h2>
          <p className="anu-summary__text anu-reveal">{copy.name.body}</p>
        </div>
      </section>
      <section className="anu-section anu-night" aria-label={copy.kicker}>
        <div className="anu-wrap">
          <Features items={copy.story.map((item) => ({ label: item.title, body: item.body }))} />
          <Facts items={copy.facts} />
        </div>
      </section>
      <CtaBand locale={locale} />
    </>
  )
}
