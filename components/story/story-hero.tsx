import Link from "next/link"

import { Glyph, statusGlyph } from "@/components/story/glyph"
import { Poster } from "@/components/story/poster"
import { SceneSlot } from "@/components/story/scene-slot"
import { getWhatsappHref } from "@/lib/contact"
import type { LocalizedSystem } from "@/lib/content/systems"
import { storyCopy } from "@/lib/content/story-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

/** A system's opening: the ink band with its name large and light, the pitch, and its picture. */
export function StoryHero({ system, locale }: { system: LocalizedSystem; locale: Locale }) {
  const copy = storyCopy[locale]
  const { name, pitch, audience } = system.copy

  return (
    <section className="anu-band anu-hero" aria-labelledby="story-title">
      <div className="anu-wrap anu-hero__grid">
        <div className="anu-hero__text">
          <nav aria-label={copy.systems} className="anu-crumbs">
            <Link href={localizedPath(locale, "/systems")}>{copy.allSystems}</Link>
            <span aria-hidden="true">/</span>
            <span>{copy.group[system.group]}</span>
          </nav>
          <h1 id="story-title" className="anu-display anu-hero__title">
            {name}
          </h1>
          <p className="anu-lede anu-hero__lede">{pitch}</p>
          <p className="anu-kicker anu-hero__status">
            <Glyph state={statusGlyph(system.status)} large />
            {copy.status[system.status]}
          </p>
          <ul className="anu-chips" aria-label={copy.forWhom}>
            {audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="anu-hero__actions">
            <Link href={localizedPath(locale, "/contact")} className="anu-action">
              {copy.talk}
              <span className="anu-action__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a href={getWhatsappHref(locale)} className="anu-action anu-action--ghost" rel="noopener">
              {copy.whatsapp}
            </a>
          </div>
        </div>
        <figure className="anu-hero__visual">
          <Poster src={system.visual.poster} alt={`${name}: ${pitch}`} priority />
          {system.visual.scene ? <SceneSlot scene={system.visual.scene} /> : null}
        </figure>
      </div>
    </section>
  )
}
