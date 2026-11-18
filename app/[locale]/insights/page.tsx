import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { NoteFigure } from "@/components/insights/note-figure"
import { NoteMeta } from "@/components/insights/note-meta"
import { NoteRow } from "@/components/insights/note-row"
import { NotesFilter, type NotesTopic } from "@/components/insights/notes-filter"
import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/story/cta-band"
import { Glyph } from "@/components/story/glyph"
import { PageHero } from "@/components/story/page-hero"
import { getInsights } from "@/lib/cms/insights"
import { categoryLabels, insightCategories, notesCopy } from "@/lib/content/insights"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { pageGraph } from "@/lib/seo"
import { siteUrl } from "@/lib/site"

export async function generateMetadata({ params }: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { meta } = notesCopy[locale]

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: localizedPath(locale, "/insights"), languages: localizedAlternates("/insights") },
    openGraph: { url: localizedPath(locale, "/insights"), title: meta.title, description: meta.description },
  }
}

export default async function InsightsPage({ params }: PageProps<"/[locale]/insights">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const copy = notesCopy[locale]
  const notes = [...(await getInsights())].sort((a, b) => b.date.localeCompare(a.date))
  const featured = notes.find((note) => note.featured) ?? notes[0]
  const archive = notes.filter((note) => note.slug !== featured?.slug)
  const topics: NotesTopic[] = insightCategories
    .map((category) => ({
      key: category,
      label: categoryLabels[category][locale],
      count: category === "All" ? archive.length : archive.filter((note) => note.category === category).length,
    }))
    .filter((topic) => topic.count > 0)
  const url = `${siteUrl}${localizedPath(locale, "/insights")}`

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path: "/insights",
          name: copy.meta.title,
          description: copy.meta.description,
          crumbs: [{ name: copy.kicker, path: "/insights" }],
          about: [
            {
              "@type": "ItemList",
              "@id": `${url}#notes`,
              itemListElement: notes.map((note, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: note.title[locale],
                url: `${siteUrl}${localizedPath(locale, `/insights/${note.slug}`)}`,
              })),
            },
          ],
        })}
      />

      <PageHero id="notes-title" kicker={copy.kicker} title={copy.title} lede={copy.lede} />

      {featured ? (
        <section className="anu-section anu-paper" aria-labelledby="featured-title">
          <div className="anu-wrap anu-featured">
            <NoteFigure variant={featured.visual} alt={featured.visualAlt[locale]} />
            <div className="anu-featured__text">
              <p className="anu-kicker">
                <Glyph state="due" />
                {copy.featured}
              </p>
              <NoteMeta insight={featured} locale={locale} />
              <h2 id="featured-title" className="anu-featured__title anu-reveal">
                <Link href={localizedPath(locale, `/insights/${featured.slug}`)}>{featured.title[locale]}</Link>
              </h2>
              <p className="anu-featured__summary">{featured.summary[locale]}</p>
              <Link href={localizedPath(locale, `/insights/${featured.slug}`)} className="anu-action">
                {copy.read}
                <span className="anu-action__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {archive.length ? (
        <section className="anu-section" aria-labelledby="index-title">
          <div className="anu-wrap">
            <div className="anu-section-head">
              <h2 id="index-title" className="anu-reveal">
                {copy.indexTitle}
              </h2>
              <p className="anu-lede">{copy.indexLede}</p>
            </div>
            <NotesFilter
              topics={topics}
              notes={archive.map((note) => ({
                slug: note.slug,
                topic: note.category,
                row: <NoteRow insight={note} locale={locale} />,
              }))}
              labels={{ group: copy.filterLabel, showing: copy.showing, of: copy.of, empty: copy.empty }}
            />
          </div>
        </section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  )
}
