import PersonaLayout from '../components/PersonaLayout'

export default function ForEngineeringManagers() {
  return (
    <PersonaLayout
      badge="For Engineering Managers"
      lead="Clear the QA backlog"
      accent="without adding headcount"
      intro="The backlog isn't a staffing gap — it's a throughput problem on test authoring. QEPilot lifts that throughput so features get tested the same day they're groomed."
      sections={[
        {
          h: 'Tickets get tested while context is fresh',
          p: 'Instead of sitting in a queue for days, a groomed ticket gets manual test cases drafted the same day — so nobody has to reconstruct intent a week later, and coverage keeps pace with delivery.',
        },
        {
          h: 'Faster shipping, same team',
          p: 'Your QA engineers stop losing their week to boilerplate authoring and get that time back for exploratory testing and edge cases. You clear more tickets without a new hire or a new tool to roll out.',
        },
        {
          h: 'Nothing ships unreviewed',
          p: "QEPilot proposes test cases and automation; a human on your team approves before anything runs against real environments. You get the speed of automation with the accountability of human sign-off.",
        },
        {
          h: 'No platform migration',
          p: 'It lives in your existing Jira or Linear, writes Playwright, and wires into the CI you already run. There is no new system for the team to adopt and no scripts to maintain.',
        },
      ]}
    />
  )
}
