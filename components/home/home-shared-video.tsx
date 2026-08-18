import type { CSSProperties, ReactNode } from "react"

type HomeSharedVideoProps = {
  children: ReactNode
}

export function HomeSharedVideo({ children }: HomeSharedVideoProps) {
  return (
    <div className="relative bg-[var(--color-bone-white)]">
      <div
        className="pointer-events-none sticky top-0 z-0 h-svh overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="hero-lab-visual absolute overflow-hidden"
          style={{
            top: "12px",
            left: "12px",
            width: "calc(100% - 24px)",
            height: "calc(100lvh - 24px)",
            borderRadius: "20px",
            "--intro-clip-y": "50%",
            "--intro-clip-x": "50%",
            "--intro-clip-radius": "999px",
            clipPath:
              "inset(var(--intro-clip-y) var(--intro-clip-x) round var(--intro-clip-radius))",
          } as CSSProperties}
          data-shared-video-visual
          data-intro-visual
        >
          <video
            className="hero-bg-motion h-full w-full object-cover"
            data-shared-video-media
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source
              src="/anu-architectural-background.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(9,11,17,0.72),rgba(9,11,17,0.32)_62%,rgba(9,11,17,0.48))]" />
        </div>
      </div>

      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  )
}
