import type { ReactNode } from "react"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { PageTransition } from "@/components/motion/page-transition"
import type { Locale } from "@/lib/i18n"
import { siteCopy } from "@/lib/content/site-copy"

type PageShellProps = {
  children: ReactNode
  locale: Locale
}

export function PageShell({ children, locale }: PageShellProps) {
  const copy = siteCopy[locale]

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--color-bioluminescent-lime)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-[var(--color-abyssal-ink)]"
      >
        {copy.skipToContent}
      </a>
      <SiteHeader locale={locale} />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter locale={locale} />
    </div>
  )
}
