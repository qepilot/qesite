import { Link } from 'react-router-dom'
import Logo from './Logo'

const footerLinks = [
  { label: 'Use cases', to: '/use-cases' },
  { label: 'Integrations', to: '/integrations' },
  { label: 'vs ChatGPT', to: '/vs-chatgpt' },
  { label: 'Start a project', to: '/start' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-semibold tracking-tighter text-ink"
          >
            <Logo className="h-7 w-7" />
            <span>
              QE<span className="text-accent-2">Pilot</span>
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {footerLinks.map((l) => (
              <Link key={l.to} to={l.to} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 text-sm text-muted">
          © {new Date().getFullYear()} QEPilot. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
