import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { anuContact, getWhatsappHref } from "@/lib/contact"
import { siteCopy } from "@/lib/content/site-copy"
import { getNavigationItems } from "@/lib/navigation"
import { type Locale, localizedPath } from "@/lib/i18n"

// Phones get 44px-tall rows; from `sm` up the links keep their compact look.
const footerLinkClass =
  "flex min-h-11 items-center text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white sm:min-h-0"
const footerListClass = "mt-3 grid sm:gap-2"

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale]
  const contactHref = `${localizedPath(locale)}?request=contact#assessment`
  const footerLinks = [
    ...getNavigationItems(locale).filter((item) => item.available),
    { title: copy.links.contact, href: contactHref },
  ]
  const externalLinks = [
    { label: copy.links.instagram, href: anuContact.instagramHref },
    { label: copy.links.facebook, href: anuContact.facebookHref },
    { label: copy.links.linkedin, href: anuContact.linkedinHref },
    { label: copy.links.odooPartner, href: anuContact.odooPartnerHref },
  ]
  return (
    <footer
      className="footer-reference text-white"
      data-motion-footer
      data-header-theme="dark"
    >
      <div className="footer-light-cap" aria-hidden="true" />
      <div className="footer-signal-field" data-footer-bg aria-hidden="true">
        <span className="footer-signal footer-signal-a" />
        <span className="footer-signal footer-signal-b" />
        <span className="footer-signal footer-signal-c" />
      </div>
      <Container className="footer-content relative z-10 flex flex-col">
        <div className="grid shrink-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
          <div data-footer-reveal>
            <h2 className="max-w-[580px] text-[clamp(1.8rem,3.2vw,3.2rem)] leading-[1.06] tracking-[-0.03em]">
              {copy.footerTitle}
            </h2>
            <p className="mt-4 max-w-[480px] text-[clamp(0.95rem,1.1vw,1.15rem)] leading-[1.25] tracking-[-0.02em] text-white/70">
              {copy.footerDescription}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Link
                href={contactHref}
                className="mono-label inline-flex h-10 items-center rounded-lg bg-[var(--color-abyssal-ink)] px-4 text-white"
              >
                {copy.startAssessment}
              </Link>
              <Link
                href={contactHref}
                className="arrow-cta"
                aria-label={copy.startAssessment}
              >
                <ArrowUpRightIcon className="size-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2" data-footer-reveal>
            <div className="border-s border-white/18 ps-5">
              <p className="mono-label text-white/80">{copy.navigate}</p>
              <nav
                className={footerListClass}
                aria-label={copy.footerNavigation}
              >
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={footerLinkClass}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-s border-white/18 ps-5">
              <p className="mono-label text-white/80">{copy.connect}</p>
              <div className={footerListClass}>
                <Link
                  href={getWhatsappHref(locale)}
                  target="_blank"
                  rel="noreferrer"
                  className={footerLinkClass}
                >
                  {copy.links.whatsapp}
                </Link>
                <Link href={anuContact.phoneHref} className={footerLinkClass}>
                  <bdi dir="ltr">{anuContact.phoneDisplay}</bdi>
                </Link>
                <Link href={anuContact.emailHref} className={footerLinkClass}>
                  {anuContact.email}
                </Link>
                {externalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={footerLinkClass}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-wordmark-wrap flex shrink-0 flex-col items-center text-center">
          <p
            className="footer-wordmark text-[clamp(4rem,14vw,12rem)] leading-[0.82] tracking-[-0.04em] whitespace-nowrap"
            data-footer-wordmark
          >
            {locale === "ar" ? "أنو" : "ANU"}
          </p>
          <p className="mono-label mt-2 pb-3 text-white/70">
            {copy.footerNote}
          </p>
        </div>
      </Container>
    </footer>
  )
}
