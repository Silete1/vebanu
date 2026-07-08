"use client"

import { useMemo, useRef } from "react"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2Icon } from "lucide-react"

import type { MethodContent, MethodPhase } from "@/lib/content/home"
import {
  defaultLocale,
  type Locale,
  getLocaleAttributes,
} from "@/lib/i18n"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"

import { MethodPhasePanel } from "./method-phase-panel"
import { MethodRoute } from "./method-route"

gsap.registerPlugin(ScrollTrigger, useGSAP)

type MethodScrollStoryProps = {
  content: MethodContent
  locale?: Locale
}

function buildFallbackPhases(content: MethodContent, locale: Locale): MethodPhase[] {
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
            | { desktop?: boolean; reduceMotion?: boolean }
            | undefined

          if (!conditions?.desktop || conditions.reduceMotion) {
            return
          }

          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-method-phase]",
            desktopScene
          )
          const track = desktopScene.querySelector<HTMLElement>("[data-method-track]")
          const route = desktopScene.querySelector<HTMLElement>("[data-method-route-line]")
          const routeProgress = desktopScene.querySelector<HTMLElement>(
            "[data-method-route-progress]"
          )
          const pulse = desktopScene.querySelector<HTMLElement>(
            "[data-method-route-pulse]"
          )
          const routeDots = gsap.utils.toArray<HTMLElement>(
            "[data-method-route-dot]",
            desktopScene
          )

          if (!panels.length || !track || !route || !routeProgress || !pulse) {
            return
          }

          const stepsByPhase = panels.map((panel) =>
            gsap.utils.toArray<HTMLElement>("[data-method-step]", panel)
          )
          const snapPoints = panels.map((_, index) => index / (panels.length - 1))
          const totalShift = (-100 * (panels.length - 1)) / panels.length
          const routeTravel = () => Math.max(0, route.offsetWidth - pulse.offsetWidth)
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
          gsap.set(routeProgress, {
            scaleX: 0.12,
            transformOrigin: "left center",
            willChange: "transform",
          })
          gsap.set(pulse, { x: 0, willChange: "transform" })

          const renderProgress = (rawProgress: number, animate = true) => {
            const progress = gsap.utils.clamp(0, 1, rawProgress)
            const phasePosition = progress * (panels.length - 1)
            const activeIndex = Math.round(phasePosition)
            const tween = animate ? gsap.to : gsap.set
            const duration = animate ? 0.22 : 0

            dragState.progress = progress

            tween(track, {
              xPercent: totalShift * progress,
              duration,
              ease: "power2.out",
              overwrite: true,
            })
            tween(routeProgress, {
              scaleX: 0.12 + progress * 0.88,
              duration,
              ease: "power2.out",
              overwrite: true,
            })
            tween(pulse, {
              x: routeTravel() * progress,
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
                borderColor:
                  index === activeIndex
                    ? "rgba(37,99,235,0.45)"
                    : "rgba(37,99,235,0.25)",
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
            end: () => `+=${phases.length * 760}`,
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: snapPoints,
              duration: { min: 0.16, max: 0.28 },
              delay: 0.03,
              ease: "power1.inOut",
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
            window.scrollTo(0, trigger.start + (trigger.end - trigger.start) * nextProgress)
          }

          const endDrag = (event: PointerEvent) => {
            if (!dragState.active || !trigger) {
              return
            }

            dragState.active = false
            desktopScene.dataset.dragging = "false"
            const snapped = gsap.utils.snap(snapPoints, dragState.progress)
            window.scrollTo(0, trigger.start + (trigger.end - trigger.start) * snapped)
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
    <div ref={rootRef}>
      <Container className="hidden lg:block">
        <div className="grid min-h-[78vh] items-center gap-10 lg:grid-cols-[minmax(0,4.1fr)_minmax(0,7.9fr)]">
          <div className="relative z-10 max-w-xl lg:sticky lg:top-24 lg:pr-2">
            <Badge
              variant="outline"
              className="border-primary/20 bg-white text-primary"
            >
              {content.badge}
            </Badge>
            <h2 className="section-title mt-5 max-w-[12ch] text-heading">
              {content.title}
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-muted-foreground sm:text-lg">
              {content.description}
            </p>

            <div
              {...localeAttributes}
              className="mt-8 rounded-[1.95rem] border border-border bg-white p-2"
            >
              <div className="rounded-[calc(1.95rem-0.5rem)] border border-border bg-surface-muted px-5 py-5">
                <div className="grid gap-3.5">
                  {content.principles.map((principle) => (
                    <div
                      key={principle}
                      className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                    >
                      <CheckCircle2Icon className="mt-1 size-4 shrink-0 text-primary" />
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            ref={desktopSceneRef}
            className="relative cursor-grab touch-pan-y overflow-hidden rounded-[2.35rem] border border-border bg-white p-2 active:cursor-grabbing"
          >
            <div className="absolute inset-0 bg-grid-subtle opacity-35" />
            <MethodRoute phases={phases} />

            <div className="relative overflow-hidden rounded-[calc(2.35rem-0.5rem)] border border-border bg-white px-4 pt-32 pb-4">
              <div data-method-track className="flex w-[300%] gap-5">
                {phases.map((phase, phaseIndex) => (
                  <div
                    key={phase.key}
                    className="w-[calc((100%-2.5rem)/3)] shrink-0"
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
            <Badge
              variant="outline"
              className="border-primary/20 bg-white text-primary"
            >
              {content.badge}
            </Badge>
            <h2 className="section-title mt-5 text-heading">
              {content.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {content.description}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div
              {...localeAttributes}
              className="mt-7 rounded-[1.8rem] border border-border bg-white p-2"
            >
              <div className="rounded-[calc(1.8rem-0.5rem)] border border-border bg-surface-muted px-5 py-5">
                <div className="grid gap-3.5">
                  {content.principles.map((principle) => (
                    <div
                      key={principle}
                      className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                    >
                      <CheckCircle2Icon className="mt-1 size-4 shrink-0 text-primary" />
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5">
            {phases.map((phase, phaseIndex) => (
              <Reveal key={phase.key} delay={phaseIndex * 70}>
                <div className="relative pl-6">
                  {phaseIndex < phases.length - 1 ? (
                    <div className="absolute top-12 bottom-[-1.25rem] left-[0.55rem] w-px bg-primary/35" />
                  ) : null}
                  <span className="absolute top-4 left-0 flex size-4 items-center justify-center rounded-full border border-primary/25 bg-white">
                    <span className="size-1.5 rounded-full bg-primary" />
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
