import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"

import { Breaks, IndustryHero, industryPoster, PlatformMap } from "@/components/industries/industry-blocks"
import { NoteList } from "@/components/insights/note-row"
import { JsonLd } from "@/components/seo/json-ld"
import { Chapter, ChapterRail, Story } from "@/components/story/chapter"
import { CtaBand } from "@/components/story/cta-band"
import { Faq } from "@/components/story/faq"
import { SystemCards } from "@/components/story/related"
import { Road } from "@/components/story/road"
import { getIndustry, getIndustrySystems, industriesCopy, industrySlugs } from "@/lib/content/industries"
import { getInsightBySlug, notesCopy } from "@/lib/content/insights"
import { storyCopy } from "@/lib/content/story-copy"
import { isLocale, localeMeta, localizedAlternates, localizedPath } from "@/lib/i18n"
import { orgId, pageGraph } from "@/lib/seo"
import { siteUrl } from "@/lib/site"

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<"/[locale]/industries/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const industry = getIndustry(slug, locale)
  if (!industry) return {}
  const path = industry.href
  const poster = industryPoster(getIndustrySystems(industry, locale))

  return {
    title: { absolute: industry.metadata.title },
    description: industry.metadata.description,
    keywords: [industry.metadata.primaryKeyword, ...industry.metadata.secondaryKeywords],
    alternates: { canonical: localizedPath(locale, path), languages: localizedAlternates(path) },
    openGraph: {
      url: localizedPath(locale, path),
      title: industry.metadata.title,
      description: industry.metadata.description,
      images: [{ url: `${poster}.webp`, width: 1600, height: 1000, alt: industry.name }],
    },
  }
}

export default async function IndustryPage({ params }: PageProps<"/[locale]/industries/[slug]">) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const industry = getIndustry(slug, locale)
  if (!industry) notFound()

  const copy = industriesCopy[locale]
  const notes = notesCopy[locale]
  const systems = getIndustrySystems(industry, locale)
  const related = industry.relatedInsightSlugs.flatMap((note) => getInsightBySlug(note) ?? [])
  const chapters = [
    { id: "breaks", title: copy.chapters.breaks },
    { id: "flow", title: copy.chapters.flow },
    { id: "platform", title: copy.chapters.platform },
    { id: "systems", title: copy.chapters.systems },
    { id: "questions", title: copy.chapters.questions },
  ]
  const path = industry.href
  const url = `${siteUrl}${localizedPath(locale, path)}`

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path,
          name: industry.metadata.title,
          description: industry.directAnswer,
          crumbs: [
            { name: copy.crumbs, path: "/industries" },
            { name: industry.name, path },
          ],
          about: [
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: industry.name,
              serviceType: industry.metadata.primaryKeyword,
              description: industry.metadata.description,
              inLanguage: localeMeta[locale].htmlLang,
              areaServed: { "@type": "Country", name: locale === "ar" ? "العراق" : "Iraq" },
              provider: { "@id": orgId },
            },
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: industry.buyerQuestions.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ],
        })}
      />

      <IndustryHero industry={industry} systems={systems} locale={locale} />

      <section className="anu-paper anu-summary">
        <p className="anu-wrap anu-summary__text anu-reveal">{industry.directAnswer}</p>
      </section>

      <Story chapters={chapters}>
        <ChapterRail label={copy.rail} chapters={chapters} />
        <div>
          <Chapter id="breaks" index={1} kicker={copy.chapters.breaks} title={copy.breaksTitle}>
            <Breaks items={industry.problems} />
          </Chapter>
          <Chapter
            id="flow"
            index={2}
            kicker={copy.chapters.flow}
            title={industry.workflow.title}
            lede={industry.workflow.description}
            tone="desk"
          >
            <div className="anu-flow" style={{ "--steps": industry.workflow.stages.length } as CSSProperties}>
              <Road
                steps={industry.workflow.stages.map((stage) => ({ title: stage.name, body: stage.description }))}
                stepLabel={storyCopy[locale].step}
              />
            </div>
          </Chapter>
          <Chapter
            id="platform"
            index={3}
            kicker={copy.chapters.platform}
            title={copy.platformTitle}
            lede={copy.platformLede}
          >
            <PlatformMap items={industry.odooCapabilities} modulesLabel={copy.modules} />
          </Chapter>
          <Chapter
            id="systems"
            index={4}
            kicker={copy.chapters.systems}
            title={copy.systemsTitle}
            lede={copy.systemsLede}
            tone="desk"
          >
            <SystemCards systems={systems} locale={locale} />
          </Chapter>
          <Chapter id="questions" index={5} kicker={copy.chapters.questions} title={copy.questionsTitle}>
            <Faq items={industry.buyerQuestions.map((item) => ({ q: item.question, a: item.answer }))} />
          </Chapter>
        </div>
      </Story>

      {related.length ? (
        <section className="anu-section anu-related" aria-labelledby="notes-title">
          <div className="anu-wrap">
            <div className="anu-section-head">
              <h2 id="notes-title" className="anu-reveal">
                {notes.related}
              </h2>
            </div>
            <NoteList insights={related} locale={locale} />
            <Link href={localizedPath(locale, "/insights")} className="anu-link anu-section-more">
              {notes.all} →
            </Link>
          </div>
        </section>
      ) : null}

      <CtaBand locale={locale} />
    </>
  )
}
