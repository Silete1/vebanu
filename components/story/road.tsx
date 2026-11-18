import type { CSSProperties } from "react"

import { Glyph } from "@/components/story/glyph"

/**
 * How something works, as the theme's progress road: stages along one line,
 * each glyph filling as the reader reaches it, the line drawing itself.
 */
export function Road({ steps, stepLabel }: { steps: { title: string; body: string }[]; stepLabel: string }) {
  return (
    <ol className="anu-road">
      {steps.map((step, index) => (
        <li key={step.title} className="anu-road__step anu-reveal" style={{ "--i": index } as CSSProperties}>
          <div className="anu-road__mark" aria-hidden="true">
            <Glyph read large />
          </div>
          <p className="anu-road__index anu-num">
            <span className="sr-only">{stepLabel} </span>
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="anu-road__title">{step.title}</h3>
          <p className="anu-road__body">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}
