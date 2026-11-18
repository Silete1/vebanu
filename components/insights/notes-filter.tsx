"use client"

import { type ReactNode, useState } from "react"

import { Glyph } from "@/components/story/glyph"

export type NotesTopic = { key: string; label: string; count: number }

/**
 * The field-note index with its topic glyphs. Every note is server HTML and
 * shows before any script runs; the island only narrows the list once a
 * topic is chosen. The chosen topic's square fills, as a status would.
 */
export function NotesFilter({
  topics,
  notes,
  labels,
}: {
  topics: NotesTopic[]
  notes: { slug: string; topic: string; row: ReactNode }[]
  labels: { group: string; showing: string; of: string; empty: string }
}) {
  const [active, setActive] = useState(topics[0]?.key ?? "")
  const all = topics[0]?.key
  const shown = active === all ? notes : notes.filter((note) => note.topic === active)

  return (
    <>
      <div className="anu-topics" role="group" aria-label={labels.group}>
        {topics.map((topic) => (
          <button
            key={topic.key}
            type="button"
            className="anu-topic"
            aria-pressed={active === topic.key}
            onClick={() => setActive(topic.key)}
          >
            <Glyph state={active === topic.key ? "due" : "neutral"} />
            {topic.label}
            <span className="anu-num">{topic.count}</span>
          </button>
        ))}
      </div>
      <p className="anu-topics__status" aria-live="polite">
        {labels.showing} <span className="anu-num">{shown.length}</span> {labels.of}{" "}
        <span className="anu-num">{notes.length}</span>
      </p>
      {shown.length ? (
        <ul className="anu-notelist">
          {shown.map((note) => (
            <li key={note.slug}>{note.row}</li>
          ))}
        </ul>
      ) : (
        <p className="anu-notelist__empty">{labels.empty}</p>
      )}
    </>
  )
}
