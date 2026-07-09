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
        "method-phase-panel relative h-full rounded-[2rem] border border-[var(--color-graphite)] bg-[#151c2f]/70 p-2 transition-all duration-300",
        layout === "desktop"
          ? "min-h-[34rem] overflow-hidden"
          : "overflow-visible"
      )}
    >
      <div className="relative flex h-full flex-col justify-between rounded-[calc(2rem-0.5rem)] border border-[var(--color-graphite)] bg-[#0d121c]/90 px-6 py-6 sm:px-8 sm:py-8">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mono-label text-[var(--color-bioluminescent-lime)]">
                PHASE 0{phaseIndex + 1}
              </p>
              <h3 className="mt-3 font-heading text-[clamp(1.8rem,2.2vw,2.4rem)] leading-[0.94] font-normal text-white uppercase">
                {phase.title}
              </h3>
            </div>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 font-mono text-[0.75rem] font-medium text-blue-300">
              {phase.steps.length} STEPS
            </span>
          </div>

          <p className="mt-4 max-w-[36ch] text-base leading-7 text-white/70 sm:text-lg">
            {phase.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-3.5">
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
