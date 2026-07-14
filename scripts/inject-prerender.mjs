// Inject committed prerender snapshots (prerendered/*.html) into the fresh Vite
// build output. Pure file operations — NO browser — so this runs fine on
// Hostinger's build server as the last step of `npm run build`.
//
// It injects each snapshot into a copy of the freshly built dist/index.html, so
// the asset <script>/<link> hashes and <head> meta always come from THIS build
// (no stale-hash risk). Missing snapshots are a no-op: the site still ships with
// all <head> meta/schema, just without prerendered body text.
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distDir = path.join(root, 'dist')
const snapDir = path.join(root, 'prerendered')

// Build a BlogPosting JSON-LD object for a blog post route.
function blogPosting(headline, description, author, datePublished, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    author: { '@type': 'Person', name: author },
    datePublished,
    publisher: { '@type': 'Organization', name: 'QEPilot', url: 'https://qapilot.live/' },
    mainEntityOfPage: url,
  }
}

// snapshot -> output file (+ per-route <head> overrides so secondary routes don't
// inherit the home page's title/canonical). Keep in sync with capture-prerender.mjs.
const ROUTES = [
  // `faq: true` keeps the FAQPage JSON-LD (only valid where the FAQ is visible).
  { snap: 'home.html', out: 'index.html', canonical: 'https://qapilot.live/', faq: true },
  {
    snap: 'start.html',
    out: 'start/index.html',
    canonical: 'https://qapilot.live/start',
    title: 'Start a project — QEPilot',
    description:
      'Send QEPilot a Jira or Linear ticket and see the manual test cases and Playwright automation it produces. Free first ticket, no setup required.',
  },
  {
    snap: 'use-cases.html',
    out: 'use-cases/index.html',
    canonical: 'https://qapilot.live/use-cases',
    title: 'Use cases — QEPilot AI QA Engineer',
    description:
      'How QEPilot clears a QA backlog across new feature tickets, regression bugs, ambiguous specs, and legacy test debt — reviewed cases automated with Playwright.',
  },
  {
    snap: 'integrations.html',
    out: 'integrations/index.html',
    canonical: 'https://qapilot.live/integrations',
    title: 'Integrations — Jira, Linear, Playwright & CI | QEPilot',
    description:
      'QEPilot works with Jira, Linear, Playwright, Playwright-MCP, and your CI — grounded in your product docs. No new platform, no scripts to maintain.',
  },
  {
    snap: 'vs-chatgpt.html',
    out: 'vs-chatgpt/index.html',
    canonical: 'https://qapilot.live/vs-chatgpt',
    title: 'QEPilot vs ChatGPT for QA — a side-by-side comparison',
    description:
      'Generic AI sketches a test plan; QEPilot ships reviewed, traceable coverage grounded in your product and running in your CI. See the difference side by side.',
  },
  {
    snap: 'about.html',
    out: 'about/index.html',
    canonical: 'https://qapilot.live/about',
    title: 'About QEPilot — founded by Asad Zaman',
    description:
      "QEPilot was founded by Asad Zaman, a Computer Science graduate with 20+ years in QA. The philosophy: make QA engineers 10x faster — not replace them.",
    extraSchema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Asad Zaman',
        jobTitle: 'Founder',
        description:
          'Computer Science graduate with 20+ years of experience in QA and test automation; founder of QEPilot.',
        url: 'https://qapilot.live/about',
        worksFor: { '@type': 'Organization', name: 'QEPilot', url: 'https://qapilot.live/' },
      },
    ],
  },
  {
    snap: 'for-qa-engineers.html',
    out: 'for-qa-engineers/index.html',
    canonical: 'https://qapilot.live/for-qa-engineers',
    title: 'QEPilot for QA Engineers — less boilerplate, more real testing',
    description:
      'QEPilot drafts the repetitive test cases and Playwright specs so QA engineers can spend their time on exploratory testing and edge cases. You review and own what ships.',
  },
  {
    snap: 'for-engineering-managers.html',
    out: 'for-engineering-managers/index.html',
    canonical: 'https://qapilot.live/for-engineering-managers',
    title: 'QEPilot for Engineering Managers — clear the QA backlog',
    description:
      'Clear the QA backlog without adding headcount. QEPilot drafts test cases the same day tickets are groomed, with human sign-off before anything runs in CI.',
  },
  {
    snap: 'blog.html',
    out: 'blog/index.html',
    canonical: 'https://qapilot.live/blog',
    title: 'Blog — notes on modern QA | QEPilot',
    description:
      'Practical thinking on test authoring, automation, and clearing the QA backlog, from the QEPilot team.',
  },
  {
    snap: 'blog-why-qa-backlogs-never-shrink.html',
    out: 'blog/why-qa-backlogs-never-shrink/index.html',
    canonical: 'https://qapilot.live/blog/why-qa-backlogs-never-shrink',
    title: 'Why Your QA Backlog Never Actually Shrinks | QEPilot',
    description:
      "The QA backlog isn't a staffing problem — it's a workflow problem. Where the hours quietly disappear, and what actually clears the queue.",
    extraSchema: [
      blogPosting(
        'Why Your QA Backlog Never Actually Shrinks',
        "The QA backlog isn't a staffing problem — it's a workflow problem. Where the hours quietly disappear.",
        'Vikram Singhal',
        '2026-05-19',
        'https://qapilot.live/blog/why-qa-backlogs-never-shrink',
      ),
    ],
  },
  {
    snap: 'blog-from-jira-ticket-to-playwright-test.html',
    out: 'blog/from-jira-ticket-to-playwright-test/index.html',
    canonical: 'https://qapilot.live/blog/from-jira-ticket-to-playwright-test',
    title: 'From Jira Ticket to Playwright Test, Without the Copy-Paste | QEPilot',
    description:
      'What it actually takes to turn an acceptance criterion into a runnable, CI-wired Playwright spec — reliably, every time.',
    extraSchema: [
      blogPosting(
        'From Jira Ticket to Playwright Test, Without the Copy-Paste',
        'What it actually takes to turn an acceptance criterion into a runnable, CI-wired Playwright spec.',
        'Victor Tan',
        '2026-06-09',
        'https://qapilot.live/blog/from-jira-ticket-to-playwright-test',
      ),
    ],
  },
  {
    snap: 'blog-reviewed-not-rubber-stamped.html',
    out: 'blog/reviewed-not-rubber-stamped/index.html',
    canonical: 'https://qapilot.live/blog/reviewed-not-rubber-stamped',
    title: 'Reviewed, Not Rubber-Stamped: Human-in-the-Loop AI QA | QEPilot',
    description:
      'AI that writes tests is only useful if a human still owns what ships. Why the approval gate is the whole point.',
    extraSchema: [
      blogPosting(
        'Reviewed, Not Rubber-Stamped: The Case for Human-in-the-Loop AI QA',
        'AI that writes tests is only useful if a human still owns what ships. Why the approval gate is the whole point.',
        'Marcus Bennett',
        '2026-06-30',
        'https://qapilot.live/blog/reviewed-not-rubber-stamped',
      ),
    ],
  },
]

