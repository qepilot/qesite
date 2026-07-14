import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const phrases = [
  "don't have time to write.",
  "can't automate fast enough.",
  'keep deprioritizing.',
]

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="px-6 py-24 bg-bg text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink leading-tight">
          QEPilot is the AI QA engineer
          <br />
          that does the work you{' '}
          <span className="relative inline-block align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="inline-block text-gradient"
              >
                {phrases[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>

        <Link
          to="/start"
          className="mt-10 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
        >
          Start a project
        </Link>
      </div>
    </section>
  )
}
