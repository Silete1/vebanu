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
        "group relative rounded-[1.4rem] border border-[var(--color-graphite)] bg-white/[0.04] px-5 py-4 transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.07]",
        compact ? "px-4 py-4" : "px-5 py-4.5"
      )}
    >
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15 font-mono text-[0.75rem] font-semibold text-blue-300 transition-colors group-hover:border-blue-500/60 group-hover:bg-blue-500/25">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-[1.15rem] leading-[1.1] font-normal text-white uppercase sm:text-[1.25rem]">
            {step.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
            {step.description}
          </p>
        </div>
      </div>

      {!isLast ? (
        <div className="mt-3 pl-5">
          <ArrowRightIcon
            className="size-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-blue-400"
            strokeWidth={1.5}
          />
        </div>
      ) : null}
    </div>
  )
}
