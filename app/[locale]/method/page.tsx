import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/seo/json-ld"
import { CtaBand } from "@/components/story/cta-band"
import { Glyph } from "@/components/story/glyph"
import { Features } from "@/components/story/lists"
import { PageHero } from "@/components/story/page-hero"
import { Road } from "@/components/story/road"
import { methodCopy } from "@/lib/content/pages"
import { storyCopy } from "@/lib/content/story-copy"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { pageGraph } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[locale]/method">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const { meta } = methodCopy[locale]
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: localizedPath(locale, "/method"), languages: localizedAlternates("/method") },
  }
}

export default async function MethodPage({ params }: PageProps<"/[locale]/method">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = methodCopy[locale]

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path: "/method",
          name: copy.meta.title,
          description: copy.meta.description,
          crumbs: [{ name: copy.kicker, path: "/method" }],
          about: [
            {
              "@type": "HowTo",
              "@id": `#method`,
              name: copy.title,
              step: copy.road.steps.map((step, index) => ({ "@type": "HowToStep", position: index + 1, name: step.title, text: step.body })),
            },
          ],
        })}
      />
      <PageHero id="method-title" kicker={copy.kicker} title={copy.title} lede={copy.lede} />

      <section className="anu-section anu-paper" aria-labelledby="road-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <h2 id="road-title" className="anu-reveal">{copy.road.title}</h2>
            <p className="anu-lede">{copy.road.lede}</p>
          </div>
          <Road steps={copy.road.steps} stepLabel={storyCopy[locale].step} />
        </div>
      </section>

      <section className="anu-section anu-night" aria-labelledby="gates-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <h2 id="gates-title" className="anu-reveal">{copy.gates.title}</h2>
            <p className="anu-lede">{copy.gates.lede}</p>
          </div>
          <ol className="anu-symptoms anu-gates">
            {copy.gates.items.map((gate, index) => (
              <li key={gate} className="anu-reveal">
                <Glyph read large />
                <span className="anu-num anu-gates__index">{`G${index + 1}`}</span>
                <span>{gate}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="anu-section anu-paper" aria-labelledby="rules-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <h2 id="rules-title" className="anu-reveal">{copy.rules.title}</h2>
            <p className="anu-lede">{copy.rules.lede}</p>
          </div>
          <Features items={copy.rules.items.map((rule) => ({ label: rule.title, body: rule.body }))} />
        </div>
      </section>

      <section className="anu-band anu-section" aria-labelledby="agents-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <h2 id="agents-title" className="anu-reveal">{copy.agents.title}</h2>
            <p className="anu-lede">{copy.agents.body}</p>
          </div>
          <Road steps={copy.agents.items} stepLabel={storyCopy[locale].step} />
        </div>
      </section>

      <section className="anu-section anu-night" aria-labelledby="fit-title">
        <div className="anu-wrap">
          <div className="anu-section-head">
            <h2 id="fit-title" className="anu-reveal">{copy.fit.title}</h2>
            <p className="anu-lede">{copy.fit.lede}</p>
          </div>
          <ul className="anu-symptoms">
            {copy.fit.items.map((item) => (
              <li key={item} className="anu-reveal">
                <Glyph state="alarm" large />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  )
}
