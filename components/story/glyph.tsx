import type { SystemStatus } from "@/lib/content/systems"

export type GlyphState = "neutral" | "progress" | "waiting" | "due" | "done" | "alarm"

/** ANU's status glyph: a square whose shape says the state. Decorative; the word beside it carries the meaning. */
export function Glyph({ state = "neutral", read = false, large = false }: { state?: GlyphState; read?: boolean; large?: boolean }) {
  return (
    <span
      className={["anu-glyph", read && "anu-glyph--read", large && "anu-glyph--lg"].filter(Boolean).join(" ")}
      data-state={state === "neutral" ? undefined : state}
      aria-hidden="true"
    />
  )
}

export function statusGlyph(status: SystemStatus): GlyphState {
  return status === "live" ? "done" : status === "demo" ? "due" : "progress"
}
