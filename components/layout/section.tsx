import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "default" | "muted"
  spacing?: "default" | "compact"
}

export function Section({
  className,
  tone = "default",
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        tone === "muted" ? "bg-[var(--color-tissue)]" : "bg-transparent",
        spacing === "default" ? "py-16 sm:py-20 lg:py-[5rem]" : "py-12 sm:py-16",
        className
      )}
      {...props}
    />
  )
}
