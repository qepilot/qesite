import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CTA from '../components/CTA'

const beliefs = [
  {
    title: '10x, not zero',
    body: "QEPilot exists to make a QA engineer ten times faster — not to make QA disappear. The repetitive authoring work goes away; the judgment stays with your team.",
  },
  {
    title: 'The human owns what ships',
    body: 'Every test case waits on human approval before it touches CI. QEPilot proposes; your team decides. Nothing runs against real environments without sign-off.',
  },
  {
    title: 'Grounded in your product',
    body: "Generic tests are worse than no tests. QEPilot learns how your product actually behaves before it writes a single case — because that's what a good QA hire would do.",
  },
]

export default function About() {
  return (
    <>
      <section className="px-6 pt-32 pb-16 bg-bg text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            About
          </span>
          <h1 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Built by someone who lived the{' '}
            <span className="text-gradient">QA backlog</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            QEPilot comes from two decades of watching great QA engineers spend
            their days on work a machine should have done.
          </p>
        </div>
      </section>

      <section className="px-6 pb-8 bg-bg">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-3xl border border-border bg-surface p-8 md:p-10 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink font-display text-lg font-semibold text-white">
                AZ
              </div>
              <div>
                <p className="font-display text-lg font-medium text-ink">Asad Zaman</p>
                <p className="text-sm text-muted">Founder, QEPilot</p>
              </div>
            </div>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-text">
              <p>
                I'm Asad Zaman. I studied Computer Science, and I've spent more
                than 20 years in QA — as a tester, an automation engineer, a lead,
                and just about every role in between. I've shipped software for
                startups and large teams, across web, mobile, and back-end
                systems, and I've seen the same story play out everywhere.
              </p>
              <p>
                The best QA engineers I've worked with were sharp, curious, and
                genuinely good at breaking things. And they spent most of their
                week not breaking things — they spent it reading tickets,
                rebuilding context, and hand-writing the same shape of test case
                over and over. The interesting work, the judgment, the edge cases
                only a human would think of — that got squeezed into whatever
                hours were left.
              </p>
              <p>
                That always felt backwards to me. The repetitive authoring is
                exactly the part a machine should handle. The judgment is exactly
                the part it shouldn't.
              </p>
              <p>
                So I built QEPilot around a simple philosophy:{' '}
                <strong className="text-ink">
                  make QA engineers and their teams 10x faster — not to replace
                  them.
                </strong>{' '}
                This is not about firing QA. It's the opposite. It's about giving
                QA back the time to do the work only people can do, and letting a
                grounded, reviewable AI teammate clear the backlog of everything
                else. The productivity goes up. The accountability stays human.
              </p>
              <p>
                If that resonates with how your team works — or how you wish it
                could — I'd love to show you what it looks like on one of your own
                tickets.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 bg-bg">
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
          {beliefs.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-border bg-surface p-7 shadow-sm"
            >
              <h2 className="font-display text-lg font-medium text-ink">{b.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 bg-bg-soft">
        <div className="mx-auto max-w-3xl pt-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            Get in touch
          </h2>
          <p className="mt-4 text-muted">
            Questions, ideas, or want to see QEPilot on your own backlog? Email us
            directly — a real person reads it.
          </p>
          <a
            href="mailto:info@qepilot.com"
            className="mt-6 inline-block font-display text-xl font-medium text-accent-2 hover:underline"
          >
            info@qepilot.com
          </a>
          <p className="mt-8 text-sm text-muted">
            Prefer to try it first?{' '}
            <Link to="/start" className="font-medium text-accent-2 underline">
              Start a project
            </Link>{' '}
            and send one ticket.
          </p>
        </div>
      </section>

      <CTA />
    </>
  )
}
