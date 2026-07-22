import Link from "next/link"
import { ArrowUpRightIcon, PlayIcon } from "lucide-react"

import { InsightMetadata } from "@/components/insights/insight-metadata"
import type { Insight } from "@/lib/content/insights"
import type { Locale } from "@/lib/i18n"

type InsightIndexRowProps = {
  insight: Insight
  locale: Locale
}

export function InsightIndexRow({ insight, locale }: InsightIndexRowProps) {
  const isVideo = insight.contentType === "Video Insight"
  const href = `/insights/${insight.slug}${locale === "ar" ? "?locale=ar" : ""}`

  return (
    <article
      data-insight-item
      className="border-t border-[var(--color-lichen)]"
    >
      <Link
        href={href}
        className="group grid min-h-60 grid-cols-[minmax(0,1fr)_2.75rem] content-between gap-x-6 py-7 transition-colors outline-none hover:bg-white focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[var(--color-bioluminescent-lime)] focus-visible:ring-inset sm:px-5 lg:min-h-64 lg:px-6"
      >
        <div className="min-w-0">
          <InsightMetadata insight={insight} locale={locale} />
          <h3 className="mt-5 max-w-[21ch] text-[clamp(1.65rem,2.5vw,2.65rem)] leading-[1.04] tracking-[-0.028em]">
            {insight.title[locale]}
          </h3>
        </div>

        <span className="grid size-11 place-items-center self-start border border-[var(--color-lichen)] text-[var(--color-abyssal-ink)] transition-colors group-hover:border-[var(--color-bioluminescent-lime)] group-hover:bg-[var(--color-bioluminescent-lime)] group-hover:text-white">
          {isVideo ? (
            <PlayIcon className="size-3.5 fill-current" />
          ) : (
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          )}
        </span>

        <p className="col-span-2 mt-7 max-w-2xl text-base leading-[1.45] text-[var(--color-graphite)]">
          {insight.summary[locale]}
        </p>
      </Link>
    </article>
  )
}
