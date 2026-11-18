import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LiveStage } from "@/components/live/live-stage"
import { JsonLd } from "@/components/seo/json-ld"
import { Chapter, ChapterRail, Story } from "@/components/story/chapter"
import { CtaBand } from "@/components/story/cta-band"
import { Faq } from "@/components/story/faq"
import { Facts, Features, Inside, Symptoms } from "@/components/story/lists"
import { SystemCards } from "@/components/story/related"
import { Road } from "@/components/story/road"
import { StoryHero } from "@/components/story/story-hero"
import { getSystem, getSystems, systemSlugs } from "@/lib/content/systems"
import { storyCopy } from "@/lib/content/story-copy"
import { isLocale, localizedAlternates, localizedPath, locales } from "@/lib/i18n"
import { orgId, pageGraph } from "@/lib/seo"
import { siteUrl } from "@/lib/site"

export function generateStaticParams() {
  return locales.flatMap((locale) => systemSlugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: PageProps<"/[locale]/systems/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const system = getSystem(locale, slug)
  if (!system) return {}
  const path = `/systems/${slug}`

  return {
    title: system.copy.metaTitle,
    description: system.copy.metaDescription,
    keywords: system.copy.keywords,
    alternates: { canonical: localizedPath(locale, path), languages: localizedAlternates(path) },
    openGraph: {
      url: localizedPath(locale, path),
      title: system.copy.metaTitle,
      description: system.copy.metaDescription,
      images: [{ url: `${system.visual.poster}.webp`, width: 1600, height: 1000, alt: system.copy.name }],
    },
  }
}

export default async function SystemPage({ params }: PageProps<"/[locale]/systems/[slug]">) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const system = getSystem(locale, slug)
  if (!system) notFound()

  const copy = storyCopy[locale]
  const story = system.copy
  const related = getSystems(locale).filter((other) => system.related.includes(other.slug))
  const chapters = [
    { id: "problem", title: copy.chapters.problem },
    { id: "how", title: copy.chapters.how },
    { id: "inside", title: copy.chapters.inside },
    { id: "features", title: copy.chapters.features },
    { id: "faq", title: copy.chapters.faq },
  ]
  const path = `/systems/${slug}`
  const url = `${siteUrl}${localizedPath(locale, path)}`

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path,
          name: story.metaTitle,
          description: story.summary,
          crumbs: [
            { name: copy.systems, path: "/systems" },
            { name: story.name, path },
          ],
          about: [
            {
              "@type": system.group === "core" ? "Service" : "SoftwareApplication",
              "@id": `${url}#system`,
              name: story.name,
              description: story.summary,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, Android, iOS",
              provider: { "@id": orgId },
              brand: { "@id": orgId },
              audience: story.audience.map((name) => ({ "@type": "Audience", audienceType: name })),
              featureList: story.features.map((feature) => feature.label),
              keywords: story.keywords.join(", "),
              image: `${siteUrl}${system.visual.poster}.webp`,
            },
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: story.faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ],
        })}
      />

      <StoryHero system={system} locale={locale} />

      <section className="anu-paper anu-summary">
        <p className="anu-wrap anu-summary__text anu-reveal">{story.summary}</p>
      </section>

      <LiveStage slug={system.slug} locale={locale} {...copy.live} />

      <Story chapters={chapters}>
        <ChapterRail label={copy.chapters.problem} chapters={chapters} />
        <div>
          <Chapter id="problem" index={1} kicker={copy.chapters.problem} title={story.problem.title} lede={story.problem.body} tone="night">
            <Symptoms items={story.problem.symptoms} />
          </Chapter>
          <Chapter id="how" index={2} kicker={copy.chapters.how} title={story.how.title}>
            <Road steps={story.how.steps} stepLabel={copy.step} />
          </Chapter>
          <Chapter id="inside" index={3} kicker={copy.chapters.inside} title={story.inside.title} lede={story.inside.body} tone="night">
            <Inside items={story.inside.items} stack={story.inside.stack} stackLabel={copy.stack} />
          </Chapter>
          <Chapter id="features" index={4} kicker={copy.chapters.features} title={story.name} tone="night">
            <Features items={story.features} />
            {story.facts?.length ? <Facts items={story.facts} /> : null}
          </Chapter>
          <Chapter id="faq" index={5} kicker={copy.chapters.faq} title={copy.chapters.faq}>
            <Faq items={story.faq} />
          </Chapter>
        </div>
      </Story>

      {related.length ? (
        <section className="anu-section anu-related anu-night" aria-labelledby="related-title">
          <div className="anu-wrap">
            <div className="anu-section-head">
              <p className="anu-kicker">{copy.related}</p>
              <h2 id="related-title">{copy.allSystems}</h2>
            </div>
            <SystemCards systems={related} locale={locale} />
          </div>
        </section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  )
}
