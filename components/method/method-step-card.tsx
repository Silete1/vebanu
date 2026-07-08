import { ArrowRightIcon } from "lucide-react"

import type { MethodStep } from "@/lib/content/home"
import { cn } from "@/lib/utils"

type MethodStepCardProps = {
  step: MethodStep
  index: number
  isLast: boolean
  compact?: boolean
}

export function MethodStepCard({
  step,
  index,
  isLast,
  compact = false,
}: MethodStepCardProps) {
  return (
    <div
      data-method-step
      className={cn(
        "rounded-[1.4rem] border border-border bg-surface-muted px-4 py-4",
        compact ? "px-4 py-4" : "px-4 py-4 sm:px-5"
      )}
    >
      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-accent text-[0.72rem] font-semibold text-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <p className="font-heading text-[1.2rem] leading-[0.95] text-heading uppercase">
            {step.title}
          </p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {step.description}
          </p>
        </div>
      </div>

      {!isLast ? (
        <div className="mt-3 pl-4">
          <ArrowRightIcon className="size-4 text-primary/40" strokeWidth={1.5} />
        </div>
      ) : null}
    </div>
  )
}
