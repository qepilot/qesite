import { motion } from 'framer-motion'
import CTA from './CTA'

type Section = { h: string; p: string }

export default function PersonaLayout({
  badge,
  lead,
  accent,
  intro,
  sections,
}: {
  badge: string
  lead: string
  accent: string
  intro: string
  sections: Section[]
}) {
  return (
    <>
      <section className="px-6 pt-32 pb-16 bg-bg text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            {badge}
          </span>
          <h1 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            {lead} <span className="text-gradient">{accent}</span>
          </h1>
          <p className="mt-5 text-lg text-muted">{intro}</p>
        </div>
      </section>

      <section className="px-6 pb-20 bg-bg">
        <div className="mx-auto max-w-4xl space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={s.h}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="rounded-3xl border border-border bg-surface p-8 shadow-sm"
            >
              <span className="font-mono text-xs text-accent-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-display mt-2 text-xl font-medium text-ink">{s.h}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.p}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  )
}
