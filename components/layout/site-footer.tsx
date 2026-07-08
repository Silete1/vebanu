import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/layout/container"

const footerLinks = [
  { label: "Work", href: "/#work" },
  { label: "Method", href: "/#method" },
  { label: "Platform", href: "/#platform" },
  { label: "Industries", href: "/#industries" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/contact" },
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
      <Container className="relative z-10 flex min-h-[calc(100svh-110px)] flex-col pt-40">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.8fr)]">
          <div data-footer-reveal>
            <h2 className="max-w-[620px] text-[clamp(2.7rem,4.2vw,5rem)] leading-[1.02] tracking-[-0.03em]">
              Redesign the operation before implementing the system.
            </h2>
            <p className="mt-8 max-w-[540px] text-[clamp(1.1rem,1.35vw,1.35rem)] leading-[1.18] tracking-[-0.02em] text-white/70">
              ANU works with Iraqi businesses that need clearer approvals,
              cleaner data, stronger reporting, and more control over daily
              execution.
            </p>
            <div className="mt-10 flex items-center gap-2">
              <Link
                href="/contact"
                className="mono-label inline-flex h-12 items-center rounded-lg bg-[var(--color-abyssal-ink)] px-5 text-white"
              >
                WORK WITH ANU
              </Link>
              <Link
                href="/contact"
                className="arrow-cta"
                aria-label="Work with ANU"
              >
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2" data-footer-reveal>
            <div className="border-l border-white/18 pl-6">
              <p className="mono-label text-white/64">NAVIGATE</p>
              <nav className="mt-5 grid gap-3" aria-label="Footer">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[22px] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-l border-white/18 pl-6">
              <p className="mono-label text-white/64">CONNECT</p>
              <div className="mt-5 grid gap-3">
                <Link
                  href="/contact"
                  className="text-[22px] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  Contact
                </Link>
                <Link
                  href="/#assessment"
                  className="text-[22px] leading-none tracking-[-0.03em] text-white/78 transition-colors hover:text-white"
                >
                  Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto overflow-hidden pt-24">
          <p
            className="footer-wordmark text-[clamp(7rem,21vw,19rem)] leading-[0.76] tracking-[-0.065em] whitespace-nowrap"
            data-footer-wordmark
          >
            ANU Software
          </p>
          <p className="mono-label mt-4 pb-7 text-white/70">
            ANU Software Solutions - Business Control & Odoo ERP Implementation.
          </p>
        </div>
      </Container>
    </footer>
  )
}
