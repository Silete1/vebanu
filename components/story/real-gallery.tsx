import type { CSSProperties } from "react"

import { VideoLoop } from "@/components/story/video-loop"
import { realMedia } from "@/lib/content/systems/media"
import type { Locale } from "@/lib/i18n"

const copy: Record<Locale, { kicker: string; title: string; note: string }> = {
  en: { kicker: "From the real system", title: "Not a mock-up: the system itself.", note: "Screens and renders from ANU's own software, on demo projects." },
  ar: { kicker: "من النظام الحقيقي", title: "ليست صورة توضيحية: هذا هو النظام نفسه.", note: "شاشات وصور من برامج أنو نفسها، على مشاريع تجريبية." },
}

/**
 * Real screens, renders and clips of a system, in a strip that scrolls
 * sideways (native scroll snap) and drifts as the page passes.
 */
export function RealGallery({ slug, locale }: { slug: string; locale: Locale }) {
  const media = realMedia[slug]
  if (!media) return null
  const text = copy[locale]
  const base = `/media/real/${slug}`

  return (
    <section className="anu-section anu-night anu-real" aria-labelledby="real-title">
      <div className="anu-wrap anu-section-head">
        <p className="anu-kicker">{text.kicker}</p>
        <h2 id="real-title">{text.title}</h2>
      </div>
      <ul className="anu-real__strip">
        {media.clips.map((clip, i) => (
          <li key={clip.file} className="anu-real__item anu-real__item--clip" style={{ "--i": i } as CSSProperties}>
            <div className="anu-real__frame" role="img" aria-label={clip.alt[locale]}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/${clip.file}.jpg`} alt="" width={960} height={600} loading="lazy" decoding="async" />
              <VideoLoop base={`${base}/${clip.file}`} webm poster={`${base}/${clip.file}.jpg`} />
            </div>
            <p>{clip.alt[locale]}</p>
          </li>
        ))}
        {media.stills.map((still, i) => {
          const file = still.localized ? `${still.file}-${locale}` : still.file
          return (
            <li key={still.file} className="anu-real__item" style={{ "--i": i + media.clips.length } as CSSProperties}>
              <picture className="anu-real__frame">
                <source type="image/avif" srcSet={`${base}/${file}-640.avif 640w, ${base}/${file}-1280.avif 1280w`} sizes="(min-width: 64rem) 40vw, 85vw" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${base}/${file}-640.webp`}
                  srcSet={`${base}/${file}-640.webp 640w, ${base}/${file}-1280.webp 1280w`}
                  sizes="(min-width: 64rem) 40vw, 85vw"
                  alt={still.alt[locale]}
                  width={1280}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <p>{still.alt[locale]}</p>
            </li>
          )
        })}
      </ul>
      <p className="anu-wrap anu-real__note">{text.note}</p>
    </section>
  )
}
