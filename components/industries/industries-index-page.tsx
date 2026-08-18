import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { AssessmentCtaSection } from "@/components/home/assessment-cta-section"
import { IndustriesAccordionShowcase } from "@/components/industries/industries-accordion-showcase"
import { Container } from "@/components/layout/container"
import { getIndustries } from "@/lib/content/industries"
import { industriesPageCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

export function IndustriesIndexPage({ locale }: { locale: Locale }) {
  const copy = industriesPageCopy[locale]
  const industries = getIndustries(locale)

  return (
    <div className="bg-[var(--color-bone-white)]">
      <header
        className="bg-[var(--color-abyssal-ink)] pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-24"
        data-header-theme="dark"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.64fr_0.36fr] lg:items-end lg:gap-16">
            <div>
              <p className="mono-label text-blue-300">{copy.index.eyebrow}</p>
              <h1 className="mt-6 max-w-[11ch] text-[clamp(3.35rem,7.5vw,6rem)] leading-[0.94] tracking-[-0.04em]">
                {copy.index.title}
              </h1>
            </div>
            <div className="border-t border-white/22 pt-6 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0">
              <p className="text-[clamp(1.1rem,1.5vw,1.35rem)] leading-[1.42] text-white/70">
                {copy.index.description}
              </p>
              <Link
                href={`${localizedPath(locale)}?request=industries#assessment`}
                className="mono-label mt-7 inline-flex min-h-11 items-center gap-3 rounded-lg bg-blue-600 px-4 text-white transition-colors outline-none hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-abyssal-ink)]"
              >
                {copy.startAssessment}
                <ArrowUpRightIcon
                  className="size-4 rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <section className="py-16 sm:py-20 lg:py-24" data-header-theme="light">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-[clamp(2.7rem,5vw,5rem)] leading-[0.98] tracking-[-0.04em]">
              {copy.index.chooseTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-7 text-[var(--color-graphite)]">
              {copy.index.chooseDescription}
            </p>
          </div>

          <IndustriesAccordionShowcase
            compactMobile
            locale={locale}
            className="mt-10"
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
            <div>
              <p className="mono-label text-blue-700">{copy.index.fitLabel}</p>
              <h2 className="mt-5 text-[clamp(2.7rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.04em]">
                {copy.index.fitTitle}
              </h2>
              <p className="mt-6 max-w-md text-base leading-7 text-[var(--color-graphite)]">
                {copy.index.fitDescription}
              </p>
            </div>

            <div className="border-t border-[var(--color-abyssal-ink)]">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={localizedPath(locale, industry.href)}
                  className="group grid gap-4 border-b border-[var(--color-lichen)] py-7 transition-colors outline-none hover:bg-[var(--color-bone-white)] focus-visible:bg-[var(--color-bone-white)] sm:grid-cols-[0.38fr_0.62fr] sm:gap-8 sm:px-4"
                >
                  <h3 className="text-[clamp(1.45rem,2vw,1.9rem)] leading-[1.08] tracking-[-0.025em]">
                    {industry.name}
                  </h3>
                  <span className="flex items-start justify-between gap-6">
                    <span className="max-w-[52ch] text-base leading-7 text-[var(--color-graphite)]">
                      {industry.cardDescription}
                    </span>
                    <ArrowUpRightIcon
                      className="mt-1 size-4 shrink-0 text-blue-700 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <AssessmentCtaSection locale={locale} />
    </div>
  )
}
