import Link from "next/link"

import { AnuLogo } from "@/components/brand/anu-logo"
import { statusGlyph } from "@/components/story/glyph"
import { WayOfAnu } from "@/components/story/sky"
import { HeaderLive, LanguageLink, NavLink } from "@/components/shell/header-live"
import { getSystems } from "@/lib/content/systems"
import { navOrder, shellCopy } from "@/lib/content/shell"
import { type Locale, localizedPath } from "@/lib/i18n"

/**
 * The top bar is the website's ink band: ink, the ANU mark, the sections with a
 * Signal underline under the one on show, the language and the one action.
 * Phones get the same links in a full-height ink sheet (the Popover API, so it
 * opens without JavaScript).
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const copy = shellCopy[locale]
  const systems = getSystems(locale)

  return (
    <header className="anu-header">
      <a href="#main" className="anu-skip">
        {copy.skip}
      </a>
      <div className="anu-wrap anu-header__bar">
        <Link href={localizedPath(locale)} aria-label={copy.home} className="anu-header__home">
          <AnuLogo className="anu-header__logo" title="ANU" />
        </Link>

        <nav aria-label={copy.navLabel} className="anu-header__nav">
          <ul>
            {navOrder.map((item) => (
              <li key={item.key}>
                <NavLink href={localizedPath(locale, item.path)} className="anu-header__link">
                  {copy.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="anu-header__end">
          <LanguageLink locale={locale} className="anu-header__lang" label={copy.language.label}>
            {copy.language.name}
          </LanguageLink>
          <Link href={localizedPath(locale, "/contact")} className="anu-action anu-header__cta">
            {copy.assessment}
          </Link>
          <button type="button" popoverTarget="anu-menu" className="anu-header__menu-btn" aria-label={copy.menu}>
            <span aria-hidden="true" className="anu-burger" />
          </button>
        </div>
      </div>

      <div id="anu-menu" popover="auto" className="anu-menu anu-band">
        <div className="anu-wrap anu-menu__inner">
          <div className="anu-menu__top">
            <AnuLogo className="anu-header__logo" title="ANU" />
            <button type="button" popoverTarget="anu-menu" popoverTargetAction="hide" className="anu-menu__close">
              {copy.close}
            </button>
          </div>
          <nav aria-label={copy.navLabel}>
            <ul className="anu-menu__primary">
              {navOrder.map((item, index) => (
                <li key={item.key} style={{ "--i": index } as React.CSSProperties}>
                  <NavLink href={localizedPath(locale, item.path)}>
                    <span className="anu-num anu-menu__index">{String(index + 1).padStart(2, "0")}</span>
                    {copy.nav[item.key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="anu-menu__systems" aria-label={copy.footer.systems}>
            {systems.map((system) => (
              <li key={system.slug}>
                <Link href={localizedPath(locale, `/systems/${system.slug}`)}>
                  <span className="anu-glyph" data-state={statusGlyph(system.status)} aria-hidden="true" />
                  {system.copy.short}
                </Link>
              </li>
            ))}
          </ul>
          <div className="anu-menu__end">
            <Link href={localizedPath(locale, "/contact")} className="anu-action">
              {copy.assessment}
            </Link>
            <LanguageLink locale={locale} className="anu-action anu-action--ghost" label={copy.language.label}>
              {copy.language.name}
            </LanguageLink>
          </div>
        </div>
      </div>
      <WayOfAnu />
      <HeaderLive />
    </header>
  )
}
