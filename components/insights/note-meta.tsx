import { categoryLabels, contentTypeLabels, type Insight, notesCopy } from "@/lib/content/insights"
import type { Locale } from "@/lib/i18n"

/** A note's minutes: the figure in mono, the unit in words. */
export function NoteMinutes({ insight, locale }: { insight: Insight; locale: Locale }) {
  const { minutes } = notesCopy[locale]
  return (
    <span>
      <span className="anu-num">{insight.readingTime}</span> {insight.contentType === "Video Insight" ? minutes.watch : minutes.read}
    </span>
  )
}

/** Kind, topic, date and minutes of one field note, on one hairline-separated line. */
export function NoteMeta({ insight, locale }: { insight: Insight; locale: Locale }) {
  return (
    <ul className="anu-meta">
      <li>{contentTypeLabels[insight.contentType][locale]}</li>
      <li>{categoryLabels[insight.category][locale]}</li>
      <li>
        <time dateTime={insight.date} className="anu-num">
          {insight.date}
        </time>
      </li>
      <li>
        <NoteMinutes insight={insight} locale={locale} />
      </li>
    </ul>
  )
}
