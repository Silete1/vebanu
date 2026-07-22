import Link from "next/link"
import { ArrowUpRightIcon, PlayIcon } from "lucide-react"

import { InsightMetadata } from "@/components/insights/insight-metadata"
import { InsightVisual } from "@/components/insights/insight-visual"
import type { Insight } from "@/lib/content/insights"
import type { Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type InsightCardProps = {
  insight: Insight
  locale: Locale
  active: boolean
  onActivate: () => void
  visualAlignment?: "start" | "end"
}

export function InsightCard({
  insight,
  locale,
  active,
  onActivate,
  visualAlignment = "start",
}: InsightCardProps) {
  const isVideo = insight.contentType === "Video Insight"
  const href = `/insights/${insight.slug}${locale === "ar" ? "?locale=ar" : ""}`
  const readLabel =
    locale === "ar"
      ? isVideo
        ? "شاهد الملاحظة"
        : "اقرأ الملاحظة"
      : isVideo
        ? "Watch field note"
        : "Read field note"

  return (
    <article
      id={insight.slug}
      data-insight-item
      className="border-t border-[var(--color-lichen)] first:border-[var(--color-abyssal-ink)]"
    >
      <Link
        href={href}
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className={cn(
          "group relative grid grid-cols-[minmax(0,1fr)_2.75rem] gap-x-5 py-8 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-inset sm:px-4 lg:min-h-44 lg:content-center lg:px-7 lg:py-9",
          active ? "bg-white" : "hover:bg-white focus-visible:bg-white"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-6 start-0 w-[3px] origin-center bg-[var(--color-bioluminescent-lime)] transition-transform duration-300",
            active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
          )}
        />

        <div className="min-w-0">
          <InsightMetadata insight={insight} locale={locale} />
          <h3
            className={cn(
              "mt-4 max-w-[23ch] text-[clamp(1.75rem,2.8vw,3.2rem)] leading-[1.02] tracking-[-0.03em] transition-colors",
              active && "text-[var(--color-abyssal-ink)]"
            )}
          >
            {insight.title[locale]}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className={cn(
            "mt-0 grid size-11 place-items-center self-center border transition-all duration-300",
            active
              ? "border-[var(--color-bioluminescent-lime)] bg-[var(--color-bioluminescent-lime)] text-white"
              : "border-[var(--color-lichen)] text-[var(--color-abyssal-ink)] group-hover:border-[var(--color-bioluminescent-lime)] group-hover:bg-[var(--color-bioluminescent-lime)] group-hover:text-white"
          )}
        >
          {isVideo ? (
            <PlayIcon className="size-3.5 fill-current" />
          ) : (
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          )}
        </span>

        <div
          className={cn(
            "relative col-span-2 mt-7 w-[92%] overflow-hidden lg:hidden",
            visualAlignment === "end" && "ms-auto"
          )}
        >
          <InsightVisual
            variant={insight.visual}
            alt={insight.visualAlt[locale]}
            className="aspect-[4/3] min-h-0 transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
          {isVideo ? (
            <span
              className="absolute start-4 bottom-4 grid size-10 place-items-center rounded-full bg-white text-[var(--color-abyssal-ink)] shadow-sm"
              aria-hidden="true"
            >
              <PlayIcon className="size-3.5 fill-current" />
            </span>
          ) : null}
        </div>

        <p className="col-span-2 mt-5 max-w-2xl text-base leading-[1.45] text-[var(--color-graphite)] lg:hidden">
          {insight.summary[locale]}
        </p>
        <span className="mono-label col-span-2 mt-5 inline-flex w-fit items-center gap-2 text-[var(--color-graphite)] lg:hidden">
          {readLabel}
          <ArrowUpRightIcon className="size-3.5 rtl:-scale-x-100" />
        </span>
      </Link>
    </article>
  )
}
