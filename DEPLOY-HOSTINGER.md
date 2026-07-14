# Deploying QEPilot to Hostinger (Node.js hosting / VPS)

Hostinger's Node.js platform builds your app itself from source (it runs
`npm install` then `npm run build` from a `.builds/source` directory) — it
doesn't just run a pre-built `dist/` folder. So this package ships the full
source tree, not a pre-built bundle.

One Node process serves both the built site and the `/api/start-project`
form endpoint — no separate frontend/backend hosts needed.

## What's in this zip

```
src/                 React app source
public/              static assets (favicon, etc.)
server.js            Express server — serves the build output + /api/start-project
index.html
vite.config.ts
tsconfig.json / tsconfig.app.json / tsconfig.node.json
package.json
package-lock.json
.env.example          template for the required environment variables
```

`server.js` lives at the project root — Hostinger's Node.js app config
expects the entry file there (`Entry File: server.js`), not nested in a
subfolder.

`dist/`, `node_modules/`, and `.env` are intentionally left out — Hostinger
generates `dist/` itself during its build, installs `node_modules` itself,
and secrets belong in hPanel's environment variables, not a file.

## Steps in Hostinger's hPanel

1. **Create the Node.js application**
   - hPanel → Websites → your domain → **Node.js** (or **Advanced → Node.js**)
   - Node version: 20.x or later
   - Application root: pick a folder, e.g. `qepilot`
   - Application startup file: `server.js`
   - Application URL: your domain (e.g. `qepilot.live`)

2. **Upload the files**
   - Open **File Manager**, navigate to the application root folder you chose
   - Upload this zip and extract it there, so `server.js`, `src/`,
     `index.html`, and `package.json` sit directly in that folder (not
     nested in an extra subfolder)

3. **Install & build**
   - In the Node.js app screen, click **Run NPM Install**
   - Then run the build — either a **Run NPM Build** / **Deploy** button if
     present, or via the app's SSH/terminal access: `npm run build`
   - This is the step that was failing before because only `dist/` had been
     uploaded without the source files `tsc`/`vite` need

4. **Set environment variables**
   - In the same Node.js app screen there's an **Environment Variables**
     section — add these (real values, not the placeholder text):
     - `SMTP_USER` — the Gmail/Workspace address you generated the app
       password for (e.g. `info@qepilot.com`)
     - `SMTP_APP_PASSWORD` — the 16-character app password
     - `MAIL_TO` — where submissions should land (`info@qepilot.com`)
   - Don't upload a real `.env` file with these values — hPanel's own
     environment variable screen keeps them out of the file system entirely.

5. **Start the app**
   - Click **Restart** (or **Start**) in the Node.js app screen
   - Hostinger assigns the app a `PORT` automatically — the server already
     listens on `process.env.PORT`, so no changes needed there

6. **Verify**
   - Visit your domain — the homepage should load
   - Visit `/start`, fill the form, submit, and confirm the email arrives

## Redeploying after future changes

Re-upload the changed source files via File Manager (or re-upload this
whole zip and re-extract, overwriting), then in hPanel: **Run NPM Install**
(only needed if dependencies changed) → run the build again → **Restart**.
