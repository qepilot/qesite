import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts'

export default function Blog() {
  return (
    <>
      <section className="px-6 pt-32 pb-12 bg-bg text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-2">
            Blog
          </span>
          <h1 className="font-display mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Notes on <span className="text-gradient">modern QA</span>
          </h1>
          <p className="mt-5 text-lg text-muted">
            Practical thinking on test authoring, automation, and clearing the
            work that piles up in a QA backlog.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 bg-bg">
        <div className="mx-auto max-w-4xl space-y-6">
          {posts.map((p) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Link
                to={`/blog/${p.slug}`}
                className="block rounded-3xl border border-border bg-surface p-8 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <time dateTime={p.date}>{p.dateLabel}</time>
                  <span aria-hidden>·</span>
                  <span>{p.readTime}</span>
                </div>
                <h2 className="font-display mt-3 text-2xl font-medium text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {p.excerpt}
                </p>
                <p className="mt-4 text-sm font-medium text-accent-2">
                  {p.author} · {p.authorRole}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
