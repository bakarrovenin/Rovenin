/**
 * Studio projects.
 *
 * These live in the repo rather than in Payload on purpose: they change when we
 * ship something, not when an editor logs in, and keeping them here means no
 * schema to migrate. Adding a project means adding one object to `projects`.
 */

export type StudioStatus =
  | 'Live'
  | 'Under construction'
  | 'Live paper test'
  | 'Tested, watching'
  | 'Tested, no edge'

/**
 * How each status reads. Anything running for real, or running a live test,
 * takes the bronze accent; everything else stays neutral. Typed against the
 * union so a new status cannot ship without a tone.
 */
export const statusTone: Record<StudioStatus, 'accent' | 'muted'> = {
  Live: 'accent',
  'Live paper test': 'accent',
  'Under construction': 'muted',
  'Tested, watching': 'muted',
  'Tested, no edge': 'muted',
}

/** Where a project sits on /studio. */
export type StudioGroup = 'projects' | 'bot-lab'

export type StudioLink = {
  label: string
  url: string
  /**
   * When true the URL is rendered as text to copy rather than as a link.
   * Used for endpoints that are pasted into another tool rather than visited.
   */
  copyable?: boolean
}

export type StudioProject = {
  slug: string
  name: string
  group: StudioGroup
  status: StudioStatus
  summary: string
  description: string[]
  highlights: string[]
  stack: string[]
  links: StudioLink[]
  /** Bot Lab: how the bot was tested, shown under "How we tested it". */
  testing?: string[]
  /** Bot Lab: the one line result, shown as the Verdict. */
  verdict?: string
  /** Bot Lab: what happens next, shown under the verdict. */
  outlook?: string
  /**
   * Bot Lab: the full Rovenin write up. The "Read the full research" link is
   * hidden while this is empty; fill it in once the write up is published.
   */
  researchUrl?: string
}

export const projects: StudioProject[] = [
  {
    slug: 'psx-connector',
    name: 'PSX by Rovenin',
    group: 'projects',
    status: 'Live',
    summary: 'Live Pakistan Stock Exchange data, inside Claude.',
    description: [
      "Pakistan's stock market has never had a proper public API. The data sits on the PSX Data Portal, built for people clicking through tables.",
      'So we built the missing layer. PSX by Rovenin is a remote MCP server that plugs straight into Claude as a custom connector, letting anyone ask about the PSX in plain language.',
      'Ask Claude how HBL did over the past year against the KSE 100 and it pulls the numbers itself. In testing it returned +20.53% for HBL, matching the figure PSX publishes.',
      "Data comes from PSX's public portal and can be delayed, and every response says so.",
    ],
    highlights: [
      'Nine read only tools: symbol search, live quotes, price history, monthly OHLC, intraday prices, market movers, performance comparisons, index levels, company profiles',
      'Caching, upstream rate limits and automatic retries',
      'Freshness warnings on delisted symbols',
      'Built to Claude Connectors Directory standards, with public docs and a privacy policy',
    ],
    stack: ['MCP over Streamable HTTP', 'Vercel'],
    links: [
      { label: 'Connector URL', url: 'https://psx.rovenin.com/api/mcp', copyable: true },
      { label: 'Docs', url: 'https://psx.rovenin.com/docs' },
      { label: 'Privacy', url: 'https://psx.rovenin.com/privacy' },
    ],
  },
  {
    slug: 'weather-bot',
    name: 'Weather Bot',
    group: 'bot-lab',
    status: 'Tested, no edge',
    summary:
      'Forecasts for the exact station that settles each Polymarket temperature bet, against market prices.',
    description: [
      'Polymarket runs daily bets on city temperatures. We built a bot that pulls weather model forecasts for the exact airport station that settles each bet and compares them to market prices.',
    ],
    testing: [
      "We backtested it on about 3,700 resolved markets and verified the station data matched Polymarket's payouts 98.6% of the time.",
    ],
    verdict:
      'The crowd prices weather better than the models once real trading costs are included, and the order books are too thin (about $1 to 2 deep) to size into anyway.',
    outlook: 'The collector keeps running in case better forecasts change the picture.',
    researchUrl: '',
    highlights: [],
    stack: [],
    links: [],
  },
  {
    slug: 'carry-bot',
    name: 'Carry Bot',
    group: 'bot-lab',
    status: 'Tested, watching',
    summary: 'Collecting funding from leveraged traders, with price moves hedged out.',
    description: [
      'It collects funding payments from overexcited leveraged traders on Binance and Hyperliquid, holding the asset and shorting it at once so price moves cancel out.',
    ],
    testing: [
      'We backtested three versions over 12 months, then paper traded every signal with active margin management.',
    ],
    verdict:
      'The hedges held through big moves with no liquidations, but funding barely covered fees: ten managed positions netted $0.06.',
    outlook:
      "It now runs as an alarm that emails us when funding turns euphoric, since that's when carry actually pays.",
    researchUrl: '',
    highlights: [],
    stack: [],
    links: [],
  },
  {
    slug: 'copy-trading-test',
    name: 'Copy Trading Test',
    group: 'bot-lab',
    status: 'Tested, no edge',
    summary: "What copying Polymarket's top traders would really have made, after delays and fees.",
    description: ["Can you get rich copying Polymarket's top traders?"],
    testing: [
      'We picked 91 leaderboard wallets using only data from before a cutoff date, then measured what a copier would have made afterwards at 30 second, 5 minute and 1 hour delays, after fees.',
    ],
    verdict:
      'No wallet or category was reliably profitable to copy, 11 of the top 20 stopped trading entirely, and copying crypto bots lost money with statistical confidence.',
    researchUrl: '',
    highlights: [],
    stack: [],
    links: [],
  },
  {
    slug: 'fair-value-maker',
    name: 'Fair Value Maker',
    group: 'bot-lab',
    status: 'Live paper test',
    summary: 'Calculated odds for 5 and 15 minute Bitcoin and Ethereum up or down markets.',
    description: [
      'Polymarket runs 5 and 15 minute Bitcoin and Ethereum up or down markets. Our bot calculates the true odds from price, time remaining and volatility, then posts small limit orders only where the market is underpricing.',
    ],
    testing: [
      "We studied the most profitable bot in these markets (1.83 million fills) to learn its behaviour, and our backtest's best version returned 4.4% per dollar deployed.",
    ],
    verdict:
      'Promising but not yet statistically proven. A preregistered one week live paper test ends 30 September 2026.',
    researchUrl: '',
    highlights: [],
    stack: [],
    links: [],
  },
]

export const getProject = (slug: string): StudioProject | undefined =>
  projects.find((project) => project.slug === slug)

export const projectsIn = (group: StudioGroup): StudioProject[] =>
  projects.filter((project) => project.group === group)

export const botLabIntro =
  "Every bot we build gets tested with real data before a dollar goes in. Here's what we found."

/**
 * The three things we build. Shown on the Studio page and on Services, from
 * this one list so the two can never drift apart.
 */
export const whatWeBuild: { title: string; description: string; note?: string }[] = [
  {
    title: 'Trading bots',
    description: 'Automated strategies with defined entries, exits and risk limits.',
    note: 'Tested with real data before a dollar goes in.',
  },
  {
    title: 'AI knowledge brains',
    description: 'Private AI assistants trained on your documents, data and workflows.',
  },
  {
    title: 'Custom integrations and builds',
    description:
      'Connectors, data pipelines and internal tools that plug AI into how you already work.',
  },
]
