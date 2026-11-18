import Link from "next/link"

import { AnuLogo } from "@/components/brand/anu-logo"
import { MotionSwitch } from "@/components/shell/motion-switch"
import { statusGlyph } from "@/components/story/glyph"
import { anuContact, getWhatsappHref } from "@/lib/contact"
import { getSystems } from "@/lib/content/systems"
import { navOrder, shellCopy } from "@/lib/content/shell"
import { type Locale, localizedPath } from "@/lib/i18n"

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = shellCopy[locale]
  const systems = getSystems(locale)

  return (
    <footer className="anu-band anu-footer">
      <div className="anu-wrap anu-footer__grid">
        <div className="anu-footer__lead">
          <AnuLogo className="anu-footer__logo" title="ANU" />
          <p className="anu-footer__title">{copy.footer.title}</p>
          <p className="anu-footer__body">{copy.footer.body}</p>
          <Link href={localizedPath(locale, "/contact")} className="anu-action">
            {copy.assessment}
            <span className="anu-action__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <nav aria-label={copy.footer.explore} className="anu-footer__col">
          <h2 className="anu-footer__head">{copy.footer.explore}</h2>
          <ul>
            {navOrder.map((item) => (
              <li key={item.key}>
                <Link href={localizedPath(locale, item.path)}>{copy.nav[item.key]}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={copy.footer.systems} className="anu-footer__col anu-footer__systems">
          <h2 className="anu-footer__head">{copy.footer.systems}</h2>
          <ul>
            {systems.map((system) => (
              <li key={system.slug}>
                <Link href={localizedPath(locale, `/systems/${system.slug}`)}>
                  <span className="anu-glyph" data-state={statusGlyph(system.status)} aria-hidden="true" />
                  {system.copy.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="anu-footer__col">
          <h2 className="anu-footer__head">{copy.footer.contact}</h2>
          <ul>
            <li>
              <a href={anuContact.phoneHref} className="anu-num">
                {anuContact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={getWhatsappHref(locale)} rel="noopener">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={anuContact.emailHref} className="anu-num">
                {anuContact.email}
              </a>
            </li>
            <li>{copy.footer.address}</li>
          </ul>
          <h2 className="anu-footer__head">{copy.footer.follow}</h2>
          <ul className="anu-footer__inline">
            <li>
              <a href={anuContact.linkedinHref} rel="noopener">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={anuContact.instagramHref} rel="noopener">
                Instagram
              </a>
            </li>
            <li>
              <a href={anuContact.facebookHref} rel="noopener">
                Facebook
              </a>
            </li>
            <li>
              <a href={anuContact.odooPartnerHref} rel="noopener">
                {copy.footer.partner}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="anu-wrap anu-footer__base">
        <span>{copy.footer.rights}</span>
        <MotionSwitch locale={locale} />
        <a href="/llms.txt" className="anu-num">
          {copy.footer.machine}
        </a>
      </div>
    </footer>
  )
}
