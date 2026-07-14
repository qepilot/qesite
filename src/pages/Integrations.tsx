import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTA from '../components/CTA'

const integrations = [
  {
    name: 'Jira',
    tag: 'Issue tracker',
    body: "QEPilot installs from the app directory and shows up on tickets like a teammate. It reads acceptance criteria, user stories, and linked docs, then posts manual test cases back onto the ticket for sign-off.",
  },
  {
    name: 'Linear',
    tag: 'Issue tracker',
    body: 'Prefer Linear? QEPilot works the same way — point it at an issue and it drafts reviewable test cases in the format your team already uses, right where the work lives.',
  },
  {
    name: 'Playwright',
    tag: 'Automation',
    body: 'Approved manual cases become real, runnable Playwright specs — not pseudocode or suggestions. Every spec maps back to the acceptance criterion it verifies.',
  },
  {
    name: 'Playwright-MCP',
    tag: 'Automation',
    body: 'QEPilot drives Playwright through Playwright-MCP, so it authors and validates specs the same way a human engineer would, then hands them to your suite.',
  },
  {
    name: 'Your CI',
    tag: 'Pipeline',
    body: 'Generated specs wire directly into your existing CI (GitHub Actions, GitLab CI, CircleCI, and more), running on every pull request — nothing new to host or maintain.',
  },
  {
    name: 'Your domain knowledge',
    tag: 'Grounding',
    body: 'Link product specs, prior tickets, and design docs. QEPilot retrieves them with RAG so each test reflects how your product actually behaves — not a generic guess.',
  },
]

const flow = [
  'Ticket lands in Jira or Linear',
  'QEPilot drafts manual test cases',
  'Your team reviews & approves',
  'Playwright specs run in CI',
]

export default function Integrations() {
  return (
    <>
      <section className="px-6 pt-32 pb-16 bg-bg text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            Integrations
          </span>
          <h1 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Fits the tools your team{' '}
            <span className="text-gradient">already uses</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            QEPilot lives inside your existing workflow — your tracker, your test
            framework, your CI. No new platform to adopt, no scripts to maintain.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 bg-bg">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((it) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-3xl border border-border bg-surface p-7 shadow-sm"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-accent-2">
                {it.tag}
              </span>
              <h2 className="font-display mt-2 text-xl font-medium text-ink">
                {it.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-bg-soft">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            How the pieces connect
          </h2>
          <div className="mt-12 flex flex-col md:flex-row items-stretch justify-center gap-4">
            {flow.map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-4">
                <div className="flex-1 rounded-2xl border border-border bg-surface px-5 py-6 text-sm font-medium text-ink shadow-sm">
                  <span className="font-mono text-xs text-accent-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-2">{step}</p>
                </div>
                {i < flow.length - 1 && (
                  <span className="hidden md:block text-accent-2" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-10 text-muted">
            Want it wired into your stack?{' '}
            <Link to="/start" className="font-medium text-accent-2 underline">
              Start a project
            </Link>{' '}
            and send one ticket to see it end to end.
          </p>
        </div>
      </section>

      <CTA />
    </>
  )
}
