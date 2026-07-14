import PersonaLayout from '../components/PersonaLayout'

export default function ForQAEngineers() {
  return (
    <PersonaLayout
      badge="For QA Engineers"
      lead="Spend your day on the testing"
      accent="only you can do"
      intro="QEPilot takes the repetitive authoring off your plate — so the hours you used to lose to boilerplate go back into the work that actually needs a human."
      sections={[
        {
          h: 'The boilerplate writes itself',
          p: 'QEPilot reads the ticket, drafts structured manual test cases mapped to each acceptance criterion, and turns the approved ones into Playwright specs. The hundredth "verify the filter works" case is no longer yours to hand-write.',
        },
        {
          h: 'You stay in control',
          p: 'Nothing ships on your behalf. Every case lands for your review in the format you already use, and only what you approve becomes automation wired into CI. QEPilot proposes; you decide.',
        },
        {
          h: 'It asks instead of guessing',
          p: 'When acceptance criteria are vague, QEPilot flags the ambiguity on the ticket rather than inventing a test on a bad assumption — the same instinct you already have, just surfaced earlier.',
        },
        {
          h: 'More time for the hard parts',
          p: 'Exploratory testing, edge cases, the weird interaction nobody speced — that is where your judgment is worth the most. Clearing the routine authoring is what gives you the room to do it.',
        },
      ]}
    />
  )
}
