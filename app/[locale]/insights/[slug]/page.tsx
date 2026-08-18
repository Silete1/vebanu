import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react"

import { ArticleReadingProgress } from "@/components/insights/article-reading-progress"
import { InsightMetadata } from "@/components/insights/insight-metadata"
import { InsightVisual } from "@/components/insights/insight-visual"
import { Container } from "@/components/layout/container"
import { PageShell } from "@/components/layout/page-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { getInsightBySlug, getInsights } from "@/lib/cms/insights"
import { categoryLabels, insights } from "@/lib/content/insights"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { siteUrl } from "@/lib/site"

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const insight = await getInsightBySlug(slug)
  if (!insight) return {}

  const path = `/insights/${slug}`
  const title = `${insight.title[locale]} | ${locale === "ar" ? "رؤى ANU" : "ANU Insights"}`
  return {
    title,
    description: insight.summary[locale],
    alternates: {
      canonical: localizedPath(locale, path),
      languages: localizedAlternates(path),
    },
    openGraph: {
      type: "article",
      url: localizedPath(locale, path),
      title,
      description: insight.summary[locale],
    },
  }
}

export default async function InsightArticlePage({
  params,
}: PageProps<"/[locale]/insights/[slug]">) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const [insight, allInsights] = await Promise.all([
    getInsightBySlug(slug),
    getInsights(),
  ])
  if (!insight) notFound()

  const isRtl = locale === "ar"
  const related = allInsights
    .filter((candidate) => candidate.slug !== insight.slug)
    .filter((candidate) => candidate.category === insight.category)
    .concat(allInsights.filter((candidate) => candidate.slug !== insight.slug))
    .filter(
      (candidate, index, collection) =>
        collection.findIndex((item) => item.slug === candidate.slug) === index
    )
    .slice(0, 3)
  const articleUrl = `${siteUrl}${localizedPath(locale, `/insights/${slug}`)}`
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: insight.title[locale],
    description: insight.summary[locale],
    datePublished: insight.date,
    dateModified: insight.date,
    inLanguage: isRtl ? "ar-IQ" : "en-IQ",
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Organization",
      name: insight.author?.[locale] ?? "ANU Software Solutions",
    },
    publisher: { "@id": `${siteUrl}/#organization` },
  }

  return (
    <PageShell locale={locale}>
      <JsonLd data={articleSchema} />
      <div className="bg-[var(--color-bone-white)]">
        <ArticleReadingProgress />
        <article>
          <header
            className="bg-[var(--color-abyssal-ink)] pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-24"
            data-header-theme="dark"
          >
            <Container>
              <Link
                href={localizedPath(locale, "/insights")}
                className="mono-label inline-flex items-center gap-2 rounded-sm text-white/64 transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-abyssal-ink)]"
              >
                <ArrowLeftIcon className="size-4 rtl:-scale-x-100" />
                {isRtl ? "العودة إلى الرؤى" : "Back to insights"}
              </Link>

              <div className="mt-14 grid min-w-0 gap-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
                <div className="min-w-0">
                  <InsightMetadata insight={insight} locale={locale} inverse />
                  <h1 className="mt-7 max-w-[15ch] text-[clamp(2.75rem,7vw,6rem)] leading-[0.97] tracking-[-0.035em]">
                    {insight.title[locale]}
                  </h1>
                </div>
                <div className="border-t border-white/22 pt-5 lg:border-s lg:border-t-0 lg:ps-7 lg:pt-0">
                  <p className="text-[clamp(1.15rem,1.7vw,1.45rem)] leading-[1.28] text-white/72">
                    {insight.summary[locale]}
                  </p>
                  {insight.author ? (
                    <p className="mono-label mt-7 text-white/48">
                      {isRtl ? "بواسطة" : "By"} {insight.author[locale]}
                    </p>
                  ) : null}
                </div>
              </div>
            </Container>
          </header>

          <section className="bg-[var(--color-bone-white)] py-6 lg:py-8">
            <Container>
              <InsightVisual
                variant={insight.visual}
                alt={insight.visualAlt[locale]}
                locale={locale}
                className="min-h-[430px] lg:min-h-[680px]"
              />
            </Container>
          </section>

          <section className="bg-white py-20 lg:py-28">
            <Container>
              <div className="grid gap-14 lg:grid-cols-[0.28fr_0.72fr]">
                <aside className="h-fit border-t border-[var(--color-abyssal-ink)] pt-5 lg:sticky lg:top-28">
                  <p className="mono-label text-[var(--color-graphite)]">
                    {isRtl ? "في هذه الرؤية" : "In this insight"}
                  </p>
                  <ol className="mt-5 grid gap-3">
                    {insight.body.map((section, index) => (
                      <li
                        key={section.heading.en}
                        className="flex gap-3 text-sm leading-5 text-[var(--color-graphite)]"
                      >
                        <span className="mono-label" aria-hidden="true">
                          0{index + 1}
                        </span>
                        <span>{section.heading[locale]}</span>
                      </li>
                    ))}
                  </ol>
                </aside>

                <div className="max-w-3xl">
                  {insight.body.map((section, index) => (
                    <section
                      key={section.heading.en}
                      className="border-t border-[var(--color-lichen)] py-10 first:border-[var(--color-abyssal-ink)] first:pt-0"
                    >
                      <p className="mono-label text-[var(--color-bioluminescent-lime)]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-5 text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-0.03em]">
                        {section.heading[locale]}
                      </h2>
                      <p className="mt-7 text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.55] text-[var(--color-graphite)]">
                        {section.body[locale]}
                      </p>
                    </section>
                  ))}

                  <div className="mt-10 border-s-2 border-[var(--color-bioluminescent-lime)] bg-[var(--color-tissue)] p-7 sm:p-9">
                    <p className="mono-label text-[var(--color-graphite)]">
                      {isRtl ? "سؤال تنفيذي" : "Operating question"}
                    </p>
                    <p className="mt-5 text-[clamp(1.6rem,2.6vw,2.5rem)] leading-[1.1] tracking-[-0.025em]">
                      {isRtl
                        ? "ما القرار أو الدليل أو المسؤولية التي ما زالت موجودة خارج النظام؟"
                        : "Which decision, evidence or responsibility still exists outside the system?"}
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--color-abyssal-ink)] pt-7">
                    <Link
                      href={`${localizedPath(locale)}?request=insight#assessment`}
                      className="mono-label inline-flex h-11 items-center gap-3 bg-[var(--color-abyssal-ink)] px-4 text-white outline-none hover:bg-[var(--color-graphite)] focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-offset-4"
                    >
                      {isRtl ? "ناقش الموضوع مع ANU" : "Discuss with ANU"}
                      <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </article>

        <section
          className="bg-[var(--color-tissue)] py-20 lg:py-28"
          aria-labelledby="related-insights"
        >
          <Container>
            <div className="flex items-end justify-between gap-6 border-b border-[var(--color-abyssal-ink)] pb-6">
              <div>
                <p className="mono-label text-[var(--color-graphite)]">
                  {categoryLabels[insight.category][locale]}
                </p>
                <h2
                  id="related-insights"
                  className="mt-4 text-[clamp(2.6rem,5vw,5rem)] leading-none tracking-[-0.035em]"
                >
                  {isRtl ? "رؤى ذات صلة" : "Related insights"}
                </h2>
              </div>
            </div>
            <div className="grid gap-0 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={localizedPath(locale, `/insights/${item.slug}`)}
                  className="group border-b border-[var(--color-lichen)] py-8 outline-none focus-visible:bg-white md:border-e md:px-6 md:first:ps-0 md:last:border-e-0 md:last:pe-0"
                >
                  <p className="mono-label text-[var(--color-graphite)]">
                    {categoryLabels[item.category][locale]}
                  </p>
                  <h3 className="mt-5 text-[clamp(1.65rem,2.8vw,2.55rem)] leading-[1.04] tracking-[-0.025em]">
                    {item.title[locale]}
                  </h3>
                  <span className="mono-label mt-7 inline-flex items-center gap-2 text-[var(--color-graphite)] group-hover:text-[var(--color-abyssal-ink)]">
                    {isRtl ? "اقرأ" : "Read"}
                    <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </PageShell>
  )
}
