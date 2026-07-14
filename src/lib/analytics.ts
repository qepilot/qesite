// Thin wrapper around gtag so components don't need to know whether GA4 has
// loaded yet (consent-gated, or blocked by an ad blocker) — calls are just
// dropped instead of throwing.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