function applyHead(html, { canonical, title, description }) {
  if (title) {
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
  }
  if (description) {
    html = html
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`)
  }
  if (canonical) {
    html = html
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
  }
  return html
}

// Remove the FAQPage JSON-LD block — Google's structured-data policy requires
// FAQ markup to match FAQ content that's visible on that page.
function stripFaqSchema(html) {
  // Tempered match: only the single ld+json block that contains FAQPage — the
  // (?!</script>) guards stop the match from spanning into other schema blocks.
  return html.replace(
    /\s*<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"@type":\s*"FAQPage"(?:(?!<\/script>)[\s\S])*?<\/script>/,
    '',
  )
}

// Insert extra JSON-LD blocks (e.g. Person, BlogPosting) before </head>.
function addSchema(html, schemas) {
  if (!schemas || !schemas.length) return html
  const scripts = schemas
    .map((s) => `    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`)
    .join('\n')
  return html.replace('</head>', `${scripts}\n  </head>`)
}

function injectRoot(baseHtml, snapshot) {
  const replaced = baseHtml.replace(/<div id="root">\s*<\/div>/, `<div id="root">${snapshot}</div>`)
  if (replaced === baseHtml) throw new Error('could not find an empty <div id="root"></div> to inject into')
  return replaced
}

const basePath = path.join(distDir, 'index.html')
if (!fs.existsSync(basePath)) {
  console.error('inject-prerender: dist/index.html not found — run `vite build` first.')
  process.exit(1)
}
const base = fs.readFileSync(basePath, 'utf8')

let injected = 0
for (const r of ROUTES) {
  const snapPath = path.join(snapDir, r.snap)
  if (!fs.existsSync(snapPath)) {
    console.warn(`inject-prerender: no snapshot ${r.snap} — dist/${r.out} ships without prerendered body.`)
    continue
  }
  const snapshot = fs.readFileSync(snapPath, 'utf8')
  let html = applyHead(injectRoot(base, snapshot), r)
  if (!r.faq) html = stripFaqSchema(html)
  html = addSchema(html, r.extraSchema)
  const outPath = path.join(distDir, r.out)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, 'utf8')
  injected++
  console.log(`injected prerendered/${r.snap} -> dist/${r.out}`)
}

if (!injected) {
  console.warn('inject-prerender: no snapshots found. Run `npm run prerender` to generate them.')
}
