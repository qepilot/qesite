import { motion } from 'framer-motion'

const points = [
  'Every test case waits on your approval before it touches CI.',
  'Flags ambiguous acceptance criteria instead of guessing at intent.',
  'Runs only in the environments and branches you allow.',
]

export default function TrustControl() {
  return (
    <section className="px-6 py-24 bg-bg">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            You stay in control
          </span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            Reviewed, not rubber-stamped.
          </h2>
          <p className="mt-4 text-muted max-w-md">
            QEPilot proposes test cases and automation — you decide what
            ships. Nothing runs against real environments without sign-off.
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-text">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-2">
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>

          <a
            href="#faq"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
          >
            Read the FAQ
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mesh-gradient-soft rounded-3xl p-6 shadow-xl"
        >
          <div className="rounded-2xl bg-white/95 p-5 space-y-4">
            <div>
              <p className="text-xs font-medium text-ink">Sam Bauer</p>
              <p className="mt-1 text-sm text-text">
                @QEPilot the "large export" criteria is vague — what counts as large?
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-accent-2">QEPilot · App</p>
              <p className="mt-1 text-sm text-text">
                Flagging it in the ticket instead of guessing. Want me to draft
                a case assuming 10k+ rows, or hold until PM confirms?
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent-2">
                  Draft with 10k+ assumption
                </span>
                <span className="rounded-full bg-border/60 px-3 py-1.5 text-xs font-medium text-text">
                  Hold for PM
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
