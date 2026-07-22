"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

import { Container } from "@/components/layout/container"

type MethodStep = {
  title: string
  text: string
  phase: string
  output: string
  controls: string[]
}

type MethodCardStackProps = {
  steps: MethodStep[]
  label?: string
  headline?: string
}

const CARD_STICKY_TOP = 112
const CARD_STACK_OFFSET = 22
const STACK_TRANSITION_DISTANCE = 120

export function MethodCardStack({
  steps,
  label = "02 / METHOD",
  headline = "From scattered work to governed execution.",
}: MethodCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      const cards = gsap.utils.toArray<HTMLElement>("[data-method-card]")
      if (!cards.length) return

      const syncActiveCard = () => {
        let activeIndex = 0

        cards.forEach((card, index) => {
          const stickyTop = CARD_STICKY_TOP + index * CARD_STACK_OFFSET

          if (
            card.getBoundingClientRect().top <=
            stickyTop + STACK_TRANSITION_DISTANCE
          ) {
            activeIndex = index
          }
        })

        cards.forEach((card, index) => {
          card.classList.toggle("method-card-active", index === activeIndex)
        })
      }

      syncActiveCard()

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return

        const nextCard = cards[index + 1]
        if (!nextCard) return

        gsap.to(card, {
          scale: 0.93 - index * 0.015,
          filter: "blur(1.5px)",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: () =>
              `top ${
                CARD_STICKY_TOP +
                (index + 1) * CARD_STACK_OFFSET +
                STACK_TRANSITION_DISTANCE
              }px`,
            end: () =>
              `top ${CARD_STICKY_TOP + (index + 1) * CARD_STACK_OFFSET}px`,
            scrub: true,
            onRefresh: syncActiveCard,
            onUpdate: syncActiveCard,
          },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <Container>
      <div
        ref={containerRef}
        className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
      >
        <div className="lg:sticky lg:top-28 lg:pb-36">
          <p className="mono-label tag-dot flex items-center gap-2 text-white/64">
            {label}
          </p>
          <h2 className="section-headline mt-6 max-w-4xl">{headline}</h2>
          <p className="mt-6 max-w-md text-lg leading-7 text-white/60">
            Each phase builds physical and operational depth across the
            organization, ensuring controls are locked before software goes
            live.
          </p>
        </div>

        <div className="relative flex flex-col gap-6 lg:pt-[52px]">
          {steps.map((step, index) => (
            <article
              key={step.title}
              data-method-card
              style={{
                top: `${CARD_STICKY_TOP + index * CARD_STACK_OFFSET}px`,
                zIndex: index + 1,
              }}
              className={`group sticky min-h-[440px] overflow-hidden border border-slate-300 bg-[var(--color-bone-white)] text-[var(--color-abyssal-ink)] shadow-[0_28px_70px_-34px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow,background-color] duration-500 ${
                index === 0 ? "method-card-active" : ""
              }`}
            >
              <div className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center border-b border-slate-300 bg-white/70">
                <div
                  data-method-phase
                  className="mono-label flex h-full items-center justify-center bg-[var(--color-abyssal-ink)] px-2 py-4 text-center text-white"
                >
                  {step.phase}
                </div>
                <p className="mono-label truncate px-4 text-[11px] text-slate-500 sm:px-5">
                  ANU / Operating control method
                </p>
                <p className="mono-label border-s border-slate-300 px-4 py-4 text-[11px] text-slate-500 sm:px-5">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(steps.length).padStart(2, "0")}
                </p>
              </div>

              <div className="grid min-h-[390px] sm:grid-cols-[96px_minmax(0,1fr)]">
                <div className="hidden border-e border-slate-300 sm:flex sm:flex-col sm:justify-between sm:p-5">
                  <span className="font-mono text-[2.75rem] leading-none font-medium tracking-[-0.08em] text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div aria-hidden="true" className="flex flex-col gap-2">
                    {steps.map((_, routeIndex) => (
                      <span
                        key={routeIndex}
                        className={`h-1.5 w-1.5 rounded-full ${
                          routeIndex <= index
                            ? "bg-[var(--color-bioluminescent-lime)]"
                            : "bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:p-9">
                  <div className="max-w-xl">
                    <p className="mono-label text-[var(--color-bioluminescent-lime)]">
                      Phase objective
                    </p>
                    <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.65rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-balance">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                      {step.text}
                    </p>
                  </div>

                  <div className="mt-auto grid gap-6 border-t border-slate-300 pt-6 sm:grid-cols-[1fr_0.9fr] sm:gap-8">
                    <div>
                      <p className="mono-label text-[11px] text-slate-500">
                        Control checkpoints
                      </p>
                      <ul
                        className="mt-3 space-y-2"
                        aria-label={`${step.title} control checkpoints`}
                      >
                        {step.controls.map((control) => (
                          <li
                            key={control}
                            className="flex items-center gap-3 text-sm font-medium text-slate-700"
                          >
                            <span
                              aria-hidden="true"
                              className="h-px w-4 shrink-0 bg-[var(--color-bioluminescent-lime)]"
                            />
                            {control}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-s-2 border-[var(--color-bioluminescent-lime)] ps-4">
                      <p className="mono-label text-[11px] text-slate-500">
                        Phase handoff
                      </p>
                      <p className="mt-3 text-base leading-6 font-semibold text-[var(--color-abyssal-ink)]">
                        {step.output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  )
}
