import type { ReactNode } from "react"

import { Glyph } from "@/components/story/glyph"

/** The opening band of a page that is not one system: kicker, title large and light, lede. */
export function PageHero({ id, kicker, title, lede, children }: { id: string; kicker: string; title: string; lede: string; children?: ReactNode }) {
  return (
    <section className="anu-band anu-hero anu-page-hero" aria-labelledby={id}>
      <div className="anu-wrap anu-hero__text">
        <p className="anu-kicker">
          <Glyph state="due" />
          {kicker}
        </p>
        <h1 id={id} className="anu-display anu-page-hero__title">
          {title}
        </h1>
        <p className="anu-lede">{lede}</p>
        {children}
      </div>
    </section>
  )
}
