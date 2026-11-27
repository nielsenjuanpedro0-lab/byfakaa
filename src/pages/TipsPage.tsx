import { ArrowRight, ChevronLeft, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { tipBySlug, tips, type Tip } from '../content/tips'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { useTitle } from '../lib/useTitle'
import { NotFoundPage } from './NotFoundPage'

export function TipsPage() {
  useTitle('Tips')
  return (
    <div className="page tips-page">
      <h1>Elevá tu experiencia de compra.</h1>
      <p className="tips-page__lead">Guías simples para empezar a usarlo, cuidarlo y hacer de tu compra, algo seguro.</p>
      <TipCards />
    </div>
  )
}

/** Cards linking to every tip. `featured` (home page) shows the first three: one large, two stacked beside it. */
export function TipCards({ featured = false }: { featured?: boolean }) {
  return (
    <ul className={featured ? 'tips__grid tips__grid--featured' : 'tips__grid'}>
      {(featured ? tips.slice(0, 3) : tips).map((tip) => (
        <li key={tip.slug}>
          <Link className="tip-card" to={`/tips/${tip.slug}`} viewTransition>
            <span className="tip-card__tag">
              {tip.hasVideo && <PlayCircle aria-hidden size={14} />}
              {tip.tag}
            </span>
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

/** YouTube watch, share or Shorts link → privacy-friendly embed URL. Null for anything else (a video file). */
function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null
}

function TipVideo({ tip }: { tip: Tip }) {
  if (!tip.video) {
    if (!tip.hasVideo) return null
    return (
      <div className="tip-video tip-video--empty">
        <PlayCircle aria-hidden size={36} strokeWidth={1.25} />
        <span>Video próximamente</span>
      </div>
    )
  }
  const embed = youtubeEmbed(tip.video)
  return (
    <div className="tip-video">
      {embed ? (
        <iframe src={embed} title={tip.title} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <video src={tip.video} poster={tip.poster} controls preload="metadata" playsInline />
      )}
    </div>
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
      <TipVideo tip={tip} />
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
