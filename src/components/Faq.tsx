import { faqs } from '../content/faqs'

export function Faq() {
  return (
    <div className="faq">
      {faqs.map(({ q, a }) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}
