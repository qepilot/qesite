import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Logo from './Logo'

// `to` renders a client-side Link (real page); `href` renders an anchor that
// jumps to a homepage section (works from any page).
const links = [
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'How it works', href: '/#workflow' },
  { label: 'Use cases', to: '/use-cases' },
  { label: 'Integrations', to: '/integrations' },
  { label: 'FAQ', href: '/#faq' },
]

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 inset-x-4 z-50"
    >
      <nav className="mx-auto max-w-5xl flex items-center justify-between rounded-full border border-white/40 bg-white/70 backdrop-blur-md px-3 py-2 pl-3 shadow-[0_8px_30px_rgba(28,23,48,0.08)]">
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

        <Link
          to="/start"
          className="rounded-full bg-ink text-white text-sm font-medium px-5 py-2.5 transition-transform hover:scale-105 active:scale-95"
        >
          Start a project
        </Link>
      </nav>
    </motion.header>
  )
}
