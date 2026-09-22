/**
 * Studio projects.
 *
 * These live in the repo rather than in Payload on purpose: they change when we
 * ship something, not when an editor logs in, and keeping them here means no
 * schema to migrate. Adding a project means adding one object to `projects`.
 */

export type StudioStatus = 'Live' | 'Under construction'

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
  status: StudioStatus
  summary: string
  description: string[]
  highlights: string[]
  stack: string[]
  links: StudioLink[]
}

export const projects: StudioProject[] = [
  {
    slug: 'psx-connector',
    name: 'PSX by Rovenin',
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
    slug: 'trading-bot',
    name: 'Trading Bot',
    status: 'Under construction',
    summary: 'Automated execution built on Rovenin research.',
    description: [
      'We are building an automated trading system that turns our research into rules and executes them with position sizing and written exits. Details when it is ready.',
    ],
    highlights: [],
    stack: [],
    links: [],
  },
]

export const getProject = (slug: string): StudioProject | undefined =>
  projects.find((project) => project.slug === slug)

/**
 * The three things we build. Shown on the Studio page and on Services, from
 * this one list so the two can never drift apart.
 */
export const whatWeBuild: { title: string; description: string }[] = [
  {
    title: 'Trading bots',
    description: 'Automated strategies with defined entries, exits and risk limits.',
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
