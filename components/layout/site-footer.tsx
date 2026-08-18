import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { anuContact, getWhatsappHref } from "@/lib/contact"
import { siteCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale]
  const contactHref = `${localizedPath(locale)}?request=contact#assessment`
  const footerLinks = [
    { label: copy.links.work, href: localizedPath(locale, "/#work") },
    { label: copy.links.method, href: localizedPath(locale, "/#method") },
    { label: copy.links.platform, href: localizedPath(locale, "/#platform") },
    {
      label: copy.links.industries,
      href: localizedPath(locale, "/industries"),
    },
    { label: copy.links.insights, href: localizedPath(locale, "/insights") },
    { label: copy.links.contact, href: contactHref },
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
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2" data-footer-reveal>
            <div className="border-s border-white/18 ps-5">
              <p className="mono-label text-white/64">{copy.navigate}</p>
              <nav
                className="mt-3 grid gap-2"
                aria-label={copy.footerNavigation}
              >
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-s border-white/18 ps-5">
              <p className="mono-label text-white/64">{copy.connect}</p>
              <div className="mt-3 grid gap-2">
                <Link
                  href={getWhatsappHref(locale)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  {copy.links.whatsapp}
                </Link>
                <Link
                  href={anuContact.phoneHref}
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  {anuContact.phoneDisplay}
                </Link>
                <Link
                  href={anuContact.emailHref}
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  {anuContact.email}
                </Link>
                <Link
                  href={anuContact.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  {copy.links.instagram}
                </Link>
                <Link
                  href={anuContact.facebookHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  {copy.links.facebook}
                </Link>
                <Link
                  href={anuContact.linkedinHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  {copy.links.linkedin}
                </Link>
                <Link
                  href={anuContact.odooPartnerHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  {copy.links.odooPartner}
                </Link>
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
