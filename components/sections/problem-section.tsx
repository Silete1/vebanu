import {
  ArrowRightLeftIcon,
  Building2Icon,
  CheckCircle2Icon,
  WorkflowIcon,
} from "lucide-react"

import { homeContent } from "@/lib/content/home"
import { defaultLocale, type Locale, getLocaleAttributes } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Badge } from "@/components/ui/badge"

type ProblemSectionProps = {
  locale?: Locale
}

export function ProblemSection({
  locale = defaultLocale,
}: ProblemSectionProps) {
  const content = homeContent[locale].problem
  const localeAttributes = getLocaleAttributes(locale)

  const comparisonRows = content.manual.items.map((manualItem, index) => ({
    label:
      index === 0
        ? "Workflow path"
        : index === 1
          ? "Approval control"
          : "Reporting evidence",
    manual: manualItem,
    controlled: content.controlled.items[index] ?? "",
  }))

  return (
    <Section id="problem" className="overflow-hidden border-t border-border">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start">
        <Reveal className="max-w-xl lg:pt-6">
          <Badge variant="outline">{content.badge}</Badge>
          <h2 className="section-title mt-5 max-w-[12ch] text-heading">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-base leading-8 text-muted-foreground sm:text-lg">
            {content.description}
          </p>

          <div
            {...localeAttributes}
            className="mt-8 rounded-[2rem] border border-border bg-white p-2"
          >
            <div className="rounded-[calc(2rem-0.5rem)] border border-border bg-surface-muted p-5">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2Icon className="size-4 text-primary" />
                <span>ANU starts with operating logic before module setup.</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative rounded-[2rem] border border-border bg-white p-2">
            <div className="absolute inset-0 bg-grid-subtle opacity-35" />
            <div className="relative rounded-[calc(2rem-0.5rem)] border border-border bg-white p-4 sm:p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-[1.5rem] border border-border bg-surface-muted px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground">
                      <WorkflowIcon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="eyebrow text-muted-foreground">
                        Software-first
                      </p>
                      <p className="mt-1 font-heading text-[1.35rem] leading-[0.95] text-heading uppercase">
                        Manual chaos stays hidden
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mx-auto hidden rounded-full border border-primary/18 bg-accent px-3 py-2 md:block">
                  <ArrowRightLeftIcon className="size-4 text-primary" strokeWidth={1.5} />
                </div>

                <div className="rounded-[1.5rem] border border-primary bg-accent px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full border border-primary bg-white text-primary">
                      <Building2Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="eyebrow text-primary">
                        Architecture-first
                      </p>
                      <p className="mt-1 font-heading text-[1.35rem] leading-[0.95] text-heading uppercase">
                        Controlled operating model
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {comparisonRows.map((row, index) => (
                  <div
                    key={row.label}
                    {...localeAttributes}
                    className="rounded-[1.5rem] border border-border bg-white p-1.5"
                  >
                    <div className="grid gap-3 rounded-[calc(1.5rem-0.375rem)] bg-white px-3 py-3 sm:px-4 md:grid-cols-[minmax(0,1fr)_11rem_minmax(0,1fr)] md:items-start">
                      <div className="rounded-[1.1rem] border border-border bg-surface-muted px-4 py-3 text-sm leading-7 text-muted-foreground">
                        {row.manual}
                      </div>
                      <div className="flex items-center justify-center">
                        <span
                          className={cn(
                            "inline-flex rounded-full border px-3 py-1.5 text-[0.72rem] font-medium tracking-[0.14em] uppercase",
                            index === 1
                              ? "border-primary bg-accent text-primary"
                              : "border-border bg-white text-muted-foreground"
                          )}
                        >
                          {row.label}
                        </span>
                      </div>
                      <div className="rounded-[1.1rem] border border-primary/20 bg-accent px-4 py-3 text-sm leading-7 text-foreground">
                        {row.controlled}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
