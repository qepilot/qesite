import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const steps = [
  {
    n: '1',
    title: 'Connect Jira or Linear',
    description: 'Install QEPilot from the app directory. It shows up on tickets like any new teammate.',
    mock: (
      <div className="w-56 rounded-xl bg-white p-3 shadow-lg text-left">
        <div className="flex items-center gap-2 text-xs font-medium text-ink">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Jira — connected
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-border" />
          Linear — connect
        </div>
      </div>
    ),
  },
  {
    n: '2',
    title: 'Point at your domain knowledge',
    description: 'Link specs, prior tickets, and design docs. Each source grounds test design in how your product really works.',
    mock: (
      <div className="flex gap-2">
        {['Specs', 'Tickets', 'Docs'].map((t) => (
          <span key={t} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-md">
            {t}
          </span>
        ))}
      </div>
    ),
  },
  {
    n: '3',
    title: 'Review & approve test cases',
    description: 'Manual test cases land in the ticket for sign-off, written in a format your team already uses.',
    mock: (
      <div className="w-56 rounded-xl bg-white p-3 shadow-lg text-left">
        <p className="text-xs font-medium text-ink">3 test cases drafted</p>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-medium text-emerald-700">Approve</span>
          <span className="rounded-full bg-border/60 px-2 py-1 text-[10px] font-medium text-text">Edit</span>
        </div>
      </div>
    ),
  },
  {
    n: '4',
    title: 'Automate with Playwright-MCP',
    description: 'Approved cases become executable Playwright tests, running in your CI on every PR.',
    mock: (
      <div className="rounded-xl bg-ink px-3 py-2 text-[11px] font-mono text-emerald-300 shadow-lg">
        ✓ 12 passed (4.8s)
      </div>
    ),
  },
]

export default function Workflow() {
  return (
    <section id="workflow" className="px-6 py-24 bg-bg-soft">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            How it works
          </span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            Plug into your backlog. Live in a day.
          </h2>
          <p className="mt-3 text-muted">No setup project. No IT ticket. No training videos.</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="overflow-hidden rounded-3xl border border-border bg-surface"
            >
              <div className="mesh-gradient-soft flex h-40 items-center justify-center p-4">
                {step.mock}
              </div>
              <div className="p-6">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-medium text-accent-2">
                  {step.n}
                </div>
                <h3 className="font-display mt-3 text-base font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/start"
            className="inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  )
}
