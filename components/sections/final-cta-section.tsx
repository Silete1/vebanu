import { ArrowRightIcon } from "lucide-react"

import { homeContent } from "@/lib/content/home"
import { defaultLocale, type Locale, getLocaleAttributes } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

type FinalCtaSectionProps = {
  locale?: Locale
}

const processCues = [
  "Process architecture",
  "Approval control",
  "Owner visibility",
]

export function FinalCtaSection({
  locale = defaultLocale,
}: FinalCtaSectionProps) {
  const content = homeContent[locale].finalCta
  const localeAttributes = getLocaleAttributes(locale)

  return (
    <Section
      id="assessment"
      className="border-t border-border bg-[var(--surface-inverted)] pt-2 text-white"
    >
      <Container>
        <Reveal>
          <div
            {...localeAttributes}
            className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-[var(--surface-inverted-soft)] p-2"
          >
            <div className="absolute inset-0 bg-grid-subtle opacity-20" />
            <div className="relative rounded-[calc(2.2rem-0.5rem)] border border-white/12 bg-[var(--surface-inverted)] p-6 sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
                <div className="max-w-3xl">
                  <p className="eyebrow text-white/70">{content.badge}</p>
                  <h2 className="section-title mt-5 text-white">
                    {content.title}
                  </h2>
                  <p className="mt-5 max-w-[62ch] text-base leading-8 text-white/68 sm:text-lg">
                    {content.description}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button size="lg">
                      {content.primaryCta}
                      <ArrowRightIcon data-icon="inline-end" />
                    </Button>
                    <p className="text-sm text-white/56">
                      Start with process, approvals, inventory, finance, and reporting control.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.9rem] border border-white/12 bg-[var(--surface-inverted-soft)] p-2">
                  <div className="rounded-[calc(1.9rem-0.5rem)] border border-white/12 bg-[var(--surface-inverted)] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="eyebrow text-white/70">
                        Assessment path
                      </p>
                      <span className="rounded-full border border-[var(--color-graphite)] bg-transparent px-2.5 py-1 text-[0.72rem] text-white/70">
                        Calm start
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {processCues.map((cue, index) => (
                        <div
                          key={cue}
                          className="rounded-[1.25rem] border border-white/12 bg-[var(--surface-inverted-soft)] px-4 py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex size-9 items-center justify-center rounded-full border border-[var(--color-graphite)] bg-transparent text-sm text-white/70">
                              {index + 1}
                            </span>
                            <span className="font-heading text-[1.2rem] leading-none text-white uppercase">
                              {cue}
                            </span>
                          </div>
                          {index < processCues.length - 1 ? (
                            <div className="mt-3 pl-4">
                              <div className={cn("h-5 w-px bg-primary/40")} />
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
