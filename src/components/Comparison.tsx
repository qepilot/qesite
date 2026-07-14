import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cases = [
  {
    label: 'New Feature Ticket',
    generic: 'Suggests a general test plan outline for the feature.',
    qepilot: 'Writes the manual cases, gets them approved, ships the Playwright spec.',
  },
  {
    label: 'Regression Bug',
    generic: 'Tells you what kind of test might have caught it.',
    qepilot: 'Adds the missing case to the suite and backfills the regression test.',
  },
  {
    label: 'Ambiguous Spec',
    generic: 'Guesses at the intent and moves on.',
    qepilot: 'Flags the ambiguity in the ticket and asks before writing a case.',
  },
  {
    label: 'Legacy Test Debt',
    generic: 'Recommends "improving test coverage" eventually.',
    qepilot: 'Grounds new cases in your actual domain docs — not a generic template.',
  },
]

export default function Comparison() {
  const [active, setActive] = useState(0)
  const current = cases[active]

  return (
    <section className="px-6 py-24 bg-bg">
      <div className="mx-auto max-w-5xl text-center">
        <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
          The difference
        </span>
        <h2 className="font-display mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-ink">
          A chatbot suggests.
          <br />
          QEPilot ships.
        </h2>
        <p className="mt-4 text-muted max-w-lg mx-auto">
          Other AI hands you a plan and waits. QEPilot writes the case,
          gets it reviewed, and automates it.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {cases.map((c, i) => (
            <button
              key={c.label}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? 'bg-ink text-white'
                  : 'bg-surface border border-border text-text hover:border-accent/40'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-surface p-8 text-left">
            <span className="font-mono text-xs text-muted">Manual QA / generic AI</span>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-lg font-medium text-text"
              >
                {current.generic}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mesh-gradient-soft rounded-3xl p-8 text-left shadow-xl">
            <span className="font-mono text-xs text-white/70">QEPilot</span>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-lg font-medium text-white"
              >
                {current.qepilot}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
