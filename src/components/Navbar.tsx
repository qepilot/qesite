import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

// `to` renders a client-side Link (real page); `href` renders an anchor that
// jumps to a homepage section (works from any page).
const links = [
  { label: 'How it works', href: '/#workflow' },
  { label: 'Use cases', to: '/use-cases' },
  { label: 'Integrations', to: '/integrations' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', href: '/#faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu on route change, so it doesn't stay open behind
  // the new page.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 inset-x-4 z-50"
    >
      <nav className="mx-auto max-w-5xl rounded-[1.75rem] border border-white/40 bg-white/70 backdrop-blur-md px-3 py-2 pl-3 shadow-[0_8px_30px_rgba(28,23,48,0.08)]">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-9 w-9" />
            <span className="font-display text-xl font-semibold tracking-tighter text-ink">
              QE<span className="text-accent">Pilot</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-text">
            {links.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link to={link.to} className="transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} className="transition-colors hover:text-ink">
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink md:hidden"
            >
              <span className="relative flex h-3.5 w-5 flex-col justify-between">
                <motion.span
                  className="h-0.5 w-full rounded-full bg-ink"
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
                <motion.span
                  className="h-0.5 w-full rounded-full bg-ink"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="h-0.5 w-full rounded-full bg-ink"
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </span>
            </button>

            <Link
              to="/start"
              className="rounded-full bg-ink text-white text-sm font-medium px-5 py-2.5 transition-transform hover:scale-105 active:scale-95"
            >
              Start a project
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden md:hidden"
            >
              <ul className="mt-2 space-y-1 border-t border-border pt-3 pb-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-bg-soft hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-bg-soft hover:text-ink"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
