import { motion } from 'framer-motion'
import CTA from '../components/CTA'

const rows = [
  {
    dimension: 'Context',
    chatgpt: 'Works from the prompt you paste. No knowledge of your product, prior tickets, or business rules.',
    qepilot: 'Retrieves your real specs, prior tickets, and business rules with RAG before writing a single case.',
  },
  {
    dimension: 'Output',
    chatgpt: 'A general test-plan outline or sample code you still have to adapt, wire up, and verify.',
    qepilot: 'Reviewable manual cases plus real, runnable Playwright specs via Playwright-MCP.',
  },
  {
    dimension: 'Review workflow',
    chatgpt: 'None. You copy, paste, and decide what to trust on your own.',
    qepilot: 'Test cases land on the ticket for stakeholder sign-off before anything is automated.',
  },
  {
    dimension: 'Ambiguity',
    chatgpt: 'Guesses at unclear requirements and produces confident but possibly wrong tests.',
    qepilot: 'Flags ambiguous acceptance criteria and asks, instead of guessing.',
  },
  {
    dimension: 'CI integration',
    chatgpt: 'Manual — you paste code into your repo and wire the pipeline yourself.',
    qepilot: 'Approved specs wire into your existing CI and run on every pull request.',
  },
  {
    dimension: 'Traceability',
    chatgpt: 'No mapping between tests and requirements.',
    qepilot: 'Every case and spec maps back to the acceptance criterion it verifies.',
  },
]

export default function VsChatGPT() {
  return (
    <>
      <section className="px-6 pt-32 pb-16 bg-bg text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            Comparison
          </span>
          <h1 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            QEPilot vs.{' '}
            <span className="text-gradient">ChatGPT</span> for QA
          </h1>
          <p className="mt-5 text-lg text-muted">
            A general AI chat can sketch a test plan. QEPilot does the QA job end
            to end — grounded in your product, reviewed by your team, and running
            in your CI. Here's the difference, side by side.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16 bg-bg">
        <div className="mx-auto max-w-5xl overflow-x-auto">
          <div className="min-w-[640px] rounded-3xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="grid grid-cols-3 bg-bg-soft text-sm font-medium text-ink">
              <div className="p-5" />
              <div className="p-5 border-l border-border">Generic AI / ChatGPT</div>
              <div className="p-5 border-l border-border font-display text-accent-2">
                QEPilot
              </div>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.dimension}
                className={`grid grid-cols-3 text-sm ${i % 2 ? 'bg-bg-soft/40' : ''}`}
              >
                <div className="p-5 font-medium text-ink">{r.dimension}</div>
                <div className="p-5 border-l border-border text-muted leading-relaxed">
                  {r.chatgpt}
                </div>
                <div className="p-5 border-l border-border text-text leading-relaxed">
                  {r.qepilot}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 bg-bg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface p-8 text-center shadow-sm"
        >
          <h2 className="font-display text-2xl font-medium text-ink">
            The short version
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            A chatbot suggests. QEPilot ships. If you want a starting point for a
            test plan, a general model is fine. If you want reviewed, traceable
            coverage that actually runs against every PR, that's the job QEPilot
            was built to do.
          </p>
        </motion.div>
      </section>

      <CTA />
    </>
  )
}
