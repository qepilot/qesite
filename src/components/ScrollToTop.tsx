import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router preserves scroll position across navigations, so following a link
// from the footer would leave you at the bottom of the new page. Reset to the top
// on every path change — but honor in-page hash links (e.g. /#faq).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
