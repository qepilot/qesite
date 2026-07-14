export type Block = { type: 'p' | 'h2'; text: string }

export type Post = {
  slug: string
  title: string
  excerpt: string
  author: string
  authorRole: string
  date: string // ISO, for schema + <time>
  dateLabel: string // human readable
  readTime: string
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: 'why-qa-backlogs-never-shrink',
    title: 'Why Your QA Backlog Never Actually Shrinks',
    excerpt:
      "The QA backlog isn't really a staffing problem — it's a workflow problem. Here's where the hours quietly disappear.",
    author: 'Vikram Singhal',
    authorRole: 'Principal QA Architect',
    date: '2026-05-19',
    dateLabel: 'May 19, 2026',
    readTime: '5 min read',
    body: [
      {
        type: 'p',
        text: "Every team says the same thing: 'we just need one more QA engineer and the backlog will clear.' Then the hire lands, and three months later the backlog is exactly as long. The headcount wasn't the constraint. The workflow was.",
      },
      { type: 'h2', text: 'The hours go to authoring, not testing' },
      {
        type: 'p',
        text: 'When you actually break down where a QA engineer spends their week, surprisingly little of it is spent exploring the product. Most of it goes to reading tickets, reconstructing context, and writing the same shape of test case for the hundredth time. That authoring step is the real bottleneck — and it scales linearly with tickets, not with how many people you hire.',
      },
      { type: 'h2', text: 'Tickets go cold while they wait' },
      {
        type: 'p',
        text: "A ticket groomed on Monday that doesn't get test cases until Thursday has lost most of its context. The engineer who wrote it has moved on; the acceptance criteria that felt obvious now need a meeting to clarify. Every day a ticket sits in the QA queue, it gets more expensive to test, not less.",
      },
      { type: 'h2', text: 'What actually shrinks the backlog' },
      {
        type: 'p',
        text: 'The lever is throughput on the authoring step, not raw hours. If manual test cases can be drafted the same day a ticket is groomed — while the context is fresh — and a human just reviews and approves them, the queue stops growing faster than it clears. That is the entire premise behind treating an AI QA engineer as a teammate: it does the drafting, your team keeps the judgment.',
      },
    ],
  },
  {
    slug: 'from-jira-ticket-to-playwright-test',
    title: 'From Jira Ticket to Playwright Test, Without the Copy-Paste',
    excerpt:
      'What it actually takes to turn an acceptance criterion into a runnable, CI-wired Playwright spec — reliably, every time.',
    author: 'Victor Tan',
    authorRole: 'Test Automation Lead',
    date: '2026-06-09',
    dateLabel: 'June 9, 2026',
    readTime: '6 min read',
    body: [
      {
        type: 'p',
        text: 'Pasting a ticket into a chatbot and getting back a block of Playwright code feels like magic for about ten minutes — until you try to run it against your actual app. The selectors are guessed, the flow is generic, and nothing is wired into CI. Getting from a ticket to a test that genuinely protects a release takes a few more steps.',
      },
      { type: 'h2', text: '1. Comprehend the ticket' },
      {
        type: 'p',
        text: 'Start by parsing the acceptance criteria, user stories, and any linked specs to extract the real test intent. This is also where ambiguity should surface: if a criterion says "handle large exports" without defining large, that is a question to ask, not a number to invent.',
      },
      { type: 'h2', text: '2. Ground the design in your product' },
      {
        type: 'p',
        text: 'A test is only as good as its understanding of how your system behaves. Retrieving your product specs, prior tickets, and business rules — rather than guessing — is what separates a plausible test from a correct one.',
      },
      { type: 'h2', text: '3. Author, review, then automate' },
      {
        type: 'p',
        text: 'Write the manual test case first, in the format your team already reviews, and get it approved. Only then translate the approved case into an executable Playwright spec — via Playwright-MCP — and wire it into the CI suite so it runs on every pull request. The copy-paste disappears because the case, the code, and the acceptance criterion all stay linked.',
      },
    ],
  },
  {
    slug: 'reviewed-not-rubber-stamped',
    title: 'Reviewed, Not Rubber-Stamped: The Case for Human-in-the-Loop AI QA',
    excerpt:
      'AI that writes tests is only useful if a human still owns what ships. Why the approval gate is the whole point.',
    author: 'Marcus Bennett',
    authorRole: 'QA Engineering Manager',
    date: '2026-06-30',
    dateLabel: 'June 30, 2026',
    readTime: '4 min read',
    body: [
      {
        type: 'p',
        text: "The fear with AI in QA is that it quietly ships tests nobody read, against environments nobody approved. That fear is reasonable — and the answer isn't to avoid the tooling, it's to insist the human stays in the loop by design.",
      },
      { type: 'h2', text: 'Approval before anything runs' },
      {
        type: 'p',
        text: 'A good AI QA engineer proposes test cases and automation, but nothing touches CI until a person signs off. The manual case lands on the ticket, a human reviews it in the format they already use, and only approved cases become Playwright specs. Judgment stays with the team.',
      },
      { type: 'h2', text: 'Flagging beats guessing' },
      {
        type: 'p',
        text: 'When acceptance criteria are ambiguous, the right behavior is to flag it on the ticket and ask — exactly what a careful human engineer does — instead of confidently generating a test on a wrong assumption. An AI that admits uncertainty is more trustworthy than one that never does.',
      },
      { type: 'h2', text: 'The goal is productivity, not replacement' },
      {
        type: 'p',
        text: "This is not about removing QA engineers. It's about removing the repetitive authoring work so the people who understand your product can spend their time on the judgment calls only they can make. The team gets faster; the accountability stays human.",
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
