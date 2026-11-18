import Link from "next/link"

import { getWhatsappHref } from "@/lib/contact"
import { storyCopy } from "@/lib/content/story-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

/** The close of every story: one ink band, one action. */
export function CtaBand({ locale, title, body }: { locale: Locale; title?: string; body?: string }) {
  const copy = storyCopy[locale]
  return (
    <section className="anu-band anu-cta">
      <div className="anu-wrap anu-cta__inner">
        <h2 className="anu-display anu-reveal">{title ?? copy.ctaTitle}</h2>
        <p className="anu-lede">{body ?? copy.ctaBody}</p>
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
    </section>
  )
}
