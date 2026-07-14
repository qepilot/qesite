import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-8 text-sm text-muted">
        <span className="flex items-center gap-2 font-display font-semibold tracking-tighter text-ink">
          <Logo className="h-7 w-7" />
          <span>
            QE<span className="text-accent-2">Pilot</span>
          </span>
        </span>
        <p>© {new Date().getFullYear()} QEPilot. All rights reserved.</p>
      </div>
    </footer>
  )
}
