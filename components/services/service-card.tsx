import type { LucideIcon } from "lucide-react"

import type { ServiceKey } from "@/lib/content/home"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type ServiceCardViewModel = {
  key: ServiceKey
  title: string
  description: string
  eyebrow: string
  icon: LucideIcon
  group: "Architecture" | "ERP Core" | "Control Loops" | "Enablement"
  role: "core" | "support"
}

type ServiceCardProps = {
  service: ServiceCardViewModel
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon
  const isCore = service.role === "core"

  return (
    <Card
      data-service-card={service.key}
      data-service-role={service.role}
      className={cn(
        "service-bento-card card-surface h-full rounded-[2rem] border-border bg-white py-0",
        isCore
          ? "border-primary bg-accent"
          : ""
      )}
    >
      <CardHeader className="px-5 pt-5">
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-border bg-secondary text-primary",
              isCore && "size-12 border-primary bg-[var(--surface-inverted)] text-white"
            )}
          >
            <Icon className={cn(isCore ? "size-6" : "size-5")} strokeWidth={1.45} />
          </span>
          <Badge
            variant="outline"
            className="border-primary/20 bg-white text-primary"
          >
            {service.eyebrow}
          </Badge>
        </div>
        <CardTitle
          className={cn("mt-5 text-[1.5rem]", isCore && "max-w-[13ch] text-[2.35rem]")}
        >
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <CardDescription className={cn("leading-7", isCore && "text-base leading-8")}>
          {service.description}
        </CardDescription>
        {isCore ? (
          <div className="mt-6 grid gap-2.5 rounded-[1.5rem] border border-primary/20 bg-white p-3.5">
            {["Architecture", "Approvals", "Workflow", "Reporting"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
