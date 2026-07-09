"use client"

import { useMemo, useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2Icon } from "lucide-react"

import type { MethodContent, MethodPhase } from "@/lib/content/home"
import { defaultLocale, type Locale, getLocaleAttributes } from "@/lib/i18n"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"


import { MethodPhasePanel } from "./method-phase-panel"
import { MethodRoute } from "./method-route"

gsap.registerPlugin(ScrollTrigger, useGSAP)

type MethodScrollStoryProps = {
  content: MethodContent
  locale?: Locale
}

function buildFallbackPhases(
  content: MethodContent,
  locale: Locale
): MethodPhase[] {
  if (content.phases?.length) {
    return content.phases
  }

  const steps = content.steps ?? []
  const isArabic = locale === "ar"

  return [
    {
      key: "assess",
      title: isArabic ? "التقييم" : "Assess",
      subtitle: isArabic
        ? "نفهم كيف تعمل الشركة فعلاً."
        : "Understand how the company actually runs.",
      steps: steps.slice(0, 3),
    },
    {
      key: "design",
      title: isArabic ? "التصميم" : "Design",
      subtitle: isArabic
        ? "نحوّل أدلة العمليات إلى نموذج تشغيل أفضل."
        : "Turn process evidence into a better operating model.",
      steps: steps.slice(3, 5),
    },
    {
      key: "activate",
      title: isArabic ? "التفعيل" : "Activate",
      subtitle: isArabic
        ? "ندرب ونقيس ونحسن بعد الإطلاق."
        : "Train, measure, and improve after go-live.",
      steps: steps.slice(5, 7),
    },
  ]
}

