import { Glyph, type GlyphState } from "@/components/story/glyph"

/** The noise before: each symptom marked as an alarm or as waiting on someone. */
export function Symptoms({ items }: { items: string[] }) {
  const states: GlyphState[] = ["alarm", "waiting"]
  return (
    <ul className="anu-symptoms">
      {items.map((item, index) => (
        <li key={item} className="anu-reveal">
          <Glyph state={states[index % 2]} large />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** How ANU implements it: labelled items and the stack as chips. */
export function Inside({ items, stack, stackLabel }: { items: { label: string; body: string }[]; stack: string[]; stackLabel: string }) {
  return (
    <div className="anu-inside">
      <dl className="anu-inside__list">
        {items.map((item) => (
          <div key={item.label} className="anu-inside__item anu-reveal">
            <dt>
              <Glyph state="done" />
              {item.label}
            </dt>
            <dd>{item.body}</dd>
          </div>
        ))}
      </dl>
      <div className="anu-inside__stack">
        <p className="anu-kicker">{stackLabel}</p>
        <ul className="anu-chips anu-chips--paper">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Standout capabilities: peers on paper, the pointed one lit and forward, the others receding. */
export function Features({ items }: { items: { label: string; body: string }[] }) {
  return (
    <ul className="anu-features anu-focus">
      {items.map((item, index) => (
        <li key={item.label} className="anu-feature anu-focus-item anu-lit anu-reveal">
          <span className="anu-feature__index anu-num anu-focus-pic">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.label}</h3>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  )
}

/** Up to four figures, in mono. */
export function Facts({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="anu-facts">
      {items.map((fact) => (
        <div key={fact.label} className="anu-reveal">
          <dt className="anu-num">{fact.value}</dt>
          <dd>{fact.label}</dd>
        </div>
      ))}
    </dl>
  )
}
