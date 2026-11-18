import Link from "next/link"

import { NoteMinutes } from "@/components/insights/note-meta"
import { Glyph } from "@/components/story/glyph"
import { categoryLabels, type Insight } from "@/lib/content/insights"
import { type Locale, localizedPath } from "@/lib/i18n"

/** One field note in an index: topic, date and minutes beside the title and summary. */
export function NoteRow({ insight, locale }: { insight: Insight; locale: Locale }) {
  return (
    <Link href={localizedPath(locale, `/insights/${insight.slug}`)} className="anu-noterow anu-lit">
      <div className="anu-noterow__meta">
        <span className="anu-noterow__topic">
          <Glyph />
          {categoryLabels[insight.category][locale]}
        </span>
        <time dateTime={insight.date} className="anu-num">
          {insight.date}
        </time>
        <NoteMinutes insight={insight} locale={locale} />
      </div>
      <div className="anu-noterow__text">
        <h3 className="anu-noterow__title">{insight.title[locale]}</h3>
        <p className="anu-noterow__summary">{insight.summary[locale]}</p>
      </div>
    </Link>
  )
}

/** A ruled list of field notes, newest first as given. */
export function NoteList({ insights, locale }: { insights: Insight[]; locale: Locale }) {
  return (
    <ul className="anu-notelist">
      {insights.map((insight) => (
        <li key={insight.slug}>
          <NoteRow insight={insight} locale={locale} />
        </li>
      ))}
    </ul>
  )
}
