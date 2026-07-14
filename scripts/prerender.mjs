// Prerender the SPA to static HTML so crawlers and AI systems (GPTBot, ClaudeBot,
// PerplexityBot, ...) — which don't run JavaScript — see full page content.
//
// Approach: serve the freshly built dist/ with the same SPA fallback the
// production Express server uses, drive it with the already-installed Chromium
// (Playwright), and snapshot the rendered DOM into per-route index.html files.
// The app still boots normally in the browser (createRoot re-renders on load),
// so there is no SSR/hydration coupling to maintain.
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import express from 'express'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

// Routes to prerender -> output file. Keep in sync with src/App.tsx and sitemap.xml.
// `head` overrides give each route its own title/description/canonical so secondary
// routes don't inherit the home page's tags (which would read as duplicate content).
const ROUTES = [
  { route: '/', out: 'index.html', canonical: 'https://qapilot.live/' },
  {
    route: '/start',
    out: 'start/index.html',
    canonical: 'https://qapilot.live/start',
    title: 'Start a project — QEPilot',
    description:
      'Send QEPilot a Jira or Linear ticket and see the manual test cases and Playwright automation it produces. Free first ticket, no setup required.',
  },
]

// Rewrite the shared <head> tags for a specific route.
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

function startServer() {
  const app = express()
  app.use(express.static(distDir))
  // SPA fallback: non-asset GET requests return index.html (mirrors server.js).
  app.use((req, res, next) => {
    if (req.method !== 'GET' || path.extname(req.path) !== '') return next()
    res.sendFile(path.join(distDir, 'index.html'))
  })
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve({ server, port: server.address().port }))
  })
}

async function main() {
  const { server, port } = await startServer()
  // PW_EXECUTABLE lets CI / low-disk machines reuse an already-installed Chromium
  // instead of downloading the version-matched build.
  const launchOpts = process.env.PW_EXECUTABLE ? { executablePath: process.env.PW_EXECUTABLE } : {}
  let browser
  try {
    browser = await chromium.launch(launchOpts)
  } catch (err) {
    // No usable Chromium (e.g. shared hosting). Don't fail the build — the plain
    // Vite output still ships with all <head> meta/schema intact.
    server.close()
    console.warn('Prerender skipped: could not launch Chromium —', err.message)
    console.warn('Run `npx playwright install chromium` (or set PW_EXECUTABLE) to enable prerendering.')
    return
  }
  const page = await browser.newPage()

  // Don't let third-party analytics / consent scripts run during the snapshot:
  // it would fire build-time GA hits and bake the cookie banner into static HTML.
  // Their <script> tags stay in <head> untouched, so real visitors still get them.
  const BLOCK_HOSTS = [
    'googletagmanager.com',
    'google-analytics.com',
    'analytics.google.com',
    'secureprivacy.ai',
    'doubleclick.net',
  ]
  await page.route('**/*', (route) => {
    const url = route.request().url()
    return BLOCK_HOSTS.some((h) => url.includes(h)) ? route.abort() : route.continue()
  })

  try {
    for (const routeCfg of ROUTES) {
      const { route, out } = routeCfg
      const url = `http://localhost:${port}${route}`
      await page.goto(url, { waitUntil: 'networkidle' })
      // Wait for the app to mount real content into #root.
      await page.waitForFunction(() => {
        const root = document.getElementById('root')
        return root && root.children.length > 0
      })
      // Let entrance animations settle so the snapshot isn't mid-transition.
      await page.waitForTimeout(600)

      let html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
      html = applyHead(html, routeCfg)
      const outPath = path.join(distDir, out)
      await fs.mkdir(path.dirname(outPath), { recursive: true })
      await fs.writeFile(outPath, html, 'utf8')
      console.log(`prerendered ${route} -> dist/${out} (${html.length} bytes)`)
    }
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
