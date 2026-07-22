"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function HomeScrollMotion() {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { reduceMotion, desktop } = context.conditions ?? {}
          const introHeader = document.querySelector<HTMLElement>(
            "[data-intro-header]"
          )
          const introVisual = document.querySelector<HTMLElement>(
            "[data-intro-visual]"
          )
          const introTitle =
            document.querySelector<HTMLElement>("[data-intro-title]")
          const introCopy =
            document.querySelector<HTMLElement>("[data-intro-copy]")
          const introActions = document.querySelector<HTMLElement>(
            "[data-intro-actions]"
          )
          const introItems = [
            introHeader,
            introVisual,
            introTitle,
            introCopy,
            introActions,
          ].filter(Boolean)

          const finalInset = desktop ? 12 : 8

          // Failsafe: reveal the completed hero if the intro timeline is interrupted.
          const safetyTimer = setTimeout(() => {
            if (introVisual) {
              introVisual.style.top = `${finalInset}px`
              introVisual.style.left = `${finalInset}px`
              introVisual.style.width = `calc(100% - ${finalInset * 2}px)`
              introVisual.style.height = `calc(100lvh - ${finalInset * 2}px)`
              introVisual.style.borderRadius = "20px"
              introVisual.style.opacity = "1"
              introVisual.style.visibility = "visible"
              introVisual.style.transform = "none"
              introVisual.style.setProperty("--intro-clip-y", "0%")
              introVisual.style.setProperty("--intro-clip-x", "0%")
              introVisual.style.setProperty("--intro-clip-radius", "20px")
            }
          }, 2400)

          if (reduceMotion) {
            clearTimeout(safetyTimer)
            gsap.set(introVisual, {
              autoAlpha: 1,
              top: finalInset,
              left: finalInset,
              width: `calc(100% - ${finalInset * 2}px)`,
              height: `calc(100lvh - ${finalInset * 2}px)`,
              borderRadius: 20,
              "--intro-clip-y": "0%",
              "--intro-clip-x": "0%",
              "--intro-clip-radius": "20px",
            })
            gsap.set(introItems, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              clearProps: "transform,visibility",
            })
            gsap.set(".story-track, .story-counter-track", {
              clearProps: "all",
              y: 0,
            })
            gsap.set(".story-counter", { clearProps: "all" })
            gsap.set(".story-progress-fill", { scaleX: 1 })
            gsap.set("[data-story-letter]", { clearProps: "color" })
            return () => clearTimeout(safetyTimer)
          }

          if (introVisual) {
            gsap.set(introHeader, { autoAlpha: 0, y: -16 })
            gsap.set(introVisual, {
              autoAlpha: 1,
              top: finalInset,
              left: finalInset,
              width: `calc(100% - ${finalInset * 2}px)`,
              height: `calc(100lvh - ${finalInset * 2}px)`,
              borderRadius: 20,
              "--intro-clip-y": "50%",
              "--intro-clip-x": "50%",
              "--intro-clip-radius": "999px",
            })
            gsap.set([introTitle, introCopy, introActions].filter(Boolean), {
              autoAlpha: 0,
              y: desktop ? 72 : 34,
              clipPath: "inset(0% 0% 100% 0%)",
            })

            const introTl = gsap.timeline({
              defaults: { ease: "power4.out" },
              onComplete: () => {
                clearTimeout(safetyTimer)
                ScrollTrigger.refresh()
              },
            })

            introTl
              .addLabel("open", 0)
              .to(
                introVisual,
                {
                  "--intro-clip-y": "0%",
                  "--intro-clip-x": "0%",
                  "--intro-clip-radius": "20px",
                  duration: 1.4,
                  ease: "power2.inOut",
                },
                "open"
              )
              .addLabel("reveal", "open+=1.02")
              .to(
                introHeader,
                { autoAlpha: 1, y: 0, duration: 0.7 },
                "reveal"
              )
              .to(
                introTitle,
                {
                  autoAlpha: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.86,
                },
                "reveal+=0.08"
              )
              .to(
                introCopy,
                {
                  autoAlpha: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.66,
                },
                "reveal+=0.2"
              )
              .to(
                introActions,
                {
                  autoAlpha: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.66,
                },
                "reveal+=0.28"
              )
          }
          // Border frame scroll animation — mirrors integratedbiosciences.com exactly
          // Uses ScrollTrigger.create() with onUpdate to manually set layout properties
          const heroVisual = document.querySelector<HTMLElement>(
            "[data-motion-hero] [data-lab-visual]"
          )
          const sharedVideoVisual =
            document.querySelector<HTMLElement>("[data-shared-video-visual]")
          const framedVisuals = [heroVisual, sharedVideoVisual].filter(
            (visual): visual is HTMLElement => Boolean(visual)
          )
          if (framedVisuals.length > 0) {
            ScrollTrigger.create({
              trigger: "[data-motion-hero]",
              start: "top top",
              end: "bottom+=50px bottom",
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress
                const maxInset = desktop ? 12 : 8
                const inset = maxInset - maxInset * progress
                const radius = 20 - 20 * progress

                framedVisuals.forEach((visual) => {
                  visual.style.top = `${inset}px`
                  visual.style.left = `${inset}px`
                  visual.style.width = `calc(100% - ${inset * 2}px)`
                  visual.style.height = `calc(100lvh - ${inset * 2}px)`
                  visual.style.borderRadius = `${radius}px`
                })
              },
            })
          }

          gsap.to("[data-shared-video-media]", {
            scale: desktop ? 1.2 : 1.1,
            yPercent: desktop ? -5 : -2,
            transformOrigin: "50% 50%",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-motion-story]",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })

          gsap.to("[data-intro-header]", {
            y: desktop ? -2 : -4,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-motion-story]",
              start: "top 65%",
              end: "top top",
              scrub: 1.2,
            },
          })

          const story = document.querySelector<HTMLElement>(
            "[data-motion-story]"
          )
          const storyMask = story?.querySelector<HTMLElement>(".story-mask")
          const storyTrack = story?.querySelector<HTMLElement>(".story-track")
          const counterMask = story?.querySelector<HTMLElement>(
            ".story-counter-mask"
          )
          const counterTrack = story?.querySelector<HTMLElement>(
            ".story-counter-track"
          )
          const progressFill = story?.querySelector<HTMLElement>(
            ".story-progress-fill"
          )

          if (
            story &&
            storyMask &&
            storyTrack &&
            counterMask &&
            counterTrack &&
            progressFill
          ) {
            const storyPanels = gsap.utils.toArray<HTMLElement>(
              storyTrack.querySelectorAll(".story-panel")
            )
            const counters = gsap.utils.toArray<HTMLElement>(
              counterTrack.querySelectorAll(".story-counter")
            )
            const panelLetters = storyPanels.map((panel) =>
              gsap.utils.toArray<HTMLElement>(
                panel.querySelectorAll("[data-story-letter]")
              )
            )

            gsap.set(storyTrack, { y: 0, force3D: true })
            gsap.set(counters, { autoAlpha: 0, y: 8 })
            gsap.set(counters[0], { autoAlpha: 1, y: 0 })
            gsap.set(panelLetters.flat(), {
              color: "rgba(255, 255, 255, 0.24)",
            })
            gsap.set(progressFill, {
              scaleX: 0,
              transformOrigin: "left center",
              force3D: true,
            })

            const storyTl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: story,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.4,
                invalidateOnRefresh: true,
              },
            })

            storyTl
              .to(progressFill, { scaleX: 1, duration: 1 }, 0)
              .to(
                storyTrack,
                {
                  y: () => -(storyPanels[1]?.offsetTop ?? 0),
                  duration: 0.18,
                },
                0.24
              )
              .to(counters[0], { autoAlpha: 0, y: -8, duration: 0.08 }, 0.24)
              .to(counters[1], { autoAlpha: 1, y: 0, duration: 0.08 }, 0.31)
              .to(
                storyTrack,
                {
                  y: () => -(storyPanels[2]?.offsetTop ?? 0),
                  duration: 0.18,
                },
                0.58
              )
              .to(counters[1], { autoAlpha: 0, y: -8, duration: 0.08 }, 0.58)
              .to(counters[2], { autoAlpha: 1, y: 0, duration: 0.08 }, 0.65)

            const highlightTl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: story,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.55,
                invalidateOnRefresh: true,
              },
            })

            ;[
              { letters: panelLetters[0], position: 0.025, amount: 0.2 },
              { letters: panelLetters[1], position: 0.34, amount: 0.2 },
              { letters: panelLetters[2], position: 0.68, amount: 0.24 },
            ].forEach(({ letters, position, amount }) => {
              highlightTl.to(
                letters,
                {
                  color: "rgba(255, 255, 255, 1)",
                  duration: 0.012,
                  stagger: { amount },
                },
                position
              )
            })
          }

          gsap.utils
            .toArray<HTMLElement>("[data-reveal-section]")
            .forEach((section) => {
              const items = gsap.utils.toArray<HTMLElement>(
                section.querySelectorAll(
                  "h2:not([data-method-card] *), h3:not([data-method-card] *), p:not([data-method-card] *), [data-reveal-item], article:not([data-method-card]), .flat-card"
                )
              )

              gsap.fromTo(
                items,
                {
                  autoAlpha: 0,
                  y: desktop ? 68 : 34,
                  clipPath: "inset(0% 0% 24% 0%)",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 1.05,
                  ease: "power4.out",
                  stagger: 0.04,
                  scrollTrigger: {
                    trigger: section,
                    start: "top 78%",
                    once: true,
                  },
                }
              )
            })

          const footer = document.querySelector<HTMLElement>(
            "[data-motion-footer]"
          )
          const footerItems = footer
            ? gsap.utils.toArray<HTMLElement>(
                footer.querySelectorAll("[data-footer-reveal]")
              )
            : []

          if (footer) {
            gsap.fromTo(
              footerItems,
              { autoAlpha: 0, y: desktop ? 74 : 38 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.08,
                scrollTrigger: {
                  trigger: footer,
                  start: "top 72%",
                  once: true,
                },
              }
            )
          }

          gsap.fromTo(
            "[data-insight-image]",
            { clipPath: "inset(18% 0 18% 0)", y: 42, autoAlpha: 0.72 },
            {
              clipPath: "inset(0% 0 0% 0)",
              y: 0,
              autoAlpha: 1,
              ease: "power3.out",
              duration: 1.1,
              scrollTrigger: {
                trigger: "[data-insight-image]",
                start: "top 82%",
                once: true,
              },
            }
          )

          ScrollTrigger.refresh()
        }
      )

      return () => {
        mm.revert()
      }
    },
    { dependencies: [] }
  )

  return null
}
