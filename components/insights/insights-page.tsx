"use client"

import { startTransition, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { InsightCard } from "@/components/insights/insight-card"
import { InsightIndexRow } from "@/components/insights/insight-index-row"
import { InsightMetadata } from "@/components/insights/insight-metadata"
import { InsightPagination } from "@/components/insights/insight-pagination"
import {
  InsightTopicFilter,
  type InsightFilterCategory,
} from "@/components/insights/insight-topic-filter"
import { InsightVisual } from "@/components/insights/insight-visual"
import { Container } from "@/components/layout/container"
import {
  featuredInsight as fallbackFeaturedInsight,
  insightCategories,
  type Insight,
} from "@/lib/content/insights"
import { type Locale, localizedPath } from "@/lib/i18n"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const insightsPerPage = 6
const ledgerSize = 3

const interfaceCopy = {
  en: {
    eyebrow: "ANU / FIELD NOTES",
    title: "Insights",
    featured: "Featured field note",
    readFeatured: "Read field note",
    browse: "Topic",
    archive: "Field notes index",
    archiveTitle: "Working notes for a more controlled business.",
    archiveDescription:
      "Short, practical observations drawn from ERP delivery, process work and management-control questions.",
    ordered: "Newest first",
    earlier: "Earlier field notes",
    earlierDescription: "More notes from the same chronological archive.",
    index: "Field notes",
    indexDescription:
      "Notes matching the selected topic, ordered by publication date.",
    page: "Page",
    previous: "Previous",
    next: "Next",
    showing: "Showing",
    of: "of",
    paginationLabel: "Field notes pages",
    choosePage: "Choose a field notes page",
    filtersLabel: "Filter insights by topic",
    shown: "field notes",
    shownSingle: "field note",
    empty: "No field notes have been published in this topic yet.",
    closingLabel: "ANU INSIGHTS / DIRECT",
    closing:
      "Receive practical insights on operations, business control and ERP implementation.",
    closingBody:
      "A concise editorial note for leaders working through process, reporting and implementation decisions.",
    subscribe: "Discuss insights with ANU",
  },
  ar: {
    eyebrow: "ANU / ملاحظات ميدانية",
    title: "رؤى",
    featured: "ملاحظة ميدانية مميزة",
    readFeatured: "اقرأ الملاحظة",
    browse: "الموضوع",
    archive: "فهرس الملاحظات الميدانية",
    archiveTitle: "ملاحظات عملية لأعمال أكثر انضباطاً.",
    archiveDescription:
      "ملاحظات قصيرة وعملية من واقع تطبيق ERP وتصميم العمليات وأسئلة الضبط الإداري.",
    ordered: "الأحدث أولاً",
    earlier: "ملاحظات ميدانية سابقة",
    earlierDescription: "ملاحظات إضافية من الأرشيف الزمني نفسه.",
    index: "ملاحظات ميدانية",
    indexDescription: "ملاحظات تطابق الموضوع المختار ومرتبة حسب تاريخ النشر.",
    page: "الصفحة",
    previous: "السابق",
    next: "التالي",
    showing: "عرض",
    of: "من",
    paginationLabel: "صفحات الملاحظات الميدانية",
    choosePage: "اختر صفحة الملاحظات الميدانية",
    filtersLabel: "تصفية الرؤى حسب الموضوع",
    shown: "ملاحظات ميدانية",
    shownSingle: "ملاحظة ميدانية",
    empty: "لم تُنشر ملاحظات ميدانية في هذا الموضوع بعد.",
    closingLabel: "رؤى ANU / مباشرة",
    closing: "استلم رؤى عملية حول العمليات وضبط الأعمال وتطبيق أنظمة ERP.",
    closingBody:
      "موجز تحريري لقادة الأعمال الذين يعملون على قرارات العمليات والتقارير والتطبيق.",
    subscribe: "ناقش الرؤى مع ANU",
  },
} as const

type InsightsPageProps = {
  initialInsights: Insight[]
  locale: Locale
}

export function InsightsPage({ initialInsights, locale }: InsightsPageProps) {
  const [activeCategory, setActiveCategory] =
    useState<InsightFilterCategory>("All")
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const rootRef = useRef<HTMLDivElement>(null)
  const archiveRef = useRef<HTMLDivElement>(null)
  const archiveTopRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const hasFiltered = useRef(false)

  const copy = interfaceCopy[locale]
  const isRtl = locale === "ar"
  const numberFormat = useMemo(
    () => new Intl.NumberFormat(isRtl ? "ar-IQ" : "en-GB"),
    [isRtl]
  )
  const sortedInsights = useMemo(
    () => [...initialInsights].sort((a, b) => b.date.localeCompare(a.date)),
    [initialInsights]
  )
  const featuredInsight = useMemo(
    () =>
      sortedInsights.find((insight) => insight.featured) ??
      sortedInsights[0] ??
      fallbackFeaturedInsight,
    [sortedInsights]
  )
  const archiveInsights = useMemo(
    () =>
      sortedInsights.filter((insight) => insight.slug !== featuredInsight.slug),
    [featuredInsight.slug, sortedInsights]
  )
  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(
      insightCategories.map((category) => [category, 0])
    ) as Record<InsightFilterCategory, number>

    counts.All = archiveInsights.length
    archiveInsights.forEach((insight) => {
      counts[insight.category] += 1
    })

    return counts
  }, [archiveInsights])
  const visibleInsights = useMemo(
    () =>
      activeCategory === "All"
        ? archiveInsights
        : archiveInsights.filter(
            (insight) => insight.category === activeCategory
          ),
    [activeCategory, archiveInsights]
  )
  const visibleCount = visibleInsights.length
  const pageCount = Math.max(1, Math.ceil(visibleCount / insightsPerPage))
  const pageStartIndex = (currentPage - 1) * insightsPerPage
  const pageInsights = visibleInsights.slice(
    pageStartIndex,
    pageStartIndex + insightsPerPage
  )
  const ledgerInsights: Insight[] =
    pageInsights.length >= ledgerSize ? pageInsights.slice(0, ledgerSize) : []
  const indexInsights =
    ledgerInsights.length > 0 ? pageInsights.slice(ledgerSize) : pageInsights
  const shownStart = visibleCount === 0 ? 0 : pageStartIndex + 1
  const shownEnd = Math.min(pageStartIndex + pageInsights.length, visibleCount)
  const shownRange =
    shownStart === shownEnd
      ? numberFormat.format(shownStart)
      : `${numberFormat.format(shownStart)}–${numberFormat.format(shownEnd)}`
  const activePreview =
    ledgerInsights.find((insight) => insight.slug === activeSlug) ??
    ledgerInsights[0] ??
    null

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          const { reduceMotion, desktop } = context.conditions ?? {}
          const title = rootRef.current?.querySelector("[data-insights-title]")
          const heroContent = rootRef.current?.querySelector(
            "[data-insights-featured]"
          )
          const heroVisual = rootRef.current?.querySelector(
            "[data-insights-hero-visual]"
          )
          const introItems = [title, heroContent, heroVisual].filter(
            (item): item is Element => Boolean(item)
          )

          if (reduceMotion) {
            gsap.set(introItems, {
              clearProps: "all",
              opacity: 1,
            })
            return
          }

          if (title && heroContent && heroVisual) {
            const intro = gsap.timeline({ defaults: { ease: "power4.out" } })
            intro
              .fromTo(
                title,
                { opacity: 0, yPercent: 42, clipPath: "inset(0 0 100% 0)" },
                {
                  opacity: 1,
                  yPercent: 0,
                  clipPath: "inset(0 0 0% 0)",
                  duration: 1,
                },
                0.05
              )
              .fromTo(
                heroVisual,
                {
                  clipPath: "inset(0 0 100% 0)",
                  scale: desktop ? 1.025 : 1,
                },
                {
                  clipPath: "inset(0 0 0% 0)",
                  scale: 1,
                  duration: 1.05,
                  ease: "power3.inOut",
                },
                0.22
              )
              .fromTo(
                heroContent,
                { opacity: 0, y: 48 },
                { opacity: 1, y: 0, duration: 0.85 },
                0.45
              )
          }

          gsap.utils
            .toArray<HTMLElement>("[data-insight-reveal]")
            .forEach((section) => {
              gsap.fromTo(
                section,
                { opacity: 0, y: desktop ? 64 : 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  ease: "power4.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 84%",
                    once: true,
                  },
                }
              )
            })
        }
      )

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  useGSAP(
    () => {
      if (!hasFiltered.current) {
        hasFiltered.current = true
        return
      }

      const items = archiveRef.current?.querySelectorAll<HTMLElement>(
        "[data-insight-item]"
      )
      if (!items?.length) return

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { clearProps: "all" })
        return
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.58,
          stagger: 0.055,
          ease: "power3.out",
          onComplete: () => ScrollTrigger.refresh(),
        }
      )
    },
    {
      scope: archiveRef,
      dependencies: [activeCategory, currentPage],
      revertOnUpdate: true,
    }
  )

  useGSAP(
    () => {
      const preview = previewRef.current?.querySelector<HTMLElement>(
        "[data-ledger-preview]"
      )
      if (!preview) return

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(preview, { clearProps: "all" })
        return
      }

      gsap.fromTo(
        preview,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.48, ease: "power3.out" }
      )
    },
    {
      scope: previewRef,
      dependencies: [activePreview?.slug],
      revertOnUpdate: true,
    }
  )

  const selectCategory = (category: InsightFilterCategory) => {
    startTransition(() => {
      setActiveCategory(category)
      setActiveSlug(null)
      setCurrentPage(1)
    })
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > pageCount || page === currentPage) return

    startTransition(() => {
      setCurrentPage(page)
      setActiveSlug(null)
    })

    window.requestAnimationFrame(() => {
      archiveTopRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      })
    })
  }

  return (
    <div
      ref={rootRef}
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className="bg-[var(--color-bone-white)]"
    >
      <section
        className="pt-32 pb-24 sm:pt-36 lg:pt-40 lg:pb-28"
        data-header-theme="light"
        aria-labelledby="insights-title"
      >
        <Container>
          <div className="flex items-center border-b border-[var(--color-abyssal-ink)] pb-4">
            <p className="mono-label tag-dot flex items-center gap-2 text-[var(--color-graphite)]">
              {copy.eyebrow}
            </p>
          </div>

          <div className="pt-7">
            <div className="pb-[0.1em]">
              <h1
                id="insights-title"
                data-insights-title
                className="text-[clamp(5rem,12vw,6rem)] leading-[0.86] tracking-[-0.04em]"
              >
                {copy.title}
              </h1>
            </div>
          </div>

          <article className="mt-14 grid gap-0 border-t border-[var(--color-abyssal-ink)] pt-5 lg:mt-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(390px,0.75fr)]">
            <div data-insights-hero-visual className="overflow-hidden">
              <InsightVisual
                variant={featuredInsight.visual}
                alt={featuredInsight.visualAlt[locale]}
                locale={locale}
                dark
                className="min-h-[430px] border-[var(--color-abyssal-ink)] lg:min-h-[560px]"
              />
            </div>
            <div
              data-insights-featured
              className="flex flex-col border-[var(--color-abyssal-ink)] pt-7 lg:border-s lg:py-3 lg:ps-8"
            >
              <p className="mono-label text-[var(--color-bioluminescent-lime)]">
                {copy.featured}
              </p>
              <InsightMetadata
                insight={featuredInsight}
                locale={locale}
                className="mt-5"
              />
              <h2 className="mt-7 text-[clamp(2.35rem,4vw,4.5rem)] leading-[0.98] tracking-[-0.035em]">
                {featuredInsight.title[locale]}
              </h2>
              <p className="mt-6 text-lg leading-[1.35] text-[var(--color-graphite)]">
                {featuredInsight.summary[locale]}
              </p>
              <Link
                href={localizedPath(
                  locale,
                  `/insights/${featuredInsight.slug}`
                )}
                className="mono-label mt-9 inline-flex w-fit items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-offset-4 lg:mt-auto"
              >
                {copy.readFeatured}
                <span className="grid size-10 place-items-center bg-[var(--color-bioluminescent-lime)] text-white transition-transform duration-300 hover:translate-x-1 rtl:hover:-translate-x-1">
                  <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
                </span>
              </Link>
            </div>
          </article>
        </Container>
      </section>

      <section
        id="insights-archive"
        className="bg-[var(--color-bone-white)] py-24 lg:py-32"
        data-header-theme="light"
        aria-labelledby="field-notes-heading"
      >
        <Container>
          <div
            data-insight-reveal
            className="grid gap-8 border-b border-[var(--color-lichen)] pb-10 lg:grid-cols-2 lg:items-end"
          >
            <div>
              <p className="mono-label tag-dot flex items-center gap-2 text-[var(--color-graphite)]">
                {copy.archive}
              </p>
              <h2
                id="field-notes-heading"
                className="mt-7 max-w-[15ch] text-[clamp(2.8rem,5vw,5.3rem)] leading-[0.98] tracking-[-0.035em]"
              >
                {copy.archiveTitle}
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-[1.35] text-[var(--color-graphite)] lg:ms-auto">
              {copy.archiveDescription}
            </p>
          </div>

          <div
            ref={archiveTopRef}
            data-insight-reveal
            className="mt-12 flex scroll-mt-28 flex-col gap-5 border-y border-[var(--color-abyssal-ink)] py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="mono-label text-[var(--color-graphite)]">
                {copy.ordered}
              </p>
              <p
                className="mono-label mt-2 text-[var(--color-graphite)]"
                aria-live="polite"
                aria-atomic="true"
              >
                {copy.showing} {shownRange} {copy.of}{" "}
                {numberFormat.format(visibleCount)}
              </p>
            </div>
            <InsightTopicFilter
              locale={locale}
              value={activeCategory}
              counts={categoryCounts}
              label={copy.browse}
              accessibleLabel={copy.filtersLabel}
              onValueChange={selectCategory}
            />
          </div>

          <div
            id="insights-results"
            ref={archiveRef}
            role="region"
            aria-labelledby="field-notes-heading"
          >
            {pageInsights.length > 0 ? (
              <>
                {ledgerInsights.length > 0 ? (
                  <div
                    dir="ltr"
                    className="mt-10 grid gap-12 lg:grid-cols-[minmax(320px,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(400px,0.9fr)_minmax(0,1.1fr)] xl:gap-20"
                  >
                    <aside
                      ref={previewRef}
                      dir={isRtl ? "rtl" : "ltr"}
                      className="hidden min-w-0 lg:block"
                    >
                      <div className="sticky top-28">
                        {activePreview ? (
                          <div key={activePreview.slug} data-ledger-preview>
                            <InsightVisual
                              variant={activePreview.visual}
                              alt={activePreview.visualAlt[locale]}
                              locale={locale}
                              className="aspect-[4/5] min-h-[520px]"
                            />
                            <div className="border-x border-b border-[var(--color-lichen)] bg-white p-6">
                              <InsightMetadata
                                insight={activePreview}
                                locale={locale}
                                showCategory={false}
                              />
                              <p className="mt-4 text-lg leading-[1.4] text-[var(--color-graphite)]">
                                {activePreview.summary[locale]}
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </aside>

                    <div dir={isRtl ? "rtl" : "ltr"} className="min-w-0">
                      {ledgerInsights.map((insight, index) => (
                        <InsightCard
                          key={insight.slug}
                          insight={insight}
                          locale={locale}
                          active={activePreview?.slug === insight.slug}
                          onActivate={() => setActiveSlug(insight.slug)}
                          visualAlignment={index % 2 === 0 ? "start" : "end"}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {indexInsights.length > 0 ? (
                  <section
                    aria-labelledby="earlier-field-notes-heading"
                    className={
                      ledgerInsights.length > 0
                        ? "mt-20 scroll-mt-28"
                        : "mt-10 scroll-mt-28"
                    }
                  >
                    <div className="grid gap-5 border-t border-[var(--color-abyssal-ink)] py-7 md:grid-cols-2 md:items-end">
                      <h3
                        id="earlier-field-notes-heading"
                        className="text-[clamp(2.4rem,4vw,4.5rem)] leading-none tracking-[-0.035em]"
                      >
                        {ledgerInsights.length > 0 || currentPage > 1
                          ? copy.earlier
                          : copy.index}
                      </h3>
                      <p className="max-w-lg text-base leading-[1.4] text-[var(--color-graphite)] md:ms-auto">
                        {ledgerInsights.length > 0 || currentPage > 1
                          ? copy.earlierDescription
                          : copy.indexDescription}
                      </p>
                    </div>
                    <div
                      className={
                        indexInsights.length === 1
                          ? "grid"
                          : indexInsights.length === 2
                            ? "grid gap-x-12 md:grid-cols-2"
                            : "grid gap-x-8 md:grid-cols-2 lg:grid-cols-3"
                      }
                    >
                      {indexInsights.map((insight) => (
                        <InsightIndexRow
                          key={insight.slug}
                          insight={insight}
                          locale={locale}
                        />
                      ))}
                    </div>
                  </section>
                ) : null}

                {pageCount > 1 ? (
                  <InsightPagination
                    locale={locale}
                    currentPage={currentPage}
                    pageCount={pageCount}
                    pageLabel={copy.page}
                    previousLabel={copy.previous}
                    nextLabel={copy.next}
                    paginationLabel={copy.paginationLabel}
                    choosePageLabel={copy.choosePage}
                    onPageChange={goToPage}
                  />
                ) : null}
              </>
            ) : (
              <p className="mt-10 border-t border-[var(--color-lichen)] py-12 text-lg text-[var(--color-graphite)]">
                {copy.empty}
              </p>
            )}
          </div>
        </Container>
      </section>

      <section
        className="bg-[var(--color-bone-white)] py-12 lg:py-16"
        data-header-theme="light"
      >
        <Container>
          <div
            data-insight-reveal
            className="grid gap-10 border-t border-[var(--color-abyssal-ink)] pt-8 lg:grid-cols-[0.42fr_0.58fr]"
          >
            <p className="mono-label text-[var(--color-graphite)]">
              {copy.closingLabel}
            </p>
            <div>
              <h2 className="max-w-[18ch] text-[clamp(2.5rem,4.5vw,4.8rem)] leading-[1.02] tracking-[-0.035em]">
                {copy.closing}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-[1.35] text-[var(--color-graphite)]">
                {copy.closingBody}
              </p>
              <Link
                href={`${localizedPath(locale)}?request=insights#assessment`}
                className="mono-label mt-8 inline-flex h-11 items-center gap-3 bg-[var(--color-abyssal-ink)] px-4 text-white transition-colors outline-none hover:bg-[var(--color-graphite)] focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-offset-4"
              >
                {copy.subscribe}
                <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
