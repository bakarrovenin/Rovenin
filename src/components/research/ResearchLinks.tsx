import React from 'react'

import { cn } from 'src/utilities/cn'

/**
 * The one place these two URLs are defined for the research pages. Email
 * signup is handled entirely by Substack: these links open the publication's
 * own page, where the reader subscribes. Nothing is collected by this site.
 *
 * rel is "noopener" without "noreferrer" on purpose. It still blocks access to
 * window.opener, while letting the referrer through so Substack credits
 * rovenin.com as the traffic source.
 */
export const SUBSTACK_URL = 'https://rovenin.substack.com/'
export const X_URL = 'https://x.com/roveninresearch'

/** Which spot on the site the reader clicked from, reported to Substack. */
export type Placement = 'post_footer' | 'research_page'

export const substackUrl = (placement: Placement): string =>
  `${SUBSTACK_URL}?utm_source=rovenin&utm_medium=${placement}`

const linkClasses = 'hover:text-white transition-colors duration-300'

type PlacementProps = {
  placement: Placement
  className?: string
}

export const SubscribeLink: React.FC<PlacementProps> = ({ placement, className }) => (
  <a
    href={substackUrl(placement)}
    target="_blank"
    rel="noopener"
    className={cn('text-sm tracking-wide text-textlight', linkClasses, className)}
  >
    Get new research by email
  </a>
)

export const SocialLinks: React.FC<PlacementProps> = ({ placement, className }) => (
  <p className={cn('text-sm tracking-wide text-textlight', className)}>
    <a
      href={X_URL}
      target="_blank"
      rel="noopener"
      aria-label="Rovenin on X (opens in a new tab)"
      className={linkClasses}
    >
      X
    </a>
    <span className="mx-2">·</span>
    <a
      href={substackUrl(placement)}
      target="_blank"
      rel="noopener"
      aria-label="Rovenin on Substack (opens in a new tab)"
      className={linkClasses}
    >
      Substack
    </a>
  </p>
)
