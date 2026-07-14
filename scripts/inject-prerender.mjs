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

// snapshot -> output file (+ per-route <head> overrides so secondary routes don't
// inherit the home page's title/canonical). Keep in sync with capture-prerender.mjs.
const ROUTES = [
  { snap: 'home.html', out: 'index.html', canonical: 'https://qapilot.live/' },
  {
    snap: 'start.html',
    out: 'start/index.html',
    canonical: 'https://qapilot.live/start',
    title: 'Start a project — QEPilot',
    description:
      'Send QEPilot a Jira or Linear ticket and see the manual test cases and Playwright automation it produces. Free first ticket, no setup required.',
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
  const html = applyHead(injectRoot(base, snapshot), r)
  const outPath = path.join(distDir, r.out)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, 'utf8')
  injected++
  console.log(`injected prerendered/${r.snap} -> dist/${r.out}`)
}

if (!injected) {
  console.warn('inject-prerender: no snapshots found. Run `npm run prerender` to generate them.')
}
