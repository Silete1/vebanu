import {
  FactoryIcon,
  HeartPulseIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  WorkflowIcon,
} from "lucide-react"

import { homeContent } from "@/lib/content/home"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type IndustriesSectionProps = {
  locale?: Locale
}

const industryMetadata = {
  distribution: {
    icon: TruckIcon,
    focus: "Purchasing, stock movement, and margin visibility.",
    priorities: [
      "Warehouse-to-branch movement control",
      "Purchasing approvals tied to demand signals",
      "Owner visibility on stock pressure and margin leakage",
    ],
  },
  manufacturing: {
    icon: FactoryIcon,
    focus: "Materials, routing discipline, and costing evidence.",
    priorities: [
      "Production handoff visibility",
      "Material consumption and replenishment control",
      "Routing and costing discipline across work orders",
    ],
  },
  retail: {
    icon: ShoppingBagIcon,
    focus: "Branch operations, transfers, and owner oversight.",
    priorities: [
      "Branch-level inventory consistency",
      "Transfer approvals and exception handling",
      "Daily visibility across outlets and back office",
    ],
  },
  logistics: {
    icon: WorkflowIcon,
    focus: "Service handoffs, dispatch visibility, and reporting.",
    priorities: [
      "Request-to-delivery workflow control",
      "Operational exception tracking",
      "Manager visibility on delayed handoffs",
    ],
  },
  healthcare: {
    icon: HeartPulseIcon,
    focus: "Controlled workflows with reliable inventory and finance evidence.",
    priorities: [
      "Front-desk to back-office handoff clarity",
      "Stock discipline for controlled items",
      "Reporting for operational and financial oversight",
    ],
  },
  commerce: {
    icon: ShoppingCartIcon,
    focus: "Order flow, fulfillment reliability, and exception reporting.",
    priorities: [
      "Order-to-fulfillment flow control",
      "Inventory reliability across sales channels",
      "Exception reporting for delayed or blocked orders",
    ],
  },
} as const

export function IndustriesSection({
  locale = defaultLocale,
}: IndustriesSectionProps) {
  const content = homeContent[locale].industries

  return (
    <Section id="industries" className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">{content.badge}</p>
            <h2 className="section-title mt-5 text-heading">
              {content.title}
            </h2>
            <p className="mt-5 max-w-[64ch] text-base leading-8 text-muted-foreground sm:text-lg">
              {content.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <Tabs
            defaultValue={content.items[0]?.key}
            className="gap-5"
          >
            <TabsList
              variant="line"
              className="w-full justify-start gap-2 overflow-x-auto rounded-full border border-border bg-white p-1.5"
            >
              {content.items.map((industry) => (
                <TabsTrigger
                  key={industry.key}
                  value={industry.key}
                  className="rounded-full px-4 py-2 text-sm data-active:bg-accent data-active:text-primary data-active:after:opacity-0"
                >
                  {industry.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {content.items.map((industry) => {
              const metadata = industryMetadata[industry.key]
              const Icon = metadata.icon

              return (
                <TabsContent key={industry.key} value={industry.key}>
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                    <div className="rounded-[2rem] border border-border bg-white p-2">
                      <div className="rounded-[calc(2rem-0.5rem)] border border-border bg-white p-6 sm:p-7">
                        <div className="flex items-center gap-3">
                          <span className="flex size-12 items-center justify-center rounded-full border border-primary bg-accent text-primary">
                            <Icon className="size-5" strokeWidth={1.5} />
                          </span>
                          <div>
                            <p className="eyebrow text-primary">
                              Control priority
                            </p>
                            <h3 className="mt-1 font-heading text-[2rem] leading-[0.92] text-heading uppercase">
                              {industry.title}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-5 text-base leading-8 text-muted-foreground">
                          {industry.description}
                        </p>
                        <div className="mt-6 rounded-[1.4rem] border border-primary/20 bg-accent px-4 py-4 text-sm leading-7 text-foreground">
                          {metadata.focus}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {metadata.priorities.map((priority, index) => (
                        <div
                          key={priority}
                          className={index === 0 ? "md:col-span-2" : ""}
                        >
                          <div className="h-full rounded-[1.75rem] border border-border bg-white p-5">
                            <p className="eyebrow text-primary">
                              Focus {index + 1}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-muted-foreground">
                              {priority}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </Reveal>
      </Container>
    </Section>
  )
}
