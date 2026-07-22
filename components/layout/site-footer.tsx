import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/layout/container"

const contactHref = "/?request=contact#assessment"

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Method", href: "/#method" },
  { label: "Platform", href: "/#platform" },
  { label: "Industries", href: "/#industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: contactHref },
]

export function SiteFooter() {
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
          <div data-footer-reveal>
            <h2 className="max-w-[580px] text-[clamp(1.8rem,3.2vw,3.2rem)] leading-[1.06] tracking-[-0.03em]">
              Redesign the operation before implementing the system.
            </h2>
            <p className="mt-4 max-w-[480px] text-[clamp(0.95rem,1.1vw,1.15rem)] leading-[1.25] tracking-[-0.02em] text-white/70">
              ANU works with Iraqi businesses that need clearer approvals,
              cleaner data, stronger reporting, and more control over daily
              execution.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Link
                href={contactHref}
                className="mono-label inline-flex h-10 items-center rounded-lg bg-[var(--color-abyssal-ink)] px-4 text-white"
              >
                WORK WITH ANU
              </Link>
              <Link
                href={contactHref}
                className="arrow-cta"
                aria-label="Work with ANU"
              >
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2" data-footer-reveal>
            <div className="border-l border-white/18 pl-5">
              <p className="mono-label text-white/64">NAVIGATE</p>
              <nav className="mt-3 grid gap-2" aria-label="Footer">
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
            <div className="border-l border-white/18 pl-5">
              <p className="mono-label text-white/64">CONNECT</p>
              <div className="mt-3 grid gap-2">
                <Link
                  href={contactHref}
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  Contact
                </Link>
                <Link
                  href="/#assessment"
                  className="text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-wordmark-wrap flex flex-col items-center text-center">
          <p
            className="footer-wordmark text-[clamp(4rem,14vw,12rem)] leading-[0.78] tracking-[-0.065em] whitespace-nowrap"
            data-footer-wordmark
          >
            ANU
          </p>
          <p className="mono-label mt-2 pb-3 text-white/70">
            ANU - Business Control & Odoo ERP Implementation.
          </p>
        </div>
      </Container>
    </footer>
  )
}
