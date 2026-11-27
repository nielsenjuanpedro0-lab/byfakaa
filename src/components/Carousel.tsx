import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import type { Slide } from '../content/slides'

const AUTOPLAY_MS = 6000

/** Scroll-snap carousel: swipe on touch, arrows and dots elsewhere, autoplay that pauses on hover/focus. */
export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i: number) => {
    const el = trackRef.current
    if (!el) return
    const n = (i + slides.length) % slides.length
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: n * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }, [slides.length])

  useEffect(() => {
    if (paused || slides.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [index, paused, goTo, slides.length])

  if (slides.length === 0) return null

  return (
    <section
      className="carousel"
      aria-roledescription="carrusel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="carousel__track"
        onScroll={(e) => {
          const el = e.currentTarget
          setIndex(Math.round(el.scrollLeft / el.clientWidth))
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.title}
            className={`carousel__slide${slide.image ? ' carousel__slide--photo' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}`}
            aria-hidden={i !== index}
          >
            {slide.image && (
              <img src={slide.image} alt={slide.alt ?? ''} loading={i === 0 ? 'eager' : 'lazy'} className="carousel__img" />
            )}
            <div className="page carousel__copy">
              <p className="carousel__title">{slide.title}</p>
              {slide.text && <p className="carousel__text">{slide.text}</p>}
              {slide.link && (
                <Link className="button" to={slide.link.to} tabIndex={i === index ? 0 : -1} viewTransition>
                  {slide.link.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="page carousel__controls">
          <div className="carousel__dots">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`Ir al slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <div className="carousel__arrows">
            <button type="button" aria-label="Anterior" onClick={() => goTo(index - 1)}>
              <ChevronLeft aria-hidden size={20} />
            </button>
            <button type="button" aria-label="Siguiente" onClick={() => goTo(index + 1)}>
              <ChevronRight aria-hidden size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
