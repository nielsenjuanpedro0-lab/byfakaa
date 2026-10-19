/**
 * CSS-safe view-transition-name for a product element. Injective (escaped chars can't collide),
 * because two elements sharing a name makes the browser skip the whole transition.
 */
export function vtName(kind: 'pimg' | 'pcard', id: string): string {
  return `${kind}-${id.replace(/[^a-zA-Z0-9-]/g, (c) => `_${c.charCodeAt(0).toString(16)}`)}`
}
