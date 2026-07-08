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
          const introLoader = document.querySelector<HTMLElement>("[data-intro-loader]")
          const introLoaderLine = document.querySelector<HTMLElement>("[data-intro-loader-line]")
          const introLoaderBrand = document.querySelector<HTMLElement>("[data-intro-loader-brand]")
          const introHeader = document.querySelector<HTMLElement>("[data-intro-header]")
          const introVisual = document.querySelector<HTMLElement>("[data-intro-visual]")
          const introTitle = document.querySelector<HTMLElement>("[data-intro-title]")
          const introCopy = document.querySelector<HTMLElement>("[data-intro-copy]")
          const introActions = document.querySelector<HTMLElement>("[data-intro-actions]")
          const introItems = [
            introHeader,
            introVisual,
            introTitle,
            introCopy,
            introActions,
          ].filter(Boolean)

          if (reduceMotion) {
            gsap.set(introLoader, { autoAlpha: 0, display: "none" })
            gsap.set(introItems, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform,visibility" })
            gsap.set(".story-track, .story-counter-track", {
              clearProps: "all",
              y: 0,
            })
            gsap.set(".story-counter", { clearProps: "all" })
            gsap.set(".story-progress-fill", { scaleX: 1 })
            return
          }

          if (introLoader && introLoaderLine) {
            gsap.set(introLoader, {
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0%)",
            })
            gsap.set(introLoaderLine, {
              scaleX: 0,
              transformOrigin: "left center",
            })
            gsap.set(introLoaderBrand, { autoAlpha: 0.56, y: 8 })
            gsap.set(introHeader, { autoAlpha: 0, y: -16 })
            gsap.set(introVisual, {
              autoAlpha: 1,
              scale: desktop ? 0.985 : 1,
              transformOrigin: "center top",
            })
            gsap.set([introTitle, introCopy, introActions].filter(Boolean), {
              autoAlpha: 0,
              y: desktop ? 72 : 34,
            })

            const introTl = gsap.timeline({
              defaults: { ease: "power4.out" },
              onComplete: () => {
                ScrollTrigger.refresh()
              },
            })

            introTl
              .to(introLoaderBrand, { autoAlpha: 1, y: 0, duration: 0.38 }, 0)
              .to(introLoaderLine, { scaleX: 1, duration: 0.72, ease: "power3.inOut" }, 0.08)
              .to(
                introLoader,
                {
                  clipPath: "inset(0% 0% 100% 0%)",
                  duration: 0.82,
                  ease: "power4.inOut",
                },
                0.86
              )
              .to(introVisual, { scale: 1, duration: 1.1 }, 0.78)
              .to(introHeader, { autoAlpha: 1, y: 0, duration: 0.72 }, 1.08)
              .to(introTitle, { autoAlpha: 1, y: 0, duration: 0.92 }, 1.12)
              .to(introCopy, { autoAlpha: 1, y: 0, duration: 0.72 }, 1.28)
              .to(introActions, { autoAlpha: 1, y: 0, duration: 0.72 }, 1.36)
              .set(introLoader, { display: "none" })
          }

          gsap.to("[data-motion-hero] [data-hero-bg]", {
            scale: desktop ? 1.1 : 1.04,
            yPercent: desktop ? -5 : -2,
            transformOrigin: "50% 50%",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-motion-hero]",
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          })

          gsap.to("[data-motion-story] [data-hero-bg]", {
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
              scrub: 0.6,
            },
          })

          const story = document.querySelector<HTMLElement>("[data-motion-story]")
          const storyMask = story?.querySelector<HTMLElement>(".story-mask")
          const storyTrack = story?.querySelector<HTMLElement>(".story-track")
          const counterMask = story?.querySelector<HTMLElement>(".story-counter-mask")
          const counterTrack = story?.querySelector<HTMLElement>(".story-counter-track")
          const progressFill = story?.querySelector<HTMLElement>(".story-progress-fill")

          if (story && storyMask && storyTrack && counterMask && counterTrack && progressFill) {
            const storyPanels = gsap.utils.toArray<HTMLElement>(
              storyTrack.querySelectorAll(".story-panel")
            )
            const counters = gsap.utils.toArray<HTMLElement>(
              counterTrack.querySelectorAll(".story-counter")
            )

            gsap.set(storyTrack, { y: 0, force3D: true })
            gsap.set(counters, { autoAlpha: 0, y: 8 })
            gsap.set(counters[0], { autoAlpha: 1, y: 0 })
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
                scrub: 0.65,
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
              .to(
                counters[0],
                { autoAlpha: 0, y: -8, duration: 0.08 },
                0.24
              )
              .to(
                counters[1],
                { autoAlpha: 1, y: 0, duration: 0.08 },
                0.31
              )
              .to(
                storyTrack,
                {
                  y: () => -(storyPanels[2]?.offsetTop ?? 0),
                  duration: 0.18,
                },
                0.58
              )
              .to(
                counters[1],
                { autoAlpha: 0, y: -8, duration: 0.08 },
                0.58
              )
              .to(
                counters[2],
                { autoAlpha: 1, y: 0, duration: 0.08 },
                0.65
              )
          }

          gsap.utils.toArray<HTMLElement>("[data-reveal-section]").forEach((section) => {
            const items = gsap.utils.toArray<HTMLElement>(
              section.querySelectorAll(
                "h2, h3, p, [data-reveal-item], article, .flat-card"
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

          const footer = document.querySelector<HTMLElement>("[data-motion-footer]")
          const footerBg = footer?.querySelector<HTMLElement>("[data-footer-bg]")
          const footerWordmark = footer?.querySelector<HTMLElement>("[data-footer-wordmark]")
          const footerItems = footer
            ? gsap.utils.toArray<HTMLElement>(footer.querySelectorAll("[data-footer-reveal]"))
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

            if (footerBg) {
              gsap.to(footerBg, {
                yPercent: desktop ? -12 : -5,
                scale: desktop ? 1.06 : 1.02,
                ease: "none",
                scrollTrigger: {
                  trigger: footer,
                  start: "top bottom",
                  end: "bottom bottom",
                  scrub: 1,
                },
              })
            }

            if (footerWordmark) {
              gsap.fromTo(
                footerWordmark,
                { xPercent: desktop ? 3 : 0 },
                {
                  xPercent: desktop ? -7 : -4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: footer,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 1,
                  },
                }
              )
            }
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
