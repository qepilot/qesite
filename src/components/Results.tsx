import { motion } from 'framer-motion'

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 5.5V10l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M10 2.5l6 2.2v4.6c0 4-2.6 6.9-6 8.2-3.4-1.3-6-4.2-6-8.2V4.7l6-2.2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7.2 10l2 2 3.6-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Avatar({ initials, tone }: { initials: string; tone: 'dark' | 'light' }) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-sm font-semibold ${
        tone === 'dark' ? 'bg-ink text-white' : 'bg-white/20 text-white backdrop-blur-sm'
      }`}
    >
      {initials}
    </div>
  )
}

export default function Results() {
  return (
    <section id="results" className="mesh-gradient px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-5xl text-center"
      >
        <span className="inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          Trusted by QA-strapped teams
        </span>
        <h2 className="font-display mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          It doesn't feel like a backlog for long.
        </h2>

        <div className="mt-12 grid gap-6 text-left md:grid-cols-[1.3fr_1fr]">
          {/* Featured card */}
          <div className="flex flex-col justify-between rounded-3xl bg-white/95 p-8 shadow-xl md:p-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent-2">
                <ClockIcon />
                Saved: 6-8 hrs/week
              </span>
              <p className="font-display mt-6 text-2xl font-medium leading-snug text-ink md:text-3xl">
                "Tickets used to sit in the QA backlog for days. Now test cases
                are drafted the same day the ticket is groomed."
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <Avatar initials="PN" tone="dark" />
              <div>
                <div className="text-sm font-medium text-ink">Priya Nathan</div>
                <div className="text-xs text-muted">Engineering Manager, fintech SaaS</div>
              </div>
            </div>
          </div>

          {/* Right column: two stacked cards */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-1 flex-col justify-between rounded-3xl bg-white/10 p-6 shadow-xl backdrop-blur-sm">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white">
                  <ClockIcon />
                  Saved: 10+ hrs/week
                </span>
                <p className="font-display mt-4 text-lg font-medium leading-snug text-white">
                  "It caught an ambiguous acceptance criterion our own team
                  missed — before it shipped."
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Avatar initials="OM" tone="light" />
                <div>
                  <div className="text-sm font-medium text-white">Owen Marsh</div>
                  <div className="text-xs text-white/70">QA Lead, logistics platform</div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between rounded-3xl bg-white/10 p-6 shadow-xl backdrop-blur-sm">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white">
                  <ShieldIcon />
                  Always reviewed
                </span>
                <p className="font-display mt-4 text-lg font-medium leading-snug text-white">
                  "Every test case waits on your approval before it touches
                  CI."
                </p>
              </div>
              <div className="mt-6 text-xs text-white/70">
                Built into QEPilot, not an opt-in setting.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
