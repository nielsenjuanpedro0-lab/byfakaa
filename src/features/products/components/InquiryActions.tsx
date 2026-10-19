import { Check, ChevronRight, Copy, MessageCircle } from 'lucide-react'
import { InstagramIcon } from '../../../components/InstagramIcon'
import { useState } from 'react'
import { store } from '../../../config/store'
import { inquiryMessage, whatsappUrl } from '../inquiry'
import type { Product } from '../types'

interface Props {
  product?: Product
  /** Short label for tight spaces like the mobile sticky bar. */
  compact?: boolean
  /** 'link' renders an Apple-style text link with a chevron. */
  variant?: 'solid' | 'outline' | 'link'
  className?: string
}

/**
 * Purchase inquiry. There is no checkout: the sale continues in a conversation with the store.
 * WhatsApp when the official number is configured; otherwise an Instagram DM plus a way to copy the message.
 */
export function InquiryActions({ product, compact = false, variant = 'solid', className = '' }: Props) {
  const buttonClass = { solid: 'button', outline: 'button button--outline', link: 'text-link' }[variant]
  const message = inquiryMessage(product, product ? window.location.href : undefined)
  const wa = whatsappUrl(message)

  if (variant === 'link') {
    return (
      <a className={`text-link ${className}`} href={wa ?? store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
        {wa ? 'Consultar por WhatsApp' : 'Consultar por Instagram'}
        <ChevronRight aria-hidden size={18} />
      </a>
    )
  }

  if (wa) {
    return (
      <a className={`${buttonClass} ${className}`} href={wa} target="_blank" rel="noopener noreferrer">
        <MessageCircle aria-hidden size={18} />
        {compact ? 'Consultar' : 'Consultar por WhatsApp'}
      </a>
    )
  }

  return (
    <span className={`inquiry-fallback ${className}`}>
      <a className={buttonClass} href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
        <InstagramIcon aria-hidden size={18} />
        {compact ? 'Consultar' : 'Consultar por Instagram'}
      </a>
      {product && !compact && <CopyMessage message={message} />}
    </span>
  )
}

function CopyMessage({ message }: { message: string }) {
  const [copied, setCopied] = useState(false)
  if (!navigator.clipboard) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" className="button button--quiet" onClick={copy}>
      {copied ? <Check aria-hidden size={18} /> : <Copy aria-hidden size={18} />}
      <span aria-live="polite">{copied ? 'Mensaje copiado' : 'Copiar consulta'}</span>
    </button>
  )
}
