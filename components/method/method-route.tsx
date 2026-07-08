import type { MethodPhase } from "@/lib/content/home"

type MethodRouteProps = {
  phases: MethodPhase[]
}

export function MethodRoute({ phases }: MethodRouteProps) {
  return (
    <div className="pointer-events-none absolute inset-x-6 top-6 z-10 hidden lg:block">
      <div className="relative rounded-[1.6rem] border border-border bg-white px-6 py-4">
        <div
          data-method-route-line
          className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-primary/20"
        />
        <div
          data-method-route-progress
          className="absolute inset-x-10 top-1/2 h-px -translate-y-1/2 bg-primary"
        />
        <div
          data-method-route-pulse
          className="method-route-pulse absolute top-1/2 left-10 size-3 -translate-y-1/2 rounded-full bg-primary"
        />

        <div className="relative flex items-center justify-between gap-4">
          {phases.map((phase, phaseIndex) => (
            <div
              key={phase.key}
              data-method-route-item
              data-phase-index={phaseIndex}
              className="flex flex-col items-center gap-3"
            >
              <span
                data-method-route-dot
                className="flex size-4 items-center justify-center rounded-full border border-primary/25 bg-white"
              >
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              <div className="text-center">
                <p className="eyebrow text-primary">
                  {phase.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {phase.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
