import { Link } from 'react-router-dom'
import Logo from './Logo'
import { trackEvent } from '../lib/analytics'

const columns: { heading: string; links: { label: string; to: string }[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Use cases', to: '/use-cases' },
      { label: 'Integrations', to: '/integrations' },
      { label: 'vs ChatGPT', to: '/vs-chatgpt' },
    ],
  },
  {
    heading: 'For teams',
    links: [
      { label: 'QA engineers', to: '/for-qa-engineers' },
      { label: 'Engineering managers', to: '/for-engineering-managers' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Start a project', to: '/start' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-display font-semibold tracking-tighter text-ink"
            >
              <Logo className="h-7 w-7" />
              <span>
                QE<span className="text-accent-2">Pilot</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              The AI QA engineer that lives in your Jira or Linear — reviewed test
              cases and Playwright automation, grounded in your product.
            </p>
            <a
              href="mailto:info@qepilot.com"
              onClick={() => trackEvent('email_click', { location: 'footer' })}
              className="mt-4 inline-block text-sm font-medium text-accent-2 hover:underline"
            >
              info@qepilot.com
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-display text-sm font-medium text-ink">
                {col.heading}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() =>
                        trackEvent(l.to === '/start' ? 'cta_click' : 'nav_click', {
                          location: 'footer',
                          label: l.label,
                        })
                      }
                      className="transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-sm text-muted">
          © {new Date().getFullYear()} QEPilot. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
