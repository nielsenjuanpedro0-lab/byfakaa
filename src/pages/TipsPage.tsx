import { ArrowRight, ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { tipBySlug, tips } from '../content/tips'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { useTitle } from '../lib/useTitle'
import { NotFoundPage } from './NotFoundPage'

export function TipsPage() {
  useTitle('Tips')
  return (
    <div className="page tips-page">
      <h1>Sacale el jugo a tu iPhone.</h1>
      <p className="tips-page__lead">Guías cortas para usarlo, cuidarlo y comprarlo bien.</p>
      <TipCards />
    </div>
  )
}

/** Cards linking to every tip. `featured` (home page) makes the first one large with the rest stacked beside it. */
export function TipCards({ featured = false }: { featured?: boolean }) {
  return (
    <ul className={featured ? 'tips__grid tips__grid--featured' : 'tips__grid'}>
      {tips.map((tip) => (
        <li key={tip.slug}>
          <Link className="tip-card" to={`/tips/${tip.slug}`} viewTransition>
            <span className="tip-card__tag">{tip.tag}</span>
            <span className="tip-card__title">{tip.title}</span>
            <span className="tip-card__summary">{tip.summary}</span>
            <span className="tip-card__cta">
              Leer <ArrowRight aria-hidden size={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function TipArticlePage() {
  const tip = tipBySlug(useParams().slug)
  useTitle(tip?.title ?? 'Tip no encontrado')
  if (!tip) return <NotFoundPage />

  return (
    <article className="page tip-article">
      <Link className="text-link tip-article__back" to="/tips" viewTransition>
        <ChevronLeft aria-hidden size={18} /> Todos los tips
      </Link>
      <p className="tip-card__tag">{tip.tag}</p>
      <h1>{tip.title}</h1>
      <p className="tip-article__lead">{tip.summary}</p>
      <div className="prose">
        {tip.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.list ? (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              section.items.map((item) => <p key={item}>{item}</p>)
            )}
          </section>
        ))}
      </div>
      <div className="tip-article__cta">
        <p>¿Te quedó una duda?</p>
        <InquiryActions />
      </div>
    </article>
  )
}
