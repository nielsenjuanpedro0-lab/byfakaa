import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { ProductImage } from './ProductImage'

interface Props {
  images: string[]
  name: string
  /** view-transition-name for the first photo, matching the card it came from. */
  vtName: string
}

/**
 * Swipeable on touch (scroll-snap), thumbnails on larger screens, and a full-screen zoom:
 * buyers of used phones want to inspect the condition up close.
 */
export function Gallery({ images, name, vtName }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(0)
  const count = images.length

  if (count === 0) return <ProductImage alt={name} className="gallery__single" vtName={vtName} />

  const show = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: i * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }

  const openZoom = (i: number) => {
    setZoomed(i)
    zoomRef.current?.showModal()
  }

  const step = (delta: number) => setZoomed((i) => (i + delta + count) % count)

  return (
    <div className={`gallery${count === 1 ? ' gallery--single' : ''}`}>
      <div
        ref={trackRef}
        className="gallery__track"
        tabIndex={count > 1 ? 0 : undefined}
        aria-label={count > 1 ? `Fotos de ${name}` : undefined}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
      >
        {images.map((src, i) => (
          <button key={src} type="button" className="gallery__zoom" onClick={() => openZoom(i)} aria-label={`Ampliar foto ${i + 1}`}>
            <ProductImage
              src={src}
              alt={`${name}, foto ${i + 1} de ${count}`}
              priority={i === 0}
              vtName={i === 0 ? vtName : undefined}
            />
          </button>
        ))}
      </div>

      {count > 1 && (
        <>
          <p className="gallery__counter" aria-hidden>
            {index + 1} / {count}
          </p>
          <div className="gallery__thumbs">
            {images.map((src, i) => (
              <button key={src} type="button" aria-label={`Ver foto ${i + 1}`} aria-current={i === index} onClick={() => show(i)}>
                <ProductImage src={src} alt="" />
              </button>
            ))}
          </div>
        </>
      )}

      <dialog
        ref={zoomRef}
        className="lightbox"
        aria-label={`${name}, foto ${zoomed + 1} de ${count}`}
        onClick={(e) => e.target === e.currentTarget && zoomRef.current?.close()}
        onKeyDown={(e) => {
          if (count < 2) return
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        <div className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && zoomRef.current?.close()}>
          <ProductImage src={images[zoomed]} alt={`${name}, foto ${zoomed + 1} de ${count}`} />
        </div>
        <button type="button" className="lightbox__close" aria-label="Cerrar" onClick={() => zoomRef.current?.close()}>
          <X aria-hidden size={22} />
        </button>
        {count > 1 && (
          <>
            <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label="Foto anterior" onClick={() => step(-1)}>
              <ChevronLeft aria-hidden size={24} />
            </button>
            <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Foto siguiente" onClick={() => step(1)}>
              <ChevronRight aria-hidden size={24} />
            </button>
            <p className="lightbox__count" aria-live="polite">
              {zoomed + 1} / {count}
            </p>
          </>
        )}
      </dialog>
    </div>
  )
}
