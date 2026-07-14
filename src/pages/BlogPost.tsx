import { Link, useParams } from 'react-router-dom'
import CTA from '../components/CTA'
import { getPost } from '../data/posts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <section className="px-6 pt-40 pb-32 bg-bg text-center">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Post not found
        </h1>
        <p className="mt-4 text-muted">
          That article doesn't exist.{' '}
          <Link to="/blog" className="font-medium text-accent-2 underline">
            Back to the blog
          </Link>
          .
        </p>
      </section>
    )
  }

  return (
    <>
      <article className="px-6 pt-32 pb-16 bg-bg">
        <div className="mx-auto max-w-2xl">
          <Link to="/blog" className="text-sm text-accent-2 hover:underline">
            ← Back to the blog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="font-display mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-ink">
            {post.title}
          </h1>
          <p className="mt-4 text-sm font-medium text-accent-2">
            {post.author} · {post.authorRole}
          </p>

          <div className="mt-10 space-y-6">
            {post.body.map((block, i) =>
              block.type === 'h2' ? (
                <h2
                  key={i}
                  className="font-display text-xl font-medium text-ink pt-2"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="text-[15px] leading-relaxed text-text">
                  {block.text}
                </p>
              ),
            )}
          </div>
        </div>
      </article>

      <CTA />
    </>
  )
}
