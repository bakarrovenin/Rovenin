'use client'

import React, { useEffect, useState } from 'react'

/**
 * A URL meant to be pasted somewhere else rather than visited, so it is shown
 * as selectable text with a copy control instead of as a link.
 *
 * Without the clipboard API the text is still there to select by hand, so the
 * component is useful even when the button cannot do its job.
 */
export const CopyableUrl: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Clipboard access can be refused. The URL stays selectable either way.
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="text-xs tracking-[0.16em] uppercase text-textlight">{label}</div>

      <div className="flex flex-wrap gap-4 items-baseline mt-3">
        <code className="text-base tracking-wide text-white break-all select-all max-md:text-sm">
          {url}
        </code>

        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label} to the clipboard`}
          className="text-xs tracking-[0.16em] uppercase text-custom hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
