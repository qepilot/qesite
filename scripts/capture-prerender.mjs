// Capture the client-rendered #root HTML for each route into committed snapshots
// under prerendered/. Needs a local Chromium (Playwright) — run on a dev machine
// or in CI, NOT on Hostinger. Commit the resulting prerendered/*.html files.
//
// The build step (scripts/inject-prerender.mjs) later injects these snapshots
// into the fresh Vite output — that part needs no browser, so it runs fine on
// Hostinger's build server.
//
//   npm run prerender   # build + capture, then `git add prerendered/`
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import express from 'express'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distDir = path.join(root, 'dist')
const snapDir = path.join(root, 'prerendered')

// route -> snapshot file. Keep in sync with src/App.tsx and inject-prerender.mjs.
const ROUTES = [
  { route: '/', snap: 'home.html' },
  { route: '/start', snap: 'start.html' },
  { route: '/use-cases', snap: 'use-cases.html' },
  { route: '/integrations', snap: 'integrations.html' },
  { route: '/vs-chatgpt', snap: 'vs-chatgpt.html' },
  { route: '/about', snap: 'about.html' },
  { route: '/for-qa-engineers', snap: 'for-qa-engineers.html' },
  { route: '/for-engineering-managers', snap: 'for-engineering-managers.html' },
  { route: '/blog', snap: 'blog.html' },
  { route: '/blog/why-qa-backlogs-never-shrink', snap: 'blog-why-qa-backlogs-never-shrink.html' },
  { route: '/blog/from-jira-ticket-to-playwright-test', snap: 'blog-from-jira-ticket-to-playwright-test.html' },
  { route: '/blog/reviewed-not-rubber-stamped', snap: 'blog-reviewed-not-rubber-stamped.html' },
]

// Analytics / consent scripts are irrelevant to the snapshot and would fire real
// hits + inject the cookie banner. Their <script> tags live in index.html and are
// untouched — only their execution is skipped here.
const BLOCK_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'analytics.google.com',
  'secureprivacy.ai',
  'doubleclick.net',
]

function startServer() {
  const app = express()
  app.use(express.static(distDir))
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
  const launchOpts = process.env.PW_EXECUTABLE ? { executablePath: process.env.PW_EXECUTABLE } : {}
  let browser
  try {
    browser = await chromium.launch(launchOpts)
  } catch (err) {
    server.close()
    console.warn('Prerender capture skipped: could not launch Chromium —', err.message)
    console.warn('Run `npx playwright install chromium` (or set PW_EXECUTABLE) to capture snapshots.')
    return
  }

  const page = await browser.newPage()
  // Freeze time so the output is deterministic: timer-driven UI (the rotating
  // headline flips every 2.4s) and framer-motion entrance animations would
  // otherwise land in a different state each run, making the auto-regen CI job
  // commit noisy diffs forever. We install a fake clock, then advance a fixed
  // 1s — long enough for entrance animations (<0.4s) to settle, short of the
  // 2.4s headline tick — so every capture is byte-identical for the same source.
  await page.clock.install()
  await page.route('**/*', (route) =>
    BLOCK_HOSTS.some((h) => route.request().url().includes(h)) ? route.abort() : route.continue(),
  )

  try {
    await fs.mkdir(snapDir, { recursive: true })
    for (const { route, snap } of ROUTES) {
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle' })
      await page.waitForFunction(() => {
        const el = document.getElementById('root')
        return el && el.children.length > 0
      })
      await page.clock.runFor(1000) // settle entrance animations, deterministically
      const inner = await page.$eval('#root', (el) => el.innerHTML)
      const outPath = path.join(snapDir, snap)
      await fs.writeFile(outPath, inner, 'utf8')
      console.log(`captured ${route} -> prerendered/${snap} (${inner.length} bytes)`)
    }
  } finally {
    await browser.close()
    server.close()
  }
}

main().catch((err) => {
  console.error('Prerender capture failed:', err)
  process.exit(1)
})
