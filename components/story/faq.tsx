/** Questions as native disclosure: readable without script, by people and by machines. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="anu-faq">
      {items.map((item) => (
        <details key={item.q} className="anu-faq__item">
          <summary>
            <span>{item.q}</span>
            <span className="anu-faq__sign" aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}
