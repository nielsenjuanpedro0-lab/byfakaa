import { Smartphone } from 'lucide-react'
import { useState } from 'react'

interface Props {
  src?: string
  alt: string
  /** Above-the-fold images load eagerly. */
  priority?: boolean
  className?: string
  /** view-transition-name, so the photo can morph between pages (see lib/viewTransition.ts). */
  vtName?: string
}

/** Product photo in a fixed well. Missing or broken images fall back to a neutral placeholder, never a stand-in photo. */
export function ProductImage({ src, alt, priority = false, className = '', vtName }: Props) {
  const [failedSrc, setFailedSrc] = useState<string>()
  const ok = src && failedSrc !== src

  return (
    <div className={`product-image ${className}`} style={vtName ? { viewTransitionName: vtName } : undefined}>
      {ok ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <div className="product-image__empty" role="img" aria-label={`${alt}: sin foto disponible`}>
          <Smartphone aria-hidden strokeWidth={1.25} />
          <span>Sin foto</span>
        </div>
      )}
    </div>
  )
}
