import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"

import { NoteFigure } from "@/components/insights/note-figure"
import { NoteMeta } from "@/components/insights/note-meta"
import { NoteList } from "@/components/insights/note-row"
import { JsonLd } from "@/components/seo/json-ld"
import { ChapterRail, Story } from "@/components/story/chapter"
import { CtaBand } from "@/components/story/cta-band"
import { Glyph } from "@/components/story/glyph"
import { getInsightBySlug, getInsights } from "@/lib/cms/insights"
import { categoryLabels, insights, notesCopy } from "@/lib/content/insights"
import { isLocale, localeMeta, localizedAlternates, localizedPath } from "@/lib/i18n"
import { orgId, pageGraph } from "@/lib/seo"
import { siteUrl } from "@/lib/site"

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({ params }: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const insight = await getInsightBySlug(slug)
  if (!insight) return {}
  const path = `/insights/${slug}`

  return {
    title: insight.title[locale],
    description: insight.summary[locale],
    alternates: { canonical: localizedPath(locale, path), languages: localizedAlternates(path) },
    openGraph: {
      type: "article",
      url: localizedPath(locale, path),
      title: insight.title[locale],
      description: insight.summary[locale],
      publishedTime: insight.date,
    },
  }
}

export default async function InsightPage({ params }: PageProps<"/[locale]/insights/[slug]">) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const [insight, all] = await Promise.all([getInsightBySlug(slug), getInsights()])
  if (!insight) notFound()

  const copy = notesCopy[locale]
  const topic = categoryLabels[insight.category][locale]
  const parts = insight.body.map((section, index) => ({ id: `part-${index + 1}`, title: section.heading[locale] }))
  // same topic first, then the newest of the rest
  const others = [...all].filter((note) => note.slug !== insight.slug).sort((a, b) => b.date.localeCompare(a.date))
  const related = [
    ...others.filter((note) => note.category === insight.category),
    ...others.filter((note) => note.category !== insight.category),
  ].slice(0, 3)
  const path = `/insights/${slug}`
  const url = `${siteUrl}${localizedPath(locale, path)}`

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path,
          name: insight.title[locale],
          description: insight.summary[locale],
          crumbs: [
            { name: copy.kicker, path: "/insights" },
            { name: insight.title[locale], path },
          ],
          about: [
            {
              "@type": "Article",
              "@id": `${url}#article`,
              headline: insight.title[locale],
              description: insight.summary[locale],
              datePublished: insight.date,
              dateModified: insight.date,
              inLanguage: localeMeta[locale].htmlLang,
              articleSection: topic,
              timeRequired: `PT${insight.readingTime}M`,
              author: { "@id": orgId },
              publisher: { "@id": orgId },
              mainEntityOfPage: { "@id": `${url}#page` },
              isAccessibleForFree: true,
            },
          ],
        })}
      />

      <article aria-labelledby="note-title">
        <header className="anu-band anu-sky anu-hero">
          <div className="anu-wrap anu-hero__text">
            <nav aria-label={copy.crumbsLabel} className="anu-crumbs">
              <Link href={localizedPath(locale, "/insights")}>{copy.kicker}</Link>
              <span aria-hidden="true">/</span>
              <span>{topic}</span>
            </nav>
            <h1 id="note-title" className="anu-note-hero__title">
              {insight.title[locale]}
            </h1>
            <p className="anu-lede">{insight.summary[locale]}</p>
            <NoteMeta insight={insight} locale={locale} />
            {insight.author ? (
              <p className="anu-kicker">
                {copy.by} {insight.author[locale]}
              </p>
            ) : null}
          </div>
        </header>

        <Story chapters={parts}>
          <ChapterRail label={copy.rail} chapters={parts} />
          <div className="anu-article">
            <div className="anu-article__body">
              <span className="anu-article__line" aria-hidden="true" />
              <NoteFigure variant={insight.visual} alt={insight.visualAlt[locale]} />
              {insight.body.map((section, index) => (
                <section
                  key={parts[index].id}
                  id={parts[index].id}
                  aria-labelledby={`${parts[index].id}-title`}
                  className="anu-article__part"
                  style={{ viewTimelineName: `--ch-${parts[index].id}` } as CSSProperties}
                >
                  <h2 id={`${parts[index].id}-title`}>
                    <span className="anu-num anu-article__index">{String(index + 1).padStart(2, "0")}</span>
                    <span>{section.heading[locale]}</span>
                  </h2>
                  <p>{section.body[locale]}</p>
                </section>
              ))}
              <aside className="anu-band anu-band--plain anu-callout" aria-label={copy.question.label}>
                <p className="anu-kicker">
                  <Glyph state="due" />
                  {copy.question.label}
                </p>
                <p className="anu-callout__text">{copy.question.text}</p>
              </aside>
            </div>
          </div>
        </Story>
      </article>

      {related.length ? (
        <section className="anu-section anu-related" aria-labelledby="related-title">
          <div className="anu-wrap">
            <div className="anu-section-head">
              <h2 id="related-title" className="anu-reveal">
                {copy.related}
              </h2>
            </div>
            <NoteList insights={related} locale={locale} />
            <Link href={localizedPath(locale, "/insights")} className="anu-link anu-section-more">
              {copy.all} →
            </Link>
          </div>
        </section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  )
}
