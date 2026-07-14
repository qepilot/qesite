import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What is QEPilot, exactly?',
    a: 'QEPilot is an AI QA engineer that works from your Jira or Linear tickets. It reads the ticket, grounds test design in your product’s real domain knowledge, writes manual test cases for review, and automates approved cases with Playwright.',
  },
  {
    q: 'How is this different from just asking ChatGPT?',
    a: 'A generic prompt gives you a generic test outline with no context on your product. QEPilot retrieves your actual specs, prior tickets, and business rules before writing a single case — and it ships working Playwright code, not just suggestions.',
  },
  {
    q: 'Do you write real Playwright code, or just recommendations?',
    a: 'Real, runnable Playwright specs via Playwright-MCP, wired into your existing CI pipeline. Nothing lands until the manual test case behind it is approved.',
  },
  {
    q: 'What if the ticket is ambiguous?',
    a: 'QEPilot flags ambiguity in the ticket itself and asks before writing a case on a guess — the same thing a careful human QA engineer would do.',
  },
  {
    q: 'How long does it take to get started?',
    a: 'Send one ticket and QEPilot can show you the manual test cases and Playwright automation it produces before you commit to anything ongoing.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="px-6 py-24 bg-bg-soft">
      <div className="mx-auto max-w-4xl grid gap-10 md:grid-cols-[auto_1fr]">
        <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
          FAQ
        </h2>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="py-5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className={`font-display text-base font-medium ${isOpen ? 'text-accent-2' : 'text-ink'}`}>
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 shrink-0 text-muted"
                  >
                    ⌄
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 pr-8 text-sm leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
