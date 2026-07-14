import { test as base, expect } from '@playwright/test'

// Third-party analytics / consent scripts (GA, Secure Privacy) are irrelevant to
// functional smoke tests — and the Secure Privacy cookie banner renders a
// full-page #sp-overlay that intercepts pointer events, breaking clicks. Block
// those hosts for every test so the app can be exercised in isolation.
const BLOCKED = /googletagmanager|google-analytics|analytics\.google|secureprivacy|doubleclick/

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route(BLOCKED, (route) => route.abort())
    await use(page)
  },
})

export { expect }
