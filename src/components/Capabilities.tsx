import { motion } from 'framer-motion'

function JiraMock() {
  return (
    <div className="w-64 rounded-2xl bg-white p-4 shadow-xl">
      <span className="font-mono text-[10px] text-muted">PROJ-482</span>
      <p className="mt-1 text-sm font-medium text-ink">Add bulk CSV export</p>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-text">
          <span className="h-3.5 w-3.5 rounded-full bg-emerald-400/80" />
          Export respects filters
        </div>
        <div className="flex items-center gap-2 text-xs text-text">
          <span className="h-3.5 w-3.5 rounded-full bg-emerald-400/80" />
          Column order matches table
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-700">
          <span className="h-3.5 w-3.5 rounded-full bg-amber-400" />
          "Large" export size — ambiguous
        </div>
      </div>
    </div>
  )
}

function RagMock() {
  return (
    <div className="relative flex h-40 w-64 items-center justify-center">
      <div className="absolute h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center font-display text-xs font-medium text-accent-2">
        RAG
      </div>
      {[
        { label: 'Product specs', pos: 'top-0 left-2' },
        { label: 'Prior tickets', pos: 'top-0 right-2' },
        { label: 'Business rules', pos: 'bottom-0 left-8' },
      ].map((n) => (
        <div
          key={n.label}
          className={`absolute ${n.pos} rounded-xl bg-white/90 px-3 py-1.5 text-[10px] font-medium text-ink shadow-md`}
        >
          {n.label}
        </div>
      ))}
    </div>
  )
}

function TestCaseMock() {
  return (
    <div className="w-64 rounded-2xl bg-white p-4 shadow-xl">
      <span className="font-mono text-[10px] text-muted">TC-114 · Manual</span>
      <p className="mt-1 text-sm font-medium text-ink">Bulk export honors filters</p>
      <ol className="mt-3 space-y-1.5 text-xs text-text list-decimal list-inside">
        <li>Apply "Active" status filter</li>
        <li>Click Export CSV</li>
        <li>Open file, confirm only active rows</li>
      </ol>
    </div>
  )
}

function PlaywrightMock() {
  return (
    <div className="w-64 rounded-2xl bg-ink p-4 shadow-xl">
      <span className="font-mono text-[10px] text-white/50">qepilot.spec.ts</span>
      <pre className="mt-2 font-mono text-[10px] leading-relaxed text-white/80">
{`test('export honors filters', async () => {
  ...
});`}
      </pre>
      <div className="mt-2 rounded-lg bg-emerald-400/10 px-2 py-1 text-[11px] font-mono text-emerald-300">
        ✓ 3 passed (2.1s)
      </div>
    </div>
  )
}

const capabilities = [
  {
    title: 'Jira Ticket Comprehension',
    description:
      'Parses acceptance criteria, user stories, and linked docs to extract real test intent — and flags ambiguity before it becomes a bug.',
    mock: <JiraMock />,
  },
  {
    title: 'Domain-Grounded Test Design',
    description:
      'RAG retrieves your product specs, prior tickets, and business rules so every test case reflects how your system actually behaves.',
    mock: <RagMock />,
  },
  {
    title: 'Manual Test Case Authoring',
    description:
      "Structured, traceable test cases mapped to acceptance criteria, ready for stakeholder review in your team's existing format.",
    mock: <TestCaseMock />,
  },
  {
    title: 'Playwright-MCP Automation',
    description:
      'Approved manual cases become executable Playwright specs via Playwright-MCP, wired directly into your CI suite.',
    mock: <PlaywrightMock />,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-24 bg-bg-soft">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            Why it feels like a hire
          </span>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            Four things that make <span className="text-gradient">QEPilot</span> a hire
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm"
            >
              <div className="mesh-gradient-soft flex h-52 items-center justify-center">
                {cap.mock}
              </div>
              <div className="p-7">
                <h3 className="font-display text-lg font-medium text-ink">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
