import Link from "next/link"

import { Glyph, statusGlyph } from "@/components/story/glyph"
import { Poster } from "@/components/story/poster"
import type { LocalizedSystem } from "@/lib/content/systems"
import { storyCopy } from "@/lib/content/story-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

/** Systems as doors: picture, status and pitch; the pointed card comes forward. */
export function SystemCards({ systems, locale, eager = false }: { systems: LocalizedSystem[]; locale: Locale; eager?: boolean }) {
  const copy = storyCopy[locale]
  return (
    <ul className="anu-cards anu-focus">
      {systems.map((system) => (
        <li key={system.slug} className="anu-focus-item">
          <Link href={localizedPath(locale, `/systems/${system.slug}`)} className="anu-card anu-lit">
            <Poster
              src={system.visual.poster}
              alt=""
              className="anu-card__picture anu-focus-pic"
              priority={eager}
              sizes="(min-width: 72rem) 30vw, (min-width: 40rem) 45vw, 100vw"
            />
            <span className="anu-card__status anu-kicker">
              <Glyph state={statusGlyph(system.status)} />
              {copy.status[system.status]}
            </span>
            <span className="anu-card__name">{system.copy.name}</span>
            <span className="anu-card__pitch">{system.copy.pitch}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
