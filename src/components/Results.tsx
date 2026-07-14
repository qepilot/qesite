import { motion } from 'framer-motion'

const testimonials = [
  {
    saved: '6-8 hrs/week',
    quote:
      '"Tickets used to sit in the QA backlog for days. Now test cases are drafted the same day the ticket is groomed."',
    name: 'Priya Nathan',
    role: 'Engineering Manager, fintech SaaS',
  },
  {
    saved: '10+ hrs/week',
    quote:
      '"It caught an ambiguous acceptance criterion our own team missed — before it shipped."',
    name: 'Owen Marsh',
    role: 'QA Lead, logistics platform',
  },
]

export default function Results() {
  return (
    <section id="results" className="px-6 py-24 bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mesh-gradient mx-auto max-w-5xl rounded-[2.5rem] px-8 py-16 text-center"
      >
        <span className="inline-block rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          Trusted by QA-strapped teams
        </span>
        <h2 className="font-display mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          It doesn't feel like a backlog for long.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 text-left">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-3xl bg-white/95 p-7 shadow-xl">
              <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-2">
                Saved: {t.saved}
              </span>
              <p className="font-display mt-4 text-lg font-medium leading-snug text-ink">
                {t.quote}
              </p>
              <div className="mt-5">
                <div className="text-sm font-medium text-ink">{t.name}</div>
                <div className="text-xs text-muted">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
