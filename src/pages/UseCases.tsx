import { motion } from 'framer-motion'
import CTA from '../components/CTA'

const cases = [
  {
    label: 'New feature tickets',
    problem: 'A feature ticket is groomed but sits in the QA backlog for days before anyone writes cases for it.',
    solution:
      'QEPilot drafts manual test cases the same day the ticket is groomed — mapped to each acceptance criterion — then ships the approved ones as Playwright specs.',
  },
  {
    label: 'Regression bugs',
    problem: 'A bug is fixed, but no regression test is added, so it quietly comes back two releases later.',
    solution:
      'QEPilot turns the fix into a traceable manual case and a Playwright spec wired into CI, so the same regression is caught automatically on every future PR.',
  },
  {
    label: 'Ambiguous specs',
    problem: 'Acceptance criteria are vague ("export large files"), and testers either guess or stall.',
    solution:
      'Instead of guessing, QEPilot flags the ambiguity on the ticket and asks — the same thing a careful human QA engineer would do — before writing a case on an assumption.',
  },
  {
    label: 'Legacy test debt',
    problem: 'Whole areas of the product have no automated coverage, and no one has time to backfill it.',
    solution:
      'Point QEPilot at existing tickets and specs; it works through them steadily, drafting reviewable cases and automating the approved ones without a dedicated project.',
  },
]

export default function UseCases() {
  return (
    <>
      <section className="px-6 pt-32 pb-16 bg-bg text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            Use cases
          </span>
          <h1 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Every ticket type,{' '}
            <span className="text-gradient">covered</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            From brand-new features to the regression debt no one has time for —
            here's how QEPilot clears the work that piles up in a QA backlog.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20 bg-bg">
        <div className="mx-auto max-w-4xl space-y-6">
          {cases.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-3xl border border-border bg-surface p-8 shadow-sm"
            >
              <h2 className="font-display text-xl font-medium text-ink">
                {c.label}
              </h2>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-amber-700">
                    The problem
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {c.problem}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-accent-2">
                    With QEPilot
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-text">
                    {c.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  )
}
