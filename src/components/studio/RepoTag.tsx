import React from 'react'

import type { StudioRepo } from '@/data/studio'

const tagClass =
  'inline-flex items-center px-3 py-1 text-xs tracking-[0.16em] uppercase border transition-colors duration-300'

/**
 * The project's source, as a small tag beside the status badge. A public repo links out; a private one is
 * stated plainly and is not a link.
 */
export const RepoTag: React.FC<{ repo: StudioRepo }> = ({ repo }) =>
  repo.visibility === 'public' ? (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on GitHub (opens in a new tab)"
      className={`${tagClass} text-custom border-custom/60 hover:text-black hover:bg-custom focus-visible:outline-none focus-visible:text-black focus-visible:bg-custom`}
    >
      View on GitHub
    </a>
  ) : (
    <span className={`${tagClass} text-textlight border-textlight/30`}>Private repo</span>
  )
