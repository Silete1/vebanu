import type { CSSProperties, ReactNode } from "react"

/**
 * Building blocks for live screens, drawn in the ANU theme's own language
 * (the ink band, glyph statuses, hairline lists, square controls) so a screen
 * looks like the real module. Every block takes `at` / `only` / `cursorAt`
 * (see LiveScreen) and plain text children.
 */

type Timing = { at?: number; only?: number; cursorAt?: number }

const timing = ({ at, only, cursorAt }: Timing) => ({
  ...(at !== undefined ? { "data-at": at } : {}),
  ...(only !== undefined ? { "data-only": only } : {}),
  ...(cursorAt !== undefined ? { "data-cursor-at": cursorAt } : {}),
})

export type LiveState = "neutral" | "progress" | "waiting" | "due" | "done" | "alarm"

export function LGlyph({ state = "neutral", ...t }: { state?: LiveState } & Timing) {
  return <span className="live-glyph" data-state={state} {...timing(t)} />
}

/** The ink band: the screen's subject, up to four figures, a blue edge. */
export function LBand({ title, figures = [], children, ...t }: { title: string; figures?: { value: string; label: string; at?: number }[]; children?: ReactNode } & Timing) {
  return (
    <div className="live-band" {...timing(t)}>
      <span className="live-band__title">{title}</span>
      <span className="live-band__figures">
        {figures.map((f) => (
          <span key={f.label} className="live-band__figure" {...timing({ at: f.at })}>
            <b className="live-num">{f.value}</b>
            <small>{f.label}</small>
          </span>
        ))}
      </span>
      {children}
    </div>
  )
}

/** A hairline list row: a glyph, words, an optional figure on the end side. */
export function LRow({ state, label, meta, value, ...t }: { state?: LiveState; label: string; meta?: string; value?: string } & Timing) {
  return (
    <div className="live-row" {...timing(t)}>
      {state ? <span className="live-glyph" data-state={state} /> : null}
      <span className="live-row__label">
        {label}
        {meta ? <small>{meta}</small> : null}
      </span>
      {value ? <span className="live-num live-row__value">{value}</span> : null}
    </div>
  )
}

export function LButton({ children, ghost = false, ...t }: { children: ReactNode; ghost?: boolean } & Timing) {
  return (
    <span className={ghost ? "live-btn live-btn--ghost" : "live-btn"} {...timing(t)}>
      {children}
    </span>
  )
}

export function LCard({ children, className = "", style, ...t }: { children: ReactNode; className?: string; style?: CSSProperties } & Timing) {
  return (
    <div className={`live-card ${className}`} style={style} {...timing(t)}>
      {children}
    </div>
  )
}

/** A floating sheet of dark glass: right-click menus, popovers, toasts. */
export function LSheet({ children, className = "", style, ...t }: { children: ReactNode; className?: string; style?: CSSProperties } & Timing) {
  return (
    <div className={`live-sheet ${className}`} style={style} {...timing(t)}>
      {children}
    </div>
  )
}

/** Bars of the one accent; `values` are 0–100. */
export function LBars({ values, ...t }: { values: number[] } & Timing) {
  return (
    <div className="live-bars" {...timing(t)}>
      {values.map((v, i) => (
        <i key={i} style={{ "--v": v, "--i": i } as CSSProperties} />
      ))}
    </div>
  )
}

/** A form field with its label and a value that types itself in. */
export function LField({ label, value, ...t }: { label: string; value: string } & Timing) {
  return (
    <label className="live-field" {...timing(t)}>
      <small>{label}</small>
      <span className="live-field__value">{value}</span>
    </label>
  )
}

/** The status road of a record: passed stages tinted, the current one solid blue. */
export function LRoad({ stages, current }: { stages: string[]; current: number }) {
  return (
    <div className="live-road">
      {stages.map((stage, i) => (
        <span key={stage} className="live-road__stage" data-at={i} data-road={i < current ? "past" : i === current ? "now" : "ahead"}>
          {stage}
        </span>
      ))}
    </div>
  )
}