export function MethodScrollStory({
  content,
  locale = defaultLocale,
}: MethodScrollStoryProps) {
  const localeAttributes = getLocaleAttributes(locale)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const desktopSceneRef = useRef<HTMLDivElement | null>(null)
  const phases = useMemo(
    () => buildFallbackPhases(content, locale),
    [content, locale]
  )

  useGSAP(
    () => {
      const desktopScene = desktopSceneRef.current

      if (!desktopScene) {
        return
      }

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const conditions = context.conditions as
            { desktop?: boolean; reduceMotion?: boolean } | undefined

          if (!conditions?.desktop || conditions.reduceMotion) {
            return
          }

          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-method-phase]",
            desktopScene
          )
          const track = desktopScene.querySelector<HTMLElement>(
            "[data-method-track]"
          )
          const routeProgress = desktopScene.querySelector<SVGPathElement>(
            "[data-method-route-progress]"
          )
          const pulse = desktopScene.querySelector<SVGCircleElement>(
            "[data-method-route-pulse]"
          )
          const halo = desktopScene.querySelector<SVGCircleElement>(
            "[data-method-route-halo]"
          )
          const routeDots = gsap.utils.toArray<HTMLElement>(
            "[data-method-route-dot]",
            desktopScene
          )
          const routeItems = gsap.utils.toArray<HTMLElement>(
            "[data-method-route-item]",
            desktopScene
          )

          if (!panels.length || !track || !routeProgress || !pulse || !halo) {
            return
          }

          const stepsByPhase = panels.map((panel) =>
            gsap.utils.toArray<HTMLElement>("[data-method-step]", panel)
          )
          const snapPoints =
            panels.length > 1
              ? panels.map((_, index) => index / (panels.length - 1))
              : [0]
          const totalShift = (-100 * (panels.length - 1)) / panels.length
          const getRouteLength = () => routeProgress.getTotalLength()
          const getRoutePoint = (progress: number) =>
            routeProgress.getPointAtLength(getRouteLength() * progress)
          const dragState = {
            active: false,
            startX: 0,
            startProgress: 0,
            progress: 0,
          }

          gsap.set(track, { xPercent: 0, willChange: "transform" })
          gsap.set(panels, { willChange: "transform, opacity" })
          stepsByPhase.forEach((steps) => {
            gsap.set(steps, { willChange: "transform, opacity" })
          })
          const initialRouteLength = getRouteLength()
          gsap.set(routeProgress, {
            strokeDasharray: initialRouteLength,
            strokeDashoffset: initialRouteLength * 0.92,
          })
          gsap.set([pulse, halo], {
            attr: { cx: 4, cy: 25 },
          })

          const renderProgress = (rawProgress: number, animate = true) => {
            const progress = gsap.utils.clamp(0, 1, rawProgress)
            const phasePosition = progress * (panels.length - 1)
            const activeIndex = Math.round(phasePosition)
            const tween = animate ? gsap.to : gsap.set
            const duration = animate ? 0.22 : 0
            const routeLength = getRouteLength()
            const routePoint = getRoutePoint(progress)
            const routeDraw = 0.08 + progress * 0.92

            dragState.progress = progress

            tween(track, {
              xPercent: totalShift * progress,
              duration,
              ease: "power2.out",
              overwrite: true,
            })
            tween(routeProgress, {
              strokeDasharray: routeLength,
              strokeDashoffset: routeLength * (1 - routeDraw),
              duration,
              ease: "power2.out",
              overwrite: true,
            })
            tween([pulse, halo], {
              attr: { cx: routePoint.x, cy: routePoint.y },
              duration,
              ease: "power2.out",
              overwrite: true,
            })

            panels.forEach((panel, index) => {
              const distance = Math.abs(index - phasePosition)
              const isActive = index === activeIndex

              panel.dataset.active = String(isActive)
              tween(panel, {
                opacity: 1 - Math.min(distance * 0.52, 0.52),
                scale: 1 - Math.min(distance * 0.04, 0.04),
                y: Math.min(distance * 12, 18),
                duration,
                ease: "power2.out",
                overwrite: true,
              })

              tween(stepsByPhase[index], {
                autoAlpha: isActive ? 1 : 0.56,
                y: isActive ? 0 : 6,
                stagger: isActive ? 0.035 : 0,
                duration,
                ease: "power2.out",
                overwrite: true,
              })
            })

            routeDots.forEach((dot, index) => {
              tween(dot, {
                scale: index === activeIndex ? 1.28 : 1,
                y: index === activeIndex ? -2 : 0,
                borderColor:
                  index === activeIndex
                    ? "rgba(37,99,235,0.45)"
                    : "rgba(37,99,235,0.25)",
                boxShadow:
                  index === activeIndex
                    ? "0 0 0 6px rgba(37,99,235,0.08)"
                    : "0 0 0 0 rgba(37,99,235,0)",
                duration,
                ease: "power2.out",
                overwrite: true,
              })
            })

            routeItems.forEach((item, index) => {
              tween(item, {
                opacity: index === activeIndex ? 1 : 0.58,
                y: index === activeIndex ? 0 : 2,
                duration,
                ease: "power2.out",
                overwrite: true,
              })
            })
          }

          renderProgress(0, false)

          const trigger = ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${phases.length * 520}`,
            pin: true,
            scrub: 1.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: snapPoints,
              duration: { min: 0.25, max: 0.45 },
              delay: 0.08,
              ease: "power2.inOut",
            },
            onUpdate: (self) => {
              if (!dragState.active) {
                renderProgress(self.progress, true)
              }
            },
            onRefresh: (self) => renderProgress(self.progress, false),
          })

          const onPointerDown = (event: PointerEvent) => {
            if (event.button !== 0 || !trigger) {
              return
            }

            dragState.active = true
            dragState.startX = event.clientX
            dragState.startProgress = dragState.progress
            desktopScene.setPointerCapture(event.pointerId)
            desktopScene.dataset.dragging = "true"
          }

          const onPointerMove = (event: PointerEvent) => {
            if (!dragState.active || !trigger) {
              return
            }

            const width = Math.max(1, desktopScene.clientWidth)
            const delta = (event.clientX - dragState.startX) / width
            const nextProgress = gsap.utils.clamp(
              0,
              1,
              dragState.startProgress - delta * 1.35
            )

            renderProgress(nextProgress, true)
            window.scrollTo(
              0,
              trigger.start + (trigger.end - trigger.start) * nextProgress
            )
          }

          const endDrag = (event: PointerEvent) => {
            if (!dragState.active || !trigger) {
              return
            }

            dragState.active = false
            desktopScene.dataset.dragging = "false"
            const snapped = gsap.utils.snap(snapPoints, dragState.progress)
            window.scrollTo(
              0,
              trigger.start + (trigger.end - trigger.start) * snapped
            )
            renderProgress(snapped, true)

            if (desktopScene.hasPointerCapture(event.pointerId)) {
              desktopScene.releasePointerCapture(event.pointerId)
            }
          }

          desktopScene.addEventListener("pointerdown", onPointerDown)
          desktopScene.addEventListener("pointermove", onPointerMove)
          desktopScene.addEventListener("pointerup", endDrag)
          desktopScene.addEventListener("pointercancel", endDrag)

          return () => {
            desktopScene.removeEventListener("pointerdown", onPointerDown)
            desktopScene.removeEventListener("pointermove", onPointerMove)
            desktopScene.removeEventListener("pointerup", endDrag)
            desktopScene.removeEventListener("pointercancel", endDrag)
            trigger?.kill()
          }
        }
      )

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="relative">
      <Container className="hidden lg:block">
        <div className="grid min-h-[78vh] items-center gap-10 lg:grid-cols-[minmax(0,4.1fr)_minmax(0,7.9fr)]">
          <div className="relative z-10 max-w-xl lg:sticky lg:top-28 lg:pr-4">
            <p className="mono-label tag-dot flex items-center gap-2 text-white/64">
              {content.badge || "02 / METHOD"}
            </p>
            <h2 className="section-headline mt-6 max-w-[14ch] text-white">
              {content.title}
            </h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-8 text-white/70">
              {content.description}
            </p>

            <div
              {...localeAttributes}
              className="mt-10 rounded-[1.95rem] border border-[var(--color-graphite)] bg-white/[0.03] p-2"
            >
              <div className="rounded-[calc(1.95rem-0.5rem)] border border-[var(--color-graphite)] bg-[#111726]/80 px-6 py-6 backdrop-blur-md">
                <div className="grid gap-3.5">
                  {content.principles.map((principle) => (
                    <div
                      key={principle}
                      className="flex items-start gap-3 text-base leading-7 text-white/85"
                    >
                      <CheckCircle2Icon className="mt-1 size-5 shrink-0 text-[var(--color-bioluminescent-lime)]" />
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={desktopSceneRef}
            className="relative cursor-grab touch-pan-y overflow-hidden rounded-[2.5rem] border border-[var(--color-graphite)] bg-[#0c1018]/90 p-3 shadow-2xl active:cursor-grabbing"
          >
            <div className="bg-grid-subtle pointer-events-none absolute inset-0 opacity-20" />
            <MethodRoute phases={phases} />

            <div className="relative overflow-hidden rounded-[calc(2.5rem-0.75rem)] border border-[var(--color-graphite)] bg-[#101624]/95 px-5 pt-36 pb-5 sm:px-6 sm:pb-6">
              <div data-method-track className="flex w-[300%] gap-6">
                {phases.map((phase, phaseIndex) => (
                  <div
                    key={phase.key}
                    className="w-[calc((100%-3rem)/3)] shrink-0"
                  >
                    <MethodPhasePanel
                      phase={phase}
                      phaseIndex={phaseIndex}
                      stepStart={phases
                        .slice(0, phaseIndex)
                        .reduce((count, item) => count + item.steps.length, 0)}
                      layout="desktop"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="lg:hidden">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mono-label tag-dot flex items-center gap-2 text-white/64">
              {content.badge || "02 / METHOD"}
            </p>
            <h2 className="section-headline mt-6 text-white">
              {content.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70">
              {content.description}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div
              {...localeAttributes}
              className="mt-8 rounded-[1.8rem] border border-[var(--color-graphite)] bg-white/[0.03] p-2"
            >
              <div className="rounded-[calc(1.8rem-0.5rem)] border border-[var(--color-graphite)] bg-[#111726]/80 px-6 py-6 backdrop-blur-md">
                <div className="grid gap-3.5">
                  {content.principles.map((principle) => (
                    <div
                      key={principle}
                      className="flex items-start gap-3 text-base leading-7 text-white/85"
                    >
                      <CheckCircle2Icon className="mt-1 size-5 shrink-0 text-[var(--color-bioluminescent-lime)]" />
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6">
            {phases.map((phase, phaseIndex) => (
              <Reveal key={phase.key} delay={phaseIndex * 70}>
                <div className="relative pl-7">
                  {phaseIndex < phases.length - 1 ? (
                    <div className="absolute top-12 bottom-[-1.5rem] left-[0.65rem] w-0.5 bg-gradient-to-b from-[var(--color-bioluminescent-lime)] to-blue-500/30" />
                  ) : null}
                  <span className="absolute top-4 left-0 flex size-5 items-center justify-center rounded-full border border-[var(--color-bioluminescent-lime)]/60 bg-[#0c1018]">
                    <span className="size-2 rounded-full bg-[var(--color-bioluminescent-lime)]" />
                  </span>
                  <MethodPhasePanel
                    phase={phase}
                    phaseIndex={phaseIndex}
                    stepStart={phases
                      .slice(0, phaseIndex)
                      .reduce((count, item) => count + item.steps.length, 0)}
                    layout="mobile"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
