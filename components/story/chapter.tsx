import type { CSSProperties, ReactNode } from "react"

import { Glyph } from "@/components/story/glyph"

export type ChapterMark = { id: string; title: string }

/** A numbered part of a story. Its glyph fills as it is read; the rail beside the story follows it. */
export function Chapter({
  id,
  index,
  kicker,
  title,
  lede,
  children,
  tone = "paper",
}: {
  id: string
  index: number
  kicker: string
  title: string
  lede?: string
  children: ReactNode
  tone?: "paper" | "desk" | "night"
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`anu-chapter anu-chapter--${tone}${tone === "night" ? " anu-night" : ""}`}
      style={{ viewTimelineName: `--ch-${id}` } as CSSProperties}
    >
      <header className="anu-chapter__head">
        <p className="anu-kicker">
          <span className="anu-num">{String(index).padStart(2, "0")}</span>
          <Glyph read />
          {kicker}
        </p>
        <h2 id={`${id}-title`} className="anu-chapter__title anu-reveal">
          {title}
        </h2>
        {lede ? <p className="anu-lede anu-reveal">{lede}</p> : null}
      </header>
      {children}
    </section>
  )
}

/** The rail beside a story (wide screens): one glyph per chapter, filled by the reader's own scroll. */
export function ChapterRail({ label, chapters }: { label: string; chapters: ChapterMark[] }) {
  return (
    <nav aria-label={label} className="anu-rail">
      <ol>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a href={`#${chapter.id}`}>
              <span
                className="anu-glyph anu-rail__glyph"
                aria-hidden="true"
                style={{ animationTimeline: `--ch-${chapter.id}` } as CSSProperties}
              />
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Wraps a story so the rail can see every chapter's timeline. */
export function Story({ chapters, children }: { chapters: ChapterMark[]; children: ReactNode }) {
  return (
    <div className="anu-story" style={{ timelineScope: chapters.map((c) => `--ch-${c.id}`).join(", ") } as CSSProperties}>
      {children}
    </div>
  )
}
