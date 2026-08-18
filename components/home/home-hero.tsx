import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { homePageCopy } from "@/lib/content/site-copy"
import { type Locale, localizedPath } from "@/lib/i18n"

export function HomeHero({ locale }: { locale: Locale }) {
  const copy = homePageCopy[locale].hero

  return (
    <section
      className="relative h-svh w-full overflow-hidden"
      data-motion-hero
      data-header-theme="dark"
    >
      <div
        className="absolute overflow-hidden text-white"
        style={{
          top: "12px",
          left: "12px",
          width: "calc(100% - 24px)",
          height: "calc(100lvh - 24px)",
          borderRadius: "20px",
        }}
        data-lab-visual
      >
        <div className="home-hero-content relative z-10 flex h-full w-full flex-col px-6 pt-32 pb-6 sm:px-12 sm:pt-40 sm:pb-8">
          <h1
            className="home-hero-title"
            style={{ opacity: 0, visibility: "hidden" }}
            data-intro-title
          >
            <span className="home-hero-title-line home-hero-title-line-primary">
              {copy.titlePrimary}
            </span>
            <span className="home-hero-title-line">{copy.titleSecondary}</span>
          </h1>

          <div className="home-hero-bottom mt-auto flex justify-end">
            <div
              className="home-hero-actions flex flex-wrap items-center gap-2"
              style={{ opacity: 0, visibility: "hidden" }}
              data-intro-actions
            >
              <Link
                href={localizedPath(locale, "/#assessment")}
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                {copy.primaryCta}
              </Link>
              <Link
                href={localizedPath(locale, "/#method")}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "bg-[var(--color-abyssal-ink)] text-white"
                )}
              >
                {copy.secondaryCta}
              </Link>
              <span className="arrow-cta" aria-hidden="true">
                <ArrowUpRightIcon className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
