"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

import { Container } from "@/components/layout/container"

type MethodStep = {
  title: string
  text: string
}

type MethodCardStackProps = {
  steps: MethodStep[]
  label?: string
  headline?: string
}

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

      cards.forEach((card, index) => {
        // We don't need to scale down the very last card
        if (index === cards.length - 1) return

        const nextCard = cards[index + 1]
        if (!nextCard) return

        gsap.to(card, {
          scale: 0.93 - index * 0.015,
          opacity: 0.4,
          filter: "blur(2px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: () => `top ${112 + index * 22}px`,
            end: () => `+=${Math.max(180, nextCard.offsetTop - card.offsetTop - 22)}px`,
            scrub: 0.4,
            onUpdate: (self) => {
              if (self.progress > 0.55) {
                card.classList.remove("method-card-active")
                nextCard.classList.add("method-card-active")
              } else if (self.progress < 0.45 && index === 0) {
                card.classList.add("method-card-active")
              } else if (self.progress < 0.45) {
                nextCard.classList.remove("method-card-active")
                card.classList.add("method-card-active")
              }
            },
          },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <Container>
      <div ref={containerRef} className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Left Column: Sticky Heading & Label */}
        <div className="lg:sticky lg:top-28">
          <p className="mono-label tag-dot flex items-center gap-2 text-white/64">
            {label}
          </p>
          <h2 className="section-headline mt-6 max-w-4xl">
            {headline}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-7 text-white/60">
            Each phase builds physical and operational depth across the organization, ensuring controls are locked before software goes live.
          </p>
        </div>

        {/* Right Column: Stacked Cards */}
        <div className="relative flex flex-col gap-6 pb-[20vh] lg:pb-[30vh]">
          {steps.map((step, index) => (
            <article
              key={step.title}
              data-method-card
              style={{
                top: `${112 + index * 22}px`,
                zIndex: index + 1,
              }}
              className={`group sticky grid gap-6 rounded-[2rem] border border-[var(--color-graphite)] bg-[#0e131f]/94 p-8 backdrop-blur-2xl transition-[border-color,box-shadow,background-color] duration-500 md:grid-cols-[110px_1fr] md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] ${
                index === 0 ? "method-card-active" : ""
              }`}
            >
              <div className="mono-label flex size-11 items-center justify-center rounded-full border border-blue-500/35 bg-blue-500/15 font-mono text-sm font-semibold text-[var(--color-bioluminescent-lime)] shadow-[0_0_15px_-3px_rgba(0,255,102,0.2)]">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.015em] text-white sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  )
}
