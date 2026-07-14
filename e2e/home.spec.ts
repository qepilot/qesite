import { test, expect } from '@playwright/test'
import { homeMock } from './fixtures/home.mock'

test.describe('QEPilot homepage smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads hero with brand and primary CTAs', async ({ page }) => {
    await expect(page).toHaveTitle(/QEPilot/i)

    await expect(
      page.getByRole('heading', { name: new RegExp(homeMock.hero.title, 'i') }),
    ).toBeVisible()
    await expect(page.getByText(new RegExp(homeMock.hero.subtitle, 'i'))).toBeVisible()

    const startCtas = page.getByRole('link', { name: 'Start a project' })
    await expect(startCtas.first()).toBeVisible()
    await expect(startCtas.first()).toHaveAttribute('href', '/start')
  })

  test('shows key sections with mock marketing content', async ({ page }) => {
    await expect(page.locator('#capabilities')).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: new RegExp(homeMock.sections.capabilities, 'i'),
      }),
    ).toBeVisible()

    await expect(page.locator('#workflow')).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: new RegExp(homeMock.sections.workflow, 'i'),
      }),
    ).toBeVisible()

    for (const step of homeMock.workflowSteps) {
      await expect(page.getByRole('heading', { name: step })).toBeVisible()
    }

    await expect(page.locator('#results')).toBeVisible()
    for (const name of homeMock.sections.results) {
      await expect(page.getByText(name)).toBeVisible()
    }

    await expect(page.locator('#faq')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'FAQ' })).toBeVisible()
    for (const q of homeMock.faqs) {
      await expect(page.getByRole('button', { name: q })).toBeVisible()
    }
  })

  test('nav anchors jump to page sections', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'FAQ' }).click()
    await expect(page.locator('#faq')).toBeInViewport()

    await page
      .getByRole('navigation')
      .getByRole('link', { name: 'How it works' })
      .click()
    await expect(page.locator('#workflow')).toBeInViewport()
  })

  test('FAQ accordion reveals answer from mock data', async ({ page }) => {
    const faq = page.locator('#faq')
    await faq.scrollIntoViewIfNeeded()

    await faq
      .getByRole('button', { name: homeMock.faqs[1] })
      .click()

    await expect(
      faq.getByText(/retrieves your actual specs/i),
    ).toBeVisible()
  })

  test('comparison tabs switch scenarios', async ({ page }) => {
    await page.getByText('The difference').scrollIntoViewIfNeeded()

    await page.getByRole('button', { name: 'Ambiguous Spec' }).click()
    await expect(
      page.getByText(/Flags the ambiguity in the ticket/i),
    ).toBeVisible()
  })

  test('footer shows brand and copyright year', async ({ page }) => {
    const footer = page.getByRole('contentinfo')
    await expect(footer.getByText('QEPilot', { exact: true })).toBeVisible()
    await expect(
      footer.getByText(`© ${new Date().getFullYear()} QEPilot. All rights reserved.`),
    ).toBeVisible()
  })
})
