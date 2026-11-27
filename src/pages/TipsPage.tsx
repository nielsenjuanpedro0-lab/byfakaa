import { ChevronRight, PlayCircle } from 'lucide-react'
import { Link } from 'react-router'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { tips, type Tip } from '../content/tips'
import { useTitle } from '../lib/useTitle'

/** YouTube watch, share or Shorts link → embed URL. Null for anything else (treated as a video file). */
function youtubeEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null
}

function TipVideo({ tip }: { tip: Tip }) {
  if (!tip.video) {
    return (
      <div className="tip__video tip__video--empty">
        <PlayCircle aria-hidden size={36} strokeWidth={1.25} />
        <span>Video próximamente</span>
      </div>
    )
  }
  const embed = youtubeEmbed(tip.video)
  if (embed) {
    return (
      <div className="tip__video">
        <iframe src={embed} title={tip.title} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    )
  }
  return (
    <div className="tip__video">
      <video src={tip.video} poster={tip.poster} controls preload="metadata" playsInline />
    </div>
  )
}

export function TipsPage() {
  useTitle('Tips')
  return (
    <div className="tips">
      <section className="page tips__intro">
        <h1>Elevá tu experiencia de compra</h1>
        <p className="tips__lead">
          Guías simples para empezar a usarlo, cuidarlo y hacer de tu compra, algo seguro.
        </p>
        <nav className="tips__index" aria-label="Tips">
          {tips.map((tip) => (
            <a key={tip.id} href={`#${tip.id}`}>{tip.title}</a>
          ))}
        </nav>
      </section>

      <section className="page tips__list">
        {tips.map((tip) => (
          <article key={tip.id} id={tip.id} className="tip reveal">
            <TipVideo tip={tip} />
            <div className="tip__body">
              <h2>{tip.title}</h2>
              <p className="tip__summary">{tip.summary}</p>
              <ol>
                {tip.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </section>

      <section className="page about__cta">
        <p>¿Necesitás ayuda con tu iPhone?</p>
        <div className="about__cta-actions">
          <InquiryActions />
          <Link className="text-link" to="/catalogo" viewTransition>
            Ver el catálogo
            <ChevronRight aria-hidden size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
