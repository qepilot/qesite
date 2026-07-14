// One-off / occasional generator for the social share image (public/og-image.png,
// 1200x630). Run with: node scripts/make-og-image.mjs
// Uses the already-installed Chromium (Playwright) to screenshot a branded card.
import path from 'path'
import { fileURLToPath } from 'url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'public', 'og-image.png')

const html = `<!doctype html><html><head><meta charset="utf-8"/>
<style>
  * { margin:0; box-sizing:border-box; }
  body { width:1200px; height:630px; display:flex; flex-direction:column; justify-content:center;
         padding:90px; font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
         background:radial-gradient(1200px 630px at 80% -10%, #1b2440 0%, #0b0b0f 60%); color:#f5f6fa; }
  .brand { font-size:34px; font-weight:700; letter-spacing:-0.5px; }
  .brand span { color:#8b9dff; }
  h1 { font-size:74px; font-weight:700; line-height:1.05; letter-spacing:-2px; margin:34px 0 22px; max-width:1000px; }
  p { font-size:32px; color:#aab0c0; max-width:900px; line-height:1.35; }
  .tag { margin-top:44px; font-size:24px; color:#8b9dff; font-weight:600; }
</style></head>
<body>
  <div class="brand">QE<span>Pilot</span></div>
  <h1>AI QA Engineer — Jira in, tested automation out.</h1>
  <p>Reads your tickets, writes reviewable test cases, ships approved cases as Playwright automation in your CI.</p>
  <div class="tag">qapilot.live</div>
</body></html>`

const launchOpts = process.env.PW_EXECUTABLE ? { executablePath: process.env.PW_EXECUTABLE } : {}
const browser = await chromium.launch(launchOpts)
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: outPath })
await browser.close()
console.log(`wrote ${outPath}`)
