# Deploying QEPilot to Hostinger (Node.js hosting / VPS)

Hostinger's Node.js platform builds the app itself from source: after pulling
the GitHub repo it runs `npm install` then `npm run build`, and one Node process
(`server.js`) serves the built site plus the `/api/start-project` form endpoint.

## Prerendering (how AI crawlers see the content)

The app is a client-rendered SPA, so crawlers that don't run JavaScript (GPTBot,
ClaudeBot, PerplexityBot…) would otherwise see an empty page. To fix that we
prerender each route to static HTML — but prerendering needs a headless Chromium,
which Hostinger's build server can't run. So it's split in two:

- **Capture (needs Chromium, done by you / CI):** `npm run prerender` renders
  `/` and `/start` and writes committed snapshots to `prerendered/*.html`.
- **Inject (no browser, runs in every build):** `npm run build` ends with
  `scripts/inject-prerender.mjs`, which injects those snapshots into the fresh
  Vite output. This is pure file copying, so it runs fine on Hostinger.

**Snapshots refresh automatically.** The `.github/workflows/prerender-snapshots.yml`
workflow re-runs `npm run prerender` and commits `prerendered/` whenever
page-affecting source changes (`src/**`, `index.html`, `public/**`) land on
`main` — so you never have to run it by hand. Because it commits *after* the push
that triggered it, Hostinger's build for that push uses the previous snapshots;
the auto-commit then lands and Hostinger's next pull serves the fresh ones (a
one-cycle lag on body text only — head SEO is always current).

To refresh immediately yourself (optional / offline fallback):

```bash
npm run prerender          # needs a local Chromium (npx playwright install chromium)
git add prerendered/ && git commit -m "Update prerender snapshots"
```

If the snapshots are missing or stale the site still works and still ships all
`<head>` SEO (title, meta description, Open Graph, JSON-LD schema) and the static
`robots.txt` / `sitemap.xml` / `llms.txt` / `og-image.png` — only the prerendered
body text would be absent/outdated. The client render is always current.

## What Hostinger builds and serves

```
src/                 React app source
public/              static assets → copied into dist/ (favicon, robots.txt,
                     sitemap.xml, llms.txt, og-image.png)
prerendered/         committed prerender snapshots (injected at build time)
server.js            Express server — serves dist/ + /api/start-project
index.html, vite.config.ts, tsconfig*.json, package.json, package-lock.json
```

`dist/`, `node_modules/`, and `.env` are intentionally not committed — Hostinger
generates `dist/` during its build, installs `node_modules` itself, and secrets
live in hPanel's environment variables.

## First-time setup in Hostinger's hPanel

1. **Create the Node.js application**
   - hPanel → Websites → your domain → **Node.js**
   - Node version: 20.x or later
   - Application startup file: `server.js`
   - Application URL: your domain (e.g. `qapilot.live`)

2. **Connect the GitHub repo** (hPanel Git integration) or upload the source, so
   `server.js`, `src/`, `prerendered/`, and `package.json` sit in the app root.

3. **Install & build** — **Run NPM Install**, then run the build (**Run NPM
   Build** or `npm run build` via SSH). The build injects the prerender snapshots
   automatically; no Chromium is needed on the server.

4. **Set environment variables** (Node.js app → Environment Variables):
   - `SMTP_USER` — the Gmail/Workspace address the app password is for
   - `SMTP_APP_PASSWORD` — the 16-character app password
   - `MAIL_TO` — where submissions should land (`info@qepilot.com`)

5. **Start the app** — click **Restart**. Hostinger injects `PORT`; the server
   already listens on `process.env.PORT`.

6. **Verify**
   - Visit the domain — homepage loads.
   - `curl https://qapilot.live/` — you should see real page text (hero, FAQ) in
     the HTML plus `<title>`, meta description, and `application/ld+json` in
     `<head>`. That's the prerender + head SEO working.
   - Check `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/og-image.png` load.
   - Visit `/start`, submit the form, confirm the email arrives.

## Redeploying after future changes

Push to the branch Hostinger tracks (`main`) — it pulls, `npm install`,
`npm run build` (which injects the committed snapshots), and restarts.
GitHub Actions (`.github/workflows/playwright.yml`) runs the Playwright smoke
tests on every push and PR.

**Remember:** if the change affects page content, run `npm run prerender` and
commit `prerendered/` in the same push, so the prerendered HTML stays in sync.

### Manual zip / local upload (fallback)

```bash
npm run deploy:hostinger           # refresh snapshots + zip the source tree
npm run deploy:hostinger:upload    # same, then FTP upload (needs .env.deploy)
```

Upload/extract via File Manager, then in hPanel: **Run NPM Install** → **Run NPM
Build** → **Restart**.
