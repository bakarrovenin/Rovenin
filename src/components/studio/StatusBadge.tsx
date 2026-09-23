import React from 'react'

import { statusTone, type StudioStatus } from '@/data/studio'

/**
 * A quiet status marker, set in the same tracked uppercase as the section
 * eyebrows elsewhere on the site. Statuses in the accent tone (running for
 * real, or in a live test) read in bronze; the rest read muted, so a glance down
 * a grid separates the two. The tone for each status lives in `statusTone`.
 */
export const StatusBadge: React.FC<{ status: StudioStatus; className?: string }> = ({
  status,
  className = '',
}) => {
  const accent = statusTone[status] === 'accent'
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase ${
        accent ? 'text-custom' : 'text-textlight'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block w-1.5 h-1.5 rounded-full ${accent ? 'bg-custom' : 'bg-textlight/60'}`}
      />
      {status}
    </span>
  )
}
