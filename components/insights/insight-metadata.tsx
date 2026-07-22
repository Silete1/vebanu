import type { Locale } from "@/lib/i18n"
import {
  categoryLabels,
  contentTypeLabels,
  type Insight,
} from "@/lib/content/insights"
import { cn } from "@/lib/utils"

type InsightMetadataProps = {
  insight: Insight
  locale: Locale
  className?: string
  showCategory?: boolean
  inverse?: boolean
}

export function InsightMetadata({
  insight,
  locale,
  className,
  showCategory = true,
  inverse = false,
}: InsightMetadataProps) {
  const date = new Intl.DateTimeFormat(locale === "ar" ? "ar-IQ" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${insight.date}T12:00:00Z`))

  return (
    <div
      className={cn(
        "mono-label flex flex-wrap items-center gap-x-2 gap-y-1",
        inverse ? "text-white/64" : "text-[var(--color-graphite)]",
        className
      )}
    >
      <span>{contentTypeLabels[insight.contentType][locale]}</span>
      {showCategory ? (
        <>
          <span aria-hidden="true">/</span>
          <span>{categoryLabels[insight.category][locale]}</span>
        </>
      ) : null}
      <span aria-hidden="true">/</span>
      <time dateTime={insight.date}>{date}</time>
      <span aria-hidden="true">/</span>
      <span dir="ltr">
        {insight.readingTime}{" "}
        {locale === "ar"
          ? "دقيقة"
          : insight.contentType === "Video Insight"
            ? "min watch"
            : "min read"}
      </span>
    </div>
  )
}
