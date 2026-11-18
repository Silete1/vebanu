import Link from "next/link"

import { Container } from "@/components/layout/container"
import { PageShell } from "@/components/layout/page-shell"
import { buttonVariants } from "@/components/ui/button"
import { notFoundCopy, siteCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

/** Branded 404 content inside the site shell (rendered by app/[locale]/not-found.tsx). */
export function NotFoundView({ locale }: { locale: Locale }) {
  const copy = notFoundCopy[locale]
  const links = siteCopy[locale].links

  return (
    <PageShell locale={locale}>
      <section
        className="bg-[var(--color-abyssal-ink)] py-24 text-white lg:py-32"
        data-header-theme="dark"
      >
        <Container className="pt-16 sm:pt-20">
          <p className="mono-label tag-dot flex items-center gap-2 text-white/80">
            {copy.label}
          </p>
          <h1 className="display-headline mt-10 max-w-[12ch]">{copy.title}</h1>
          <p className="body-copy mt-10 max-w-2xl text-white/80">
            {copy.description}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <Link
              href={localizedPath(locale, "/#assessment")}
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              {siteCopy[locale].startAssessment}
            </Link>
            <Link
              href={localizedPath(locale, "/services")}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              {links.services}
            </Link>
            <Link
              href={localizedPath(locale, "/industries")}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              {links.industries}
            </Link>
            <Link
              href={localizedPath(locale)}
              className="mono-label inline-flex h-10 items-center px-4 text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              {copy.home}
            </Link>
          </div>
        </Container>
      </section>
    </PageShell>
  )
}
