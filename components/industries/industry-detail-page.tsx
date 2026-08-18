import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react"

import { AssessmentCtaSection } from "@/components/home/assessment-cta-section"
import { Container } from "@/components/layout/container"
import type { Industry } from "@/lib/content/industries"
import { categoryLabels, getInsightBySlug } from "@/lib/content/insights"
import { industriesPageCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

type IndustryDetailPageProps = {
  industry: Industry
  locale: Locale
}

export function IndustryDetailPage({
  industry,
  locale,
}: IndustryDetailPageProps) {
  const copy = industriesPageCopy[locale]
  const relatedInsights = industry.relatedInsightSlugs
    .map((slug) => getInsightBySlug(slug))
    .filter((insight) => insight !== undefined)

  return (
    <div className="bg-[var(--color-bone-white)]">
      <header
        className="bg-[var(--color-abyssal-ink)] pt-32 pb-8 text-white sm:pt-36 lg:pt-40 lg:pb-12"
        data-header-theme="dark"
      >
        <Container>
          <nav aria-label={copy.breadcrumbLabel}>
            <ol className="mono-label flex flex-wrap items-center gap-2 text-white/58">
              <li>
                <Link
                  href={localizedPath(locale, "/industries")}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg transition-colors outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-abyssal-ink)]"
                >
                  <ArrowLeftIcon className="size-4" aria-hidden="true" />
                  {copy.breadcrumb}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/82">
                {industry.shortName}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-end lg:gap-14">
            <div>
              <p className="mono-label text-blue-300">
                {industry.hero.eyebrow}
              </p>
              <h1 className="mt-6 max-w-[14ch] text-[clamp(3.1rem,7vw,6rem)] leading-[0.96] tracking-[-0.04em]">
                {industry.hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.42] text-white/70">
                {industry.hero.description}
              </p>
              <Link
                href={`${localizedPath(locale)}?request=${industry.slug}#assessment`}
                className="mono-label mt-8 inline-flex min-h-11 items-center gap-3 rounded-lg bg-blue-600 px-4 text-white transition-colors outline-none hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-abyssal-ink)]"
              >
                {copy.startAssessment}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <figure className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-slate-900">
              <Image
                src={industry.visual.imageUrl}
                alt={industry.visual.alt}
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/42 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="sr-only">
                {industry.visual.description}
              </figcaption>
            </figure>
          </div>
        </Container>
      </header>

      <div>
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:gap-14">
              <p className="mono-label pt-1 text-[var(--color-graphite)]">
                {copy.changesLabel}
              </p>
              <p className="max-w-4xl text-[clamp(1.45rem,2.35vw,2.35rem)] leading-[1.24] tracking-[-0.025em]">
                {industry.directAnswer}
              </p>
            </div>
          </Container>
        </section>

        <section
          className="bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-24"
          aria-labelledby="control-breaks-title"
        >
          <Container>
            <h2
              id="control-breaks-title"
              className="max-w-[12ch] text-[clamp(2.7rem,5.5vw,5.4rem)] leading-[0.98] tracking-[-0.04em]"
            >
              {copy.problemsTitle}
            </h2>
            <div className="mt-12 grid border-t border-[var(--color-abyssal-ink)] md:grid-cols-2">
              {industry.problems.map((problem, index) => (
                <article
                  key={problem.title}
                  className="border-b border-[var(--color-lichen)] py-7 md:px-7 md:odd:border-e md:odd:ps-0 md:even:pe-0"
                >
                  <p className="mono-label text-blue-700">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-[clamp(1.6rem,2.4vw,2.35rem)] leading-[1.08] tracking-[-0.025em]">
                    {problem.title}
                  </h3>
                  <p className="mt-4 max-w-[56ch] text-base leading-7 text-[var(--color-graphite)]">
                    {problem.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-3xl">
              <h2 className="text-[clamp(2.7rem,5vw,5rem)] leading-[0.98] tracking-[-0.04em]">
                {industry.workflow.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-7 text-[var(--color-graphite)]">
                {industry.workflow.description}
              </p>
            </div>

            <ol className="mt-12 grid border-t border-[var(--color-abyssal-ink)] md:grid-cols-2">
              {industry.workflow.stages.map((stage, index) => (
                <li
                  key={stage.name}
                  className="grid grid-cols-[44px_1fr] gap-4 border-b border-[var(--color-lichen)] py-7 md:px-7 md:odd:border-e md:odd:ps-0 md:even:pe-0"
                >
                  <span
                    className="mono-label pt-1 text-blue-700"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl tracking-[-0.025em]">
                      {stage.name}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-sm leading-6 text-[var(--color-graphite)]">
                      {stage.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section
          className="bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-24"
          aria-labelledby="odoo-map-title"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
              <div>
                <p className="mono-label text-blue-700">{copy.odooLabel}</p>
                <h2
                  id="odoo-map-title"
                  className="mt-5 text-[clamp(2.7rem,4.5vw,4.6rem)] leading-[0.98] tracking-[-0.04em]"
                >
                  {copy.odooTitle}
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-graphite)]">
                  {copy.odooDescription}
                </p>
              </div>

              <div className="border-t border-[var(--color-abyssal-ink)]">
                {industry.odooCapabilities.map((mapping) => (
                  <article
                    key={mapping.need}
                    className="grid gap-4 border-b border-[var(--color-lichen)] py-7 sm:grid-cols-[0.38fr_0.62fr] sm:gap-8"
                  >
                    <div>
                      <h3 className="text-xl tracking-[-0.02em]">
                        {mapping.need}
                      </h3>
                      <p className="mono-label mt-3 text-blue-700">
                        {mapping.capabilities.join(" / ")}
                      </p>
                    </div>
                    <p className="text-base leading-7 text-[var(--color-graphite)]">
                      {mapping.application}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-24">
          <Container>
            <h2 className="max-w-[12ch] text-[clamp(2.7rem,5vw,5rem)] leading-[0.98] tracking-[-0.04em]">
              {copy.questionsTitle}
            </h2>
            <div className="mt-12 grid border-t border-[var(--color-abyssal-ink)] md:grid-cols-2">
              {industry.buyerQuestions.map((item) => (
                <article
                  key={item.question}
                  className="border-b border-[var(--color-lichen)] py-7 md:px-7 md:odd:border-e md:odd:ps-0 md:even:pe-0"
                >
                  <h3 className="text-[clamp(1.45rem,2.2vw,2rem)] leading-[1.1] tracking-[-0.025em]">
                    {item.question}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-base leading-7 text-[var(--color-graphite)]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section
          className="bg-[var(--color-bone-white)] py-16 sm:py-20 lg:py-24"
          aria-labelledby="related-insights-title"
        >
          <Container>
            <div className="flex flex-col gap-5 border-b border-[var(--color-abyssal-ink)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="related-insights-title"
                className="text-[clamp(2.7rem,5vw,5rem)] leading-none tracking-[-0.04em]"
              >
                {copy.relatedTitle}
              </h2>
              <Link
                href={localizedPath(locale, "/insights")}
                className="mono-label inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-2 outline-none hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
              >
                {copy.viewInsights}
                <ArrowUpRightIcon className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3">
              {relatedInsights.map((insight) => (
                <Link
                  key={insight.slug}
                  href={localizedPath(locale, `/insights/${insight.slug}`)}
                  className="group border-b border-[var(--color-lichen)] py-7 outline-none focus-visible:bg-white md:border-e md:px-6 md:first:ps-0 md:last:border-e-0 md:last:pe-0"
                >
                  <p className="mono-label text-[var(--color-graphite)]">
                    {categoryLabels[insight.category][locale]}
                  </p>
                  <h3 className="mt-5 text-[clamp(1.55rem,2.4vw,2.2rem)] leading-[1.08] tracking-[-0.025em]">
                    {insight.title[locale]}
                  </h3>
                  <span className="mono-label mt-7 inline-flex items-center gap-2 text-blue-700">
                    {copy.readInsight}
                    <ArrowUpRightIcon
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <AssessmentCtaSection locale={locale} />
    </div>
  )
}
