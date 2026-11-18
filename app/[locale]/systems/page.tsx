import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/story/cta-band"
import { SystemCards } from "@/components/story/related"
import { SystemMap } from "@/components/story/system-map"
import { homeStory } from "@/lib/content/home-story"
import { getSystems, type SystemGroup } from "@/lib/content/systems"
import { storyCopy } from "@/lib/content/story-copy"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { pageGraph } from "@/lib/seo"
import { siteUrl } from "@/lib/site"

const groups: SystemGroup[] = ["core", "layer", "industry"]

export async function generateMetadata({ params }: PageProps<"/[locale]/systems">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { map } = homeStory[locale]
  return {
    title: storyCopy[locale].systems,
    description: map.lede,
    alternates: { canonical: localizedPath(locale, "/systems"), languages: localizedAlternates("/systems") },
  }
}

export default async function SystemsPage({ params }: PageProps<"/[locale]/systems">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { map } = homeStory[locale]
  const copy = storyCopy[locale]
  const systems = getSystems(locale)

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path: "/systems",
          name: copy.systems,
          description: map.lede,
          crumbs: [{ name: copy.systems, path: "/systems" }],
          about: [
            {
              "@type": "ItemList",
              "@id": `${siteUrl}${localizedPath(locale, "/systems")}#list`,
              itemListElement: systems.map((system, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: system.copy.name,
                description: system.copy.pitch,
                url: `${siteUrl}${localizedPath(locale, `/systems/${system.slug}`)}`,
              })),
            },
          ],
        })}
      />

      <section className="anu-band anu-section anu-home-map" aria-labelledby="systems-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{map.kicker}</p>
            <h1 id="systems-title" className="anu-display">
              {map.title}
            </h1>
            <p className="anu-lede">{map.lede}</p>
          </div>
          <SystemMap systems={systems} locale={locale} label={map.label} />
        </div>
      </section>

      {groups.map((group, index) => {
        const members = systems.filter((system) => system.group === group)
        if (!members.length) return null
        return (
          <section
            key={group}
            className={`anu-section ${index % 2 ? "anu-paper" : ""}`}
            aria-labelledby={`group-${group}`}
          >
            <div className="anu-wrap">
              <div className="anu-section-head">
                <p className="anu-kicker anu-num">{String(index + 1).padStart(2, "0")}</p>
                <h2 id={`group-${group}`}>{copy.group[group]}</h2>
              </div>
              <SystemCards systems={members} locale={locale} eager={index === 0} />
            </div>
          </section>
        )
      })}

      <CtaBand locale={locale} />
    </>
  )
}
