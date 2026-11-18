import type { ComponentType } from "react"

import { screens } from "@/components/live/screens"
import type { Locale } from "@/lib/i18n"

/**
 * The chapter where a system is seen working. Renders nothing until the
 * system's screen is drawn (its screen returns null until then).
 */
export function LiveStage({ slug, locale, kicker, title, note }: { slug: string; locale: Locale; kicker: string; title: string; note: string }) {
  const Screen = (screens as Record<string, ComponentType<{ locale: Locale }>>)[slug]
  // screens are plain server components, so this tells us whether one is drawn
  const screen = Screen ? (Screen as (props: { locale: Locale }) => React.ReactNode)({ locale }) : null
  if (!screen) return null

  return (
    <section className="anu-band anu-sky anu-live-stage" aria-labelledby="live-title">
      <div className="anu-wrap">
        <div className="anu-live-stage__head">
          <p className="anu-kicker">{kicker}</p>
          <h2 id="live-title">{title}</h2>
        </div>
        {screen}
        <p className="anu-live-stage__note">{note}</p>
      </div>
    </section>
  )
}
