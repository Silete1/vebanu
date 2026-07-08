import {
  CheckCircle2Icon,
  EyeIcon,
  LandmarkIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { homeContent } from "@/lib/content/home"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

type OutcomesSectionProps = {
  locale?: Locale
}

const outcomeGroups = [
  {
    title: "Owner visibility",
    summary: "Leadership sees where control is weakening before it becomes a financial problem.",
    icon: EyeIcon,
    itemIndices: [0, 4],
  },
  {
    title: "Operational discipline",
    summary: "Approvals, follow-up, and inventory decisions become more accountable.",
    icon: ShieldCheckIcon,
    itemIndices: [1, 3],
  },
  {
    title: "Finance reliability",
    summary: "Reporting and evidence become cleaner, faster, and easier to trust.",
    icon: LandmarkIcon,
    itemIndices: [2],
  },
] as const

export function OutcomesSection({
  locale = defaultLocale,
}: OutcomesSectionProps) {
  const content = homeContent[locale].results

  return (
    <Section id="results" className="overflow-hidden border-t border-border">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <Reveal className="max-w-xl lg:pt-4">
          <p className="eyebrow text-primary">{content.badge}</p>
          <h2 className="section-title mt-5 text-heading">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-base leading-8 text-muted-foreground sm:text-lg">
            {content.description}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {outcomeGroups.map((group, index) => {
              const Icon = group.icon

              return (
                <div
                  key={group.title}
                  className={index === 0 ? "lg:row-span-2" : ""}
                >
                  <div className="h-full rounded-[2rem] border border-border bg-white p-2">
                    <div className="flex h-full flex-col rounded-[calc(2rem-0.5rem)] border border-border bg-white p-6 sm:p-7">
                      <div className="flex items-center gap-3">
                        <span className="flex size-12 items-center justify-center rounded-full border border-primary bg-accent text-primary">
                          <Icon className="size-5" strokeWidth={1.5} />
                        </span>
                        <div>
                          <p className="eyebrow text-primary">
                            Outcome group
                          </p>
                          <h3 className="mt-1 font-heading text-[2rem] leading-[0.92] text-heading uppercase">
                            {group.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-muted-foreground">
                        {group.summary}
                      </p>

                      <div className="mt-6 grid gap-3">
                        {group.itemIndices.map((itemIndex) => {
                          const item = content.items[itemIndex]

                          return (
                            <div
                              key={item.title}
                              className="rounded-[1.35rem] border border-border bg-surface-muted px-4 py-4"
                            >
                              <div className="flex items-start gap-3">
                                <CheckCircle2Icon
                                  className="mt-1 size-4 shrink-0 text-primary"
                                  strokeWidth={1.5}
                                />
                                <div>
                                  <p className="font-heading text-[1.35rem] leading-[0.95] text-heading uppercase">
                                    {item.title}
                                  </p>
                                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
