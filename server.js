import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')

const app = express()
app.use(cors())
app.use(express.json())

const fieldLabels = {
  name: 'Name',
  email: 'Email',
  company: 'Company',
  role: 'Role',
  tracker: 'Issue tracker',
  testingSetup: 'Current testing setup',
  teamSize: 'Team size',
  painPoint: "What's eating your QA time right now?",
  ticketUrl: 'Sample ticket link',
  productUrl: 'Repo or product URL',
  timeline: 'Timeline',
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
})

app.post('/api/start-project', async (req, res) => {
  const form = req.body || {}

  if (!form.name || !form.email || !form.painPoint) {
    return res.status(400).json({ ok: false, error: 'Name, email, and QA pain point are required.' })
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
    console.error(
      'Missing SMTP_USER and/or SMTP_APP_PASSWORD. Set them in Hostinger Node.js → Environment Variables, then Restart.',
    )
    return res.status(500).json({
      ok: false,
      error: 'Email is not configured on the server. Please try again later.',
    })
  }

  const bodyText = Object.entries(fieldLabels)
    .filter(([key]) => form[key])
    .map(([key, label]) => `${label}: ${form[key]}`)
    .join('\n')

  try {
    await transporter.sendMail({
      from: `"QEPilot Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || 'info@qepilot.com',
      replyTo: form.email,
      subject: `New project inquiry — ${form.name}`,
      text: bodyText,
    })
  } catch (err) {
    console.error('Failed to send project inquiry email:', err)
    return res.status(500).json({ ok: false, error: 'Could not send email. Please try again later.' })
  }

  // Best-effort confirmation to the visitor — failure here shouldn't fail the request,
  // since the inquiry itself already landed above.
  try {
    await transporter.sendMail({
      from: `"QEPilot" <${process.env.SMTP_USER}>`,
      to: form.email,
      subject: 'Got it — thanks for reaching out to QEPilot',
      text: `Hi ${form.name},

Thanks for the details on your QA backlog. I'll take a look and reply within one business day.

Here's a recap of what you sent:

${bodyText}

Talk soon,
QEPilot`,
    })
  } catch (err) {
    console.error('Failed to send visitor confirmation email:', err)
  }

  res.json({ ok: true })
})

// Serve the built frontend (npm run build) and fall back to index.html
// for client-side routes like /start, so this one process can host both.
app.use(express.static(distDir))
app.use((req, res, next) => {
  const looksLikeAssetRequest = path.extname(req.path) !== ''
  if (req.method !== 'GET' || req.path.startsWith('/api/') || looksLikeAssetRequest) return next()
  res.sendFile(path.join(distDir, 'index.html'))
})

// API_PORT wins locally (avoids colliding with Vite's dev server port);
// PORT wins in production, since that's what Hostinger/most hosts inject.
const port = process.env.API_PORT || process.env.PORT || 3001
app.listen(port, () => {
  console.log(`QEPilot server listening on http://localhost:${port}`)
  if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
    console.warn('WARNING: SMTP_USER / SMTP_APP_PASSWORD not set — /api/start-project will fail until configured.')
  }
})
