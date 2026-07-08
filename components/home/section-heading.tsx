import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  badge?: string
  title: string
  description: string
  align?: "left" | "center"
  aside?: ReactNode
  className?: string
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" && "lg:flex-col lg:items-center lg:text-center",
        className
      )}
    >
      <div className="max-w-3xl">
        {badge ? (
          <Badge variant="outline">
            {badge}
          </Badge>
        ) : null}
        <h2 className="section-title mt-4 text-heading">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
      {aside ? <div className="max-w-xl">{aside}</div> : null}
    </div>
  )
}
