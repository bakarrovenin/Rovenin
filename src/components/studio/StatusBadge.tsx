import React from 'react'

import type { StudioStatus } from '@/data/studio'

/**
 * A quiet status marker, set in the same tracked uppercase as the section
 * eyebrows elsewhere on the site. Live reads in bronze, anything still being
 * built reads muted, so a glance down a grid separates the two.
 */
export const StatusBadge: React.FC<{ status: StudioStatus; className?: string }> = ({
  status,
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase ${
      status === 'Live' ? 'text-custom' : 'text-textlight'
    } ${className}`}
  >
    <span
      aria-hidden="true"
      className={`inline-block w-1.5 h-1.5 rounded-full ${
        status === 'Live' ? 'bg-custom' : 'bg-textlight/60'
      }`}
    />
    {status}
  </span>
)
