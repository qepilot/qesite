import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type FormState = {
  name: string
  email: string
  company: string
  role: string
  tracker: string
  testingSetup: string
  teamSize: string
  painPoint: string
  ticketUrl: string
  productUrl: string
  timeline: string
}

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  role: '',
  tracker: '',
  testingSetup: '',
  teamSize: '',
  painPoint: '',
  ticketUrl: '',
  productUrl: '',
  timeline: '',
}

export default function StartProject() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.painPoint) {
      setError('Name, email, and your QA pain point are required.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/start-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <section className="mesh-gradient px-6 pt-32 pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            ← Back to QEPilot
          </Link>
          <h1 className="font-display mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Let's start your project.
          </h1>
          <p className="mt-4 text-white/85">
            Tell me about your backlog and I'll show you the manual test
            cases and Playwright automation your first ticket turns into.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto -mt-12 max-w-2xl rounded-3xl border border-border bg-surface p-8 shadow-[0_30px_80px_rgba(28,23,48,0.12)] md:p-10"
        >
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-2xl text-accent-2">
                ✓
              </div>
              <h2 className="font-display mt-5 text-2xl font-semibold text-ink">
                Sent — it's in the inbox.
              </h2>
              <p className="mt-3 text-sm text-muted">
                Your project details were emailed over. I'll reply within one
                business day.
              </p>
              <Link
                to="/"
                className="mt-7 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                Back to QEPilot
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-semibold uppercase tracking-wide text-accent-2">
                  About you
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Jamie Lin"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Work email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="jamie@company.com"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={update('company')}
                      placeholder="Acme Inc."
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Role">
                    <select value={form.role} onChange={update('role')} className={inputClass}>
                      <option value="">Select one</option>
                      <option>Engineering Manager</option>
                      <option>QA Lead</option>
                      <option>Founder / CTO</option>
                      <option>Product Manager</option>
                      <option>Other</option>
                    </select>
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-semibold uppercase tracking-wide text-accent-2">
                  Your setup
                </legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Issue tracker">
                    <select value={form.tracker} onChange={update('tracker')} className={inputClass}>
                      <option value="">Select one</option>
                      <option>Jira</option>
                      <option>Linear</option>
                      <option>Other</option>
                      <option>Not sure yet</option>
                    </select>
                  </Field>
                  <Field label="Testing today">
                    <select value={form.testingSetup} onChange={update('testingSetup')} className={inputClass}>
                      <option value="">Select one</option>
                      <option>No automated tests</option>
                      <option>Some Playwright / Cypress</option>
                      <option>Other framework</option>
                      <option>Manual QA only</option>
                    </select>
                  </Field>
                  <Field label="Team size">
                    <select value={form.teamSize} onChange={update('teamSize')} className={inputClass}>
                      <option value="">Select one</option>
                      <option>Just me</option>
                      <option>2–10</option>
                      <option>11–50</option>
                      <option>50+</option>
                    </select>
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-semibold uppercase tracking-wide text-accent-2">
                  The work
                </legend>
                <Field label="What's eating your QA time right now?" required>
                  <textarea
                    required
                    value={form.painPoint}
                    onChange={update('painPoint')}
                    placeholder="e.g. tickets sit in the backlog for days before anyone writes a test case"
                    rows={3}
                    className={inputClass}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Sample ticket link (optional)">
                    <input
                      type="url"
                      value={form.ticketUrl}
                      onChange={update('ticketUrl')}
                      placeholder="https://yourteam.atlassian.net/browse/PROJ-482"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Repo or product URL (optional)">
                    <input
                      type="url"
                      value={form.productUrl}
                      onChange={update('productUrl')}
                      placeholder="https://github.com/your-org/app"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="font-display text-sm font-semibold uppercase tracking-wide text-accent-2">
                  Timeline
                </legend>
                <Field label="When do you want to start?">
                  <select value={form.timeline} onChange={update('timeline')} className={inputClass}>
                    <option value="">Select one</option>
                    <option>ASAP</option>
                    <option>This month</option>
                    <option>Just exploring</option>
                  </select>
                </Field>
              </fieldset>

              {error && <p className="text-sm text-rose-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? 'Sending…' : 'Send it over'}
              </button>
              <p className="text-center text-xs text-muted">
                Sends straight to info@qepilot.com — no email client required.
              </p>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-border bg-bg-soft px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent-2"> *</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  )
}
