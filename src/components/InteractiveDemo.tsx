import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

type Step = {
  label: string
  caption: string
  render: () => React.ReactNode
}

function Row({ ok, warn, children }: { ok?: boolean; warn?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        warn ? 'text-amber-700' : 'text-text'
      }`}
    >
      <span
        className={`h-3.5 w-3.5 shrink-0 rounded-full ${
          warn ? 'bg-amber-400' : ok ? 'bg-emerald-400/80' : 'bg-border'
        }`}
      />
      {children}
    </div>
  )
}

const steps: Step[] = [
  {
    label: 'Ticket lands in Jira',
    caption: 'A ticket shows up in your backlog — QEPilot sees it like any teammate.',
    render: () => (
      <div className="w-72 rounded-2xl bg-white p-5 shadow-xl">
        <span className="font-mono text-[10px] text-muted">PROJ-482 · Jira</span>
        <p className="mt-1 text-sm font-medium text-ink">Add bulk CSV export</p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Users can export the current table to CSV. Export should respect active
          filters and handle large exports.
        </p>
      </div>
    ),
  },
  {
    label: 'QEPilot reads it',
    caption: 'It parses the acceptance criteria — and flags what’s ambiguous before it becomes a bug.',
    render: () => (
      <div className="w-72 rounded-2xl bg-white p-5 shadow-xl">
        <span className="font-mono text-[10px] text-muted">PROJ-482 · parsed</span>
        <div className="mt-3 space-y-2">
          <Row ok>Export respects filters</Row>
          <Row ok>Column order matches table</Row>
          <Row warn>“Large” export size — ambiguous, flagged</Row>
        </div>
      </div>
    ),
  },
  {
    label: 'Grounds the test',
    caption: 'RAG pulls your specs, prior tickets, and business rules so the test fits your product.',
    render: () => (
      <div className="relative flex h-44 w-72 items-center justify-center">
        <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-white font-display text-xs font-medium text-accent-2 shadow-xl">
          RAG
        </div>
        {[
          { label: 'Product specs', pos: 'top-0 left-3' },
          { label: 'Prior tickets', pos: 'top-0 right-3' },
          { label: 'Business rules', pos: 'bottom-0 left-1/2 -translate-x-1/2' },
        ].map((n) => (
          <div
            key={n.label}
            className={`absolute ${n.pos} rounded-xl bg-white/90 px-3 py-1.5 text-[10px] font-medium text-ink shadow-md`}
          >
            {n.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Drafts test cases',
    caption: 'Structured manual test cases, mapped to acceptance criteria, in your team’s format.',
    render: () => (
      <div className="w-72 rounded-2xl bg-white p-5 shadow-xl">
        <span className="font-mono text-[10px] text-muted">TC-114 · Manual</span>
        <p className="mt-1 text-sm font-medium text-ink">Bulk export honors filters</p>
        <ol className="mt-3 list-inside list-decimal space-y-1.5 text-xs text-text">
          <li>Apply “Active” status filter</li>
          <li>Click Export CSV</li>
          <li>Open file, confirm only active rows</li>
        </ol>
      </div>
    ),
  },
  {
    label: 'You approve',
    caption: 'Nothing runs until a human signs off. You stay in control of what ships.',
    render: () => (
      <div className="w-72 rounded-2xl bg-white p-5 shadow-xl">
        <p className="text-sm font-medium text-ink">3 test cases ready for review</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-medium text-white">
            ✓ Approved
          </span>
          <span className="rounded-full border border-border px-4 py-2 text-xs font-medium text-muted">
            Edit
          </span>
        </div>
      </div>
    ),
  },
  {
    label: 'Ships as Playwright',
    caption: 'Approved cases become runnable Playwright specs, wired into CI on every PR.',
    render: () => (
      <div className="w-72 rounded-2xl bg-ink p-5 shadow-xl">
        <span className="font-mono text-[10px] text-white/50">qepilot.spec.ts</span>
        <pre className="mt-2 font-mono text-[10px] leading-relaxed text-white/80">
{`test('export honors filters', async () => {
  await applyFilter('Active')
  await exportCsv()
  expect(rows).toEqual(activeRows)
})`}
        </pre>
        <div className="mt-2 rounded-lg bg-emerald-400/10 px-2 py-1 text-[11px] font-mono text-emerald-300">
          ✓ 3 passed (2.1s) · CI
        </div>
      </div>
    ),
  },
]

export default function InteractiveDemo() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const last = steps.length - 1

  useEffect(() => {
    if (!playing) return
    if (step >= last) {
      setPlaying(false)
      return
    }
    const id = setTimeout(() => setStep((s) => s + 1), 1900)
    return () => clearTimeout(id)
  }, [playing, step, last])

  const run = () => {
    if (step >= last) setStep(0)
    setPlaying(true)
  }

  return (
    <section id="demo" className="scroll-mt-24 px-6 py-24 bg-bg-soft">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            See it run
          </span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            Run a <span className="text-gradient">scenario</span>
          </h2>
          <p className="mt-4 text-muted">
            Watch QEPilot take one ticket from Jira to a passing Playwright test —
            press play, or click through it yourself.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Step list */}
          <ol className="space-y-1.5">
            {steps.map((s, i) => {
              const active = i === step
              const done = i < step
              return (
                <li key={s.label}>
                  <button
                    onClick={() => {
                      setPlaying(false)
                      setStep(i)
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                      active
                        ? 'border-accent/40 bg-surface shadow-sm'
                        : 'border-transparent hover:bg-surface/60'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] ${
                        active
                          ? 'bg-accent-2 text-white'
                          : done
                            ? 'bg-emerald-500 text-white'
                            : 'bg-border text-muted'
                      }`}
                    >
                      {done ? '✓' : i + 1}
                    </span>
                    <span
                      className={`text-sm font-medium ${active ? 'text-ink' : 'text-muted'}`}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Player */}
          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[11px] text-muted">
                QEPilot · step {step + 1} of {steps.length}
              </span>
            </div>

            <div className="mesh-gradient-soft flex min-h-[280px] items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {steps[step].render()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-muted">
                {steps[step].caption}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => {
                    setPlaying(false)
                    setStep((s) => Math.max(0, s - 1))
                  }}
                  disabled={step === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-ink disabled:opacity-40"
                  aria-label="Previous step"
                >
                  ←
                </button>
                <button
                  onClick={() => (playing ? setPlaying(false) : run())}
                  className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
                >
                  {playing ? 'Pause' : step >= last ? '↻ Replay' : '▶ Run'}
                </button>
                <button
                  onClick={() => {
                    setPlaying(false)
                    setStep((s) => Math.min(last, s + 1))
                  }}
                  disabled={step === last}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-ink disabled:opacity-40"
                  aria-label="Next step"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/start"
            className="inline-block rounded-full bg-ink px-7 py-3 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
          >
            Run it on your own ticket
          </Link>
        </div>
      </div>
    </section>
  )
}
