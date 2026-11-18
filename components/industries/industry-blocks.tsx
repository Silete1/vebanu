import Link from "next/link"

import { Glyph, type GlyphState } from "@/components/story/glyph"
import { Poster } from "@/components/story/poster"
import { getWhatsappHref } from "@/lib/contact"
import { getIndustrySystems, type Industry, industriesCopy } from "@/lib/content/industries"
import type { LocalizedSystem } from "@/lib/content/systems"
import { storyCopy } from "@/lib/content/story-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

const network = "/brand/anu_network"

/** The poster an industry borrows from the first ANU system it runs on. */
export function industryPoster(systems: LocalizedSystem[]) {
  return systems[0]?.visual.poster ?? network
}

/** An industry's opening: the ink band, the claim large and light, the systems it runs on, its picture. */
export function IndustryHero({ industry, systems, locale }: { industry: Industry; systems: LocalizedSystem[]; locale: Locale }) {
  const copy = industriesCopy[locale]
  return (
    <section className="anu-band anu-sky anu-hero" aria-labelledby="industry-title">
      <div className="anu-wrap anu-hero__grid">
        <div className="anu-hero__text">
          <nav aria-label={copy.crumbsLabel} className="anu-crumbs">
            <Link href={localizedPath(locale, "/industries")}>{copy.crumbs}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{industry.hero.eyebrow}</span>
          </nav>
          <h1 id="industry-title" className="anu-display anu-hero__title">
            {industry.hero.title}
          </h1>
          <p className="anu-lede anu-hero__lede">{industry.hero.description}</p>
          <ul className="anu-chips" aria-label={copy.runsOn}>
            {systems.map((system) => (
              <li key={system.slug}>{system.copy.name}</li>
            ))}
          </ul>
          <div className="anu-hero__actions">
            <Link href={localizedPath(locale, "/contact")} className="anu-action">
              {copy.assessment}
              <span className="anu-action__arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <a href={getWhatsappHref(locale)} className="anu-action anu-action--ghost" rel="noopener">
              {storyCopy[locale].whatsapp}
            </a>
          </div>
        </div>
        <figure className="anu-hero__visual">
          <Poster src={industryPoster(systems)} alt={`${industry.name}: ${industry.hero.description}`} priority />
        </figure>
      </div>
    </section>
  )
}

const breakStates: GlyphState[] = ["alarm", "waiting"]

/** Where control breaks: each gap marked as an alarm or as waiting on someone. */
export function Breaks({ items }: { items: Industry["problems"] }) {
  return (
    <dl className="anu-inside__list">
      {items.map((item, index) => (
        <div key={item.title} className="anu-inside__item anu-reveal">
          <dt>
            <Glyph state={breakStates[index % 2]} large />
            {item.title}
          </dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  )
}

/** The platform map: each need, how it is applied, and the modules that carry it. Peers lit and focused like features. */
export function PlatformMap({ items, modulesLabel }: { items: Industry["odooCapabilities"]; modulesLabel: string }) {
  return (
    <ul className="anu-features anu-features--pairs anu-focus">
      {items.map((item, index) => (
        <li key={item.need} className="anu-feature anu-focus-item anu-lit anu-reveal">
          <span className="anu-feature__index anu-num anu-focus-pic">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.need}</h3>
          <p>{item.application}</p>
          <ul className="anu-chips anu-chips--paper" aria-label={modulesLabel}>
            {item.capabilities.map((module) => (
              <li key={module}>{module}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

/** Industries as doors: the poster of the system they run on, the systems named, the promise. */
export function IndustryCards({ industries, locale }: { industries: readonly Industry[]; locale: Locale }) {
  return (
    <ul className="anu-cards anu-focus">
      {industries.map((industry) => {
        const systems = getIndustrySystems(industry, locale)
        return (
          <li key={industry.slug} className="anu-focus-item">
            <Link href={localizedPath(locale, industry.href)} className="anu-card anu-lit">
              <Poster
                src={industryPoster(systems)}
                alt=""
                className="anu-card__picture anu-focus-pic"
                sizes="(min-width: 72rem) 30vw, (min-width: 40rem) 45vw, 100vw"
              />
              <span className="anu-card__status anu-kicker">
                <Glyph state="done" />
                {systems.map((system) => system.copy.short).join(" · ")}
              </span>
              <span className="anu-card__name">{industry.shortName}</span>
              <span className="anu-card__pitch">{industry.cardDescription}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

/** One method, different priorities: each industry with the four places its control breaks first. */
export function Priorities({ industries, locale }: { industries: readonly Industry[]; locale: Locale }) {
  return (
    <dl className="anu-inside__list">
      {industries.map((industry) => (
        <div key={industry.slug} className="anu-inside__item anu-reveal">
          <dt>
            <Glyph state="due" />
            <Link href={localizedPath(locale, industry.href)} className="anu-link">
              {industry.name}
            </Link>
          </dt>
          <dd>
            <ul className="anu-priorities">
              {industry.problems.map((problem, index) => (
                <li key={problem.title}>
                  <Glyph state={breakStates[index % 2]} />
                  {problem.title}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
