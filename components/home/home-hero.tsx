import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <>
      <div className="intro-loader" data-intro-loader aria-hidden="true">
        <div className="intro-loader-inner">
          <p className="mono-label intro-loader-brand" data-intro-loader-brand>
            ANU SOFTWARE SOLUTIONS
          </p>
          <span className="intro-loader-track">
            <span className="intro-loader-line" data-intro-loader-line />
          </span>
        </div>
      </div>
      <section
        className="relative h-svh w-full overflow-hidden bg-[var(--color-bone-white)]"
        data-motion-hero
        data-header-theme="dark"
      >
        <div
          className="hero-lab-visual absolute overflow-hidden bg-[var(--color-abyssal-ink)] text-white"
          style={{
            top: "12px",
            left: "12px",
            width: "calc(100% - 24px)",
            height: "calc(100lvh - 24px)",
            borderRadius: "20px",
          }}
          data-lab-visual
          data-intro-visual
        >
          <div className="hero-bg-motion" data-hero-bg aria-hidden="true" />
          <div className="relative z-10 flex h-full w-full flex-col px-9 pt-36 pb-8 sm:px-12 sm:pt-40">
            <h1
              className="max-w-[980px] text-[clamp(3.42rem,7.78vw,7rem)] leading-none tracking-[-0.03em]"
              data-intro-title
            >
              Business control,
              <br />
              implemented.
            </h1>

            <div className="mt-auto grid gap-6 lg:grid-cols-[minmax(0,620px)_auto] lg:items-end lg:justify-between">
              <p
                className="max-w-[620px] text-[clamp(1.25rem,1.55vw,1.5rem)] leading-[1.12] tracking-[-0.03em] text-white"
                data-intro-copy
              >
                ANU redesigns how your company operates, then implements Odoo
                ERP as the control platform across sales, inventory, purchasing,
                finance, approvals, reporting, and management visibility.
              </p>
              <div
                className="flex flex-wrap items-center gap-2 lg:justify-end"
                data-intro-actions
              >
                <Button variant="default" size="lg">
                  WORK WITH ANU
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[var(--color-abyssal-ink)] text-white"
                >
                  DISCOVER THE METHOD
                </Button>
                <span className="arrow-cta" aria-hidden="true">
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
