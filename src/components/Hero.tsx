import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ChatDemo from './ChatDemo'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Hero() {
  const [tracker, setTracker] = useState<'jira' | 'linear'>('jira')

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-0 px-6">
      <div className="mesh-gradient absolute inset-0 -z-10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl text-center pt-8"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          AI QA Engineer — Jira in, tested automation out
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-white"
        >
          Not a script.
          <br />A QA hire.
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-lg text-white/85 max-w-xl mx-auto">
          Hire QEPilot & clear your QA backlog like it's twice the size. The
          AI QA engineer that lives in your Jira, grounded in your domain,
          shipping Playwright coverage.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex items-center justify-center gap-4">
          <Link
            to="/start"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
          >
            Start a project
          </Link>
          <a
            href="#demo"
            className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            See it run
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/75">
          <span>Free first ticket</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>No setup required</span>
          <span className="h-1 w-1 rounded-full bg-white/40" />
          <span>Works with your Jira or Linear</span>
        </motion.div>

        <motion.div variants={item} className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-white/30 bg-white/10 p-1 backdrop-blur-sm">
            {(['jira', 'linear'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTracker(t)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
                  tracker === t ? 'text-ink' : 'text-white/80'
                }`}
              >
                {tracker === t && (
                  <motion.span
                    layoutId="tracker-pill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', duration: 0.4 }}
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* product mockup */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto mt-14 max-w-5xl"
      >
        <ChatDemo />
      </motion.div>

      <div className="h-16 md:h-24" />
    </section>
  )
}
