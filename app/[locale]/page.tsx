import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { CSSProperties } from "react"

import { Sign } from "@/components/brand/sign"
import { Glyph } from "@/components/story/glyph"
import { CtaBand } from "@/components/story/cta-band"
import { Poster } from "@/components/story/poster"
import { SystemCards } from "@/components/story/related"
import { Road } from "@/components/story/road"
import { SceneSlot } from "@/components/story/scene-slot"
import { SealFrieze, Ziggurat } from "@/components/story/sky"
import { SystemMap } from "@/components/story/system-map"
import { homeStory } from "@/lib/content/home-story"
import { insights } from "@/lib/content/insights"
import { getSystems } from "@/lib/content/systems"
import { storyCopy } from "@/lib/content/story-copy"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { meta } = homeStory[locale]

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: localizedPath(locale), languages: localizedAlternates() },
    openGraph: { url: localizedPath(locale), title: meta.title, description: meta.description },
  }
}

// where each message sits while it is noise: a scatter that settles into the ledger
const scatter = [
  [-18, -60, -7],
  [22, -20, 5],
  [-8, 30, 4],
  [26, 50, -6],
  [-24, -10, 8],
  [12, 70, -3],
  [-14, 90, 6],
  [30, -40, -9],
]

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const story = homeStory[locale]
  const systems = getSystems(locale)
  const featured = story.featured.slugs
    .map((slug) => systems.find((system) => system.slug === slug))
    .filter((system) => system !== undefined)
  const notes = [...insights].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  return (
    <>
      {/* hero: the ink band, the claim, the network settling into order */}
      <section className="anu-band anu-sky anu-home-hero" aria-labelledby="home-title">
        <div className="anu-home-hero__visual" aria-hidden="true">
          <Poster
            src={locale === "ar" ? "/media/systems/home-rtl" : "/media/systems/home"}
            alt=""
            priority
            sizes="100vw"
            small={960}
            width={1920}
            height={1080}
          />
          <SceneSlot scene="network" />
        </div>
        <div className="anu-wrap anu-home-hero__text">
          <p className="anu-kicker">
            <Glyph state="due" />
            {story.hero.kicker}
          </p>
          <h1 id="home-title" className="anu-hero-title">
            <span>{story.hero.title[0]}</span> <span className="anu-home-hero__accent">{story.hero.title[1]}</span>
          </h1>
          <p className="anu-lede">{story.hero.lede}</p>
          <div className="anu-hero__actions">
            <Link href={localizedPath(locale, "/contact")} className="anu-action">
              {story.hero.primary}
              <span className="anu-action__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href={localizedPath(locale, "/systems")} className="anu-action anu-action--ghost">
              {story.hero.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* the first ledger: Uruk, c. 3100 BCE */}
      <section className="anu-section anu-first-ledger" aria-labelledby="ledger-title">
        <div className="anu-wrap anu-first-ledger__grid">
          <figure className="anu-first-ledger__tablet">
            <picture>
              <source type="image/avif" srcSet="/media/heritage/uruk-tablet-640.avif 640w, /media/heritage/uruk-tablet-1280.avif 1280w" sizes="(min-width: 64rem) 40vw, 90vw" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/heritage/uruk-tablet-640.webp"
                srcSet="/media/heritage/uruk-tablet-640.webp 640w, /media/heritage/uruk-tablet-1280.webp 1280w"
                sizes="(min-width: 64rem) 40vw, 90vw"
                width={1280}
                height={1172}
                alt={story.ledger.alt}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="anu-first-ledger__caption">{story.ledger.caption}</figcaption>
          </figure>
          <div className="anu-first-ledger__text">
            <p className="anu-kicker">
              <Sign name="ŠE" locale={locale} />
              {story.ledger.kicker}
            </p>
            <h2 id="ledger-title" className="anu-reveal">
              {story.ledger.title}
            </h2>
            <p className="anu-lede anu-reveal">{story.ledger.lede}</p>
            <dl className="anu-facts">
              {story.ledger.facts.map((fact) => (
                <div key={fact.label} className="anu-reveal">
                  <dt className="anu-num">{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
            <p className="anu-first-ledger__bridge anu-reveal">{story.ledger.bridge}</p>
          </div>
        </div>
      </section>

      <SealFrieze />

      {/* the noise: chat messages that settle into one ledger as you read */}
      <section className="anu-section anu-noise" aria-labelledby="noise-title">
        <div className="anu-wrap anu-noise__grid">
          <div className="anu-section-head">
            <p className="anu-kicker">
              <Glyph state="alarm" />
              {story.noise.kicker}
            </p>
            <h2 id="noise-title">{story.noise.title}</h2>
            <p className="anu-lede">{story.noise.lede}</p>
          </div>
          <ol className="anu-ledger">
            {story.noise.messages.map((message, index) => {
              const [x, y, r] = scatter[index % scatter.length]
              return (
                <li
                  key={message}
                  className="anu-ledger__row"
                  style={{ "--x": `${x}%`, "--y": `${y}%`, "--r": `${r}deg` } as CSSProperties}
                >
                  <span className="anu-num anu-ledger__ref">{`REQ/${String(index + 1).padStart(3, "0")}`}</span>
                  <span className="anu-ledger__text">{message}</span>
                  <Glyph state={index % 3 === 0 ? "done" : index % 3 === 1 ? "due" : "progress"} />
                </li>
              )
            })}
          </ol>
          <div className="anu-noise__after anu-reveal">
            <h3>{story.noise.after.title}</h3>
            <p>{story.noise.after.body}</p>
          </div>
        </div>
      </section>

      {/* what ANU does: four jobs on the road */}
      <section className="anu-section anu-does" aria-labelledby="does-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{story.does.kicker}</p>
            <h2 id="does-title">{story.does.title}</h2>
          </div>
          <div className="anu-does__grid">
            <Ziggurat terraces={story.does.items.map((item) => item.title)} label={story.does.title} />
            <Road steps={story.does.items} stepLabel={storyCopy[locale].step} />
          </div>
        </div>
      </section>

      {/* the system map */}
      <section className="anu-band anu-sky anu-section anu-home-map" aria-labelledby="map-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{story.map.kicker}</p>
            <h2 id="map-title">{story.map.title}</h2>
            <p className="anu-lede">{story.map.lede}</p>
          </div>
          <SystemMap systems={systems} locale={locale} label={story.map.label} />
          <Link href={localizedPath(locale, "/systems")} className="anu-action anu-action--ghost">
            {story.map.all}
            <span className="anu-action__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>

      <SealFrieze tone="paper" />

      {/* featured systems */}
      <section className="anu-section" aria-labelledby="featured-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{story.featured.kicker}</p>
            <h2 id="featured-title">{story.featured.title}</h2>
          </div>
          <SystemCards systems={featured} locale={locale} />
        </div>
      </section>

      {/* the method */}
      <section className="anu-section anu-paper anu-home-method" aria-labelledby="method-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{story.method.kicker}</p>
            <h2 id="method-title">{story.method.title}</h2>
            <p className="anu-lede">{story.method.lede}</p>
          </div>
          <Road steps={story.method.steps} stepLabel={storyCopy[locale].step} />
          <Link href={localizedPath(locale, "/method")} className="anu-link anu-home-more">
            {story.method.more} →
          </Link>
        </div>
      </section>

      {/* how ANU builds */}
      <section className="anu-section" aria-labelledby="rules-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{story.rules.kicker}</p>
            <h2 id="rules-title">{story.rules.title}</h2>
          </div>
          <ul className="anu-features anu-focus">
            {story.rules.items.map((rule) => (
              <li key={rule.title} className="anu-feature anu-focus-item anu-lit anu-reveal">
                <Glyph state="done" large />
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* field notes */}
      <section className="anu-section anu-paper" aria-labelledby="notes-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <p className="anu-kicker">{story.notes.kicker}</p>
            <h2 id="notes-title">{story.notes.title}</h2>
          </div>
          <ul className="anu-notes">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link href={localizedPath(locale, `/insights/${note.slug}`)} className="anu-note anu-lit">
                  <span className="anu-num anu-note__date">{note.date}</span>
                  <span className="anu-note__title">{note.title[locale]}</span>
                  <span className="anu-note__summary">{note.summary[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={localizedPath(locale, "/insights")} className="anu-link anu-home-more">
            {story.notes.all} →
          </Link>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  )
}
