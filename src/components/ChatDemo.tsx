import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const scenarios = [
  {
    channel: 'sprint-24',
    user: { name: 'Maya Chen', time: '9:12 AM', text: '@QEPilot PROJ-482 is ready for QA — go.' },
    lead: 'Read the ticket and linked spec.',
    checks: ['3 manual test cases drafted', '1 acceptance criterion flagged as ambiguous'],
    file: { name: 'PROJ-482-test-cases.md', ext: 'MD', color: 'bg-sky-500' },
    summary: 'Want me to automate the 3 once you approve?',
    reactions: [
      { emoji: '✅', count: 4 },
      { emoji: '🙌', count: 1 },
    ],
  },
  {
    channel: 'automation',
    user: { name: 'Jordan Ellis', time: '11:03 AM', text: '@QEPilot automate the approved export test cases.' },
    lead: 'Generated Playwright specs via MCP.',
    checks: ['3 tests written', 'Wired into CI on PR #482'],
    file: { name: 'export.spec.ts', ext: 'TS', color: 'bg-indigo-500' },
    summary: '12 passed, 0 failed. Ready to merge.',
    reactions: [
      { emoji: '🚀', count: 2 },
      { emoji: '🎉', count: 1 },
    ],
  },
  {
    channel: 'regression',
    user: { name: 'Tom Becker', time: '2:47 PM', text: '@QEPilot triage the failing regression suite and tell me what’s actually broken.' },
    lead: 'Ran the suite across staging + prod configs.',
    checks: ['2 flaky tests isolated (timing, not logic)', '1 real regression found — export button'],
    file: { name: 'regression-report.pdf', ext: 'PDF', color: 'bg-rose-500' },
    summary: 'Caught the export bug before release.',
    reactions: [
      { emoji: '🙌', count: 3 },
      { emoji: '💯', count: 1 },
    ],
  },
  {
    channel: 'release-notes',
    user: { name: 'Priya Nathan', time: '4:30 PM', text: '@QEPilot did the last deploy break anything?' },
    lead: 'Compared pre/post deploy test runs.',
    checks: ['No regressions in core flows', '1 new edge case found in refund flow'],
    file: { name: 'deploy-diff-jun18.json', ext: 'JSON', color: 'bg-amber-500' },
    summary: 'Flagging the refund edge case before it ships.',
    reactions: [{ emoji: '👍', count: 5 }],
  },
]

const sidebarChannels = ['sprint-24', 'automation', 'regression', 'release-notes', 'general', 'product', 'bugs']

export default function ChatDemo() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % scenarios.length)
    }, 4500)
    return () => clearInterval(id)
  }, [])

  const scenario = scenarios[index]

  return (
    <div className="grid overflow-hidden rounded-3xl border border-white/40 bg-surface shadow-[0_30px_80px_rgba(28,23,48,0.25)] md:grid-cols-[220px_1fr]">
      {/* sidebar */}
      <div className="hidden border-r border-border bg-bg-soft p-5 md:block">
        <div className="flex items-center gap-1 text-sm font-medium text-ink">
          Workspace
          <span className="text-muted">⌄</span>
        </div>
        <div className="mt-5 text-xs font-medium text-muted">Channels</div>
        <div className="relative mt-2 space-y-0.5">
          {sidebarChannels.map((ch) => {
            const isActive = ch === scenario.channel
            return (
              <div key={ch} className="relative rounded-lg px-2 py-1.5">
                {isActive && (
                  <motion.span
                    layoutId="active-channel"
                    className="absolute inset-0 rounded-lg bg-accent/15"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                  />
                )}
                <span
                  className={`relative text-sm ${
                    isActive ? 'font-medium text-accent-2' : 'text-text'
                  }`}
                >
                  # {ch}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* main panel */}
      <div className="p-6">
        <div className="flex items-center gap-1 border-b border-border pb-3 text-sm font-medium text-ink">
          <span className="text-muted">#</span> {scenario.channel}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pt-4 text-left"
          >
            {/* user message */}
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-accent to-accent-2" />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-ink">{scenario.user.name}</span>
                  <span className="text-xs text-muted">{scenario.user.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-text">
                  <span className="rounded bg-accent/15 px-1 text-accent-2">@QEPilot</span>{' '}
                  {scenario.user.text.replace('@QEPilot', '').trim()}
                </p>
              </div>
            </div>

            {/* bot message */}
            <div className="mt-5 flex gap-3">
              <Logo className="h-8 w-8 shrink-0 rounded-lg" />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-ink">QEPilot</span>
                  <span className="rounded bg-border px-1.5 py-px text-[10px] font-medium text-muted">
                    APP
                  </span>
                </div>
                <p className="mt-1 text-sm text-text">{scenario.lead}</p>

                <div className="mt-2 space-y-1.5">
                  {scenario.checks.map((c) => (
                    <div key={c} className="flex items-center gap-2 text-sm text-text">
                      <span className="flex h-4 w-4 items-center justify-center rounded bg-emerald-500 text-[10px] text-white">
                        ✓
                      </span>
                      {c}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-surface p-3 max-w-xs">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold text-white ${scenario.file.color}`}>
                    {scenario.file.ext}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{scenario.file.name}</p>
                    <p className="text-xs text-muted">{scenario.file.ext} file</p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-text">{scenario.summary}</p>

                <div className="mt-3 flex gap-2">
                  {scenario.reactions.map((r) => (
                    <span
                      key={r.emoji}
                      className="rounded-full bg-bg-soft px-2 py-1 text-xs text-text"
                    >
                      {r.emoji} {r.count}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
