# Deploying QEPilot to Hostinger (Node.js hosting / VPS)

We build **and prerender** the site before it ships, then upload the finished
`dist/` folder. Hostinger just serves it — it does **not** build from source
anymore.

**Why the change:** crawlers and AI systems (GPTBot, ClaudeBot, PerplexityBot…)
don't run JavaScript, so the app is prerendered to static HTML at build time
using a headless Chromium (`npm run build:prerender`). Hostinger's shared Node
platform can't run Chromium, so the prerender has to happen in CI (or locally)
and the built output is shipped. If Hostinger rebuilt from source it would drop
the prerendered HTML.

One Node process serves both the built site and the `/api/start-project` form
endpoint — no separate frontend/backend hosts needed.

## What gets shipped

```
server.js            Express server — serves dist/ + /api/start-project
package.json         (runtime deps: express, cors, nodemailer, dotenv)
package-lock.json
.env.example         template for the required environment variables
dist/                prebuilt + prerendered site (HTML, assets, robots.txt,
                     sitemap.xml, llms.txt, og-image.png)
```

`server.js` lives at the project root — Hostinger's Node.js app config expects
the entry file there (`Entry File: server.js`).

`src/`, `node_modules/`, build tooling, and `.env` are intentionally left out.
Hostinger installs runtime deps itself, and secrets belong in hPanel's
environment variables, not a file.

## First-time setup in Hostinger's hPanel

1. **Create the Node.js application**
   - hPanel → Websites → your domain → **Node.js** (or **Advanced → Node.js**)
   - Node version: 20.x or later
   - Application root: pick a folder, e.g. `qepilot`
   - Application startup file: `server.js`
   - Application URL: your domain (e.g. `qapilot.live`)

2. **Upload the files**
   - Build the package locally: `npm run deploy:hostinger` (writes
     `deploy-artifacts/qepilot-hostinger-deploy.zip`)
   - Open **File Manager**, go to the application root, upload the zip and
     extract it there so `server.js`, `package.json`, and `dist/` sit directly
     in that folder (not nested in an extra subfolder)

3. **Install runtime deps — do NOT build**
   - In the Node.js app screen, click **Run NPM Install** (installs express &
     friends). Prefer a production install (`npm install --omit=dev`) if the
     panel/SSH lets you — the dev/build tooling isn't needed at runtime.
   - **Do not run a build step.** `dist/` is already built and prerendered.

4. **Set environment variables**
   - In the Node.js app screen's **Environment Variables** section add (real
     values, not the placeholders):
     - `SMTP_USER` — the Gmail/Workspace address the app password is for
       (e.g. `info@qepilot.com`)
     - `SMTP_APP_PASSWORD` — the 16-character app password
     - `MAIL_TO` — where submissions should land (`info@qepilot.com`)
   - Don't upload a real `.env` file — hPanel's env-var screen keeps secrets off
     the file system.

5. **Start the app**
   - Click **Restart** (or **Start**). Hostinger injects `PORT`; the server
     already listens on `process.env.PORT`.

6. **Verify**
   - Visit your domain — the homepage should load.
   - View source (or `curl https://qapilot.live/`) — you should see real page
     text (hero, FAQ) in the HTML, plus `<title>`, meta description, and
     `application/ld+json` schema in `<head>`. That's the prerender working.
   - Check `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/og-image.png` all load.
   - Visit `/start`, submit the form, confirm the email arrives.

## Redeploying after future changes

### Automated (recommended): merge to `main`

`.github/workflows/deploy.yml` runs on every push to `main` (and on-demand via
**Actions → Deploy Hostinger → Run workflow**). It:

1. Installs deps and Chromium, runs the Playwright smoke tests
2. Runs `npm run build:prerender` (build + prerender)
3. Syncs the runtime files + prebuilt `dist/` to your Hostinger app root over
   FTPS (source and build tooling are excluded, so the server never rebuilds)

PRs are gated separately by `.github/workflows/playwright.yml` (smoke tests
only, no deploy).

**One-time GitHub secrets** (repo → Settings → Secrets and variables → Actions):

| Secret | Example |
|--------|---------|
| `FTP_SERVER` | `ftp.YOUR_HOSTINGER_HOST` (hPanel → Files → FTP Accounts) |
| `FTP_USERNAME` | your FTP user |
| `FTP_PASSWORD` | your FTP password |
| `FTP_SERVER_DIR` | Node app root with trailing slash, e.g. `/domains/qapilot.live/public_html/` |

After the first automated deploy, if deps changed you may still need **Run NPM
Install** → **Restart** once in hPanel. No build step, ever.

### Manual zip / local upload

```bash
npm run deploy:hostinger           # build + prerender + write the zip
npm run deploy:hostinger:upload    # same, then FTP upload (needs .env.deploy)
```

Re-upload/extract via File Manager (or use `--upload`), then in hPanel: **Run
NPM Install** (if deps changed) → **Restart**. Prerendering needs a local
Chromium; if none is installed the build still succeeds but ships non-prerendered
HTML — run `npx playwright install chromium` first for the full benefit.
