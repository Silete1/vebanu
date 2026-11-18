import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AssessmentForm } from "@/components/contact/assessment-form"
import { JsonLd } from "@/components/seo/json-ld"
import { Glyph } from "@/components/story/glyph"
import { anuContact, getWhatsappHref } from "@/lib/contact"
import { contactCopy } from "@/lib/content/pages"
import { isLocale, localizedAlternates, localizedPath } from "@/lib/i18n"
import { orgId, pageGraph } from "@/lib/seo"

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const copy = contactCopy[locale]
  return {
    title: copy.title,
    description: copy.lede,
    alternates: { canonical: localizedPath(locale, "/contact"), languages: localizedAlternates("/contact") },
  }
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const copy = contactCopy[locale]

  return (
    <>
      <JsonLd
        data={pageGraph(locale, {
          path: "/contact",
          name: copy.title,
          description: copy.lede,
          crumbs: [{ name: copy.title, path: "/contact" }],
          about: [{ "@type": "ContactPage", "@id": `${orgId}-contact`, mainEntity: { "@id": orgId } }],
        })}
      />
      <section className="anu-band anu-hero" aria-labelledby="contact-title">
        <div className="anu-wrap anu-contact">
          <div className="anu-hero__text">
            <p className="anu-kicker">
              <Glyph state="due" />
              {copy.kicker}
            </p>
            <h1 id="contact-title" className="anu-display">
              {copy.title}
            </h1>
            <p className="anu-lede">{copy.lede}</p>
            <ol className="anu-contact__steps">
              {copy.steps.map((step, index) => (
                <li key={step}>
                  <span className="anu-num">{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
            <ul className="anu-contact__direct">
              <li>
                <a href={getWhatsappHref(locale)} rel="noopener" className="anu-action anu-action--ghost">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={anuContact.phoneHref} className="anu-action anu-action--ghost anu-num">
                  {anuContact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={anuContact.emailHref} className="anu-action anu-action--ghost anu-num">
                  {anuContact.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="anu-contact__form anu-lit">
            <h2>{copy.formTitle}</h2>
            <p>{copy.formNote}</p>
            <AssessmentForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  )
}
