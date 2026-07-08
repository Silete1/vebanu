import type { MethodPhase } from "@/lib/content/home"
import { cn } from "@/lib/utils"

import { MethodStepCard } from "./method-step-card"

type MethodPhasePanelProps = {
  phase: MethodPhase
  phaseIndex: number
  stepStart: number
  layout?: "desktop" | "mobile"
}

export function MethodPhasePanel({
  phase,
  phaseIndex,
  stepStart,
  layout = "desktop",
}: MethodPhasePanelProps) {
  return (
    <article
      data-method-phase
      className={cn(
        "method-phase-panel relative h-full rounded-[2rem] border border-border bg-white p-2",
        layout === "desktop"
          ? "min-h-[32rem] overflow-hidden"
          : "overflow-visible"
      )}
    >
      <div className="relative flex h-full flex-col rounded-[calc(2rem-0.5rem)] border border-border bg-white px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">
              Phase {phaseIndex + 1}
            </p>
            <h3 className="mt-2 font-heading text-[2.2rem] leading-[0.92] text-heading uppercase">
              {phase.title}
            </h3>
          </div>
          <span className="rounded-full border border-primary/20 bg-accent px-2.5 py-1 text-[0.72rem] font-medium text-primary">
            {phase.steps.length} steps
          </span>
        </div>

        <p className="mt-4 max-w-[32ch] text-sm leading-7 text-muted-foreground sm:text-base">
          {phase.subtitle}
        </p>

        <div className="mt-6 grid gap-3">
          {phase.steps.map((step, stepIndex) => (
            <MethodStepCard
              key={step.title}
              step={step}
              index={stepStart + stepIndex}
              isLast={stepIndex === phase.steps.length - 1}
              compact={layout === "mobile"}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
