const logos = [
  'Northwind Retail',
  'Meridian Health',
  'Loopline',
  'Fernbank Labs',
  'Cascade Freight',
  'Bramblewood',
]

export default function LogoStrip() {
  return (
    <div className="bg-violet-deep px-6 py-10">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <span className="shrink-0 text-sm font-medium text-white/70">
          Trusted by QA teams at
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <span
              key={logo}
              className="font-display text-lg font-medium text-white/50"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
