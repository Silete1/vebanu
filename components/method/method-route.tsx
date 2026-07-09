import type { MethodPhase } from "@/lib/content/home"

type MethodRouteProps = {
  phases: MethodPhase[]
}

export function MethodRoute({ phases }: MethodRouteProps) {
  return (
    <div className="pointer-events-none absolute inset-x-6 top-6 z-10 hidden lg:block">
      <div className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-graphite)] bg-[#151c2f]/90 px-6 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <svg
          data-method-route-svg
          className="absolute inset-x-8 top-3 h-12 w-[calc(100%-4rem)] overflow-visible"
          viewBox="0 0 100 46"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            data-method-route-line
            d="M 4 25 C 21 5 34 45 50 25 S 79 5 96 25"
            fill="none"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeLinecap="round"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            data-method-route-progress
            d="M 4 25 C 21 5 34 45 50 25 S 79 5 96 25"
            fill="none"
            stroke="var(--color-bioluminescent-lime, #2563eb)"
            strokeLinecap="round"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            data-method-route-halo
            cx="4"
            cy="25"
            r="8"
            fill="rgba(37, 99, 235, 0.25)"
          />
          <circle
            data-method-route-pulse
            className="method-route-pulse"
            cx="4"
            cy="25"
            r="3.5"
            fill="var(--color-bioluminescent-lime, #2563eb)"
          />
        </svg>

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
                className="flex size-5 items-center justify-center rounded-full border border-blue-500/40 bg-[#0c1018] shadow-sm transition-all duration-300"
              >
                <span className="size-2 rounded-full bg-[var(--color-bioluminescent-lime)] transition-all duration-300" />
              </span>
              <div className="text-center">
                <p className="eyebrow font-mono text-[11px] tracking-wider text-[var(--color-bioluminescent-lime)] uppercase">
                  {phase.title}
                </p>
                <p className="mt-1 text-xs font-medium text-white/70">
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
