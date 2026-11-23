import type { SVGProps } from 'react'

// Brand glyph drawn in lucide's stroke style, like InstagramIcon.
export function WhatsAppIcon({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c.2-.4.6-.5.9-.4l.6 1.4c.1.3 0 .5-.2.7l-.4.4a5.6 5.6 0 0 0 3.4 3.4l.4-.4c.2-.2.4-.3.7-.2l1.4.6c.1.3 0 .7-.4.9-1 .6-2.3.5-3.6-.3a8 8 0 0 1-2.8-2.8c-.7-1.2-.8-2.5-.1-3.3z" />
    </svg>
  )
}
