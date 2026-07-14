/** Static expectations used by smoke tests (mirrors homepage marketing copy). */
export const homeMock = {
  hero: {
    title: 'Not a script',
    subtitle: 'A QA hire',
  },
  sections: {
    capabilities: 'Four things that make',
    workflow: 'Plug into your backlog',
    results: ['Priya Nathan', 'Owen Marsh'],
  },
  faqs: [
    'What is QEPilot, exactly?',
    'How is this different from just asking ChatGPT?',
    'Do you write real Playwright code, or just recommendations?',
  ],
  workflowSteps: [
    'Connect Jira or Linear',
    'Point at your domain knowledge',
    'Review & approve test cases',
  ],
} as const
