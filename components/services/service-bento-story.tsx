"use client"

import {
  ArrowRightLeftIcon,
  BoxesIcon,
  BrainCircuitIcon,
  ChartColumnIcon,
  LandmarkIcon,
  Layers2Icon,
  SlidersHorizontalIcon,
  UserRoundCogIcon,
  WorkflowIcon,
} from "lucide-react"

import type { ServiceItem, ServiceKey } from "@/lib/content/home"
import {
  defaultLocale,
  getLocaleAttributes,
  type Locale,
} from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"

import { ServiceCard, type ServiceCardViewModel } from "./service-card"

type ServicesContent = {
  badge: string
  title: string
  description: string
  items: ServiceItem[]
}

type ServiceBentoStoryProps = {
  content: ServicesContent
  locale?: Locale
}

type ServiceMeta = Pick<
  ServiceCardViewModel,
  "key" | "eyebrow" | "icon" | "group" | "role"
>

const serviceMeta: ServiceMeta[] = [
  {
    key: "architecture",
    eyebrow: "Operating blueprint",
    icon: BrainCircuitIcon,
    group: "Architecture",
    role: "support",
  },
  {
    key: "process",
    eyebrow: "Workflow redesign",
    icon: WorkflowIcon,
    group: "Architecture",
    role: "support",
  },
  {
    key: "odoo",
    eyebrow: "Control platform",
    icon: Layers2Icon,
    group: "ERP Core",
    role: "core",
  },
  {
    key: "inventory",
    eyebrow: "Stock discipline",
    icon: BoxesIcon,
    group: "Control Loops",
    role: "support",
  },
  {
    key: "finance",
    eyebrow: "Finance control",
    icon: LandmarkIcon,
    group: "Control Loops",
    role: "support",
  },
  {
    key: "sales",
    eyebrow: "Revenue workflow",
    icon: ArrowRightLeftIcon,
    group: "Control Loops",
    role: "support",
  },
  {
    key: "dashboard",
    eyebrow: "Owner visibility",
    icon: ChartColumnIcon,
    group: "Control Loops",
    role: "support",
  },
  {
    key: "integration",
    eyebrow: "Evidence flow",
    icon: SlidersHorizontalIcon,
    group: "Enablement",
    role: "support",
  },
  {
    key: "training",
    eyebrow: "User readiness",
    icon: UserRoundCogIcon,
    group: "Enablement",
    role: "support",
  },
]

const serviceSpans: Record<ServiceKey, string> = {
  architecture: "lg:col-span-4 lg:row-span-2",
  process: "lg:col-span-4",
  odoo: "lg:col-span-4 lg:row-span-2",
  inventory: "lg:col-span-4 lg:row-span-2",
  finance: "lg:col-span-4",
  sales: "lg:col-span-4 lg:row-span-2",
  dashboard: "lg:col-span-4",
  integration: "lg:col-span-4",
  training: "lg:col-span-4",
}

function buildServices(items: ServiceItem[]): ServiceCardViewModel[] {
  return serviceMeta.map((meta) => {
    const item = items.find((service) => service.key === meta.key)

    if (!item) {
      throw new Error(`Missing service content for ${meta.key}`)
    }

    return {
      ...meta,
      title: item.title,
      description: item.description,
    }
  })
}

export function ServiceBentoStory({
  content,
  locale = defaultLocale,
}: ServiceBentoStoryProps) {
  const localeAttributes = getLocaleAttributes(locale)
  const services = buildServices(content.items)

  return (
    <div {...localeAttributes} className="grid gap-10">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
          <div className="max-w-[18ch]">
            <p className="eyebrow text-primary">{content.badge}</p>
            <h2 className="section-title mt-5 text-heading">{content.title}</h2>
          </div>
          <p className="max-w-[60ch] text-base leading-8 text-muted-foreground">
            {content.description}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(16rem,auto)]">
        {services.map((service, index) => (
          <Reveal
            key={service.key}
            delay={index * 40}
            className={cn("h-full", serviceSpans[service.key])}
          >
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
